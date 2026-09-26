import React, { useEffect, useState } from 'react';
import { Plus, Save, RefreshCw } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface DbRule {
  id: string;
  version: string;
  title: string;
  country_code: string;
  category: string;
  severity: 'BLOCKING' | 'WARNING' | 'INFO';
  condition_summary: string;
  requirement_text: string;
  legal_reference: string;
  source_url: string;
  effective_date: string;
  expiration_date?: string | null;
  status: 'active' | 'deprecated' | 'draft';
}

export const RulesEngineEditor: React.FC = () => {
  const [rules, setRules] = useState<DbRule[]>([]);
  const [selectedRuleId, setSelectedRuleId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadRules();
  }, []);

  const loadRules = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from('rules')
      .select('*')
      .order('country_code')
      .order('title');

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    setRules(data || []);

    if (data?.length) {
      setSelectedRuleId(data[0].id);
    }

    setLoading(false);
  };

  const selectedRule = rules.find((rule) => rule.id === selectedRuleId) || null;

  const saveRule = async () => {
    if (!selectedRule) return;

    setSaving(true);

    const { error } = await supabase
      .from('rules')
      .update({
        title: selectedRule.title,
        country_code: selectedRule.country_code,
        category: selectedRule.category,
        severity: selectedRule.severity,
        condition_summary: selectedRule.condition_summary,
        requirement_text: selectedRule.requirement_text,
        legal_reference: selectedRule.legal_reference,
        source_url: selectedRule.source_url,
        effective_date: selectedRule.effective_date,
        expiration_date: selectedRule.expiration_date,
        status: selectedRule.status
      })
      .eq('id', selectedRule.id);

    if (error) {
      console.error(error);
      alert('Failed to save rule.');
    } else {
      alert('Rule saved successfully.');
    }

    setSaving(false);
  };

  const createRule = async () => {
    const id = `RULE-${Date.now()}`;

    const { data, error } = await supabase
      .from('rules')
      .insert({
        id,
        version: '1.0.0',
        title: 'New Compliance Rule',
        country_code: 'US',
        category: 'All',
        severity: 'WARNING',
        condition_summary: 'Define the condition',
        requirement_text: 'Define the requirement',
        legal_reference: '',
        source_url: '',
        effective_date: new Date().toISOString().slice(0, 10),
        status: 'draft'
      })
      .select()
      .single();

    if (error) {
      console.error(error);
      alert(error.message);
      return;
    }

    setRules((prev) => [data, ...prev]);
    setSelectedRuleId(data.id);
  };

  if (loading) {
    return <div style={{ padding: '2rem' }}>Loading rules from database...</div>;
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '2rem', height: '100%' }}>
      {/* Sidebar with Rule List */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 120px)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.1rem', margin: 0 }}>Compliance Rules</h2>
          <button className="btn btn-primary btn-sm" onClick={createRule}>
            <Plus size={16} /> New
          </button>
        </div>
        
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
          <button className="btn btn-secondary btn-sm" onClick={loadRules} title="Refresh rules">
            <RefreshCw size={14} /> Refresh
          </button>
        </div>

        <div style={{ overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {rules.map(rule => (
            <div 
              key={rule.id}
              onClick={() => setSelectedRuleId(rule.id)}
              style={{
                padding: '0.75rem',
                border: '1px solid var(--border-subtle)',
                borderRadius: '6px',
                cursor: 'pointer',
                background: selectedRuleId === rule.id ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                borderColor: selectedRuleId === rule.id ? 'var(--accent-blue)' : 'var(--border-subtle)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{rule.id}</span>
                <span className={`badge ${rule.status === 'active' ? 'badge-success' : 'badge-warning'}`}>
                  {rule.status}
                </span>
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                {rule.title}
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', fontSize: '0.75rem' }}>
                <span style={{ background: 'var(--bg-elevated)', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>
                  {rule.country_code}
                </span>
                <span style={{ background: 'var(--bg-elevated)', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>
                  {rule.severity}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Editor Area */}
      {selectedRule ? (
        <div className="card" style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 120px)', overflowY: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Edit Rule: {selectedRule.id}</h2>
            <button className="btn btn-primary" onClick={saveRule} disabled={saving}>
              <Save size={16} /> {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Rule Title</label>
              <input 
                type="text" 
                className="input-field" 
                value={selectedRule.title} 
                onChange={e => setRules(rules.map(r => r.id === selectedRule.id ? { ...r, title: e.target.value } : r))}
              />
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Country Code</label>
                <input 
                  type="text" 
                  className="input-field" 
                  value={selectedRule.country_code} 
                  onChange={e => setRules(rules.map(r => r.id === selectedRule.id ? { ...r, country_code: e.target.value } : r))}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Category</label>
                <input 
                  type="text" 
                  className="input-field" 
                  value={selectedRule.category} 
                  onChange={e => setRules(rules.map(r => r.id === selectedRule.id ? { ...r, category: e.target.value } : r))}
                />
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Severity</label>
              <select 
                className="input-field"
                value={selectedRule.severity}
                onChange={e => setRules(rules.map(r => r.id === selectedRule.id ? { ...r, severity: e.target.value as any } : r))}
              >
                <option value="BLOCKING">BLOCKING</option>
                <option value="WARNING">WARNING</option>
                <option value="INFO">INFO</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Status</label>
              <select 
                className="input-field"
                value={selectedRule.status}
                onChange={e => setRules(rules.map(r => r.id === selectedRule.id ? { ...r, status: e.target.value as any } : r))}
              >
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="deprecated">Deprecated</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Effective Date</label>
              <input 
                type="date" 
                className="input-field" 
                value={selectedRule.effective_date?.slice(0, 10) || ''} 
                onChange={e => setRules(rules.map(r => r.id === selectedRule.id ? { ...r, effective_date: e.target.value } : r))}
              />
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Condition Summary</label>
            <input 
              type="text" 
              className="input-field" 
              value={selectedRule.condition_summary} 
              onChange={e => setRules(rules.map(r => r.id === selectedRule.id ? { ...r, condition_summary: e.target.value } : r))}
            />
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Requirement Text (JSON or Logic Expression)</label>
            <textarea 
              className="input-field" 
              style={{ flex: 1, minHeight: '200px', fontFamily: 'monospace' }}
              value={selectedRule.requirement_text} 
              onChange={e => setRules(rules.map(r => r.id === selectedRule.id ? { ...r, requirement_text: e.target.value } : r))}
            />
          </div>
        </div>
      ) : (
        <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
          Select a rule to edit or create a new one.
        </div>
      )}
    </div>
  );
};
