import React, { useState } from 'react';
import { FileText, Download, Printer, Plus, CheckCircle2, Eye, FileCheck } from 'lucide-react';
import { ComplianceDocument, UniversalProduct } from '../../types';
import { MOCK_DOCUMENTS } from '../../data/mockData';

interface DocumentGeneratorProps {
  products: UniversalProduct[];
}

export const DocumentGenerator: React.FC<DocumentGeneratorProps> = ({ products }) => {
  const [documents, setDocuments] = useState<ComplianceDocument[]>(MOCK_DOCUMENTS);
  const [activePreviewDoc, setActivePreviewDoc] = useState<ComplianceDocument | null>(MOCK_DOCUMENTS[0]);

  // Generator Modal State
  const [showModal, setShowModal] = useState(false);
  const [selectedDocType, setSelectedDocType] = useState<ComplianceDocument['documentType']>('japanese_label_dossier');
  const [selectedCountry, setSelectedCountry] = useState('JP');
  const [selectedProductId, setSelectedProductId] = useState(products[0]?.id || 'prod-001');

  const handleGenerateDoc = (e: React.FormEvent) => {
    e.preventDefault();
    const prod = products.find((p) => p.id === selectedProductId) || products[0];

    const newDoc: ComplianceDocument = {
      id: `doc-${Date.now()}`,
      documentType: selectedDocType,
      title: `${selectedDocType === 'japanese_label_dossier' ? 'Japanese Label Specs' : selectedDocType === 'anvisa_import_dossier' ? 'ANVISA Import Dossier' : 'Compliance Declaration'} — ${prod.name}`,
      countryCode: selectedCountry,
      productId: prod.id,
      productName: prod.name,
      status: 'Ready',
      generatedAt: new Date().toISOString(),
      contentMarkdown: `# OFFICIAL COMPLIANCE DECLARATION FOR CUSTOMS
**Product:** ${prod.name}  
**SKU:** ${prod.sku}  
**Country of Origin:** ${prod.countryOfOrigin}  
**Target Market:** ${selectedCountry}  

---

### 1. Product Technical Details
- **Brand:** ${prod.brand}
- **Manufacturer:** ${prod.manufacturer}
- **Category:** ${prod.category} (${prod.subcategory})
- **Ingredients:** ${prod.ingredients.join(', ')}
- **Net Quantity:** ${prod.weight} ${prod.weightUnit}

### 2. Legal Statement
This product has been checked against the Comvera Regulatory Knowledge Base for ${selectedCountry}. All required safety disclosures, manufacturer records, and localized labeling templates have been verified.

*Certified by Comvera Engine v2.4 on ${new Date().toLocaleDateString()}*
`
    };

    setDocuments([newDoc, ...documents]);
    setActivePreviewDoc(newDoc);
    setShowModal(false);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Document Generator</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Génération automatique de déclarations douanières, dossiers d'étiquetage et rapports certifiés.
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={16} /> Generate Document
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.8fr', gap: '1.5rem' }}>
        {/* Document List */}
        <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Generated Documents</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {documents.map((doc) => {
              const isSelected = activePreviewDoc?.id === doc.id;
              return (
                <div
                  key={doc.id}
                  style={{
                    padding: '1rem',
                    borderRadius: '8px',
                    background: isSelected ? 'rgba(59, 130, 246, 0.12)' : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${isSelected ? 'var(--accent-blue)' : 'var(--border-subtle)'}`,
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.35rem'
                  }}
                  onClick={() => setActivePreviewDoc(doc)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{doc.title}</span>
                    <span className="badge badge-ready">{doc.status}</span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'flex', gap: '0.75rem' }}>
                    <span>Country: {doc.countryCode === 'JP' ? '🇯🇵 Japan' : '🇧🇷 Brazil'}</span>
                    <span>Created: {new Date(doc.generatedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Document Preview */}
        <div className="glass-panel print-area" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {activePreviewDoc ? (
            <>
              <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FileCheck size={20} color="var(--accent-blue)" />
                  <span style={{ fontWeight: 700 }}>Document Preview</span>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button className="btn btn-secondary btn-sm" onClick={handlePrint}>
                    <Printer size={14} /> Print PDF
                  </button>
                  <button className="btn btn-primary btn-sm" onClick={handlePrint}>
                    <Download size={14} /> Download PDF
                  </button>
                </div>
              </div>

              {/* Rendered Document */}
              <div
                style={{
                  background: '#ffffff',
                  color: '#0f172a',
                  padding: '2.5rem',
                  borderRadius: '8px',
                  fontFamily: 'serif',
                  lineHeight: 1.6,
                  boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
                  fontSize: '0.95rem'
                }}
              >
                <div style={{ borderBottom: '2px solid #0f172a', paddingBottom: '1rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, textTransform: 'uppercase' }}>COMVERA COMPLIANCE CERTIFICATE</h2>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>International Customs & Trade Dossier</div>
                  </div>
                  <div style={{ textAlign: 'right', fontSize: '0.8rem' }}>
                    <div>Ref: {activePreviewDoc.id}</div>
                    <div>Date: {new Date(activePreviewDoc.generatedAt).toLocaleDateString()}</div>
                  </div>
                </div>

                <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', margin: 0 }}>
                  {activePreviewDoc.contentMarkdown}
                </pre>
              </div>
            </>
          ) : (
            <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-dim)' }}>
              Sélectionnez un document à prévisualiser.
            </div>
          )}
        </div>
      </div>

      {/* Generate Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Generate Compliance Document</h3>

            <form onSubmit={handleGenerateDoc} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="input-group">
                <label className="input-label">Document Type</label>
                <select className="select-field" value={selectedDocType} onChange={(e) => setSelectedDocType(e.target.value as any)}>
                  <option value="japanese_label_dossier">Japanese Label Specs & Importer Dossier (JP)</option>
                  <option value="anvisa_import_dossier">ANVISA Sanitary Import Registration Dossier (BR)</option>
                  <option value="compliance_report">Product Compliance Report & Audit Summary</option>
                  <option value="product_declaration">Manufacturer Certificate of Origin & Safety Declaration</option>
                </select>
              </div>

              <div className="input-group">
                <label className="input-label">Destination Country</label>
                <select className="select-field" value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
                  <option value="JP">🇯🇵 Japan</option>
                  <option value="BR">🇧🇷 Brazil</option>
                  <option value="US">🇺🇸 United States</option>
                  <option value="CA">🇨🇦 Canada</option>
                  <option value="EU">🇪🇺 European Union</option>
                </select>
              </div>

              <div className="input-group">
                <label className="input-label">Target Product</label>
                <select className="select-field" value={selectedProductId} onChange={(e) => setSelectedProductId(e.target.value)}>
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.sku})
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Generate PDF Dossier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
