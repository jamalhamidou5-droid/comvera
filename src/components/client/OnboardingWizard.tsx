import React, { useState } from 'react';
import { Building, Store, Globe, PackageCheck, Check, ArrowRight, ArrowLeft } from 'lucide-react';

interface OnboardingWizardProps {
  onComplete: () => void;
}

export const OnboardingWizard: React.FC<OnboardingWizardProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);

  // Form State
  const [companyName, setCompanyName] = useState('Acme Store');
  const [country, setCountry] = useState('France');
  const [website, setWebsite] = useState('https://acme-store.com');
  const [businessType, setBusinessType] = useState('E-Commerce Merchant');

  const [platform, setPlatform] = useState<'Shopify' | 'WooCommerce' | 'CSV' | 'API'>('Shopify');
  const [selectedMarkets, setSelectedMarkets] = useState<string[]>(['JP', 'BR', 'US']);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['Cosmetics', 'Clothing']);

  const toggleMarket = (code: string) => {
    if (selectedMarkets.includes(code)) {
      setSelectedMarkets(selectedMarkets.filter((m) => m !== code));
    } else {
      setSelectedMarkets([...selectedMarkets, code]);
    }
  };

  const toggleCategory = (cat: string) => {
    if (selectedCategories.includes(cat)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== cat));
    } else {
      setSelectedCategories([...selectedCategories, cat]);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '3rem auto', padding: '0 1.5rem', width: '100%' }}>
      {/* Progress bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2.5rem', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '16px', left: '10%', right: '10%', height: '2px', background: 'var(--border-subtle)', zIndex: 0 }} />
        {[1, 2, 3, 4].map((s) => (
          <div
            key={s}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
              zIndex: 1
            }}
          >
            <div
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                background: step >= s ? 'var(--accent-blue)' : 'var(--bg-dark)',
                border: `2px solid ${step >= s ? 'var(--accent-blue)' : 'var(--border-subtle)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '0.875rem',
                color: step >= s ? '#ffffff' : 'var(--text-dim)'
              }}
            >
              {step > s ? <Check size={16} /> : s}
            </div>
            <span style={{ fontSize: '0.75rem', color: step >= s ? 'var(--text-main)' : 'var(--text-dim)', fontWeight: 500 }}>
              {s === 1 && 'Entreprise'}
              {s === 2 && 'Boutique'}
              {s === 3 && 'Marchés'}
              {s === 4 && 'Catégories'}
            </span>
          </div>
        ))}
      </div>

      <div className="glass-panel glass-glow" style={{ padding: '2.5rem' }}>
        {/* STEP 1: Company Info */}
        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Étape 1 — Votre entreprise</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
                Renseignez les détails juridiques de votre entité commerciale.
              </p>
            </div>

            <div className="input-group">
              <label className="input-label">Nom de la société</label>
              <input
                type="text"
                className="input-field"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label className="input-label">Pays d'immatriculation</label>
              <select className="select-field" value={country} onChange={(e) => setCountry(e.target.value)}>
                <option value="France">France 🇫🇷</option>
                <option value="United States">United States 🇺🇸</option>
                <option value="Germany">Germany 🇩🇪</option>
                <option value="United Kingdom">United Kingdom 🇬🇧</option>
                <option value="Japan">Japan 🇯🇵</option>
              </select>
            </div>

            <div className="input-group">
              <label className="input-label">Site Web principal</label>
              <input
                type="url"
                className="input-field"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label className="input-label">Type d'activité</label>
              <select className="select-field" value={businessType} onChange={(e) => setBusinessType(e.target.value)}>
                <option value="E-Commerce Merchant">E-Commerce Merchant (D2C)</option>
                <option value="Brand Manufacturer">Marque / Fabricant</option>
                <option value="Distributor / Wholesale">Grossiste / Distributeur</option>
                <option value="Agency / Consultant">Agence / Cabinet Conseil</option>
              </select>
            </div>
          </div>
        )}

        {/* STEP 2: Store Connection */}
        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Étape 2 — Connecter votre boutique</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
                Où vendez-vous vos produits aujourd'hui ?
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {[
                { key: 'Shopify', label: 'Shopify', desc: 'Sync automatique API OAuth 2.0' },
                { key: 'WooCommerce', label: 'WooCommerce', desc: 'Plugin REST API WordPress' },
                { key: 'CSV', label: 'Upload CSV', desc: 'Import manuel de catalogue' },
                { key: 'API', label: 'Custom API', desc: 'Intégration ERP / PIM direct' }
              ].map((item) => (
                <div
                  key={item.key}
                  style={{
                    padding: '1.25rem',
                    borderRadius: '10px',
                    border: `2px solid ${platform === item.key ? 'var(--accent-blue)' : 'var(--border-subtle)'}`,
                    background: platform === item.key ? 'rgba(59, 130, 246, 0.1)' : 'rgba(15,23,42,0.6)',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onClick={() => setPlatform(item.key as any)}
                >
                  <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{item.label}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{item.desc}</div>
                </div>
              ))}
            </div>

            {platform === 'Shopify' && (
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', fontSize: '0.85rem' }}>
                <span style={{ fontWeight: 600, color: '#34d399' }}>✓ Connecteur Shopify prêt :</span> Une fois validé, Comvera importera automatiquement vos produits depuis <code>acme-store.myshopify.com</code>.
              </div>
            )}
          </div>
        )}

        {/* STEP 3: Target Markets */}
        {step === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Étape 3 — Vos marchés cibles</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
                Sélectionnez les pays dans lesquels vous vendez ou souhaitez vous développer.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
              {[
                { code: 'JP', name: 'Japon', flag: '🇯🇵' },
                { code: 'BR', name: 'Brésil', flag: '🇧🇷' },
                { code: 'US', name: 'États-Unis', flag: '🇺🇸' },
                { code: 'CA', name: 'Canada', flag: '🇨🇦' },
                { code: 'AU', name: 'Australie', flag: '🇦🇺' },
                { code: 'EU', name: 'Union Européenne', flag: '🇪🇺' }
              ].map((m) => {
                const isSelected = selectedMarkets.includes(m.code);
                return (
                  <div
                    key={m.code}
                    style={{
                      padding: '1rem',
                      borderRadius: '10px',
                      border: `1.5px solid ${isSelected ? 'var(--accent-blue)' : 'var(--border-subtle)'}`,
                      background: isSelected ? 'rgba(59, 130, 246, 0.12)' : 'rgba(15,23,42,0.6)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem'
                    }}
                    onClick={() => toggleMarket(m.code)}
                  >
                    <span style={{ fontSize: '1.5rem' }}>{m.flag}</span>
                    <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{m.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 4: Product Categories */}
        {step === 4 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Étape 4 — Vos catégories de produits</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
                Cela permet au moteur de sélectionner les règles et normes réglementaires applicables.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
              {[
                'Cosmetics',
                'Food',
                'Electronics',
                'Clothing',
                'Toys',
                'Supplements'
              ].map((cat) => {
                const isSelected = selectedCategories.includes(cat);
                return (
                  <div
                    key={cat}
                    style={{
                      padding: '1rem',
                      borderRadius: '10px',
                      border: `1.5px solid ${isSelected ? 'var(--accent-blue)' : 'var(--border-subtle)'}`,
                      background: isSelected ? 'rgba(59, 130, 246, 0.12)' : 'rgba(15,23,42,0.6)',
                      cursor: 'pointer',
                      fontWeight: 600,
                      textAlign: 'center'
                    }}
                    onClick={() => toggleCategory(cat)}
                  >
                    {cat}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Wizard Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-subtle)' }}>
          {step > 1 ? (
            <button className="btn btn-secondary" onClick={() => setStep(step - 1)}>
              <ArrowLeft size={16} /> Précédent
            </button>
          ) : <div />}

          {step < 4 ? (
            <button className="btn btn-primary" onClick={() => setStep(step + 1)}>
              Suivant <ArrowRight size={16} />
            </button>
          ) : (
            <button className="btn btn-primary" onClick={onComplete}>
              Lancer l'analyse de ma boutique <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
