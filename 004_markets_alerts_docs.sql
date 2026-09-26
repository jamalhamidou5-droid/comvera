-- 1. MARKETS (Update existing table)
INSERT INTO public.markets (code, name, region, currency) VALUES
('JP', 'Japan', 'Asia Pacific', 'JPY'),
('BR', 'Brazil', 'Latin America', 'BRL'),
('US', 'United States', 'North America', 'USD'),
('CA', 'Canada', 'North America', 'CAD'),
('AU', 'Australia', 'Asia Pacific', 'AUD'),
('EU', 'European Union', 'Europe', 'EUR'),
('AE', 'United Arab Emirates', 'Middle East', 'AED'),
('SA', 'Saudi Arabia', 'Middle East', 'SAR'),
('CM', 'Cameroon', 'Africa', 'XAF'),
('ZA', 'South Africa', 'Africa', 'ZAR'),
('GB', 'United Kingdom', 'Europe', 'GBP'),
('IN', 'India', 'Asia Pacific', 'INR')
ON CONFLICT (code) DO NOTHING;

-- 2. REGULATORY ALERTS
CREATE TABLE IF NOT EXISTS public.regulatory_alerts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  country_code TEXT NOT NULL,
  country_flag TEXT NOT NULL,
  severity TEXT NOT NULL, -- 'high', 'medium', 'info'
  category TEXT NOT NULL,
  affected_products_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.regulatory_alerts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Everyone can view alerts" ON public.regulatory_alerts FOR SELECT USING (true);

INSERT INTO public.regulatory_alerts (title, description, country_code, country_flag, severity, category, affected_products_count) VALUES
('MoCRA Implementation Deadline', 'FDA registration deadline for cosmetics facilities and product listing is approaching.', 'US', '🇺🇸', 'high', 'Cosmetics', 1),
('New UAE ECAS Scheme', 'Updated standards for halal cosmetics and personal care products taking effect.', 'AE', '🇦🇪', 'medium', 'Cosmetics', 2),
('Japanese Labeling Change', 'New mandatory font sizes for active ingredients in Quasi-drugs.', 'JP', '🇯🇵', 'info', 'Packaging', 1),
('Banned Substance Annex II Update', 'EU Commission adds 3 new PFAS compounds to the banned list.', 'EU', '🇪🇺', 'high', 'Ingredients', 0);

-- 3. COMPLIANCE DOCUMENTS
CREATE TABLE IF NOT EXISTS public.compliance_documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  document_type TEXT NOT NULL,
  title TEXT NOT NULL,
  country_code TEXT,
  status TEXT DEFAULT 'Ready',
  content_markdown TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.compliance_documents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own org documents" ON public.compliance_documents FOR SELECT USING (is_org_member(organization_id));
CREATE POLICY "Users create own org documents" ON public.compliance_documents FOR INSERT WITH CHECK (is_org_member(organization_id));
CREATE POLICY "Users update own org documents" ON public.compliance_documents FOR UPDATE USING (is_org_member(organization_id));
CREATE POLICY "Users delete own org documents" ON public.compliance_documents FOR DELETE USING (is_org_member(organization_id));
