import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { LayoutDashboard, Users, ShieldAlert, Package, CheckSquare } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    organizations: 0,
    checks: 0,
    products: 0,
    auditLogs: 0
  });

  useEffect(() => {
    const loadStats = async () => {
      const [
        organizations,
        checks,
        products,
        auditLogs
      ] = await Promise.all([
        supabase
          .from('organizations')
          .select('*', { count: 'exact', head: true }),

        supabase
          .from('compliance_checks')
          .select('*', { count: 'exact', head: true }),

        supabase
          .from('products')
          .select('*', { count: 'exact', head: true }),

        supabase
          .from('audit_logs')
          .select('*', { count: 'exact', head: true })
      ]);

      setStats({
        organizations: organizations.count || 0,
        checks: checks.count || 0,
        products: products.count || 0,
        auditLogs: auditLogs.count || 0
      });
    };

    loadStats();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Platform Administration</h1>
        <p style={{ color: 'var(--text-muted)' }}>Real-time overview of the Comvera platform.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
            <Users size={18} />
            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Organizations</span>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800 }}>{stats.organizations}</div>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
            <Package size={18} />
            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Products</span>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800 }}>{stats.products}</div>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
            <CheckSquare size={18} />
            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Compliance Checks</span>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800 }}>{stats.checks}</div>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
            <ShieldAlert size={18} />
            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Audit Logs</span>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800 }}>{stats.auditLogs}</div>
        </div>
      </div>

      <div className="card" style={{ marginTop: '1rem' }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Monthly Recurring Revenue (MRR)</h2>
        <div style={{ padding: '2rem', background: 'var(--bg-elevated)', borderRadius: '8px', textAlign: 'center', color: 'var(--text-secondary)' }}>
          Billing data not connected
        </div>
      </div>
    </div>
  );
};
