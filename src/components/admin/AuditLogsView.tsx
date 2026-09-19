import React from 'react';
import { ShieldCheck, History, Filter } from 'lucide-react';
import { MOCK_AUDIT_LOGS } from '../../data/mockData';

export const AuditLogsView: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Immutable Compliance Audit Logs</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Journal d'audit légal traçant l'ensemble des règles modifiées, analyses exécutées et documents générés.
        </p>
      </div>

      <div className="glass-panel table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Timestamp (UTC)</th>
              <th>Category</th>
              <th>User</th>
              <th>Action</th>
              <th>Details</th>
              <th>IP Address</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_AUDIT_LOGS.map((log) => (
              <tr key={log.id}>
                <td>
                  <code style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                    {new Date(log.timestamp).toLocaleString()}
                  </code>
                </td>
                <td>
                  <span className="badge badge-info">{log.category}</span>
                </td>
                <td>
                  <span style={{ fontWeight: 500, fontSize: '0.85rem' }}>{log.user}</span>
                </td>
                <td>
                  <span style={{ fontWeight: 600 }}>{log.action}</span>
                </td>
                <td>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{log.details}</span>
                </td>
                <td>
                  <code style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{log.ipAddress}</code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
