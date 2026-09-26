import React, { useState, useEffect } from 'react';
import { Code, History, Plus, Save, GitBranch, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import { Rule } from '../../types';

export const RulesEngineEditor: React.FC = () => {
  const { user } = useAuth();
  const [rules, setRules] = useState<Rule[]>([]);
  const [selectedRuleId, setSelectedRuleId] = useState<string>('');
  const [selectedVersion, setSelectedVersion] = useState<'v2.1.0' | 'v1.0.0'>('v2.1.0');
  const [isLoading, setIsLoading] = useState(true);
  
  // Edit State
  const [isEditing, setIsEditing] = useState(false);
  const [editReqText, setEditReqText] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchRules();
  }, [user]);

  const fetchRules = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.from('rules').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      if (data) {
        const formattedRules: Rule[] = data.map(r => ({
          id: r.id,
          title: r.title,
          description: r.description,
          countryCode: r.country_code,
          category: r.category,
          severity: r.severity,
          requirementText: r.requirement_text,
          status: r.status,
          version: '2.1.0',
          conditionSummary: 'Evaluated by rules engine',
          legalReference: r.legal_reference || 'TBD',
          sourceUrl: r.source_url || '#',
          effectiveDate: r.effective_date || new Date().toISOString(),
          evaluator: () => ({ passed: true }) // Dummy evaluator since this is admin UI
        }));
        setRules(formattedRules);
        if (formattedRules.length > 0 && !selectedRuleId) {
          setSelectedRuleId(formattedRules[0].id);
        }
      }
    } catch (err) {
      console.error('Failed to fetch rules', err);
    } finally {
      setIsLoading(false);
    }
  };

  const rule = rules.find((r) => r.id === selectedRuleId) || rules[0];

  useEffect(() => {
    if (rule) {
      setEditReqText(rule.requirementText);
      setIsEditing(false);
    }
  }, [rule]);

  const handleSaveRule = async () => {
    if (!rule || !user) return;
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('rules')
        .update({ requirement_text: editReqText })
        .eq('id', rule.id);
        
      if (error) throw error;
      
      // Update local state
      setRules(prev => prev.map(r => r.id === rule.id ? { ...r, requirementText: editReqText } : r));
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to save rule', err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Deterministic Rules Engine Editor</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Logic editor and history versioning for compliance rules (Connected to Supabase).
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => alert('Création de règle non implémentée dans cette démo')}>
          <Plus size={16} /> Create New Rule
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.8fr', gap: '1.5rem' }}>
        {/* Rule Selector */}
        <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '600px', overflowY: 'auto' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Rules Library</h3>

          {isLoading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}><Loader2 className="animate-spin" /></div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {rules.map((r) => {
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
          )}
        </div>

        {/* Rule Builder & Versioning Inspector */}
        {rule ? (
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--accent-blue)', fontWeight: 700, textTransform: 'uppercase' }}>Rule Evaluation Logic</div>
                {isEditing ? (
                  <button className="btn btn-primary btn-sm" onClick={handleSaveRule} disabled={isSaving}>
                    {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} Save Logic
                  </button>
                ) : (
                  <button className="btn btn-secondary btn-sm" onClick={() => setIsEditing(true)}>
                    <Code size={14} /> Edit Logic
                  </button>
                )}
              </div>

              {/* IF Block */}
              <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '0.85rem', borderRadius: '6px', borderLeft: '3px solid var(--accent-blue)' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-blue)' }}>IF CONDITION (Read-Only)</div>
                <code style={{ fontSize: '0.85rem', color: 'var(--text-main)', marginTop: '0.2rem', display: 'block' }}>
                  country === '{rule.countryCode}' AND category === '{rule.category}'
                </code>
              </div>

              {/* THEN Block */}
              <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '0.85rem', borderRadius: '6px', borderLeft: '3px solid #34d399' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#34d399' }}>THEN REQUIREMENT</div>
                {isEditing ? (
                  <textarea 
                    value={editReqText}
                    onChange={(e) => setEditReqText(e.target.value)}
                    style={{ width: '100%', minHeight: '60px', marginTop: '0.5rem', background: 'rgba(0,0,0,0.5)', border: '1px solid var(--border-subtle)', borderRadius: '4px', color: 'var(--text-main)', padding: '0.5rem', fontFamily: 'monospace', fontSize: '0.85rem' }}
                  />
                ) : (
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-main)', marginTop: '0.4rem' }}>
                    {rule.requirementText}
                  </div>
                )}
              </div>
            </div>

            {/* Version Audit Snapshot Notice */}
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', fontSize: '0.825rem', color: 'var(--text-muted)' }}>
              <GitBranch size={16} color="var(--accent-purple)" style={{ display: 'inline', marginRight: '0.4rem' }} />
              <strong>Historical Rule Snapshot:</strong> {selectedVersion === 'v2.1.0' ? 'Active version since 2026-01-01' : 'Archived version (valid 2025-01-01 to 2025-12-31)'}. Enables auditing past compliance decisions.
            </div>
          </div>
        ) : (
          <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
            <AlertCircle size={48} style={{ opacity: 0.5, marginBottom: '1rem' }} />
            <p>No rule selected or available</p>
          </div>
        )}
      </div>
    </div>
  );
};
