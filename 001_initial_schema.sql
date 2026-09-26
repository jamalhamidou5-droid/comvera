-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ORGANIZATIONS
CREATE TABLE IF NOT EXISTS public.organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  country TEXT,
  industry TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. ORGANIZATION MEMBERS
CREATE TABLE IF NOT EXISTS public.organization_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'member', -- 'owner', 'admin', 'member'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(organization_id, user_id)
);

-- 4. USER PROFILES (Global user data and Global Admin)
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  is_global_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. PRODUCTS (Belong to Organization)
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
  created_by UUID REFERENCES auth.users(id),
  sku TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  subcategory TEXT,
  brand TEXT,
  manufacturer TEXT,
  country_of_origin TEXT,
  ingredients JSONB DEFAULT '[]'::jsonb,
  materials JSONB DEFAULT '[]'::jsonb,
  weight NUMERIC DEFAULT 0,
  weight_unit TEXT DEFAULT 'g',
  packaging_type TEXT,
  target_markets JSONB DEFAULT '[]'::jsonb,
  certifications JSONB DEFAULT '[]'::jsonb,
  language_labels JSONB DEFAULT '{}'::jsonb,
  has_local_importer_record JSONB DEFAULT '{}'::jsonb,
  has_product_registration JSONB DEFAULT '{}'::jsonb,
  last_analyzed_at TIMESTAMPTZ,
  synced_from TEXT DEFAULT 'Manual',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. COMPLIANCE CHECKS (Checks on Products)
CREATE TABLE IF NOT EXISTS public.compliance_checks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  created_by UUID REFERENCES auth.users(id),
  status TEXT DEFAULT 'PENDING', -- 'PENDING', 'COMPLETED'
  risk_score INTEGER,
  risk_level TEXT, -- 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL'
  decision TEXT, -- 'APPROVED', 'REVIEW', 'REJECTED'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. EVIDENCE / CHECK RESULTS
CREATE TABLE IF NOT EXISTS public.check_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  check_id UUID REFERENCES public.compliance_checks(id) ON DELETE CASCADE NOT NULL,
  rule_id TEXT NOT NULL,
  rule_title TEXT,
  severity TEXT,
  passed BOOLEAN,
  issue_details TEXT,
  action_required TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. AUDIT LOGS
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id UUID,
  details JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. MARKETS (Target Markets catalog)
CREATE TABLE IF NOT EXISTS public.markets (
  code TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  flag TEXT,
  region TEXT,
  active_rules_count INTEGER DEFAULT 0,
  readiness_percentage INTEGER DEFAULT 0,
  description TEXT,
  currency TEXT
);

-- ACTIVER LE RLS
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organization_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.compliance_checks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.check_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.markets ENABLE ROW LEVEL SECURITY;

-- POLITIQUES RLS

-- Fonctions utiles pour le RLS sécurisé
CREATE OR REPLACE FUNCTION public.is_org_member(org_id UUID)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.organization_members
    WHERE organization_id = org_id AND user_id = auth.uid()
  );
$$ LANGUAGE sql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.is_global_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_profiles
    WHERE id = auth.uid() AND is_global_admin = TRUE
  );
$$ LANGUAGE sql SECURITY DEFINER;

-- 1. Organizations
CREATE POLICY "Users view their own organizations" ON public.organizations FOR SELECT USING (is_org_member(id) OR is_global_admin());
CREATE POLICY "Users update their orgs if admin" ON public.organizations FOR UPDATE USING (
  is_global_admin() OR 
  EXISTS (SELECT 1 FROM public.organization_members WHERE organization_id = id AND user_id = auth.uid() AND role IN ('admin', 'owner'))
);

-- 2. Organization Members
CREATE POLICY "Users view members of their org" ON public.organization_members FOR SELECT USING (is_org_member(organization_id) OR is_global_admin());

-- 3. Products
CREATE POLICY "Users view products of their org" ON public.products FOR SELECT USING (is_org_member(organization_id) OR is_global_admin());
CREATE POLICY "Users insert products in their org" ON public.products FOR INSERT WITH CHECK (is_org_member(organization_id) OR is_global_admin());
CREATE POLICY "Users update products in their org" ON public.products FOR UPDATE USING (is_org_member(organization_id) OR is_global_admin());
CREATE POLICY "Users delete products in their org" ON public.products FOR DELETE USING (is_org_member(organization_id) OR is_global_admin());

-- 4. Compliance Checks
CREATE POLICY "Users view checks of their org" ON public.compliance_checks FOR SELECT USING (is_org_member(organization_id) OR is_global_admin());
CREATE POLICY "Users insert checks in their org" ON public.compliance_checks FOR INSERT WITH CHECK (is_org_member(organization_id) OR is_global_admin());
CREATE POLICY "Users update checks in their org" ON public.compliance_checks FOR UPDATE USING (is_org_member(organization_id) OR is_global_admin());

-- 5. Check Results
CREATE POLICY "Users view results of their org checks" ON public.check_results FOR SELECT USING (
  is_global_admin() OR 
  EXISTS (SELECT 1 FROM public.compliance_checks WHERE id = check_id AND is_org_member(organization_id))
);
CREATE POLICY "Users insert results for their org checks" ON public.check_results FOR INSERT WITH CHECK (
  is_global_admin() OR 
  EXISTS (SELECT 1 FROM public.compliance_checks WHERE id = check_id AND is_org_member(organization_id))
);

-- 6. Audit Logs
CREATE POLICY "Users view audit logs of their org" ON public.audit_logs FOR SELECT USING (is_org_member(organization_id) OR is_global_admin());
CREATE POLICY "Users insert audit logs in their org" ON public.audit_logs FOR INSERT WITH CHECK (is_org_member(organization_id) OR is_global_admin());

-- 7. User Profiles
CREATE POLICY "Users view their own profile or if admin" ON public.user_profiles FOR SELECT USING (auth.uid() = id OR is_global_admin());
CREATE POLICY "Users update their own profile" ON public.user_profiles FOR UPDATE USING (auth.uid() = id);

-- 8. Markets (Public read-only)
CREATE POLICY "Everyone can view markets" ON public.markets FOR SELECT USING (true);
