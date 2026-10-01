import React, { useState } from 'react';
import {
  ShieldCheck,
  Globe2,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ArrowRight,
  Zap,
  BookOpen,
  FileCheck,
  BellRing,
  Layers,
  Store,
  Building2,
  ChevronRight
} from 'lucide-react';

interface LandingPageProps {
  onStartOnboarding: () => void;
  onOpenAuth: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartOnboarding,
  onOpenAuth
}) => {
  const [selectedTab, setSelectedTab] = useState<'FR' | 'JP' | 'BR'>('JP');
  const [showCaseStudyDetail, setShowCaseStudyDetail] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem', paddingBottom: '4rem' }}>
      {/* 1. HERO SECTION */}
      <section
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '4rem 1.5rem 2rem 1.5rem',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '3rem',
          alignItems: 'center',
          position: 'relative'
        }}
      >
        {/* Floating Badges (izimelo-style) */}
        <div className="floating-badge floating-badge--1" style={{ top: '10px', left: '5%' }}>
          <ShieldCheck size={16} /> Customs
        </div>
        <div className="floating-badge floating-badge--2" style={{ top: '60px', right: '3%' }}>
          <CheckCircle2 size={16} /> Sanctions
        </div>
        <div className="floating-badge floating-badge--3" style={{ bottom: '80px', left: '2%' }}>
          <FileCheck size={16} /> HS Codes
        </div>
        <div className="floating-badge floating-badge--4" style={{ bottom: '40px', right: '8%' }}>
          <Globe2 size={16} /> GDPR
        </div>
        <div className="fade-in-up" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.35rem 0.85rem',
              borderRadius: '999px',
              background: 'rgba(59, 130, 246, 0.12)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              color: '#60a5fa',
              fontSize: '0.825rem',
              fontWeight: 600,
              width: 'fit-content'
            }}
          >
            <ShieldCheck size={14} /> The Global Trade Compliance Engine
          </div>

          <h1
            className="hero-title-shimmer fade-in-up fade-in-up-delay-1"
            style={{
              fontSize: '3.2rem',
              fontWeight: 800,
              lineHeight: 1.15
            }}
          >
            Check any international transaction. Get explainable risk results in minutes.
          </h1>

          <p className="fade-in-up fade-in-up-delay-2" style={{ color: 'var(--text-muted)', fontSize: '1.125rem', lineHeight: 1.6 }}>
            Comvera helps import/export businesses identify potential compliance risks, sanctions, and restricted parties, and document their review process instantly.
          </p>

          <div className="fade-in-up fade-in-up-delay-3" style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
            <button className="btn btn-primary btn-lg" onClick={onOpenAuth}>
              Run your first check <ArrowRight size={18} />
            </button>
            <button className="btn btn-secondary btn-lg" onClick={onOpenAuth}>
              Voir la démo
            </button>
          </div>

          <div className="fade-in-up fade-in-up-delay-4" style={{ display: 'flex', gap: '2rem', marginTop: '1rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-subtle)' }}>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-main)' }}>50+</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Pays couverts</div>
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-main)' }}>800k+</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Analyses exécutées</div>
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#34d399' }}>99.8%</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Taux de précision</div>
            </div>
          </div>
        </div>

        {/* Hero Interactive Card Preview */}
        <div className="glass-panel glass-glow hover-lift fade-in-up fade-in-up-delay-3" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem' }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Product Compliance</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>🇯🇵 Japan — Cosmetics Check</div>
            </div>
            <span className="badge badge-action">
              <AlertTriangle size={12} /> 82% Ready
            </span>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', background: 'rgba(255,255,255,0.03)', padding: '0.85rem', borderRadius: '8px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '8px', background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
              FC
            </div>
            <div>
              <div style={{ fontWeight: 600 }}>Bio-Active Hydrating Face Cream</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>SKU: FC001-BIO • Category: Cosmetics</div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.875rem' }}>
              <CheckCircle2 size={16} color="#34d399" />
              <span>Informations produit & fabricant certifiées</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.875rem' }}>
              <CheckCircle2 size={16} color="#34d399" />
              <span>Titulaire de licence d'importation (LAH) identifié</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.875rem', color: '#fbbf24' }}>
              <AlertTriangle size={16} color="#fbbf24" />
              <span>Étiquetage obligatoire en Kanji/Katakana requis</span>
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.4rem', color: 'var(--text-muted)' }}>
              <span>Score de conformité globale</span>
              <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>82%</span>
            </div>
            <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '999px', overflow: 'hidden' }}>
              <div className="progress-bar-animated" style={{ '--target-width': '82%', height: '100%', background: 'linear-gradient(90deg, #f59e0b 0%, #34d399 100%)' } as React.CSSProperties} />
            </div>
          </div>
        </div>
      </section>

      {/* 2. SECTION "LE PROBLÈME" */}
      <section id="features" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', width: '100%', scrollMarginTop: '80px' }}>
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem auto' }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 700, marginBottom: '1rem' }}>
            Vendre dans un nouveau pays ne devrait pas nécessiter une équipe juridique.
          </h2>
          <p style={{ color: 'var(--text-muted)' }}>
            Les complexités réglementaires créent des goulots d'étranglement majeurs pour la croissance e-commerce transfrontalière.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
          <div className="glass-panel hover-lift" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(244, 63, 94, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f43f5e' }}>
              <Globe2 size={22} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>Réglementations complexes</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Chaque marché possède ses propres normes sanitaires, exigences d'étiquetage et règles douanières strictes.
            </p>
          </div>

          <div className="glass-panel hover-lift" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f59e0b' }}>
              <Layers size={22} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>Informations dispersées</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Les informations légales sont fragmentées entre plusieurs ministères, textes de lois opaques et organismes locaux.
            </p>
          </div>

          <div className="glass-panel hover-lift" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(59, 130, 246, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6' }}>
              <XCircle size={22} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>Risque d'erreur coûteux</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Une seule omission d'ingrédient ou un document douanier manquant peut bloquer définitivement des conteneurs à la frontière.
            </p>
          </div>
        </div>
      </section>

      {/* 3. SECTION "COMMENT ÇA MARCHE" */}
      <section id="how-it-works" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', width: '100%', scrollMarginTop: '80px' }}>
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem auto' }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            Comment ça marche
          </h2>
          <p style={{ color: 'var(--text-muted)' }}>
            Trois étapes simples pour sécuriser vos ventes mondiales
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
          <div className="glass-panel hover-lift" style={{ padding: '2rem', position: 'relative' }}>
            <div style={{ fontSize: '3rem', fontWeight: 800, color: 'rgba(59, 130, 246, 0.2)', marginBottom: '0.5rem' }}>01</div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>Connectez votre boutique</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Synchronisez votre catalogue en 1 clic depuis Shopify, WooCommerce, CSV ou API custom.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span className="badge badge-info"><Store size={10} /> Shopify</span>
              <span className="badge badge-info">WooCommerce</span>
              <span className="badge badge-info">CSV / API</span>
            </div>
          </div>

          <div className="glass-panel hover-lift" style={{ padding: '2rem', position: 'relative' }}>
            <div style={{ fontSize: '3rem', fontWeight: 800, color: 'rgba(59, 130, 246, 0.2)', marginBottom: '0.5rem' }}>02</div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>Sélectionnez vos marchés</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Choisissez les pays cibles pour lesquels vous souhaitez vérifier la conformité.
            </p>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '1.2rem' }}>🇯🇵</span>
              <span style={{ fontSize: '1.2rem' }}>🇧🇷</span>
              <span style={{ fontSize: '1.2rem' }}>🇺🇸</span>
              <span style={{ fontSize: '1.2rem' }}>🇨🇦</span>
              <span style={{ fontSize: '1.2rem' }}>🇦🇺</span>
              <span style={{ fontSize: '1.2rem' }}>🇪🇺</span>
            </div>
          </div>

          <div className="glass-panel hover-lift" style={{ padding: '2rem', position: 'relative' }}>
            <div style={{ fontSize: '3rem', fontWeight: 800, color: 'rgba(59, 130, 246, 0.2)', marginBottom: '0.5rem' }}>03</div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>Recevez votre analyse</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Obtenez le statut de conformité exact, le plan d'action et générez vos dossiers.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
              <span className="badge badge-ready" style={{ width: 'fit-content' }}><CheckCircle2 size={12} /> Conforme</span>
              <span className="badge badge-action" style={{ width: 'fit-content' }}><AlertTriangle size={12} /> Information manquante</span>
              <span className="badge badge-blocked" style={{ width: 'fit-content' }}><XCircle size={12} /> Non conforme</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SECTION "EXEMPLE CONCRET" */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', width: '100%' }}>
        <div className="glass-panel glass-glow hover-lift" style={{ padding: '2.5rem' }}>
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
            <div className="badge badge-info" style={{ marginBottom: '0.5rem' }}>Démo Interactive</div>
            <h2 style={{ fontSize: '2rem', fontWeight: 700 }}>Un produit. Trois marchés. Trois réglementations.</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.4rem' }}>
              Découvrez comment notre moteur de règles analyse une même crème cosmétique selon 3 juridictions.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem', alignItems: 'start' }}>
            {/* Product Card */}
            <div style={{ background: 'rgba(15,23,42,0.8)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Produit analysé</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginTop: '0.2rem' }}>Bio-Active Hydrating Face Cream</h3>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                Catégorie : <strong>Cosmétiques</strong><br />
                Origine : <strong>France 🇫🇷</strong><br />
                Ingrédients : Hyaluronic Acid, Glycerin, Simmondsia Chinensis Seed Oil.
              </div>

              <button
                className="btn btn-secondary btn-sm"
                style={{ width: '100%', marginTop: '1.25rem' }}
                onClick={() => setShowCaseStudyDetail(!showCaseStudyDetail)}
              >
                {showCaseStudyDetail ? 'Masquer la matrice' : 'Voir les détails complets'} <ChevronRight size={14} />
              </button>
            </div>

            {/* Market Status Selector */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  className={`btn ${selectedTab === 'FR' ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => setSelectedTab('FR')}
                >
                  🇫🇷 France (UE)
                </button>
                <button
                  className={`btn ${selectedTab === 'JP' ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => setSelectedTab('JP')}
                >
                  🇯🇵 Japon
                </button>
                <button
                  className={`btn ${selectedTab === 'BR' ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => setSelectedTab('BR')}
                >
                  🇧🇷 Brésil
                </button>
              </div>

              {/* Dynamic Market Inspection */}
              <div style={{ background: 'rgba(15,23,42,0.9)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                {selectedTab === 'FR' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className="badge badge-ready"><CheckCircle2 size={14} /> Conforme (100%)</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Règlement CE 1223/2009</span>
                    </div>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                      Le produit est fabriqué en France et possède un dossier CPNP actif valide pour toute la zone UE.
                    </p>
                  </div>
                )}

                {selectedTab === 'JP' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className="badge badge-action"><AlertTriangle size={14} /> Informations requises (82%)</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Loi PMDA Art. 61</span>
                    </div>
                    <ul style={{ fontSize: '0.875rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.5rem', listStyle: 'none' }}>
                      <li style={{ color: '#34d399' }}>✓ Titulaire de licence d'importation japonais (LAH) valide</li>
                      <li style={{ color: '#fbbf24' }}>⚠ Étiquetage physique obligatoire en Kanji/Katakana manquant</li>
                      <li style={{ color: '#34d399' }}>✓ Certificat d'absence de métaux lourds conforme</li>
                    </ul>
                  </div>
                )}

                {selectedTab === 'BR' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className="badge badge-blocked"><XCircle size={14} /> Non conforme / Bloqué (64%)</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>ANVISA RDC 752/2022</span>
                    </div>
                    <ul style={{ fontSize: '0.875rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.5rem', listStyle: 'none' }}>
                      <li style={{ color: '#f43f5e' }}>✕ Dossier d'enregistrement de produit ANVISA non déposé</li>
                      <li style={{ color: '#fbbf24' }}>⚠ Étiquette de protection consommateur en Portugais requise</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4.5. SECTION AVIS */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', width: '100%' }}>
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem auto' }}>
          <h2 className="fade-in-up" style={{ fontSize: '2.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            Ils nous font confiance
          </h2>
          <p className="fade-in-up fade-in-up-delay-1" style={{ color: 'var(--text-muted)' }}>
            Rejoignez plus de 200 000 utilisateurs qui sécurisent leurs ventes avec Comvera.
          </p>
          <div className="fade-in-up fade-in-up-delay-2" style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1rem', color: '#f59e0b' }}>
            {'★★★★★'.split('').map((star, i) => <span key={i} style={{ fontSize: '1.25rem' }}>{star}</span>)}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {[
            { name: 'Sarah L.', role: 'CEO, Beauté Bio', text: '"Comvera nous a fait gagner des mois de recherches juridiques pour notre lancement au Japon. Indispensable !"' },
            { name: 'Marc T.', role: 'Directeur Logistique', text: '"Fini les conteneurs bloqués à la douane. Les alertes de conformité sont précises et toujours à jour."' },
            { name: 'Elena G.', role: 'E-commerce Manager', text: '"La génération de rapports douaniers en un clic a complètement transformé notre workflow d\'expédition."' }
          ].map((avis, index) => (
            <div key={index} className="glass-panel hover-lift fade-in-up" style={{ padding: '2rem', animationDelay: `${index * 0.15}s` }}>
              <div style={{ color: '#f59e0b', fontSize: '1.2rem', marginBottom: '1rem' }}>★★★★★</div>
              <p style={{ color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: '1.5rem', lineHeight: 1.6 }}>{avis.text}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-blue) 0%, var(--accent-purple) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#fff' }}>
                  {avis.name.charAt(0)}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{avis.name}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>{avis.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. SECTION PRICING */}
      <section id="pricing" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', width: '100%', scrollMarginTop: '80px' }}>
        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            Simple, transparent pricing
          </h2>
          <p style={{ color: 'var(--text-muted)' }}>
            Start checking transactions for free. Upgrade as you grow.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
          {/* Free */}
          <div className="glass-panel hover-lift" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>Free Trial</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>For individuals testing the engine</div>
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: 800 }}>
              0€ <span style={{ fontSize: '0.9rem', fontWeight: 400, color: 'var(--text-muted)' }}>/ mois</span>
            </div>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem', color: 'var(--text-muted)', listStyle: 'none' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} color="#3b82f6" /> 5 compliance checks / month</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} color="#3b82f6" /> Standard sanctions screening</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} color="#3b82f6" /> PDF Reports generation</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} color="#3b82f6" /> Basic audit trail</li>
            </ul>
            <button className="btn btn-secondary" style={{ marginTop: 'auto' }} onClick={onOpenAuth}>
              Start for free
            </button>
          </div>

          {/* Starter */}
          <div className="glass-panel glass-glow hover-lift" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', position: 'relative', border: '1px solid var(--accent-blue)' }}>
            <div style={{ position: 'absolute', top: '-12px', right: '1.5rem', background: 'var(--accent-blue)', color: '#fff', padding: '0.15rem 0.65rem', borderRadius: '999px', fontSize: '0.7rem', fontWeight: 700 }}>POPULAIRE</div>
            <div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>Starter</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>Petites entreprises</div>
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: 800 }}>
              19€ <span style={{ fontSize: '0.9rem', fontWeight: 400, color: 'var(--text-muted)' }}>/ mois</span>
            </div>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem', color: 'var(--text-muted)', listStyle: 'none' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} color="#3b82f6" /> 50 analyses / mois</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} color="#3b82f6" /> Sanctions globales</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} color="#3b82f6" /> Evidence IDs</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} color="#3b82f6" /> Audit logs</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} color="#3b82f6" /> Support email</li>
            </ul>
            <a href="https://buy.stripe.com/test_aFaaEX5VI81S2R1dnR5AQ00" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ marginTop: 'auto', textDecoration: 'none' }}>
              Choisir Starter
            </a>
          </div>

          {/* Growth */}
          <div className="glass-panel hover-lift" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>Growth</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>Pour les équipes en croissance</div>
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: 800 }}>
              37€ <span style={{ fontSize: '0.9rem', fontWeight: 400, color: 'var(--text-muted)' }}>/ mois</span>
            </div>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem', color: 'var(--text-muted)', listStyle: 'none' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} color="#3b82f6" /> 150 analyses / mois</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} color="#3b82f6" /> Classification HS</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} color="#3b82f6" /> API access</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} color="#3b82f6" /> 3 utilisateurs</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} color="#3b82f6" /> Support prioritaire</li>
            </ul>
            <a href="https://buy.stripe.com/test_9B6cN5ck681S2R1abF5AQ01" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ marginTop: 'auto', textDecoration: 'none' }}>
              Choisir Growth
            </a>
          </div>

          {/* Business */}
          <div className="glass-panel hover-lift" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>Business</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>Professionnels du commerce</div>
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: 800 }}>
              59€ <span style={{ fontSize: '0.9rem', fontWeight: 400, color: 'var(--text-muted)' }}>/ mois</span>
            </div>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem', color: 'var(--text-muted)', listStyle: 'none' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} color="#3b82f6" /> 500 analyses / mois</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} color="#3b82f6" /> Analyse complète IA</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} color="#3b82f6" /> Utilisateurs illimités</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} color="#3b82f6" /> Webhooks sur mesure</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} color="#3b82f6" /> Support dédié 24/7</li>
            </ul>
            <a href="https://buy.stripe.com/test_00w9AT5VI3LCajt0B55AQ02" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ marginTop: 'auto', textDecoration: 'none' }}>
              Choisir Business
            </a>
          </div>
        </div>
      </section>
      {/* FAQ SECTION */}
      <section id="faq" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1.5rem', width: '100%', scrollMarginTop: '80px' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 className="fade-in-up" style={{ fontSize: '2.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            Questions fréquentes
          </h2>
          <p className="fade-in-up fade-in-up-delay-1" style={{ color: 'var(--text-muted)' }}>
            Tout ce que vous devez savoir pour démarrer avec Comvera.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[
            { q: 'Comment les données réglementaires sont-elles mises à jour ?', a: 'Notre moteur scrute en temps réel les journaux officiels de plus de 50 pays. Les règles de conformité sont mises à jour quotidiennement par notre IA et vérifiées par des experts.' },
            { q: 'Puis-je lier directement mon catalogue Shopify ?', a: 'Oui, l\'intégration Shopify se fait en un clic via notre API. Chaque nouveau produit ajouté à votre boutique est automatiquement analysé selon vos marchés cibles.' },
            { q: 'Les rapports générés ont-ils une valeur légale ?', a: 'Les rapports Comvera prouvent votre "due diligence" (diligence raisonnable). Ils sont reconnus par les douanes pour accélérer les contrôles, bien qu\'ils ne remplacent pas un conseiller juridique.' },
            { q: 'Puis-je annuler mon abonnement à tout moment ?', a: 'Absolument. Nos abonnements sont sans engagement. Vous pouvez annuler, mettre en pause ou changer de forfait directement depuis vos paramètres de facturation.' }
          ].map((faq, i) => (
            <div key={i} className="glass-panel fade-in-up" style={{ padding: '1.5rem', animationDelay: `${i * 0.1}s` }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <CheckCircle2 size={18} color="var(--accent-blue)" /> {faq.q}
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, paddingLeft: '1.9rem' }}>
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', width: '100%', scrollMarginTop: '80px' }}>
        <div className="glass-panel glass-glow fade-in-up" style={{ padding: '4rem 2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 700 }}>Prêt à conquérir de nouveaux marchés ?</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '600px' }}>
            Parlez à l'un de nos experts en conformité ou démarrez votre essai gratuit dès aujourd'hui.
          </p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button className="btn btn-primary btn-lg" onClick={onOpenAuth}>Démarrer gratuitement</button>
            <a href="mailto:hello.comvera@gmail.com" className="btn btn-secondary btn-lg" style={{ textDecoration: 'none' }}>Nous contacter</a>
          </div>
        </div>
      </section>

      {/* 6. SCROLLING MARQUEE TICKER */}
      <div className="marquee-container">
        <div className="marquee-track">
          {[...Array(2)].map((_, i) => (
            <React.Fragment key={i}>
              <span className="marquee-item"><span className="marquee-dot" /> Customs Compliance</span>
              <span className="marquee-item"><span className="marquee-dot" /> Sanctions Screening</span>
              <span className="marquee-item"><span className="marquee-dot" /> HS Classification</span>
              <span className="marquee-item"><span className="marquee-dot" /> Document Generation</span>
              <span className="marquee-item"><span className="marquee-dot" /> GDPR Compliance</span>
              <span className="marquee-item"><span className="marquee-dot" /> Risk Assessment</span>
              <span className="marquee-item"><span className="marquee-dot" /> Trade Intelligence</span>
              <span className="marquee-item"><span className="marquee-dot" /> Market Entry</span>
              <span className="marquee-item"><span className="marquee-dot" /> Cross-Border E-Commerce</span>
              <span className="marquee-item"><span className="marquee-dot" /> Regulatory Updates</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* 7. FOOTER SECTION */}
      <footer style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '4rem', marginTop: '2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '2rem' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', gridColumn: 'span 2' }}>
            <div className="brand-logo" style={{ marginBottom: '0.5rem' }}>
              <ShieldCheck size={24} color="var(--accent-blue)" /> Comvera
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <span className="badge badge-info" style={{ width: 'fit-content' }}>
                <CheckCircle2 size={12} /> GDPR Compliant
              </span>
              <span className="badge badge-ready" style={{ width: 'fit-content' }}>
                <ShieldCheck size={12} /> AICPA SOC 2 Type II
              </span>
            </div>
            <p style={{ color: 'var(--text-dim)', fontSize: '0.875rem', marginTop: '1rem' }}>
              © {new Date().getFullYear()} Comvera. All rights reserved.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <h4 style={{ color: 'var(--text-main)', fontWeight: 600, marginBottom: '0.5rem' }}>Platform</h4>
            <a href="#" style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Compliance Engine</a>
            <a href="#" style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Global Markets Hub</a>
            <a href="#" style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Document Generator</a>
            <a href="#" style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>API & Webhooks</a>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <h4 style={{ color: 'var(--text-main)', fontWeight: 600, marginBottom: '0.5rem' }}>Company</h4>
            <a href="#" style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>About Comvera</a>
            <a href="#" style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Case Studies</a>
            <a href="#" style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Partners Program</a>
            <a href="#" style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Contact Sales</a>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <h4 style={{ color: 'var(--text-main)', fontWeight: 600, marginBottom: '0.5rem' }}>Resources</h4>
            <a href="#" style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Global Trade Blog</a>
            <a href="#" style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Customs Documentation</a>
            <a href="#" style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Security & SOC 2</a>
            <a href="#" style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Privacy Policy</a>
            <a href="#" style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Terms of Service</a>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <h4 style={{ color: 'var(--text-main)', fontWeight: 600, marginBottom: '0.5rem' }}>Compare</h4>
            <a href="#" style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>vs Manual Legal Audit</a>
            <a href="#" style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>vs Agency Retainers</a>
            <a href="#" style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>vs Local Consultants</a>
          </div>

        </div>
      </footer>
    </div>
  );
};
