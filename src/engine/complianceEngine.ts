import {
  UniversalProduct,
  Rule,
  MarketComplianceSummary,
  ProductComplianceReport,
  ComplianceStatus
} from '../types';
import { supabase } from '../lib/supabase';


// Registre des fonctions d'évaluation (la logique métier reste dans le code)
const evaluatorRegistry: Record<string, (product: UniversalProduct) => { passed: boolean; issueDetails?: string; actionRequired?: string; missingField?: string }> = {
  'EU-ING-001': (product) => {
    const banned = ['Lilial', 'Lyral', 'PFAS'];
    const found = product.ingredients.filter(i => banned.includes(i));
    if (found.length > 0) return { passed: false, issueDetails: `Contains banned ingredients: ${found.join(', ')}`, actionRequired: 'Reformulate product to remove banned substances.' };
    return { passed: true };
  },
  'US-FDA-001': (product) => {
    if (!product.hasProductRegistration?.US) return { passed: false, missingField: 'hasProductRegistration.US', issueDetails: 'No FDA MoCRA registration on file.', actionRequired: 'Register product facility and listing via FDA Cosmetics Direct.' };
    return { passed: true };
  },
  'US-COL-001': (product) => {
    const hasColorants = product.ingredients.some(i => i.toLowerCase().includes('ci ') || i.toLowerCase().includes('lake'));
    if (hasColorants && !product.certifications.includes('FDA Batch Certified Colorants')) return { passed: false, issueDetails: 'Contains colorants without FDA batch certification record.', actionRequired: 'Ensure all color additives are FDA batch-certified.' };
    return { passed: true };
  },
  'JP-MHLW-001': (product) => {
    if (!product.hasLocalImporterRecord?.JP) return { passed: false, missingField: 'hasLocalImporterRecord.JP', issueDetails: 'No Marketing Authorization Holder (MAH) recorded for Japan.', actionRequired: 'Appoint a Japanese MAH and submit import notification.' };
    return { passed: true };
  },
  'JP-LBL-001': (product) => {
    if (!product.languageLabels?.ja) return { passed: false, missingField: 'languageLabels.ja', issueDetails: 'Japanese language label missing.', actionRequired: 'Create compliant Japanese label with MAH details.' };
    return { passed: true };
  },
  'BR-ANVISA-001': (product) => {
    if (!product.hasProductRegistration?.BR) return { passed: false, missingField: 'hasProductRegistration.BR', issueDetails: 'ANVISA registration/notification missing.', actionRequired: 'Submit product notification to ANVISA via local representative.' };
    return { passed: true };
  },
  'UAE-MOIAT-001': (product) => {
    if (!product.certifications.includes('ECAS')) return { passed: false, issueDetails: 'ECAS certification not found on product record.', actionRequired: 'Obtain ECAS certification for cosmetics from MoIAT.' };
    return { passed: true };
  },
  'SA-SFDA-001': (product) => {
    if (!product.hasProductRegistration?.SA) return { passed: false, issueDetails: 'Not registered in eCosma.', actionRequired: 'Register product in SFDA eCosma system.' };
    return { passed: true };
  },
  'ZA-NRCS-001': (product) => {
    if (!product.hasProductRegistration?.ZA) return { passed: false, issueDetails: 'NRCS Homologation missing.', actionRequired: 'Apply for NRCS homologation.' };
    return { passed: true };
  },
  'CM-ANOR-001': (product) => {
    if (!product.certifications.includes('ANOR')) return { passed: false, issueDetails: 'ANOR certificate missing.', actionRequired: 'Obtain Certificate of Conformity from ANOR.' };
    return { passed: true };
  },
  'GB-OPSS-001': (product) => {
    if (!product.hasProductRegistration?.GB) return { passed: false, issueDetails: 'SCPN notification missing.', actionRequired: 'Submit notification to UK Submit Cosmetic Product Notification portal.' };
    return { passed: true };
  },
  'IN-CDSCO-001': (product) => {
    if (!product.hasProductRegistration?.IN) return { passed: false, issueDetails: 'CDSCO registration missing.', actionRequired: 'Apply for cosmetics import registration with CDSCO.' };
    return { passed: true };
  }
};

export async function evaluateProductCompliance(
  product: UniversalProduct,
  organizationId: string
): Promise<ProductComplianceReport> {
  const marketSummaries: Record<string, MarketComplianceSummary> = {};
  let overallBlocking = 0;
  let overallWarning = 0;

  // 1. Fetch active rules from Supabase
  const { data: dbRules, error } = await supabase
    .from('rules')
    .select('*')
    .eq('status', 'active');

  const activeRules = dbRules || [];

  // 2. Fetch markets from Supabase
  const { data: dbMarkets } = await supabase.from('markets').select('*');
  
  if (!dbMarkets || dbMarkets.length === 0) {
    throw new Error('No markets configured in the database.');
  }
  const availableMarkets = dbMarkets;

  for (const marketCode of product.targetMarkets) {
    const marketInfo = availableMarkets.find((m: any) => m.code === marketCode) || {
      name: marketCode,
      flag: '🌐'
    };

    // Filter rules applicable to this market & product category
    const applicableRules = activeRules.filter(
      (r) =>
        r.country_code === marketCode &&
        (r.category === product.category || r.category === 'All')
    );

    let passedCount = 0;
    let warningCount = 0;
    let blockingCount = 0;

    const evaluations = applicableRules.map((rule) => {
      const evaluator = evaluatorRegistry[rule.id];
      if (!evaluator) {
        if (rule.severity === 'BLOCKING') {
          blockingCount++;
          overallBlocking++;
        } else {
          warningCount++;
          overallWarning++;
        }
        return {
          ruleId: rule.id,
          ruleTitle: rule.title,
          version: rule.version,
          severity: rule.severity,
          passed: false,
          legalReference: rule.legal_reference,
          sourceUrl: rule.source_url,
          issueDetails: 'This rule has no evaluator implemented in the compliance engine.',
          actionRequired: 'Implement and validate the evaluator before activating this rule.'
        };
      }

      const result = evaluator(product);
      
      if (result.passed) {
        passedCount++;
      } else {
        if (rule.severity === 'BLOCKING') {
          blockingCount++;
          overallBlocking++;
        } else {
          warningCount++;
          overallWarning++;
        }
      }

      return {
        ruleId: rule.id,
        ruleTitle: rule.title,
        version: rule.version,
        severity: rule.severity,
        passed: result.passed,
        legalReference: rule.legal_reference,
        sourceUrl: rule.source_url,
        issueDetails: result.issueDetails,
        actionRequired: result.actionRequired,
        missingField: result.missingField
      };
    });

    const total = applicableRules.length;
    const score = total > 0 ? Math.round((passedCount / total) * 100) : 100;

    let status: ComplianceStatus = 'READY';
    if (blockingCount > 0) {
      status = 'BLOCKED';
    } else if (warningCount > 0) {
      status = 'ACTION_REQUIRED';
    }

    marketSummaries[marketCode] = {
      marketCode,
      marketName: marketInfo.name,
      flag: marketInfo.flag,
      status,
      score,
      passedCount,
      warningCount,
      blockingCount,
      evaluations
    };
  }

  let overallStatus: ComplianceStatus = 'READY';
  if (overallBlocking > 0) {
    overallStatus = 'BLOCKED';
  } else if (overallWarning > 0) {
    overallStatus = 'ACTION_REQUIRED';
  }

  let insertedCheckId: string | undefined = undefined;

  const totalEvaluations = Object.values(marketSummaries)
    .reduce((sum, market) => sum + market.evaluations.length, 0);

  const failedEvaluations = Object.values(marketSummaries)
    .reduce(
      (sum, market) => sum + market.blockingCount + market.warningCount,
      0
    );

  const riskScore = totalEvaluations > 0
    ? Math.min(100, Math.round((failedEvaluations / totalEvaluations) * 100))
    : 0;

  // 3. Save report to Supabase (compliance_checks and check_results)
  try {
    // Upsert or Insert compliance_check
    const { data: checkData, error: checkError } = await supabase
      .from('compliance_checks')
      .insert([{
        organization_id: organizationId,
        product_id: product.id,
        status: 'COMPLETED',
        risk_score: riskScore,
        risk_level: overallStatus === 'BLOCKED' ? 'HIGH' : overallStatus === 'ACTION_REQUIRED' ? 'MEDIUM' : 'LOW',
        decision: overallStatus === 'READY' ? 'APPROVED' : 'REVIEW'
      }])
      .select()
      .single();

    if (checkData && !checkError) {
      insertedCheckId = checkData.id;
      // Insert check results
      const resultsToInsert = [];
      for (const market of Object.values(marketSummaries)) {
        for (const evalResult of market.evaluations) {
          resultsToInsert.push({
            check_id: checkData.id,
            rule_id: evalResult.ruleId,
            rule_title: evalResult.ruleTitle,
            severity: evalResult.severity,
            passed: evalResult.passed,
            issue_details: evalResult.issueDetails,
            action_required: evalResult.actionRequired
          });
        }
      }
      
      if (resultsToInsert.length > 0) {
        await supabase.from('check_results').insert(resultsToInsert);
      }
    }
  } catch (e) {
    console.error('Failed to save compliance check to DB', e);
  }

  return {
    productId: product.id,
    productName: product.name,
    overallStatus,
    overallScore: riskScore,
    checkId: insertedCheckId,
    marketSummaries,
    evaluatedAt: new Date().toISOString()
  };
}

export async function evaluateAllProducts(
  products: UniversalProduct[],
  organizationId: string
): Promise<Record<string, ProductComplianceReport>> {
  const reports: Record<string, ProductComplianceReport> = {};
  for (const p of products) {
    reports[p.id] = await evaluateProductCompliance(p, organizationId);
  }
  return reports;
}
