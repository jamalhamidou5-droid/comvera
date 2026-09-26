import React, { useState, useEffect } from 'react';
import {
  Package,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  TrendingUp,
  Globe2,
  Bell,
  ArrowRight,
  ShieldAlert,
  Loader2
} from 'lucide-react';
import { MOCK_ALERTS } from '../../data/mockData';
import { ProductComplianceReport, ClientTab } from '../../types';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';

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
  const { organizationId } = useAuth();
  
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProducts: 0,
    reviewCount: 0,
    highRiskCount: 0,
    reportsGenerated: 0
  });
  const [recentChecks, setRecentChecks] = useState<any[]>([]);

  useEffect(() => {
    if (!organizationId) return;

    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // 1. Fetch total products
        const { count: prodCount } = await supabase
          .from('products')
          .select('*', { count: 'exact', head: true })
          .eq('organization_id', organizationId);

        // 2. Fetch compliance checks for stats
        const { data: checks } = await supabase
          .from('compliance_checks')
          .select('*, products(name)')
          .eq('organization_id', organizationId)
          .order('created_at', { ascending: false });

        if (checks) {
          const review = checks.filter(c => c.risk_level === 'MEDIUM').length;
          const highRisk = checks.filter(c => c.risk_level === 'HIGH' || c.risk_level === 'CRITICAL').length;
          
          setStats({
            totalProducts: prodCount || 0,
            reviewCount: review,
            highRiskCount: highRisk,
            reportsGenerated: checks.length
          });

          // Take top 5 for recent screenings table
          const formattedChecks = checks.slice(0, 5).map(c => ({
            id: c.id,
            company: c.products?.name || 'Unknown Product',
            country: 'Global', // You could extract from results
            flag: '🌐',
            risk: c.risk_level === 'LOW' ? 'Low' : c.risk_level === 'MEDIUM' ? 'Medium' : 'High',
            status: c.decision
          }));
          setRecentChecks(formattedChecks);
        }
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [organizationId]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Welcome Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Good morning</h1>
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
          <div style={{ fontSize: '2rem', fontWeight: 800 }}>
            {loading ? <Loader2 size={24} className="animate-spin" /> : stats.totalProducts}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Enregistrés dans votre base</div>
        </div>

        <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#34d399', fontSize: '0.8rem', fontWeight: 500 }}>
            <span>CHECKS USED THIS MONTH</span>
            <CheckCircle2 size={16} />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#34d399' }}>
            {loading ? <Loader2 size={24} className="animate-spin" /> : stats.reportsGenerated}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Analyses réglementaires effectuées</div>
        </div>

        <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fbbf24', fontSize: '0.8rem', fontWeight: 500 }}>
            <span>UNDER REVIEW</span>
            <AlertTriangle size={16} />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#fbbf24' }}>
            {loading ? <Loader2 size={24} className="animate-spin" /> : stats.reviewCount}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Vérification manuelle requise</div>
        </div>

        <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#f43f5e', fontSize: '0.8rem', fontWeight: 500 }}>
            <span>HIGH-RISK</span>
            <XCircle size={16} />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#f43f5e' }}>
            {loading ? <Loader2 size={24} className="animate-spin" /> : stats.highRiskCount}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Bloquées ou non conformes</div>
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
                <th style={{ paddingBottom: '0.75rem', fontWeight: 500 }}>Product / Entity</th>
                <th style={{ paddingBottom: '0.75rem', fontWeight: 500 }}>Market</th>
                <th style={{ paddingBottom: '0.75rem', fontWeight: 500 }}>Risk</th>
                <th style={{ paddingBottom: '0.75rem', fontWeight: 500, textAlign: 'right' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentChecks.length === 0 && !loading && (
                <tr>
                  <td colSpan={4} style={{ textAlign: 'center', padding: '1rem', color: 'var(--text-muted)' }}>No screenings yet.</td>
                </tr>
              )}
              {recentChecks.map((check) => (
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
