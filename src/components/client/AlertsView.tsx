import React, { useState, useEffect } from 'react';
import { BellRing, ShieldAlert, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';
import { ClientTab } from '../../types';
import { supabase } from '../../lib/supabase';

interface AlertsViewProps {
  setClientTab: (tab: ClientTab) => void;
}

export const AlertsView: React.FC<AlertsViewProps> = ({ setClientTab }) => {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlerts = async () => {
      const { data } = await supabase.from('regulatory_alerts').select('*').order('created_at', { ascending: false });
      if (data) setAlerts(data);
      setLoading(false);
    };
    fetchAlerts();
  }, []);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Regulatory Alerts & Monitoring</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Surveillance en temps réel des évolutions réglementaires susceptibles d'impacter vos produits en vente.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {loading ? <Loader2 size={24} className="animate-spin" style={{ margin: '2rem auto' }} /> : null}
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="glass-panel"
            style={{
              padding: '1.5rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderLeft: `4px solid ${alert.severity === 'high' ? '#f43f5e' : alert.severity === 'medium' ? '#f59e0b' : '#3b82f6'}`
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span style={{ fontSize: '1.4rem' }}>{alert.country_flag}</span>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{alert.title}</h3>
                <span className="badge badge-action">{alert.severity} priority</span>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{alert.description}</p>
              <div style={{ fontSize: '0.775rem', color: 'var(--text-dim)', marginTop: '0.2rem' }}>
                Category: <strong>{alert.category}</strong> • Date: {new Date(alert.created_at).toLocaleDateString()}
              </div>
            </div>

            <button
              className="btn btn-primary btn-sm"
              onClick={() => setClientTab('products')}
            >
              Review Affected Products ({alert.affected_products_count}) <ArrowRight size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
