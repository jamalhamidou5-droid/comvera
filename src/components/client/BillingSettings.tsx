import React, { useState } from 'react';
import { CreditCard, Users, Shield, Zap, CheckCircle2, UserPlus } from 'lucide-react';

export const BillingSettings: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'billing' | 'team'>('billing');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Settings & Subscription</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Gérez votre forfait Growth, votre consommation mensuelle et les membres de votre équipe.
        </p>
      </div>

      {/* Sub tabs */}
      <div style={{ display: 'flex', gap: '0.75rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
        <button
          className={`btn ${activeSubTab === 'billing' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
          onClick={() => setActiveSubTab('billing')}
        >
          <CreditCard size={14} /> Subscription & Billing
        </button>
        <button
          className={`btn ${activeSubTab === 'team' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
          onClick={() => setActiveSubTab('team')}
        >
          <Users size={14} /> Team & Permissions
        </button>
      </div>

      {activeSubTab === 'billing' ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          {/* Current Plan Box */}
          <div className="glass-panel glass-glow" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>CURRENT PLAN</span>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-blue)' }}>Growth Plan</h3>
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800 }}>149€ <span style={{ fontSize: '0.85rem', fontWeight: 400, color: 'var(--text-muted)' }}>/ month</span></div>
            </div>

            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.85rem' }}>
              Prochain renouvellement : <strong>19 Octobre 2026</strong> via Stripe (VISA •••• 4242)
            </div>

            <button className="btn btn-primary" style={{ marginTop: 'auto' }}>
              <Zap size={16} /> Upgrade Plan to Business
            </button>
          </div>

          {/* Usage Gauges */}
          <div className="glass-panel" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Monthly Quota Usage</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                  <span>Products Ingested</span>
                  <strong>1,248 / 2,000</strong>
                </div>
                <div style={{ height: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '999px', overflow: 'hidden' }}>
                  <div style={{ width: '62%', height: '100%', background: 'var(--accent-blue)', borderRadius: '999px' }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                  <span>Target Markets Enabled</span>
                  <strong>4 / 10</strong>
                </div>
                <div style={{ height: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '999px', overflow: 'hidden' }}>
                  <div style={{ width: '40%', height: '100%', background: '#34d399', borderRadius: '999px' }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                  <span>Compliance Checks Executed</span>
                  <strong>1,283 / 5,000</strong>
                </div>
                <div style={{ height: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '999px', overflow: 'hidden' }}>
                  <div style={{ width: '25%', height: '100%', background: '#8b5cf6', borderRadius: '999px' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Team Tab */
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Team Members & Roles</h3>
            <button className="btn btn-primary btn-sm">
              <UserPlus size={14} /> Invite Member
            </button>
          </div>

          <table className="data-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div style={{ fontWeight: 600 }}>Alexandre (Owner)</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>admin@company.com</div>
                </td>
                <td><span className="badge badge-info">Owner</span></td>
                <td><span className="badge badge-ready">Active</span></td>
              </tr>
              <tr>
                <td>
                  <div style={{ fontWeight: 600 }}>Claire Dupuis</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>manager@company.com</div>
                </td>
                <td><span className="badge badge-info">Compliance Manager</span></td>
                <td><span className="badge badge-ready">Active</span></td>
              </tr>
              <tr>
                <td>
                  <div style={{ fontWeight: 600 }}>Thomas Laurent</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>employee@company.com</div>
                </td>
                <td><span className="badge badge-info">Viewer</span></td>
                <td><span className="badge badge-ready">Active</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
