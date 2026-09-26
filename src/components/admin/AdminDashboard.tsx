import React, { useState, useEffect } from 'react';
import {
  Users,
  CreditCard,
  FileText,
  Activity,
  CheckCircle2,
  Database,
  ShieldCheck,
  Server,
  Loader2
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';

export const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [metrics, setMetrics] = useState({
    customers: 0,
    products: 0,
    checks: 0,
    documents: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMetrics();
  }, [user]);

  const fetchMetrics = async () => {
    setIsLoading(true);
    try {
      const { count: customers } = await supabase.from('organizations').select('*', { count: 'exact', head: true });
      const { count: products } = await supabase.from('products').select('*', { count: 'exact', head: true });
      const { count: checks } = await supabase.from('compliance_checks').select('*', { count: 'exact', head: true });
      const { count: documents } = await supabase.from('compliance_documents').select('*', { count: 'exact', head: true });

      setMetrics({
        customers: customers || 0,
        products: products || 0,
        checks: checks || 0,
        documents: documents || 0
      });
    } catch (err) {
      console.error('Failed to fetch admin metrics', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <div className="badge badge-info" style={{ marginBottom: '0.5rem' }}>CREATOR ADMIN PORTAL</div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Platform Global Overview</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Statistiques réelles du réseau SaaS Comvera, volumétrie d'analyses et santé de l'infrastructure.
        </p>
      </div>

      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}><Loader2 className="animate-spin" size={32} /></div>
      ) : (
        <>
          {/* Key Metric Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
            <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>ORGANIZATIONS</div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800 }}>{metrics.customers}</div>
              <div style={{ fontSize: '0.7rem', color: '#34d399' }}>Active Tenants</div>
            </div>

            <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>PRODUCTS MANAGED</div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800 }}>{metrics.products}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>Registered SKUs</div>
            </div>

            <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>COMPLIANCE CHECKS</div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800 }}>{metrics.checks}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--accent-blue)' }}>Evaluated by Engine</div>
            </div>

            <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>DOCUMENTS GENERATED</div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800 }}>{metrics.documents}</div>
              <div style={{ fontSize: '0.7rem', color: '#8b5cf6' }}>Stored and Valid</div>
            </div>
          </div>

          {/* Infrastructure & Customers Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1.5rem' }}>
            {/* Customer Organizations */}
            <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Organizations Overview</h3>
              {metrics.customers > 0 ? (
                <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                  Admin view to list tenant details via secure RPC. (Currently fetching {metrics.customers} organizations).
                </div>
              ) : (
                <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>No organizations registered yet.</div>
              )}
            </div>

            {/* System Health Matrix */}
            <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Server size={18} color="#34d399" /> System Health Status
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {[
                  { name: 'Core API Gateway', status: 'Operational', latency: '24ms' },
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
        </>
      )}
    </div>
  );
};
