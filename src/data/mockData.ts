import {
  Market,
  UniversalProduct,
  Rule,
  RegulatoryAlert,
  CustomerTenant,
  AuditLog,
  ComplianceDocument
} from '../types';

export const MOCK_MARKETS: Market[] = [
  {
    code: 'JP',
    name: 'Japan',
    flag: '🇯🇵',
    region: 'Asia Pacific',
    activeRulesCount: 42,
    readinessPercentage: 82,
    description: 'PMDA Regulations, Japanese Labeling Standards, Quasi-Drug Standards',
    currency: 'JPY'
  },
  {
    code: 'BR',
    name: 'Brazil',
    flag: '🇧🇷',
    region: 'Latin America',
    activeRulesCount: 38,
    readinessPercentage: 64,
    description: 'ANVISA Sanitary Regulations, INMETRO Certification, Portuguese Labeling',
    currency: 'BRL'
  },
  {
    code: 'US',
    name: 'United States',
    flag: '🇺🇸',
    region: 'North America',
    activeRulesCount: 54,
    readinessPercentage: 94,
    description: 'FDA MoCRA Cosmetic Registration, FTC Truth in Advertising, OSHA SDS',
    currency: 'USD'
  },
  {
    code: 'CA',
    name: 'Canada',
    flag: '🇨🇦',
    region: 'North America',
    activeRulesCount: 31,
    readinessPercentage: 91,
    description: 'Health Canada Cosmetic Notification, Bilingual Packaging (EN/FR)',
    currency: 'CAD'
  },
  {
    code: 'AU',
    name: 'Australia',
    flag: '🇦🇺',
    region: 'Asia Pacific',
    activeRulesCount: 29,
    readinessPercentage: 88,
    description: 'AICIS Chemical Inventory, TGA Standards, Australian Consumer Law',
    currency: 'AUD'
  },
  {
    code: 'EU',
    name: 'European Union',
    flag: '🇪🇺',
    region: 'Europe',
    activeRulesCount: 65,
    readinessPercentage: 96,
    description: 'EU Cosmetic Regulation (EC) 1223/2009, CPNP Portal Registration',
    currency: 'EUR'
  }
];

export const MOCK_PRODUCTS: UniversalProduct[] = [
  {
    id: 'prod-001',
    sku: 'FC001-BIO',
    name: 'Bio-Active Hydrating Face Cream',
    description: 'Organic hydration cream enriched with Hyaluronic Acid and Botanical extracts.',
    category: 'Cosmetics',
    subcategory: 'Skincare',
    brand: 'Acme Botanicals',
    manufacturer: 'Laboratoires BioFrance S.A.',
    countryOfOrigin: 'France',
    ingredients: [
      'Aqua',
      'Glycerin',
      'Hyaluronic Acid',
      'Simmondsia Chinensis Seed Oil',
      'Tocopherol',
      'Phenoxyethanol'
    ],
    materials: ['Glass Jar', 'Recyclable Aluminum Cap'],
    weight: 150,
    weightUnit: 'g',
    packagingType: 'Glass Bottle with FSC Box',
    targetMarkets: ['JP', 'BR', 'US', 'CA'],
    certifications: ['Ecocert Organic', 'Cruelty Free', 'ISO 22716 GMP'],
    languageLabels: {
      ja: false, // Missing Japanese Label
      pt: false, // Missing Portuguese Label
      en: true,
      fr: true
    },
    hasLocalImporterRecord: {
      JP: true,
      BR: false // Missing Brazilian importer details
    },
    hasProductRegistration: {
      JP: true,
      BR: false, // ANVISA dossier missing
      US: true,
      CA: true
    },
    lastAnalyzedAt: '2026-09-18T14:30:00Z',
    syncedFrom: 'Shopify'
  },
  {
    id: 'prod-002',
    sku: 'TS002-ECO',
    name: 'Pure Organic Cotton T-Shirt',
    description: '100% Organic combed cotton crewneck t-shirt with eco-friendly dyes.',
    category: 'Clothing',
    subcategory: 'Apparel',
    brand: 'Acme Wear',
    manufacturer: 'Textile Artisanat Lyon',
    countryOfOrigin: 'France',
    ingredients: ['100% Organic Cotton'],
    materials: ['Organic Cotton Thread'],
    weight: 220,
    weightUnit: 'g',
    packagingType: 'Compostable Polybag',
    targetMarkets: ['JP', 'US', 'EU'],
    certifications: ['GOTS Organic', 'OEKO-TEX Standard 100'],
    languageLabels: {
      ja: true,
      en: true,
      fr: true,
      pt: true
    },
    hasLocalImporterRecord: {
      JP: true,
      US: true,
      EU: true
    },
    hasProductRegistration: {
      JP: true,
      US: true,
      EU: true
    },
    lastAnalyzedAt: '2026-09-19T09:15:00Z',
    syncedFrom: 'Shopify'
  },
  {
    id: 'prod-003',
    sku: 'SP003-NUT',
    name: 'Whey Protein Isolate - Vanilla',
    description: 'Micro-filtered whey protein isolate powder with natural stevia sweetening.',
    category: 'Food',
    subcategory: 'Dietary Supplements',
    brand: 'Acme Nutrition',
    manufacturer: 'NutriTech Labs GmbH',
    countryOfOrigin: 'Germany',
    ingredients: [
      'Whey Protein Isolate (Milk)',
      'Natural Vanilla Flavor',
      'Stevia Extract',
      'Sunflower Lecithin'
    ],
    materials: ['HDPE Plastic Tub'],
    weight: 1000,
    weightUnit: 'g',
    packagingType: 'Rigid Plastic Tub with Scoop',
    targetMarkets: ['BR', 'US', 'AU'],
    certifications: ['Informed Sport', 'GMP Certified'],
    languageLabels: {
      pt: false, // Missing Brazilian Nutrition Facts Table
      en: true
    },
    hasLocalImporterRecord: {
      BR: false,
      US: true
    },
    hasProductRegistration: {
      BR: false, // ANVISA registration blocked
      US: true
    },
    lastAnalyzedAt: '2026-09-17T11:00:00Z',
    syncedFrom: 'WooCommerce'
  },
  {
    id: 'prod-004',
    sku: 'EL004-EAR',
    name: 'UltraWireless Earbuds Pro',
    description: 'Active Noise Canceling wireless earbuds with Qi wireless charging case.',
    category: 'Electronics',
    subcategory: 'Audio Devices',
    brand: 'Acme Tech',
    manufacturer: 'Shenzhen Electronics Corp',
    countryOfOrigin: 'China',
    ingredients: [],
    materials: ['ABS Plastic', 'Lithium Polymer Battery', 'Copper Coil'],
    weight: 180,
    weightUnit: 'g',
    packagingType: 'Recycled Cardboard Retail Box',
    targetMarkets: ['JP', 'US', 'EU', 'CA'],
    certifications: ['CE Mark', 'FCC Certified', 'RoHS Compliant'],
    languageLabels: {
      ja: true,
      en: true,
      fr: true
    },
    hasLocalImporterRecord: {
      JP: true, // TELEC MIC Certificate present
      US: true,
      EU: true
    },
    hasProductRegistration: {
      JP: true,
      US: true,
      EU: true
    },
    lastAnalyzedAt: '2026-09-19T10:00:00Z',
    syncedFrom: 'Shopify'
  },
  {
    id: 'prod-005',
    sku: 'TEA-005-MAT',
    name: 'Ceremonial Grade Matcha Tea',
    description: 'First harvest stone-ground ceremonial green tea powder from Uji, Kyoto.',
    category: 'Food',
    subcategory: 'Beverages & Tea',
    brand: 'Acme Zen',
    manufacturer: 'Kyoto Tea Gardens Co.',
    countryOfOrigin: 'Japan',
    ingredients: ['100% Japanese Green Tea Leaf Powder'],
    materials: ['Metal Tin Container'],
    weight: 100,
    weightUnit: 'g',
    packagingType: 'Sealed Metal Tin',
    targetMarkets: ['US', 'CA', 'EU', 'BR'],
    certifications: ['JAS Organic', 'USDA Organic', 'EU Organic'],
    languageLabels: {
      en: true,
      fr: true,
      pt: true
    },
    hasLocalImporterRecord: {
      US: true,
      CA: true,
      EU: true,
      BR: true
    },
    hasProductRegistration: {
      US: true,
      CA: true,
      EU: true,
      BR: true
    },
    lastAnalyzedAt: '2026-09-18T16:20:00Z',
    syncedFrom: 'Shopify'
  }
];

export const MOCK_RULES: Rule[] = [
  {
    id: 'JP-COS-001',
    version: '2.1.0',
    title: 'Japanese Kanji/Katakana Ingredient & Safety Labeling',
    countryCode: 'JP',
    category: 'Cosmetics',
    severity: 'WARNING',
    conditionSummary: 'Language label must include Japanese translation (ja = true)',
    requirementText: 'Product outer packaging must state all active ingredients, distributor name, and Japanese contact address in Japanese (Kanji/Katakana).',
    legalReference: 'PMDA Act Art. 61 (Law No. 145)',
    sourceUrl: 'https://www.pmda.go.jp/english/rs-sb-std/standards-development/0001.html',
    effectiveDate: '2026-01-01',
    status: 'active',
    evaluator: (product) => {
      const isJa = product.languageLabels['ja'];
      if (!isJa) {
        return {
          passed: false,
          issueDetails: 'Japanese translated label missing from product metadata.',
          actionRequired: 'Provide Japanese localized product label & ingredient translation dossier.',
          missingField: 'languageLabels.ja'
        };
      }
      return { passed: true };
    }
  },
  {
    id: 'JP-COS-002',
    version: '1.4.0',
    title: 'Designated Local Responsible Importer Record (LAH)',
    countryCode: 'JP',
    category: 'Cosmetics',
    severity: 'BLOCKING',
    conditionSummary: 'Local Importer Record must be registered in Japan (hasLocalImporterRecord.JP = true)',
    requirementText: 'Cosmetic items imported into Japan must be associated with a licensed Primary Distributor license holder (Manufacturing and Sales License).',
    legalReference: 'PMDA Pharmaceutical and Medical Devices Act',
    sourceUrl: 'https://www.mhlw.go.jp/english/policy/health-medical/pharmaceuticals/index.html',
    effectiveDate: '2025-06-15',
    status: 'active',
    evaluator: (product) => {
      const hasRecord = product.hasLocalImporterRecord?.['JP'];
      if (!hasRecord) {
        return {
          passed: false,
          issueDetails: 'No licensed Japanese Primary Distributor (LAH) registered for this product.',
          actionRequired: 'Assign a licensed Japanese distributor and enter license number in Comvera.',
          missingField: 'hasLocalImporterRecord.JP'
        };
      }
      return { passed: true };
    }
  },
  {
    id: 'BR-COS-001',
    version: '3.0.1',
    title: 'ANVISA Sanitary Product Registration / Notification',
    countryCode: 'BR',
    category: 'Cosmetics',
    severity: 'BLOCKING',
    conditionSummary: 'ANVISA Dossier registration must be completed (hasProductRegistration.BR = true)',
    requirementText: 'Cosmetics in Brazil require ANVISA Grade I/II notification or registration prior to customs entry.',
    legalReference: 'ANVISA Resolution RDC 752/2022',
    sourceUrl: 'https://www.gov.br/anvisa/pt-br/assuntos/cosmeticos',
    effectiveDate: '2026-03-01',
    status: 'active',
    evaluator: (product) => {
      const registered = product.hasProductRegistration?.['BR'];
      if (!registered) {
        return {
          passed: false,
          issueDetails: 'ANVISA Registration dossier missing for Brazilian customs clearance.',
          actionRequired: 'Generate ANVISA Import Dossier and submit to Brazilian health authorities.',
          missingField: 'hasProductRegistration.BR'
        };
      }
      return { passed: true };
    }
  },
  {
    id: 'BR-COS-002',
    version: '1.2.0',
    title: 'Portuguese Mandatory Consumer Protection Labeling',
    countryCode: 'BR',
    category: 'Cosmetics',
    severity: 'WARNING',
    conditionSummary: 'Portuguese label mandatory (languageLabels.pt = true)',
    requirementText: 'Consumer Protection Code requires Portuguese instructions, expiration date format (DD/MM/YYYY), and batch number.',
    legalReference: 'Brazilian Consumer Code (Law 8.078/1990)',
    sourceUrl: 'https://www.procon.sp.gov.br',
    effectiveDate: '2025-01-01',
    status: 'active',
    evaluator: (product) => {
      const pt = product.languageLabels['pt'];
      if (!pt) {
        return {
          passed: false,
          issueDetails: 'Portuguese consumer label and expiration format missing.',
          actionRequired: 'Upload Portuguese localized label layout file.',
          missingField: 'languageLabels.pt'
        };
      }
      return { passed: true };
    }
  },
  {
    id: 'US-COS-001',
    version: '2.0.0',
    title: 'FDA MoCRA Facility & Cosmetic Product Listing',
    countryCode: 'US',
    category: 'Cosmetics',
    severity: 'WARNING',
    conditionSummary: 'FDA Product Registration listing mandatory',
    requirementText: 'Under MoCRA 2022, cosmetic products distributed in the US must be registered via FDA Cosmetics Direct portal.',
    legalReference: 'FD&C Act Modernization of Cosmetics Regulation Act of 2022',
    sourceUrl: 'https://www.fda.gov/cosmetics/cosmetics-laws-regulations/modernization-cosmetics-regulation-act-2022-mocra',
    effectiveDate: '2024-07-01',
    status: 'active',
    evaluator: (product) => {
      const reg = product.hasProductRegistration?.['US'];
      if (!reg) {
        return {
          passed: false,
          issueDetails: 'FDA MoCRA Cosmetic Product Listing (SPL) not verified.',
          actionRequired: 'Submit product listing through FDA Cosmetics Direct portal.',
          missingField: 'hasProductRegistration.US'
        };
      }
      return { passed: true };
    }
  },
  {
    id: 'BR-FOOD-001',
    version: '1.1.0',
    title: 'ANVISA Front-of-Pack Nutritional Warning Icons (FOPNL)',
    countryCode: 'BR',
    category: 'Food',
    severity: 'BLOCKING',
    conditionSummary: 'Food supplements in Brazil require black magnifying glass warnings if high in sodium/fat/sugar.',
    requirementText: 'RDC 429/2020 mandates front-of-package magnifying glass alert symbol in Portuguese.',
    legalReference: 'ANVISA RDC 429/2020 & IN 75/2020',
    sourceUrl: 'https://www.gov.br/anvisa/pt-br/assuntos/rotulagem-nutricional',
    effectiveDate: '2025-10-09',
    status: 'active',
    evaluator: (product) => {
      const reg = product.hasProductRegistration?.['BR'];
      if (!reg) {
        return {
          passed: false,
          issueDetails: 'ANVISA Food & Supplement Registration and FOPNL label check required.',
          actionRequired: 'Generate ANVISA Food Declaration & Nutrition Label Dossier.',
          missingField: 'hasProductRegistration.BR'
        };
      }
      return { passed: true };
    }
  }
];

export const MOCK_ALERTS: RegulatoryAlert[] = [
  {
    id: 'alert-001',
    title: 'Japan PMDA Cosmetics Labeling Guideline Amendment',
    countryCode: 'JP',
    countryFlag: '🇯🇵',
    category: 'Cosmetics',
    date: '2026-09-15',
    severity: 'high',
    description: 'Updated requirement for botanical extract disclosure on outer packaging starting Nov 2026. 12 products affected.',
    affectedProductsCount: 12,
    status: 'Unresolved'
  },
  {
    id: 'alert-002',
    title: 'Brazil ANVISA RDC 752/2022 Expiration Deadline',
    countryCode: 'BR',
    countryFlag: '🇧🇷',
    category: 'Cosmetics',
    date: '2026-09-10',
    severity: 'medium',
    description: 'Grandfathering period for legacy Cosmetic registrations expires in 30 days. Action required for 8 products.',
    affectedProductsCount: 8,
    status: 'Unresolved'
  },
  {
    id: 'alert-003',
    title: 'EU CPNP Portal Maintenance & Mandatory EAN Update',
    countryCode: 'EU',
    countryFlag: '🇪🇺',
    category: 'Cosmetics',
    date: '2026-09-02',
    severity: 'low',
    description: 'CPNP API requires full GTIN-13 format for all EU cosmetic dossier submissions.',
    affectedProductsCount: 3,
    status: 'Acknowledged'
  }
];

export const MOCK_CUSTOMERS: CustomerTenant[] = [
  {
    id: 'cust-101',
    companyName: 'Acme Global Store',
    ownerEmail: 'alexandre@acmestore.com',
    plan: 'Growth',
    productsCount: 1248,
    marketsCount: 4,
    status: 'Active',
    createdAt: '2026-02-14',
    mrr: 149
  },
  {
    id: 'cust-102',
    companyName: 'Aura Skincare Paris',
    ownerEmail: 'claire@auraskincare.fr',
    plan: 'Business',
    productsCount: 3420,
    marketsCount: 8,
    status: 'Active',
    createdAt: '2026-01-10',
    mrr: 399
  },
  {
    id: 'cust-103',
    companyName: 'Nordic Organic Goods',
    ownerEmail: 'erik@nordicgoods.se',
    plan: 'Starter',
    productsCount: 82,
    marketsCount: 2,
    status: 'Active',
    createdAt: '2026-05-20',
    mrr: 49
  }
];

export const MOCK_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-801',
    timestamp: '2026-09-19T14:32:10Z',
    user: 'admin@comvera.io',
    action: 'Rule updated: JP-COS-001 v2.1.0',
    category: 'Rule Edit',
    details: 'Modified Japanese label requirement from optional to mandatory for all cosmetic subcategories.',
    ipAddress: '192.168.1.45'
  },
  {
    id: 'log-802',
    timestamp: '2026-09-19T14:35:42Z',
    user: 'alexandre@acmestore.com',
    action: 'Compliance check executed: FC001-BIO (Japan, Brazil)',
    category: 'Compliance Check',
    details: 'Evaluated Bio-Active Hydrating Face Cream against 42 Japanese and 38 Brazilian rules.',
    ipAddress: '84.22.109.12'
  },
  {
    id: 'log-803',
    timestamp: '2026-09-19T15:02:18Z',
    user: 'alexandre@acmestore.com',
    action: 'Document generated: Japanese Label Dossier JP-FC001',
    category: 'Document Generated',
    details: 'Generated official PDF compliance label dossier for Japan customs declaration.',
    ipAddress: '84.22.109.12'
  },
  {
    id: 'log-804',
    timestamp: '2026-09-19T15:45:00Z',
    user: 'system@comvera.io',
    action: 'Shopify Store Auto-Sync Completed',
    category: 'Integration Sync',
    details: 'Synced 1,248 products from acme-store.myshopify.com. 0 schema errors.',
    ipAddress: '10.0.4.12'
  }
];

export const MOCK_DOCUMENTS: ComplianceDocument[] = [
  {
    id: 'doc-001',
    documentType: 'japanese_label_dossier',
    title: 'Japanese Label & Importer Declaration — Bio-Active Face Cream',
    countryCode: 'JP',
    productId: 'prod-001',
    productName: 'Bio-Active Hydrating Face Cream',
    status: 'Ready',
    generatedAt: '2026-09-19T15:02:18Z',
    contentMarkdown: `# OFFICIAL JAPANESE COSMETIC COMPLIANCE DECLARATION
**Product:** Bio-Active Hydrating Face Cream  
**SKU:** FC001-BIO  
**Country of Origin:** France  
**Target Market:** Japan 🇯🇵  

---

### 1. Product Identification
- **Brand:** Acme Botanicals
- **Manufacturer:** Laboratoires BioFrance S.A.
- **Primary Importer (LAH):** Nippon Trade Logistics Ltd (License #JP-COS-9921)
- **Net Quantity:** 150g

### 2. Ingredient Disclosure (Kanji / Katakana Standard)
- Aqua (水)
- Glycerin (グリセリン)
- Hyaluronic Acid (ヒアルロン酸)
- Simmondsia Chinensis Seed Oil (ホホバ種子油)
- Tocopherol (トコフェロール)
- Phenoxyethanol (フェノキシエタノール)

### 3. Regulatory Verification Checklist
- [x] PMDA Art. 61 Labeling Standard Verified
- [x] Local Importer Responsibility Holder Recorded
- [x] Heavy Metal & Contaminant Test Certificate Attached

*Certified by Comvera Compliance Engine v2.4*
`
  },
  {
    id: 'doc-002',
    documentType: 'anvisa_import_dossier',
    title: 'ANVISA Sanitary Import Registration Dossier — Whey Protein',
    countryCode: 'BR',
    productId: 'prod-003',
    productName: 'Whey Protein Isolate - Vanilla',
    status: 'Draft',
    generatedAt: '2026-09-17T11:00:00Z',
    contentMarkdown: `# DOSSIÊ DE NOTIFICAÇÃO SANITÁRIA ANVISA
**Produto:** Whey Protein Isolate - Vanilla  
**SKU:** SP003-NUT  
**País de Origem:** Alemanha  
**Mercado Alvo:** Brasil 🇧🇷  

---

### 1. Identificação do Produto
- **Fabricante:** NutriTech Labs GmbH
- **Importador Responsável:** Brasil Trade Importação Ltda
- **Peso Líquido:** 1000g

### 2. Tabela Nutricional obrigatoria (RDC 429/2020)
- Valor Energético: 120 kcal
- Proteínas: 25g
- Alergênicos: **CONTÉM DERIVADOS DE LEITE**

*Status: Requer aprovação de rótulo em Português*
`
  }
];
