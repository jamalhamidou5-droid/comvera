import React from 'react';
import {
  Users,
  CreditCard,
  FileText,
  Activity,
  CheckCircle2,
  Database,
  ShieldCheck,
  Server
} from 'lucide-react';
import { MOCK_CUSTOMERS } from '../../data/mockData';

export const AdminDashboard: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <div className="badge badge-info" style={{ marginBottom: '0.5rem' }}>CREATOR ADMIN PORTAL</div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Platform Global Overview</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Statistiques réseau SaaS Comvera, volumétrie d'analyses et santé de l'infrastructure.
        </p>
      </div>

      {/* 5 Key Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem' }}>
        <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>CUSTOMERS</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800 }}>2,481</div>
          <div style={{ fontSize: '0.7rem', color: '#34d399' }}>+12% this month</div>
        </div>

        <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>ACTIVE SUBSCRIPTIONS</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800 }}>1,932</div>
          <div style={{ fontSize: '0.7rem', color: '#34d399' }}>77.8% conversion</div>
        </div>

        <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>COMPLIANCE CHECKS</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800 }}>842,391</div>
          <div style={{ fontSize: '0.7rem', color: 'var(--accent-blue)' }}>Deterministic engine</div>
        </div>

        <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>DOCUMENTS GENERATED</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800 }}>128,492</div>
          <div style={{ fontSize: '0.7rem', color: '#8b5cf6' }}>Customs dossiers</div>
        </div>

        <div className="glass-panel glass-glow" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', border: '1px solid var(--accent-blue)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>MONTHLY RECURRING REV (MRR)</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#34d399' }}>248,500€</div>
          <div style={{ fontSize: '0.7rem', color: '#34d399' }}>ARR: ~2.98M€</div>
        </div>
      </div>

      {/* Infrastructure & Customers Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1.5rem' }}>
        {/* Customer Organizations */}
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Recent Merchant Organizations</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Plan</th>
                <th>Products</th>
                <th>Markets</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_CUSTOMERS.map((c) => (
                <tr key={c.id}>
                  <td>
                    <div style={{ fontWeight: 600 }}>{c.companyName}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{c.ownerEmail}</div>
                  </td>
                  <td><span className="badge badge-info">{c.plan}</span></td>
                  <td>{c.productsCount}</td>
                  <td>{c.marketsCount}</td>
                  <td><span className="badge badge-ready">{c.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* System Health Matrix */}
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Server size={18} color="#34d399" /> System Health Status
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {[
              { name: 'Core API Gateway', status: 'Operational', latency: '24ms' },
              { name: 'Shopify OAuth & Sync Worker', status: 'Operational', latency: '48ms' },
              { name: 'WooCommerce Connector', status: 'Operational', latency: '62ms' },
              { name: 'Deterministic Rules Engine v2.4', status: 'Operational', latency: '12ms' },
              { name: 'PDF Dossier Document Engine', status: 'Operational', latency: '110ms' }
            ].map((sys, idx) => (
              <div
                key={idx}
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  background: 'rgba(255,255,255,0.03)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '0.85rem'
                }}
              >
                <div style={{ fontWeight: 500 }}>{sys.name}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{sys.latency}</span>
                  <span className="badge badge-ready" style={{ fontSize: '0.7rem' }}>
                    <CheckCircle2 size={10} /> {sys.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
