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
          alignItems: 'center'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
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
            style={{
              fontSize: '3.2rem',
              fontWeight: 800,
              lineHeight: 1.15,
              background: 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Check any international transaction. Get explainable risk results in minutes.
          </h1>

          <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem', lineHeight: 1.6 }}>
            Comvera helps import/export businesses identify potential compliance risks, sanctions, and restricted parties, and document their review process instantly.
          </p>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
            <button className="btn btn-primary btn-lg" onClick={onOpenAuth}>
              Run your first check <ArrowRight size={18} />
            </button>
            <button className="btn btn-secondary btn-lg" onClick={onOpenAuth}>
              Voir la démo
            </button>
          </div>

          <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-subtle)' }}>
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
        <div className="glass-panel glass-glow" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
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
              <div style={{ width: '82%', height: '100%', background: 'linear-gradient(90deg, #f59e0b 0%, #34d399 100%)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* 2. SECTION "LE PROBLÈME" */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', width: '100%' }}>
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem auto' }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 700, marginBottom: '1rem' }}>
            Vendre dans un nouveau pays ne devrait pas nécessiter une équipe juridique.
          </h2>
          <p style={{ color: 'var(--text-muted)' }}>
            Les complexités réglementaires créent des goulots d'étranglement majeurs pour la croissance e-commerce transfrontalière.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
          <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(244, 63, 94, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f43f5e' }}>
              <Globe2 size={22} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>Réglementations complexes</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Chaque marché possède ses propres normes sanitaires, exigences d'étiquetage et règles douanières strictes.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f59e0b' }}>
              <Layers size={22} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>Informations dispersées</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Les informations légales sont fragmentées entre plusieurs ministères, textes de lois opaques et organismes locaux.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', width: '100%' }}>
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem auto' }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            Comment ça marche
          </h2>
          <p style={{ color: 'var(--text-muted)' }}>
            Trois étapes simples pour sécuriser vos ventes mondiales
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
          <div className="glass-panel" style={{ padding: '2rem', position: 'relative' }}>
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

          <div className="glass-panel" style={{ padding: '2rem', position: 'relative' }}>
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

          <div className="glass-panel" style={{ padding: '2rem', position: 'relative' }}>
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
        <div className="glass-panel glass-glow" style={{ padding: '2.5rem' }}>
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

      {/* 5. SECTION PRICING */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', width: '100%' }}>
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
          <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
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
          <div className="glass-panel glass-glow" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', position: 'relative', border: '1px solid var(--accent-blue)' }}>
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
            <button className="btn btn-primary" style={{ marginTop: 'auto' }} onClick={onOpenAuth}>
              Choisir Starter
            </button>
          </div>

          {/* Growth */}
          <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
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
            <button className="btn btn-secondary" style={{ marginTop: 'auto' }} onClick={onOpenAuth}>
              Choisir Growth
            </button>
          </div>

          {/* Business */}
          <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
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
            <button className="btn btn-secondary" style={{ marginTop: 'auto' }} onClick={onOpenAuth}>
              Choisir Business
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
