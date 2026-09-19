import {
  UniversalProduct,
  Rule,
  MarketComplianceSummary,
  ProductComplianceReport,
  ComplianceStatus
} from '../types';
import { MOCK_RULES, MOCK_MARKETS } from '../data/mockData';

export function evaluateProductCompliance(
  product: UniversalProduct,
  customRules: Rule[] = MOCK_RULES
): ProductComplianceReport {
  const marketSummaries: Record<string, MarketComplianceSummary> = {};
  let overallBlocking = 0;
  let overallWarning = 0;

  product.targetMarkets.forEach((marketCode) => {
    const marketInfo = MOCK_MARKETS.find((m) => m.code === marketCode) || {
      name: marketCode,
      flag: '🌐'
    };

    // Filter rules applicable to this market & product category (or general)
    const applicableRules = customRules.filter(
      (r) =>
        r.status === 'active' &&
        r.countryCode === marketCode &&
        (r.category === product.category || r.category === 'All')
    );

    let passedCount = 0;
    let warningCount = 0;
    let blockingCount = 0;

    const evaluations = applicableRules.map((rule) => {
      const result = rule.evaluator(product);
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
        legalReference: rule.legalReference,
        sourceUrl: rule.sourceUrl,
        issueDetails: result.issueDetails,
        actionRequired: result.actionRequired,
        missingField: result.missingField
      };
    });

    const total = applicableRules.length;
    // Calculate score
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
  });

  let overallStatus: ComplianceStatus = 'READY';
  if (overallBlocking > 0) {
    overallStatus = 'BLOCKED';
  } else if (overallWarning > 0) {
    overallStatus = 'ACTION_REQUIRED';
  }

  return {
    productId: product.id,
    productName: product.name,
    overallStatus,
    marketSummaries,
    evaluatedAt: new Date().toISOString()
  };
}

export function evaluateAllProducts(
  products: UniversalProduct[],
  rules: Rule[] = MOCK_RULES
): Record<string, ProductComplianceReport> {
  const reports: Record<string, ProductComplianceReport> = {};
  products.forEach((p) => {
    reports[p.id] = evaluateProductCompliance(p, rules);
  });
  return reports;
}
