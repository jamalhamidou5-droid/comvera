import React, { useState, useEffect } from 'react';
import { Globe2, CheckCircle2, AlertTriangle, XCircle, ChevronRight, BookOpen, ShieldCheck, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { MOCK_MARKETS } from '../../data/mockData';

export const MarketsHub: React.FC = () => {
  const [markets, setMarkets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMarketCode, setSelectedMarketCode] = useState<string>('JP');

  useEffect(() => {
    const fetchMarkets = async () => {
      const { data } = await supabase.from('markets').select('*');
      if (data && data.length > 0) {
        // Merge DB markets with Mock metadata (flags, readiness) for UI
        const merged = data.map(dbM => {
          const mockData = MOCK_MARKETS.find(m => m.code === dbM.code) || {};
          return { ...mockData, ...dbM };
        });
        setMarkets(merged);
      } else {
        setMarkets(MOCK_MARKETS);
      }
      setLoading(false);
    };
    fetchMarkets();
  }, []);

  const activeMarket = markets.find((m) => m.code === selectedMarketCode) || markets[0] || {};

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Target Markets Hub</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Consultez l'état de préparation et le catalogue d'exigences réglementaires par pays.
        </p>
      </div>

      {/* Market Cards Grid */}
      {loading ? <Loader2 size={24} className="animate-spin" style={{ margin: '2rem auto' }} /> : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
          {markets.map((m) => {
          const isSelected = selectedMarketCode === m.code;
          return (
            <div
              key={m.code}
              className={`glass-panel ${isSelected ? 'glass-glow' : ''}`}
              style={{
                padding: '1.25rem',
                cursor: 'pointer',
                borderColor: isSelected ? 'var(--accent-blue)' : undefined,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.85rem'
              }}
              onClick={() => setSelectedMarketCode(m.code)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '1.75rem' }}>{m.flag}</span>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{m.name}</h3>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{m.region}</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: m.readinessPercentage >= 90 ? '#34d399' : '#fbbf24' }}>
                    {m.readinessPercentage}%
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>Readiness</div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.65rem' }}>
                <span>{m.activeRulesCount} active rules</span>
                <span style={{ color: 'var(--accent-blue)', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                  View requirements <ChevronRight size={14} />
                </span>
              </div>
            </div>
          );
        })}
        </div>
      )}

      {/* Active Market Requirements Breakdown */}
      <div className="glass-panel" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '2rem' }}>{activeMarket.flag}</span>
            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>{activeMarket.name} Regulatory Overview</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{activeMarket.description}</p>
            </div>
          </div>
          <span className="badge badge-info">{activeMarket.activeRulesCount} Rules Enforced</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.25rem' }}>
          <div style={{ background: 'rgba(15,23,42,0.6)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <ShieldCheck size={16} color="#34d399" /> Key Mandatory Requirements
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)', listStyle: 'none' }}>
              <li>✓ Local Language & Safety Warning Labels</li>
              <li>✓ Authorized Importer / License Holder Registration</li>
              <li>✓ Sanitary & Health Dossier Filing</li>
              <li>✓ Heavy Metal & Microbiological Lab Evidence</li>
            </ul>
          </div>

          <div style={{ background: 'rgba(15,23,42,0.6)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <BookOpen size={16} color="#60a5fa" /> Official Statutory Framework
            </h4>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <div>Primary Regulator: <strong>PMDA / Ministry of Health</strong></div>
              <div>Customs Standard: <strong>HS Tariff Chapter 33 & 21</strong></div>
              <div>Audit Cycle: <strong>Annual Regulatory Renewal</strong></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
