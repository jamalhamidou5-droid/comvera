import React, { useState } from 'react';
import { Search, ShieldAlert, CheckCircle, AlertTriangle, FileText, Download, Building, MapPin, User, Globe2, Loader2 } from 'lucide-react';

interface ScreeningResult {
  riskScore: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  sanctions: string[];
  listsChecked: string[];
  evidenceId: string;
  timestamp: string;
  details: {
    sanctionsCheck: 'Clear' | 'Review' | 'Blocked';
    restrictedParty: 'Clear' | 'Review' | 'Blocked';
    countryRisk: 'Low' | 'Medium' | 'High';
    ownershipRisk: 'Clear' | 'Review' | 'Blocked';
  };
}

export const CompanyScreening: React.FC = () => {
  const [companyName, setCompanyName] = useState('');
  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const [owner, setOwner] = useState('');
  
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<ScreeningResult | null>(null);

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !country) return;
    
    setIsScanning(true);
    setResult(null);

    // Mock API call
    setTimeout(() => {
      // Very basic mock logic: if country is "Iran" or "Russia", high risk.
      const highRiskCountries = ['iran', 'russia', 'syria', 'north korea', 'cuba'];
      const isHighRisk = highRiskCountries.includes(country.toLowerCase());
      const isMediumRisk = ['china', 'turkey', 'uae'].includes(country.toLowerCase());
      
      const newResult: ScreeningResult = {
        riskScore: isHighRisk ? 85 : isMediumRisk ? 45 : 12,
        riskLevel: isHighRisk ? 'HIGH' : isMediumRisk ? 'MEDIUM' : 'LOW',
        sanctions: isHighRisk ? ['OFAC Specially Designated Nationals (SDN)', 'EU Sanctions List'] : [],
        listsChecked: ['OFAC SDN', 'EU Consolidated List', 'UN Security Council', 'UK HMT', 'Interpol Red Notices'],
        evidenceId: `CV-2026-${Math.floor(10000 + Math.random() * 90000)}`,
        timestamp: new Date().toLocaleString(),
        details: {
          sanctionsCheck: isHighRisk ? 'Blocked' : 'Clear',
          restrictedParty: 'Clear',
          countryRisk: isHighRisk ? 'High' : isMediumRisk ? 'Medium' : 'Low',
          ownershipRisk: 'Clear'
        }
      };
      
      setResult(newResult);
      setIsScanning(false);
    }, 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <ShieldAlert size={28} color="var(--accent-purple)" />
          Company Screening
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
          Vérifiez instantanément si une entreprise ou un partenaire figure sur des listes de sanctions internationales.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: result ? '1fr 1fr' : '1fr', gap: '2rem' }}>
        
        {/* FORM */}
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', height: 'fit-content' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Nouvelle vérification</h3>
          
          <form onSubmit={handleScan} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div className="input-group">
              <label className="input-label">Nom de l'entreprise *</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Ex: ABC Trading Ltd"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  style={{ paddingLeft: '2.5rem' }}
                  required
                />
                <Building size={16} style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Pays *</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Ex: Germany"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  style={{ paddingLeft: '2.5rem' }}
                  required
                />
                <Globe2 size={16} style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Adresse (Optionnel)</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Ex: 123 Business Rd, Berlin"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  style={{ paddingLeft: '2.5rem' }}
                />
                <MapPin size={16} style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Bénéficiaire / Propriétaire (Optionnel)</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Ex: John Doe"
                  value={owner}
                  onChange={(e) => setOwner(e.target.value)}
                  style={{ paddingLeft: '2.5rem' }}
                />
                <User size={16} style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
              </div>
            </div>

            <button type="submit" className="btn btn-primary" disabled={isScanning || !companyName || !country} style={{ marginTop: '0.5rem', display: 'flex', justifyContent: 'center' }}>
              {isScanning ? (
                <><Loader2 size={18} className="animate-spin" /> Analyse en cours...</>
              ) : (
                <><Search size={18} /> Lancer le Screening</>
              )}
            </button>
          </form>
        </div>

        {/* RESULTS */}
        {result && (
          <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', animation: 'fadeIn 0.3s ease-out' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Résultat du Screening</h3>
                <p style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>{companyName} • {country}</p>
              </div>
              <button className="btn btn-secondary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Download size={14} /> PDF Report
              </button>
            </div>

            <div style={{ 
              background: result.riskLevel === 'LOW' ? 'rgba(16, 185, 129, 0.1)' : result.riskLevel === 'MEDIUM' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(244, 63, 94, 0.1)',
              border: `1px solid ${result.riskLevel === 'LOW' ? '#10b981' : result.riskLevel === 'MEDIUM' ? '#f59e0b' : '#f43f5e'}`,
              borderRadius: '8px',
              padding: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.25rem' }}>COMVERA RISK SCORE</div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: result.riskLevel === 'LOW' ? '#34d399' : result.riskLevel === 'MEDIUM' ? '#fbbf24' : '#fb7185' }}>
                  {result.riskScore} <span style={{ fontSize: '1rem', color: 'var(--text-dim)' }}>/ 100</span>
                </div>
              </div>
              <div style={{ 
                padding: '0.5rem 1rem', 
                borderRadius: '999px', 
                fontWeight: 700, 
                fontSize: '0.85rem',
                background: result.riskLevel === 'LOW' ? '#10b981' : result.riskLevel === 'MEDIUM' ? '#f59e0b' : '#f43f5e',
                color: '#fff'
              }}>
                {result.riskLevel} RISK
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-muted)' }}>DÉTAIL DU CONTRÔLE</h4>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: 'rgba(255,255,255,0.02)', borderRadius: '6px' }}>
                <span style={{ fontSize: '0.85rem' }}>Sanctions Internationales</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: result.details.sanctionsCheck === 'Clear' ? '#34d399' : '#fb7185', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  {result.details.sanctionsCheck === 'Clear' ? <CheckCircle size={14} /> : <AlertTriangle size={14} />} {result.details.sanctionsCheck}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: 'rgba(255,255,255,0.02)', borderRadius: '6px' }}>
                <span style={{ fontSize: '0.85rem' }}>Restricted Party Lists</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: result.details.restrictedParty === 'Clear' ? '#34d399' : '#fb7185', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  {result.details.restrictedParty === 'Clear' ? <CheckCircle size={14} /> : <AlertTriangle size={14} />} {result.details.restrictedParty}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: 'rgba(255,255,255,0.02)', borderRadius: '6px' }}>
                <span style={{ fontSize: '0.85rem' }}>Country Risk</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: result.details.countryRisk === 'Low' ? '#34d399' : result.details.countryRisk === 'Medium' ? '#fbbf24' : '#fb7185', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  {result.details.countryRisk === 'Low' ? <CheckCircle size={14} /> : <AlertTriangle size={14} />} {result.details.countryRisk}
                </span>
              </div>
            </div>

            {result.sanctions.length > 0 && (
              <div style={{ padding: '1rem', background: 'rgba(244, 63, 94, 0.1)', borderLeft: '3px solid #f43f5e', borderRadius: '4px' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#fb7185', marginBottom: '0.5rem' }}>MATCHES FOUND:</div>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.8rem', color: 'var(--text-light)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  {result.sanctions.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>
            )}

            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem', marginTop: '0.5rem' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <div><span style={{ fontWeight: 600 }}>Evidence ID:</span> {result.evidenceId}</div>
                <div><span style={{ fontWeight: 600 }}>Date du contrôle:</span> {result.timestamp}</div>
                <div><span style={{ fontWeight: 600 }}>Listes vérifiées:</span> {result.listsChecked.join(', ')}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
