import React, { useState } from 'react';
import { ShieldAlert, ArrowRight, ArrowLeft, Building, Globe2, Loader2, CheckCircle, AlertTriangle, FileText, Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

type WizardStep = 'entity' | 'transaction' | 'product' | 'review' | 'result';

export const NewComplianceCheck: React.FC = () => {
  const [step, setStep] = useState<WizardStep>('entity');
  const [isScanning, setIsScanning] = useState(false);

  // Form State
  const [entityType, setEntityType] = useState<'Company' | 'Individual'>('Company');
  const [legalName, setLegalName] = useState('');
  const [country, setCountry] = useState('');
  
  const [destCountry, setDestCountry] = useState('');
  const [transactionValue, setTransactionValue] = useState('');
  
  const [productName, setProductName] = useState('');
  
  const [result, setResult] = useState<any>(null);

  const handleRunCheck = (e: React.FormEvent) => {
    e.preventDefault();
    setIsScanning(true);
    
    // Simulate API / Engine delay
    setTimeout(() => {
      const isHighRisk = ['russia', 'iran', 'syria'].includes(country.toLowerCase()) || ['russia', 'iran', 'syria'].includes(destCountry.toLowerCase());
      
      setResult({
        riskScore: isHighRisk ? 82 : 15,
        riskLevel: isHighRisk ? 'HIGH' : 'LOW',
        checks: {
          sanctions: isHighRisk ? 'Review' : 'Clear',
          country: isHighRisk ? 'High' : 'Clear',
          entity: 'Clear',
          product: 'Clear',
          docs: 'Missing'
        },
        evidence: {
          rule: isHighRisk ? 'SANCTIONS_001' : 'COUNTRY_RISK_001',
          reason: isHighRisk ? 'Potential match detected on OFAC list for the destination country/entity.' : 'No matches found on restricted lists.',
          checkedAt: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
        }
      });
      setIsScanning(false);
      setStep('result');
    }, 2500);
  };

  const handleGeneratePdf = async () => {
    const element = document.getElementById('pdf-report-content');
    if (!element) return;
    
    try {
      // Pour une meilleure qualité, surtout en mode sombre
      const canvas = await html2canvas(element, { 
        scale: 2,
        backgroundColor: '#090d16' // background du site
      });
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });
      
      pdf.addImage(imgData, 'JPEG', 0, 0, canvas.width, canvas.height);
      pdf.save(`Comvera_Report_${legalName.replace(/\s+/g, '_')}.pdf`);
    } catch (err) {
      console.error("Error generating PDF", err);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <ShieldAlert size={28} color="var(--accent-purple)" />
          New Compliance Check
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
          Analyze a new entity, transaction, and product for global compliance risks.
        </p>
      </div>

      <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* Progress Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem' }}>
          {['Entity', 'Transaction', 'Product', 'Review'].map((label, index) => {
            const stepKeys: WizardStep[] = ['entity', 'transaction', 'product', 'review'];
            const isActive = step === stepKeys[index];
            const isPassed = stepKeys.indexOf(step) > index;
            if (step === 'result') return null; // Hide progress on result
            
            return (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: isActive ? 'var(--text-bright)' : isPassed ? '#10b981' : 'var(--text-dim)', fontWeight: isActive ? 700 : 500 }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: isActive ? 'var(--accent-blue)' : isPassed ? '#10b981' : 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', color: '#fff' }}>
                  {isPassed ? <CheckCircle size={14} /> : index + 1}
                </div>
                {label}
              </div>
            );
          })}
        </div>

        {/* STEP 1: ENTITY */}
        {step === 'entity' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', animation: 'fadeIn 0.3s' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Step 1 — Entity</h3>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button 
                type="button" 
                onClick={() => setEntityType('Company')}
                style={{ flex: 1, padding: '1rem', borderRadius: '8px', border: `1px solid ${entityType === 'Company' ? 'var(--accent-blue)' : 'var(--border-subtle)'}`, background: entityType === 'Company' ? 'rgba(59, 130, 246, 0.1)' : 'transparent', color: entityType === 'Company' ? 'var(--accent-blue)' : 'var(--text-dim)', fontWeight: 600, cursor: 'pointer' }}
              >
                Company
              </button>
              <button 
                type="button" 
                onClick={() => setEntityType('Individual')}
                style={{ flex: 1, padding: '1rem', borderRadius: '8px', border: `1px solid ${entityType === 'Individual' ? 'var(--accent-blue)' : 'var(--border-subtle)'}`, background: entityType === 'Individual' ? 'rgba(59, 130, 246, 0.1)' : 'transparent', color: entityType === 'Individual' ? 'var(--accent-blue)' : 'var(--text-dim)', fontWeight: 600, cursor: 'pointer' }}
              >
                Individual
              </button>
            </div>

            <div className="input-group">
              <label className="input-label">Legal Name *</label>
              <input type="text" className="input-field" value={legalName} onChange={(e) => setLegalName(e.target.value)} placeholder="Ex: ABC Trading Ltd" />
            </div>

            <div className="input-group">
              <label className="input-label">Country *</label>
              <input type="text" className="input-field" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Ex: Germany" />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
              <button className="btn btn-primary" onClick={() => setStep('transaction')} disabled={!legalName || !country}>
                Next <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: TRANSACTION */}
        {step === 'transaction' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', animation: 'fadeIn 0.3s' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Step 2 — Transaction</h3>
            
            <div className="input-group">
              <label className="input-label">Destination Country *</label>
              <input type="text" className="input-field" value={destCountry} onChange={(e) => setDestCountry(e.target.value)} placeholder="Ex: United States" />
            </div>

            <div className="input-group">
              <label className="input-label">Transaction Value (USD)</label>
              <input type="number" className="input-field" value={transactionValue} onChange={(e) => setTransactionValue(e.target.value)} placeholder="Ex: 25000" />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
              <button className="btn btn-secondary" onClick={() => setStep('entity')}><ArrowLeft size={16} /> Back</button>
              <button className="btn btn-primary" onClick={() => setStep('product')} disabled={!destCountry}>Next <ArrowRight size={16} /></button>
            </div>
          </div>
        )}

        {/* STEP 3: PRODUCT */}
        {step === 'product' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', animation: 'fadeIn 0.3s' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Step 3 — Product</h3>
            
            <div className="input-group">
              <label className="input-label">Product Name / Description</label>
              <input type="text" className="input-field" value={productName} onChange={(e) => setProductName(e.target.value)} placeholder="Ex: Industrial electric motor 15kW" />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
              <button className="btn btn-secondary" onClick={() => setStep('transaction')}><ArrowLeft size={16} /> Back</button>
              <button className="btn btn-primary" onClick={() => setStep('review')}>Next <ArrowRight size={16} /></button>
            </div>
          </div>
        )}

        {/* STEP 4: REVIEW */}
        {step === 'review' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', animation: 'fadeIn 0.3s' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Step 4 — Review</h3>
            
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div><span style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>Entity</span><div style={{ fontWeight: 600 }}>{legalName} ({country})</div></div>
                <div><span style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>Destination</span><div style={{ fontWeight: 600 }}>{destCountry}</div></div>
                <div><span style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>Product</span><div style={{ fontWeight: 600 }}>{productName || 'N/A'}</div></div>
                <div><span style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>Value</span><div style={{ fontWeight: 600 }}>${transactionValue || '0'}</div></div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
              <button className="btn btn-secondary" onClick={() => setStep('product')} disabled={isScanning}><ArrowLeft size={16} /> Back</button>
              <button className="btn btn-primary btn-pulse" onClick={handleRunCheck} disabled={isScanning} style={{ padding: '0.75rem 2rem' }}>
                {isScanning ? <><Loader2 size={18} className="animate-spin" /> Analyzing...</> : 'RUN COMPLIANCE CHECK'}
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: RESULT */}
        {step === 'result' && result && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', animation: 'fadeIn 0.5s' }}>
            <div id="pdf-report-content" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '1rem' }}>
            <div style={{ textAlign: 'center' }}>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, color: result.riskLevel === 'LOW' ? '#10b981' : '#f43f5e' }}>
                {result.riskLevel === 'LOW' ? '🟢 CLEAR TO PROCEED' : '🟠 REVIEW REQUIRED'}
              </h2>
              <div style={{ fontSize: '3rem', fontWeight: 900, color: result.riskLevel === 'LOW' ? '#10b981' : '#f43f5e', marginTop: '1rem' }}>
                {result.riskScore} <span style={{ fontSize: '1.5rem', color: 'var(--text-dim)' }}>/ 100</span>
              </div>
              <div style={{ color: 'var(--text-muted)', fontWeight: 600 }}>COMVERA RISK SCORE</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '8px' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem' }}>Detailed Checks</h4>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <span>Sanctions Screening</span>
                <span style={{ fontWeight: 600, color: result.checks.sanctions === 'Clear' ? '#10b981' : '#fbbf24' }}>{result.checks.sanctions === 'Clear' ? '🟢 Clear' : '⚠️ Review'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <span>Country Risk</span>
                <span style={{ fontWeight: 600, color: result.checks.country === 'Clear' ? '#10b981' : '#f43f5e' }}>{result.checks.country === 'Clear' ? '🟢 Clear' : '🔴 High Risk'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <span>Entity Information</span>
                <span style={{ fontWeight: 600, color: '#10b981' }}>🟢 Clear</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0' }}>
                <span>Documentation</span>
                <span style={{ fontWeight: 600, color: '#f43f5e' }}>🔴 Missing</span>
              </div>
            </div>
            
            {result.riskLevel !== 'LOW' && (
              <div style={{ padding: '1.5rem', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid #f59e0b', borderRadius: '8px' }}>
                <h4 style={{ color: '#f59e0b', fontWeight: 700, marginBottom: '0.5rem' }}>Recommended action</h4>
                <p style={{ color: 'var(--text-bright)', fontSize: '0.9rem' }}>Review entity structure and destination country embargo rules before proceeding. Documentation is missing.</p>
              </div>
            )}

            <div style={{ padding: '1.5rem', border: '1px solid var(--border-subtle)', borderRadius: '8px', background: 'rgba(255,255,255,0.01)' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>Evidence</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '0.5rem', fontSize: '0.85rem' }}>
                <div style={{ color: 'var(--text-dim)' }}>Rule:</div>
                <div style={{ fontWeight: 600 }}>{result.evidence.rule}</div>
                <div style={{ color: 'var(--text-dim)' }}>Reason:</div>
                <div style={{ fontWeight: 600 }}>{result.evidence.reason}</div>
                <div style={{ color: 'var(--text-dim)' }}>Checked:</div>
                <div style={{ fontWeight: 600 }}>{result.evidence.checkedAt}</div>
                <div style={{ color: 'var(--text-dim)' }}>Engine:</div>
                <div style={{ fontWeight: 600 }}>Comvera Compliance Engine</div>
              </div>
            </div>
            
            </div>{/* Fin de la div englobante pour le PDF */}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
              <button className="btn btn-secondary" style={{ padding: '1rem' }} onClick={() => setStep('entity')}>Start New Check</button>
              <button className="btn btn-primary" style={{ padding: '1rem' }} onClick={handleGeneratePdf}><Download size={18} style={{ marginRight: '0.5rem' }}/> Generate PDF Report</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
