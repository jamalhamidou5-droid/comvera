import React, { useState } from 'react';
import { Store, RefreshCw, CheckCircle2, XCircle, Code, Zap, Upload, Link2, AlertTriangle } from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  description: string;
  status: 'connected' | 'available' | 'error';
  domain?: string;
  productsSynced?: number;
  lastSync?: string;
}

const INITIAL_INTEGRATIONS: Integration[] = [
  {
    id: 'shopify',
    name: 'Shopify',
    icon: <Store size={22} />,
    color: '#34d399',
    bgColor: 'rgba(16, 185, 129, 0.15)',
    description: 'Sync automatique OAuth 2.0 avec votre boutique Shopify.',
    status: 'connected',
    domain: 'acme-store.myshopify.com',
    productsSynced: 1248,
    lastSync: 'Il y a 2 minutes',
  },
  {
    id: 'woocommerce',
    name: 'WooCommerce',
    icon: <Code size={22} />,
    color: '#8b5cf6',
    bgColor: 'rgba(139, 92, 246, 0.15)',
    description: 'Connectez votre instance WooCommerce via l\'API REST v3 de WordPress pour synchroniser vos attributs produits.',
    status: 'available',
  },
  {
    id: 'csv',
    name: 'Upload CSV',
    icon: <Upload size={22} />,
    color: '#f59e0b',
    bgColor: 'rgba(245, 158, 11, 0.15)',
    description: 'Importez manuellement votre catalogue de produits au format CSV (SKU, nom, catégorie, ingrédients…).',
    status: 'available',
  },
  {
    id: 'api',
    name: 'Custom API',
    icon: <Zap size={22} />,
    color: '#06b6d4',
    bgColor: 'rgba(6, 182, 212, 0.15)',
    description: 'Intégration directe ERP / PIM via notre API REST avec authentification par clé API.',
    status: 'available',
  },
];

export const IntegrationsView: React.FC = () => {
  const [integrations, setIntegrations] = useState<Integration[]>(INITIAL_INTEGRATIONS);
  const [syncingId, setSyncingId] = useState<string | null>(null);
  const [connectingId, setConnectingId] = useState<string | null>(null);
  const [showConnectModal, setShowConnectModal] = useState<string | null>(null);
  const [connectUrl, setConnectUrl] = useState('');
  const [connectKey, setConnectKey] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSyncNow = (id: string) => {
    setSyncingId(id);
    setTimeout(() => {
      setSyncingId(null);
      setIntegrations((prev) =>
        prev.map((i) =>
          i.id === id
            ? { ...i, lastSync: 'À l\'instant', productsSynced: (i.productsSynced || 0) + Math.floor(Math.random() * 15) }
            : i
        )
      );
      showToast(`✓ Synchronisation ${id} terminée avec succès !`);
    }, 1500);
  };

  const handleDisconnect = (id: string) => {
    setIntegrations((prev) =>
      prev.map((i) =>
        i.id === id
          ? { ...i, status: 'available' as const, domain: undefined, productsSynced: undefined, lastSync: undefined }
          : i
      )
    );
    showToast(`⚠ ${id.charAt(0).toUpperCase() + id.slice(1)} déconnecté.`);
  };

  const handleConnect = (id: string) => {
    setShowConnectModal(id);
    setConnectUrl('');
    setConnectKey('');
  };

  const handleSubmitConnect = () => {
    if (!showConnectModal) return;
    const id = showConnectModal;
    setConnectingId(id);

    setTimeout(() => {
      setIntegrations((prev) =>
        prev.map((i) =>
          i.id === id
            ? {
                ...i,
                status: 'connected' as const,
                domain: connectUrl || `${id}-store.example.com`,
                productsSynced: Math.floor(Math.random() * 500) + 100,
                lastSync: 'À l\'instant',
              }
            : i
        )
      );
      setConnectingId(null);
      setShowConnectModal(null);
      showToast(`✓ ${id.charAt(0).toUpperCase() + id.slice(1)} connecté avec succès !`);
    }, 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Store & Platform Integrations</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Connecteurs e-commerce pour l'importation continue et la synchronisation de vos fiches produits.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {integrations.map((integration) => (
          <div
            key={integration.id}
            className={`glass-panel ${integration.status === 'connected' ? 'glass-glow' : ''}`}
            style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
          >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    background: integration.bgColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: integration.color,
                  }}
                >
                  {integration.icon}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{integration.name}</h3>
                  {integration.status === 'connected' ? (
                    <span className="badge badge-ready">
                      <CheckCircle2 size={12} /> Connected
                    </span>
                  ) : (
                    <span className="badge badge-info">Available</span>
                  )}
                </div>
              </div>
            </div>

            {/* Details for connected integrations */}
            {integration.status === 'connected' ? (
              <>
                <div
                  style={{
                    background: 'rgba(15,23,42,0.8)',
                    padding: '1rem',
                    borderRadius: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    fontSize: '0.85rem',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-dim)' }}>Store Domain:</span>
                    <code style={{ color: integration.color }}>{integration.domain}</code>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-dim)' }}>Products Synced:</span>
                    <strong style={{ color: 'var(--text-main)' }}>
                      {integration.productsSynced?.toLocaleString()} items
                    </strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-dim)' }}>Last Sync:</span>
                    <span>{integration.lastSync}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleSyncNow(integration.id)}
                    disabled={syncingId === integration.id}
                  >
                    <RefreshCw
                      size={14}
                      style={syncingId === integration.id ? { animation: 'spin 1s linear infinite' } : {}}
                    />
                    {syncingId === integration.id ? 'Syncing...' : 'Sync Now'}
                  </button>
                  <button
                    className="btn btn-secondary btn-sm"
                    style={{ color: '#f43f5e' }}
                    onClick={() => handleDisconnect(integration.id)}
                  >
                    <XCircle size={14} /> Disconnect
                  </button>
                </div>
              </>
            ) : (
              <>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', flexGrow: 1 }}>
                  {integration.description}
                </p>
                <button
                  className="btn btn-secondary"
                  style={{ width: 'fit-content', marginTop: 'auto' }}
                  onClick={() => handleConnect(integration.id)}
                >
                  <Link2 size={14} /> Connect {integration.name}
                </button>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Connection Modal */}
      {showConnectModal && (
        <div className="modal-overlay" onClick={() => setShowConnectModal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Link2 size={20} color="var(--accent-blue)" />
              Connecter {showConnectModal.charAt(0).toUpperCase() + showConnectModal.slice(1)}
            </h2>

            <div className="input-group">
              <label className="input-label">URL / Domaine de la boutique</label>
              <input
                className="input-field"
                type="text"
                placeholder="ex: ma-boutique.myshopify.com"
                value={connectUrl}
                onChange={(e) => setConnectUrl(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label className="input-label">Clé API / Token d'accès</label>
              <input
                className="input-field"
                type="password"
                placeholder="shpat_xxxxxxxxxxxx"
                value={connectKey}
                onChange={(e) => setConnectKey(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
              <button className="btn btn-secondary" onClick={() => setShowConnectModal(null)}>
                Annuler
              </button>
              <button
                className="btn btn-primary"
                onClick={handleSubmitConnect}
                disabled={connectingId !== null}
              >
                {connectingId ? (
                  <>
                    <RefreshCw size={14} style={{ animation: 'spin 1s linear infinite' }} /> Connexion en cours...
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={14} /> Confirmer la connexion
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            background: 'rgba(15, 23, 42, 0.95)',
            border: '1px solid var(--border-glow)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem 1.5rem',
            color: 'var(--text-main)',
            fontSize: '0.9rem',
            fontWeight: 600,
            boxShadow: 'var(--shadow-glow)',
            animation: 'fadeIn 0.3s ease-out',
            zIndex: 200,
          }}
        >
          {toastMessage}
        </div>
      )}
    </div>
  );
};
