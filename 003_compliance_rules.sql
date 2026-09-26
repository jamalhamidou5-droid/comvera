-- 1. CREATION DE LA TABLE RULES
CREATE TABLE IF NOT EXISTS public.rules (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  country_code TEXT NOT NULL,
  category TEXT NOT NULL,
  severity TEXT NOT NULL, -- 'BLOCKING', 'WARNING'
  status TEXT DEFAULT 'active', -- 'active', 'inactive'
  legal_reference TEXT,
  source_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.rules ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Everyone can view active rules" ON public.rules FOR SELECT USING (true);
CREATE POLICY "Global admins can manage rules" ON public.rules FOR ALL USING (is_global_admin());

-- 2. INSERTION DES REGLES DE BASE
INSERT INTO public.rules (id, title, description, country_code, category, severity, legal_reference) VALUES
('EU-ING-001', 'Banned Ingredients (EU)', 'Checks for ingredients banned under EU Cosmetics Regulation 1223/2009', 'EU', 'Cosmetics', 'BLOCKING', 'EU Reg 1223/2009 Annex II'),
('US-FDA-001', 'FDA Registration', 'Verifies if product has FDA VCRP or MoCRA registration', 'US', 'Cosmetics', 'BLOCKING', 'MoCRA 2022'),
('US-COL-001', 'Color Additives (FDA)', 'Checks if color additives are batch-certified by FDA', 'US', 'Cosmetics', 'WARNING', '21 CFR Part 70'),
('JP-MHLW-001', 'MHLW Approval', 'Checks for quasi-drug or cosmetics import notification in Japan', 'JP', 'Cosmetics', 'BLOCKING', 'PMD Act'),
('JP-LBL-001', 'Japanese Labeling', 'Verifies presence of Japanese language labels', 'JP', 'All', 'BLOCKING', 'PMD Act Labeling'),
('BR-ANVISA-001', 'ANVISA Notification', 'Verifies Grade 1/Grade 2 ANVISA registration', 'BR', 'Cosmetics', 'BLOCKING', 'RDC 752/2022'),
('UAE-MOIAT-001', 'ECAS Certification', 'Emirates Conformity Assessment Scheme requirement', 'AE', 'Cosmetics', 'BLOCKING', 'UAE.S GSO 1943:2016'),
('SA-SFDA-001', 'eCosma Registration', 'Saudi FDA cosmetics notification system', 'SA', 'Cosmetics', 'BLOCKING', 'SFDA Cosmetics Law'),
('ZA-NRCS-001', 'NRCS Homologation', 'National Regulator for Compulsory Specifications', 'ZA', 'All', 'BLOCKING', 'NRCS Act 5 of 2008'),
('CM-ANOR-001', 'ANOR Certification', 'Agence des Normes et de la Qualité certificate of conformity', 'CM', 'All', 'BLOCKING', 'Law No. 2004/002'),
('GB-OPSS-001', 'SCPN Notification', 'Submit Cosmetic Product Notification (UK post-Brexit)', 'GB', 'Cosmetics', 'BLOCKING', 'UK Cosmetics Regulation'),
('IN-CDSCO-001', 'CDSCO Registration', 'Cosmetics registration under Drugs and Cosmetics Rules', 'IN', 'Cosmetics', 'BLOCKING', 'Drugs and Cosmetics Act, 1940')
ON CONFLICT (id) DO NOTHING;
