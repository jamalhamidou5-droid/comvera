-- 1. ORGANIZATIONS (Pour le multitenant)
CREATE TABLE IF NOT EXISTS public.organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  country TEXT,
  industry TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. ORGANIZATION MEMBERS
CREATE TABLE IF NOT EXISTS public.organization_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(organization_id, user_id)
);

-- 3. ENTITIES (Les entreprises/personnes vérifiées)
CREATE TABLE IF NOT EXISTS public.entities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  type TEXT NOT NULL, -- 'Company' ou 'Individual'
  legal_name TEXT NOT NULL,
  country TEXT NOT NULL,
  address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. COMPLIANCE CHECKS (Le cœur du système)
CREATE TABLE IF NOT EXISTS public.compliance_checks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  created_by UUID REFERENCES auth.users(id),
  entity_id UUID REFERENCES public.entities(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'COMPLETED', -- 'PENDING', 'COMPLETED'
  risk_score INTEGER,
  risk_level TEXT, -- 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL'
  decision TEXT, -- 'APPROVED', 'REVIEW', 'REJECTED'
  transaction_value NUMERIC,
  currency TEXT DEFAULT 'USD',
  destination_country TEXT,
  product_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. EVIDENCE (Les preuves des résultats)
CREATE TABLE IF NOT EXISTS public.evidence (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  check_id UUID REFERENCES public.compliance_checks(id) ON DELETE CASCADE,
  source_name TEXT,
  result TEXT,
  details TEXT,
  captured_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. AUDIT LOGS
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS POLICIES (À compléter selon la logique organization_id)
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organization_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.entities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.compliance_checks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evidence ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Les politiques de base pour qu'un utilisateur accède aux données de son organisation
-- (Simplifié pour le MVP : l'utilisateur peut voir toutes les orgs dont il est membre)
CREATE POLICY "Users can view their orgs" ON public.organizations FOR SELECT USING (id IN (SELECT organization_id FROM public.organization_members WHERE user_id = auth.uid()));
CREATE POLICY "Users can view org members" ON public.organization_members FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users view entities in their org" ON public.entities FOR ALL USING (organization_id IN (SELECT organization_id FROM public.organization_members WHERE user_id = auth.uid()));
CREATE POLICY "Users view checks in their org" ON public.compliance_checks FOR ALL USING (organization_id IN (SELECT organization_id FROM public.organization_members WHERE user_id = auth.uid()));
CREATE POLICY "Users view evidence for their checks" ON public.evidence FOR ALL USING (check_id IN (SELECT id FROM public.compliance_checks WHERE organization_id IN (SELECT organization_id FROM public.organization_members WHERE user_id = auth.uid())));
CREATE POLICY "Users view audit logs in their org" ON public.audit_logs FOR ALL USING (organization_id IN (SELECT organization_id FROM public.organization_members WHERE user_id = auth.uid()));
