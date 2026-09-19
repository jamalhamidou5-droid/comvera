import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
  FileText,
  Wrench,
  ChevronRight
} from 'lucide-react';
import { UniversalProduct, ProductComplianceReport } from '../../types';

interface ProductDetailModalProps {
  product: UniversalProduct | null;
  report: ProductComplianceReport | null;
  onClose: () => void;
  onUpdateProduct: (updated: UniversalProduct) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  report,
  onClose,
  onUpdateProduct
}) => {
  const [selectedMarketTab, setSelectedMarketTab] = useState<string>('JP');
  const [showResolutionDrawer, setShowResolutionDrawer] = useState(false);
  const [activeMissingField, setActiveMissingField] = useState<string | null>(null);

  // Resolution Form Inputs
  const [resolvedText, setResolvedText] = useState('');

  if (!product || !report) return null;

  const currentMarketSummary = report.marketSummaries[selectedMarketTab] || Object.values(report.marketSummaries)[0];

  const handleResolveIssue = (fieldKey: string) => {
    setActiveMissingField(fieldKey);
    setShowResolutionDrawer(true);
  };

  const handleSaveResolution = () => {
    if (!product) return;

    const updated = { ...product };

    if (activeMissingField === 'languageLabels.ja') {
      updated.languageLabels = { ...updated.languageLabels, ja: true };
    } else if (activeMissingField === 'languageLabels.pt') {
      updated.languageLabels = { ...updated.languageLabels, pt: true };
    } else if (activeMissingField === 'hasLocalImporterRecord.JP') {
      updated.hasLocalImporterRecord = { ...updated.hasLocalImporterRecord, JP: true };
    } else if (activeMissingField === 'hasProductRegistration.BR') {
      updated.hasProductRegistration = { ...updated.hasProductRegistration, BR: true };
    } else if (activeMissingField === 'hasProductRegistration.US') {
      updated.hasProductRegistration = { ...updated.hasProductRegistration, US: true };
    }

    onUpdateProduct(updated);
    setShowResolutionDrawer(false);
    setActiveMissingField(null);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '900px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>{product.name}</h2>
              <code style={{ fontSize: '0.8rem', background: 'rgba(255,255,255,0.06)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                {product.sku}
              </code>
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              Category: <strong>{product.category}</strong> • Manufacturer: <strong>{product.manufacturer}</strong> ({product.countryOfOrigin})
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}>
            <X size={22} />
          </button>
        </div>

        {/* Universal Product Attributes Grid */}
        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', fontSize: '0.85rem' }}>
          <div>
            <div style={{ color: 'var(--text-dim)', fontSize: '0.75rem' }}>Ingredients</div>
            <div style={{ fontWeight: 600 }}>{product.ingredients.join(', ') || 'N/A'}</div>
          </div>
          <div>
            <div style={{ color: 'var(--text-dim)', fontSize: '0.75rem' }}>Net Weight</div>
            <div style={{ fontWeight: 600 }}>{product.weight} {product.weightUnit}</div>
          </div>
          <div>
            <div style={{ color: 'var(--text-dim)', fontSize: '0.75rem' }}>Packaging</div>
            <div style={{ fontWeight: 600 }}>{product.packagingType}</div>
          </div>
          <div>
            <div style={{ color: 'var(--text-dim)', fontSize: '0.75rem' }}>Certifications</div>
            <div style={{ fontWeight: 600 }}>{product.certifications.join(', ')}</div>
          </div>
        </div>

        {/* Compliance Tabs */}
        <div>
          <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
            {product.targetMarkets.map((mCode) => {
              const summary = report.marketSummaries[mCode];
              const flag = mCode === 'JP' ? '🇯🇵' : mCode === 'BR' ? '🇧🇷' : mCode === 'US' ? '🇺🇸' : mCode === 'CA' ? '🇨🇦' : '🌐';
              const isActive = selectedMarketTab === mCode;

              return (
                <button
                  key={mCode}
                  className={`btn ${isActive ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                  onClick={() => setSelectedMarketTab(mCode)}
                >
                  <span>{flag}</span> {mCode}
                  {summary && (
                    <span
                      style={{
                        fontSize: '0.7rem',
                        padding: '0.1rem 0.4rem',
                        borderRadius: '999px',
                        background: summary.status === 'READY' ? 'rgba(16, 185, 129, 0.3)' : summary.status === 'ACTION_REQUIRED' ? 'rgba(245, 158, 11, 0.3)' : 'rgba(244, 63, 94, 0.3)'
                      }}
                    >
                      {summary.score}%
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Current Market Rule Tree */}
          {currentMarketSummary ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(15,23,42,0.8)', padding: '0.85rem', borderRadius: '8px' }}>
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Market Status</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.1rem' }}>
                    <span style={{ fontSize: '1.2rem' }}>{currentMarketSummary.flag}</span>
                    <span style={{ fontWeight: 700 }}>{currentMarketSummary.marketName} Compliance Score</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  {currentMarketSummary.status === 'READY' && (
                    <span className="badge badge-ready"><CheckCircle2 size={12} /> READY (100%)</span>
                  )}
                  {currentMarketSummary.status === 'ACTION_REQUIRED' && (
                    <span className="badge badge-action"><AlertTriangle size={12} /> ACTION REQUIRED ({currentMarketSummary.score}%)</span>
                  )}
                  {currentMarketSummary.status === 'BLOCKED' && (
                    <span className="badge badge-blocked"><XCircle size={12} /> BLOCKED ({currentMarketSummary.score}%)</span>
                  )}
                </div>
              </div>

              {/* Evaluations */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {currentMarketSummary.evaluations.map((evalItem) => (
                  <div
                    key={evalItem.ruleId}
                    style={{
                      padding: '1rem',
                      borderRadius: '8px',
                      background: evalItem.passed ? 'rgba(16, 185, 129, 0.05)' : evalItem.severity === 'BLOCKING' ? 'rgba(244, 63, 94, 0.08)' : 'rgba(245, 158, 11, 0.08)',
                      border: `1px solid ${evalItem.passed ? 'rgba(16, 185, 129, 0.2)' : evalItem.severity === 'BLOCKING' ? 'rgba(244, 63, 94, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {evalItem.passed ? (
                          <CheckCircle2 size={18} color="#34d399" />
                        ) : evalItem.severity === 'BLOCKING' ? (
                          <XCircle size={18} color="#f43f5e" />
                        ) : (
                          <AlertTriangle size={18} color="#fbbf24" />
                        )}
                        <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{evalItem.ruleTitle}</span>
                        <code style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>[{evalItem.ruleId} v{evalItem.version}]</code>
                      </div>

                      <a
                        href={evalItem.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        style={{ fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}
                      >
                        {evalItem.legalReference} <ExternalLink size={12} />
                      </a>
                    </div>

                    {!evalItem.passed && (
                      <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.75rem', borderRadius: '6px', fontSize: '0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <div style={{ color: '#f8fafc', fontWeight: 500 }}>{evalItem.issueDetails}</div>
                          <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.2rem' }}>
                            <strong>Action:</strong> {evalItem.actionRequired}
                          </div>
                        </div>

                        {evalItem.missingField && (
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => handleResolveIssue(evalItem.missingField!)}
                          >
                            <Wrench size={14} /> Resolve Issue
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-dim)' }}>
              Aucune règle configurée pour ce marché.
            </div>
          )}
        </div>

        {/* Resolution Drawer Modal */}
        {showResolutionDrawer && (
          <div className="modal-overlay" style={{ zIndex: 120 }}>
            <div className="modal-content" style={{ maxWidth: '500px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Resolve Compliance Requirement</h3>
                <button onClick={() => setShowResolutionDrawer(false)} style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}>
                  <X size={18} />
                </button>
              </div>

              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Requirement key: <code>{activeMissingField}</code>
              </p>

              <div className="input-group">
                <label className="input-label">Provide Resolution Data / License Number / Document Attachment</label>
                <textarea
                  className="textarea-field"
                  rows={4}
                  placeholder="e.g. Japanese Kanji Label file verified & Primary Importer License #JP-LAH-8821 confirmed."
                  value={resolvedText}
                  onChange={(e) => setResolvedText(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button className="btn btn-secondary btn-sm" onClick={() => setShowResolutionDrawer(false)}>
                  Cancel
                </button>
                <button className="btn btn-primary btn-sm" onClick={handleSaveResolution}>
                  Confirm & Re-evaluate Rules
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
