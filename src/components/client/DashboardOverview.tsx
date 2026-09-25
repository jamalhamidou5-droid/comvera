import React from 'react';
import {
  Package,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  TrendingUp,
  Globe2,
  Bell,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { MOCK_ALERTS } from '../../data/mockData';
import { ProductComplianceReport, ClientTab } from '../../types';

const RECENT_CHECKS = [
  { id: '1', company: 'ABC Ltd', country: 'Ghana', flag: '🇬🇭', risk: 'Low', status: 'Cleared' },
  { id: '2', company: 'XYZ Corp', country: 'Turkey', flag: '🇹🇷', risk: 'Medium', status: 'Review' },
  { id: '3', company: 'DEF Ltd', country: 'China', flag: '🇨🇳', risk: 'High', status: 'Blocked' },
];

interface DashboardOverviewProps {
  reports: Record<string, ProductComplianceReport>;
  setClientTab: (tab: ClientTab) => void;
  onSelectProduct: (id: string) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  reports,
  setClientTab,
  onSelectProduct
}) => {
  // KPI Stats
  const totalProducts = 1284;
  const reviewCount = 23;
  const highRiskCount = 7;
  const reportsGenerated = 156;
  const countriesCount = 32;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Welcome Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Good morning, Acme Store</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Aperçu de la conformité réglementaire mondiale de votre catalogue.
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => setClientTab('products')}>
          <Package size={16} /> Gérer les produits
        </button>
      </div>

      {/* 4 KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }}>
        <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 500 }}>
            <span>TOTAL PRODUCTS</span>
            <Package size={16} color="var(--accent-blue)" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800 }}>{totalProducts.toLocaleString()}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Synchronisés via Shopify</div>
        </div>

        <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#34d399', fontSize: '0.8rem', fontWeight: 500 }}>
            <span>CHECKS USED THIS MONTH</span>
            <CheckCircle2 size={16} />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#34d399' }}>7 <span style={{fontSize: '1rem', color: 'var(--text-dim)'}}>/ 10</span></div>
          <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '999px', overflow: 'hidden' }}>
            <div style={{ width: '70%', height: '100%', background: '#34d399' }} />
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Free Plan - Upgrade to unlock more</div>
        </div>

        <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fbbf24', fontSize: '0.8rem', fontWeight: 500 }}>
            <span>UNDER REVIEW</span>
            <AlertTriangle size={16} />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#fbbf24' }}>{reviewCount}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Vérification manuelle requise</div>
        </div>

        <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#f43f5e', fontSize: '0.8rem', fontWeight: 500 }}>
            <span>HIGH-RISK</span>
            <XCircle size={16} />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#f43f5e' }}>{highRiskCount}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Bloquées (Sanctions)</div>
        </div>

        <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--accent-blue)', fontSize: '0.8rem', fontWeight: 500 }}>
            <span>REPORTS / COUNTRIES</span>
            <Globe2 size={16} />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-blue)' }}>{reportsGenerated}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Générés pour {countriesCount} pays</div>
        </div>
      </div>

      {/* Middle Grid: Market Breakdown + Recent Alerts */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '1.5rem' }}>
        {/* Recent Checks Table */}
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldAlert size={18} color="var(--accent-purple)" /> Recent Screenings
            </h3>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setClientTab('screening')}
            >
              New Screening
            </button>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-dim)', textAlign: 'left' }}>
                <th style={{ paddingBottom: '0.75rem', fontWeight: 500 }}>Company</th>
                <th style={{ paddingBottom: '0.75rem', fontWeight: 500 }}>Country</th>
                <th style={{ paddingBottom: '0.75rem', fontWeight: 500 }}>Risk</th>
                <th style={{ paddingBottom: '0.75rem', fontWeight: 500, textAlign: 'right' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {RECENT_CHECKS.map((check) => (
                <tr key={check.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '0.85rem 0', fontWeight: 600 }}>{check.company}</td>
                  <td style={{ padding: '0.85rem 0' }}><span style={{ marginRight: '0.4rem' }}>{check.flag}</span>{check.country}</td>
                  <td style={{ padding: '0.85rem 0' }}>
                    <span style={{ 
                      color: check.risk === 'Low' ? '#34d399' : check.risk === 'Medium' ? '#fbbf24' : '#fb7185',
                      background: check.risk === 'Low' ? 'rgba(16, 185, 129, 0.1)' : check.risk === 'Medium' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(244, 63, 94, 0.1)',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      fontWeight: 600
                    }}>
                      {check.risk === 'Low' ? '🟢 Low' : check.risk === 'Medium' ? '🟠 Medium' : '🔴 High'}
                    </span>
                  </td>
                  <td style={{ padding: '0.85rem 0', textAlign: 'right', color: 'var(--text-muted)' }}>{check.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recent Alerts Feed */}
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Bell size={18} color="var(--accent-amber)" /> Recent Alerts
            </h3>
            <button className="btn btn-secondary btn-sm" onClick={() => setClientTab('alerts')}>
              Voir tout ({MOCK_ALERTS.length})
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {MOCK_ALERTS.map((alert) => (
              <div
                key={alert.id}
                style={{
                  padding: '0.9rem',
                  borderRadius: '8px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.35rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span>{alert.countryFlag}</span> {alert.title}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>{alert.date}</span>
                </div>
                <p style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>{alert.description}</p>
                <button
                  className="btn btn-secondary btn-sm"
                  style={{ width: 'fit-content', marginTop: '0.2rem', padding: '0.2rem 0.5rem', fontSize: '0.7rem' }}
                  onClick={() => setClientTab('compliance')}
                >
                  Review products ({alert.affectedProductsCount})
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
