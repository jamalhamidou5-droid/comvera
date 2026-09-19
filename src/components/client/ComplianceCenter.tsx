import React, { useState } from 'react';
import { AlertTriangle, XCircle, CheckCircle2, Wrench, Filter, Search } from 'lucide-react';
import { UniversalProduct, ProductComplianceReport } from '../../types';

interface ComplianceCenterProps {
  products: UniversalProduct[];
  reports: Record<string, ProductComplianceReport>;
  onSelectProduct: (product: UniversalProduct) => void;
}

export const ComplianceCenter: React.FC<ComplianceCenterProps> = ({
  products,
  reports,
  onSelectProduct
}) => {
  const [filterStatus, setFilterStatus] = useState<'All' | 'ACTION_REQUIRED' | 'BLOCKED'>('All');

  // Flatten all issues across products and markets
  const allIssues: Array<{
    product: UniversalProduct;
    marketCode: string;
    ruleTitle: string;
    severity: 'BLOCKING' | 'WARNING' | 'INFO';
    issueDetails?: string;
    actionRequired?: string;
  }> = [];

  products.forEach((p) => {
    const report = reports[p.id];
    if (report) {
      Object.entries(report.marketSummaries).forEach(([mCode, summary]) => {
        summary.evaluations.forEach((evalItem) => {
          if (!evalItem.passed) {
            allIssues.push({
              product: p,
              marketCode: mCode,
              ruleTitle: evalItem.ruleTitle,
              severity: evalItem.severity,
              issueDetails: evalItem.issueDetails,
              actionRequired: evalItem.actionRequired
            });
          }
        });
      });
    }
  });

  const filteredIssues = allIssues.filter((issue) => {
    if (filterStatus === 'BLOCKED') return issue.severity === 'BLOCKING';
    if (filterStatus === 'ACTION_REQUIRED') return issue.severity === 'WARNING';
    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Compliance Action Center</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Matrice centrale des non-conformités et exigences nécessitant votre intervention.
        </p>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <button
          className={`btn ${filterStatus === 'All' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
          onClick={() => setFilterStatus('All')}
        >
          All Issues ({allIssues.length})
        </button>
        <button
          className={`btn ${filterStatus === 'BLOCKED' ? 'btn-danger' : 'btn-secondary'} btn-sm`}
          onClick={() => setFilterStatus('BLOCKED')}
        >
          <XCircle size={14} /> Blocked Customs Items
        </button>
        <button
          className={`btn ${filterStatus === 'ACTION_REQUIRED' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
          onClick={() => setFilterStatus('ACTION_REQUIRED')}
        >
          <AlertTriangle size={14} /> Info Required
        </button>
      </div>

      {/* Matrix Table */}
      <div className="glass-panel table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Market</th>
              <th>Requirement / Rule</th>
              <th>Severity</th>
              <th>Action Needed</th>
              <th style={{ textAlign: 'right' }}>Resolution</th>
            </tr>
          </thead>
          <tbody>
            {filteredIssues.map((item, idx) => (
              <tr key={idx}>
                <td>
                  <span style={{ fontWeight: 600 }}>{item.product.name}</span>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{item.product.sku}</div>
                </td>
                <td>
                  <span style={{ fontSize: '1.1rem' }}>
                    {item.marketCode === 'JP' ? '🇯🇵 Japan' : item.marketCode === 'BR' ? '🇧🇷 Brazil' : '🇺🇸 USA'}
                  </span>
                </td>
                <td>
                  <span style={{ fontWeight: 500, fontSize: '0.85rem' }}>{item.ruleTitle}</span>
                </td>
                <td>
                  {item.severity === 'BLOCKING' ? (
                    <span className="badge badge-blocked">
                      <XCircle size={12} /> Blocking
                    </span>
                  ) : (
                    <span className="badge badge-action">
                      <AlertTriangle size={12} /> Warning
                    </span>
                  )}
                </td>
                <td>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.actionRequired}</span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => onSelectProduct(item.product)}
                  >
                    <Wrench size={14} /> Fix Issue
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
