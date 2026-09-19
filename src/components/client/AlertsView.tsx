import React from 'react';
import { BellRing, ShieldAlert, CheckCircle2, ArrowRight } from 'lucide-react';
import { MOCK_ALERTS } from '../../data/mockData';
import { ClientTab } from '../../types';

interface AlertsViewProps {
  setClientTab: (tab: ClientTab) => void;
}

export const AlertsView: React.FC<AlertsViewProps> = ({ setClientTab }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Regulatory Alerts & Monitoring</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Surveillance en temps réel des évolutions réglementaires susceptibles d'impacter vos produits en vente.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {MOCK_ALERTS.map((alert) => (
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
                <span style={{ fontSize: '1.4rem' }}>{alert.countryFlag}</span>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{alert.title}</h3>
                <span className="badge badge-action">{alert.severity} priority</span>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{alert.description}</p>
              <div style={{ fontSize: '0.775rem', color: 'var(--text-dim)', marginTop: '0.2rem' }}>
                Category: <strong>{alert.category}</strong> • Date: {alert.date}
              </div>
            </div>

            <button
              className="btn btn-primary btn-sm"
              onClick={() => setClientTab('products')}
            >
              Review Affected Products ({alert.affectedProductsCount}) <ArrowRight size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
