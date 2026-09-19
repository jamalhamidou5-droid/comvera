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
import { MOCK_MARKETS, MOCK_ALERTS } from '../../data/mockData';
import { ProductComplianceReport, ClientTab } from '../../types';

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
  const totalProducts = 1248; // Total items in store
  const analyzedProducts = Object.values(reports);

  // Compute breakdown stats
  let compliantCount = 936;
  let reviewCount = 184;
  let nonCompliantCount = 128;

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
            <span>COMPLIANT</span>
            <CheckCircle2 size={16} />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#34d399' }}>{compliantCount}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Prêts pour l'export immédiat</div>
        </div>

        <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fbbf24', fontSize: '0.8rem', fontWeight: 500 }}>
            <span>NEEDS REVIEW</span>
            <AlertTriangle size={16} />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#fbbf24' }}>{reviewCount}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>184 exigences requièrent attention</div>
        </div>

        <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#f43f5e', fontSize: '0.8rem', fontWeight: 500 }}>
            <span>NON-COMPLIANT</span>
            <XCircle size={16} />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#f43f5e' }}>{nonCompliantCount}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Bloqués pour dossier manquant</div>
        </div>
      </div>

      {/* Middle Grid: Market Breakdown + Recent Alerts */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '1.5rem' }}>
        {/* Compliance By Market */}
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Globe2 size={18} color="var(--accent-blue)" /> Compliance by Market
            </h3>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setClientTab('markets')}
            >
              Voir tous les marchés
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {MOCK_MARKETS.map((market) => (
              <div key={market.code} style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                  <span style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '1.2rem' }}>{market.flag}</span> {market.name}
                  </span>
                  <span style={{ fontWeight: 700 }}>{market.readinessPercentage}%</span>
                </div>
                <div style={{ height: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '999px', overflow: 'hidden' }}>
                  <div
                    style={{
                      width: `${market.readinessPercentage}%`,
                      height: '100%',
                      background:
                        market.readinessPercentage >= 90
                          ? '#10b981'
                          : market.readinessPercentage >= 75
                          ? '#f59e0b'
                          : '#f43f5e',
                      borderRadius: '999px',
                      transition: 'width 0.5s ease'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
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
