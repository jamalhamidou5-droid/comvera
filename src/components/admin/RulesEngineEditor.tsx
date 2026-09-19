import React, { useState } from 'react';
import { Code, History, Plus, Save, GitBranch, ArrowRight } from 'lucide-react';
import { MOCK_RULES } from '../../data/mockData';
import { Rule } from '../../types';

export const RulesEngineEditor: React.FC = () => {
  const [selectedRuleId, setSelectedRuleId] = useState<string>('JP-COS-001');
  const [selectedVersion, setSelectedVersion] = useState<'v2.1.0' | 'v1.0.0'>('v2.1.0');

  const rule = MOCK_RULES.find((r) => r.id === selectedRuleId) || MOCK_RULES[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Deterministic Rules Engine Editor</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Éditeur logique IF/THEN et gestion du versionnage historique des règles informatiques.
          </p>
        </div>
        <button className="btn btn-primary">
          <Plus size={16} /> Create New Rule
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.8fr', gap: '1.5rem' }}>
        {/* Rule Selector */}
        <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Rules Library</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {MOCK_RULES.map((r) => {
              const isSelected = selectedRuleId === r.id;
              return (
                <div
                  key={r.id}
                  style={{
                    padding: '0.9rem',
                    borderRadius: '8px',
                    background: isSelected ? 'rgba(59, 130, 246, 0.12)' : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${isSelected ? 'var(--accent-blue)' : 'var(--border-subtle)'}`,
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.35rem'
                  }}
                  onClick={() => setSelectedRuleId(r.id)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>{r.title}</span>
                    <span className="badge badge-info" style={{ fontSize: '0.65rem' }}>v{r.version}</span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                    [{r.countryCode}] • {r.category} • Severity: {r.severity}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Rule Builder & Versioning Inspector */}
        <div className="glass-panel" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{rule.title}</h3>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>ID: {rule.id}</div>
            </div>

            {/* Version Switcher */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(0,0,0,0.3)', padding: '0.25rem 0.6rem', borderRadius: '8px', fontSize: '0.8rem' }}>
              <History size={14} color="var(--accent-blue)" />
              <span>Version:</span>
              <button
                className={`btn ${selectedVersion === 'v2.1.0' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                style={{ padding: '0.15rem 0.45rem', fontSize: '0.725rem' }}
                onClick={() => setSelectedVersion('v2.1.0')}
              >
                v2.1.0 (Active)
              </button>
              <button
                className={`btn ${selectedVersion === 'v1.0.0' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                style={{ padding: '0.15rem 0.45rem', fontSize: '0.725rem' }}
                onClick={() => setSelectedVersion('v1.0.0')}
              >
                v1.0.0 (Archived)
              </button>
            </div>
          </div>

          {/* IF / THEN Logic Visualizer */}
          <div style={{ background: 'rgba(15,23,42,0.9)', padding: '1.25rem', borderRadius: '10px', border: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--accent-blue)', fontWeight: 700, textTransform: 'uppercase' }}>Rule Evaluation Logic</div>

            {/* IF Block */}
            <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '0.85rem', borderRadius: '6px', borderLeft: '3px solid var(--accent-blue)' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-blue)' }}>IF CONDITION</div>
              <code style={{ fontSize: '0.85rem', color: 'var(--text-main)', marginTop: '0.2rem', display: 'block' }}>
                country === '{rule.countryCode}' AND category === '{rule.category}'
              </code>
            </div>

            {/* THEN Block */}
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '0.85rem', borderRadius: '6px', borderLeft: '3px solid #34d399' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#34d399' }}>THEN REQUIREMENT</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-main)', marginTop: '0.2rem' }}>
                {rule.requirementText}
              </div>
            </div>
          </div>

          {/* Version Audit Snapshot Notice */}
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', fontSize: '0.825rem', color: 'var(--text-muted)' }}>
            <GitBranch size={16} color="var(--accent-purple)" style={{ display: 'inline', marginRight: '0.4rem' }} />
            <strong>Historical Rule Snapshot:</strong> {selectedVersion === 'v2.1.0' ? 'Version active depuis le 2026-01-01' : 'Version archivée (valide du 2025-01-01 au 2025-12-31)'}. Permet d'auditer les décisions de conformité passées.
          </div>
        </div>
      </div>
    </div>
  );
};
