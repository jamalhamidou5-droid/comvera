import React from 'react';
import { ExternalLink, Plus, Database, CheckCircle2 } from 'lucide-react';
import { MOCK_RULES } from '../../data/mockData';

export const RegulationsManager: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Regulatory Database & Statutory Sources</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Base stratégique des textes de lois, exigences officielles et sources documentées par pays.
          </p>
        </div>
        <button className="btn btn-primary">
          <Plus size={16} /> Add Statutory Regulation
        </button>
      </div>

      <div className="glass-panel table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Country</th>
              <th>Category</th>
              <th>Regulation Title</th>
              <th>Statutory Source / Legal Ref</th>
              <th>Effective Date</th>
              <th>Verification</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_RULES.map((rule) => (
              <tr key={rule.id}>
                <td>
                  <span style={{ fontSize: '1.1rem' }}>
                    {rule.countryCode === 'JP' ? '🇯🇵 Japan' : rule.countryCode === 'BR' ? '🇧🇷 Brazil' : '🇺🇸 USA'}
                  </span>
                </td>
                <td>
                  <span className="badge badge-info">{rule.category}</span>
                </td>
                <td>
                  <div style={{ fontWeight: 600 }}>{rule.title}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>ID: {rule.id} (v{rule.version})</div>
                </td>
                <td>
                  <a
                    href={rule.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{ fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}
                  >
                    {rule.legalReference} <ExternalLink size={12} />
                  </a>
                </td>
                <td>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{rule.effectiveDate}</span>
                </td>
                <td>
                  <span style={{ fontSize: '0.75rem', color: '#34d399', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                    <CheckCircle2 size={12} /> Verified by Legal Team
                  </span>
                </td>
                <td>
                  <span className="badge badge-ready">{rule.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
