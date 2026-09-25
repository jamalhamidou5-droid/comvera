export type AppMode = 'public' | 'onboarding' | 'client' | 'admin';

export type ClientTab =
  | 'overview'
  | 'screening'
  | 'products'
  | 'compliance'
  | 'markets'
  | 'documents'
  | 'alerts'
  | 'integrations'
  | 'settings';

export type AdminTab =
  | 'overview'
  | 'customers'
  | 'regulations'
  | 'rules'
  | 'checks'
  | 'documents'
  | 'audit';

export type ComplianceStatus = 'READY' | 'ACTION_REQUIRED' | 'BLOCKED';

export interface Market {
  code: string;
  name: string;
  flag: string;
  region: string;
  activeRulesCount: number;
  readinessPercentage: number;
  description: string;
  currency: string;
}

export interface UniversalProduct {
  id: string;
  sku: string;
  name: string;
  description: string;
  category: string;
  subcategory: string;
  brand: string;
  manufacturer: string;
  countryOfOrigin: string;
  ingredients: string[];
  materials: string[];
  weight: number; // in grams
  weightUnit: 'g' | 'kg';
  packagingType: string;
  targetMarkets: string[]; // Market codes e.g. ['JP', 'BR', 'US']
  certifications: string[];
  languageLabels: Record<string, boolean>; // e.g. { 'ja': true, 'pt': false }
  hasLocalImporterRecord?: Record<string, boolean>;
  hasProductRegistration?: Record<string, boolean>;
  lastAnalyzedAt?: string;
  syncedFrom?: 'Shopify' | 'WooCommerce' | 'CSV' | 'Manual';
}

export interface RuleRequirement {
  id: string;
  field: keyof UniversalProduct | 'custom';
  description: string;
  remediationHint: string;
}

export interface Rule {
  id: string;
  version: string;
  title: string;
  countryCode: string;
  category: string;
  severity: 'BLOCKING' | 'WARNING' | 'INFO';
  conditionSummary: string;
  requirementText: string;
  legalReference: string;
  sourceUrl: string;
  effectiveDate: string;
  expirationDate?: string;
  status: 'active' | 'deprecated' | 'draft';
  evaluator: (product: UniversalProduct) => {
    passed: boolean;
    issueDetails?: string;
    actionRequired?: string;
    missingField?: string;
  };
}

export interface RuleEvaluationResult {
  ruleId: string;
  ruleTitle: string;
  version: string;
  severity: 'BLOCKING' | 'WARNING' | 'INFO';
  passed: boolean;
  legalReference: string;
  sourceUrl: string;
  issueDetails?: string;
  actionRequired?: string;
  missingField?: string;
}

export interface MarketComplianceSummary {
  marketCode: string;
  marketName: string;
  flag: string;
  status: ComplianceStatus;
  score: number; // 0 - 100%
  passedCount: number;
  warningCount: number;
  blockingCount: number;
  evaluations: RuleEvaluationResult[];
}

export interface ProductComplianceReport {
  productId: string;
  productName: string;
  overallStatus: ComplianceStatus;
  marketSummaries: Record<string, MarketComplianceSummary>;
  evaluatedAt: string;
}

export interface ComplianceDocument {
  id: string;
  documentType: 'compliance_report' | 'product_declaration' | 'japanese_label_dossier' | 'anvisa_import_dossier' | 'fda_summary';
  title: string;
  countryCode: string;
  productId: string;
  productName: string;
  status: 'Ready' | 'Draft' | 'Expired';
  generatedAt: string;
  downloadUrl?: string;
  contentMarkdown: string;
}

export interface RegulatoryAlert {
  id: string;
  title: string;
  countryCode: string;
  countryFlag: string;
  category: string;
  date: string;
  severity: 'high' | 'medium' | 'low';
  description: string;
  affectedProductsCount: number;
  status: 'Unresolved' | 'Acknowledged' | 'Resolved';
}

export interface CustomerTenant {
  id: string;
  companyName: string;
  ownerEmail: string;
  plan: 'Starter' | 'Growth' | 'Business';
  productsCount: number;
  marketsCount: number;
  status: 'Active' | 'Trial' | 'Suspended';
  createdAt: string;
  mrr: number;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  category: 'Rule Edit' | 'Compliance Check' | 'Document Generated' | 'Integration Sync' | 'System Config';
  details: string;
  ipAddress: string;
}
