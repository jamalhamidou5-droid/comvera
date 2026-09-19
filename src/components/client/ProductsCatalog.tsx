import React, { useState } from 'react';
import {
  Search,
  Filter,
  Plus,
  RefreshCw,
  Eye,
  Play,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Tag
} from 'lucide-react';
import { UniversalProduct, ProductComplianceReport } from '../../types';

interface ProductsCatalogProps {
  products: UniversalProduct[];
  reports: Record<string, ProductComplianceReport>;
  onSelectProduct: (product: UniversalProduct) => void;
  onAddProduct: (product: UniversalProduct) => void;
  onSyncShopify: () => void;
}

export const ProductsCatalog: React.FC<ProductsCatalogProps> = ({
  products,
  reports,
  onSelectProduct,
  onAddProduct,
  onSyncShopify
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedMarket, setSelectedMarket] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [isSyncing, setIsSyncing] = useState(false);

  // New Product Modal Form State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProductName, setNewProductName] = useState('');
  const [newSku, setNewSku] = useState('');
  const [newCategory, setNewCategory] = useState('Cosmetics');
  const [newWeight, setNewWeight] = useState(200);

  const handleSyncClick = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      onSyncShopify();
    }, 1200);
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const newProd: UniversalProduct = {
      id: `prod-${Date.now()}`,
      sku: newSku || `SKU-${Math.floor(Math.random() * 1000)}`,
      name: newProductName || 'New Universal Product',
      description: 'Newly registered item ready for multi-market compliance analysis.',
      category: newCategory,
      subcategory: 'General',
      brand: 'Acme Brand',
      manufacturer: 'Laboratoires BioFrance S.A.',
      countryOfOrigin: 'France',
      ingredients: ['Aqua', 'Glycerin'],
      materials: ['Glass Jar'],
      weight: newWeight,
      weightUnit: 'g',
      packagingType: 'Standard Box',
      targetMarkets: ['JP', 'BR', 'US'],
      certifications: ['GMP Certified'],
      languageLabels: { en: true },
      syncedFrom: 'Manual'
    };
    onAddProduct(newProd);
    setShowAddModal(false);
    setNewProductName('');
    setNewSku('');
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesMarket = selectedMarket === 'All' || p.targetMarkets.includes(selectedMarket);

    const report = reports[p.id];
    const status = report ? report.overallStatus : 'READY';
    const matchesStatus = selectedStatus === 'All' || status === selectedStatus;

    return matchesSearch && matchesCategory && matchesMarket && matchesStatus;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Products Catalogue</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Gestion et normalisation de vos articles e-commerce pour l'analyse multi-marchés.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            className="btn btn-secondary"
            onClick={handleSyncClick}
            disabled={isSyncing}
          >
            <RefreshCw size={16} className={isSyncing ? 'spin' : ''} />
            {isSyncing ? 'Syncing Shopify...' : 'Sync Shopify Store'}
          </button>
          <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
            <Plus size={16} /> Add Product
          </button>
        </div>
      </div>

      {/* Filter controls */}
      <div
        className="glass-panel"
        style={{
          padding: '1rem',
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: '1rem',
          alignItems: 'center'
        }}
      >
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            className="input-field"
            placeholder="Search by product name, SKU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ paddingLeft: '2.5rem' }}
          />
          <Search size={16} style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
        </div>

        <select
          className="select-field"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Cosmetics">Cosmetics</option>
          <option value="Food">Food & Supplements</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
        </select>

        <select
          className="select-field"
          value={selectedMarket}
          onChange={(e) => setSelectedMarket(e.target.value)}
        >
          <option value="All">All Markets</option>
          <option value="JP">🇯🇵 Japan</option>
          <option value="BR">🇧🇷 Brazil</option>
          <option value="US">🇺🇸 USA</option>
          <option value="CA">🇨🇦 Canada</option>
          <option value="EU">🇪🇺 European Union</option>
        </select>

        <select
          className="select-field"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="READY">✓ Ready</option>
          <option value="ACTION_REQUIRED">⚠ Action Required</option>
          <option value="BLOCKED">✕ Blocked</option>
        </select>
      </div>

      {/* Product Table */}
      <div className="glass-panel table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>SKU</th>
              <th>Category</th>
              <th>Markets</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => {
              const report = reports[product.id];
              const status = report ? report.overallStatus : 'READY';

              return (
                <tr key={product.id}>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontWeight: 600 }}>{product.name}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                        Origin: {product.countryOfOrigin} • Synced: {product.syncedFrom || 'Shopify'}
                      </span>
                    </div>
                  </td>
                  <td>
                    <code style={{ fontSize: '0.8rem', background: 'rgba(255,255,255,0.06)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>
                      {product.sku}
                    </code>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>{product.category}</span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.35rem' }}>
                      {product.targetMarkets.map((m) => (
                        <span key={m} style={{ fontSize: '1.1rem' }} title={m}>
                          {m === 'JP' ? '🇯🇵' : m === 'BR' ? '🇧🇷' : m === 'US' ? '🇺🇸' : m === 'CA' ? '🇨🇦' : m === 'AU' ? '🇦🇺' : '🇪🇺'}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td>
                    {status === 'READY' && (
                      <span className="badge badge-ready">
                        <CheckCircle2 size={12} /> Ready
                      </span>
                    )}
                    {status === 'ACTION_REQUIRED' && (
                      <span className="badge badge-action">
                        <AlertTriangle size={12} /> Review
                      </span>
                    )}
                    {status === 'BLOCKED' && (
                      <span className="badge badge-blocked">
                        <XCircle size={12} /> Blocked
                      </span>
                    )}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => onSelectProduct(product)}
                    >
                      <Eye size={14} /> View Details
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Add New Universal Product</h3>

            <form onSubmit={handleCreateProduct} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="input-group">
                <label className="input-label">Product Name</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g. Organic Matcha Green Tea"
                  value={newProductName}
                  onChange={(e) => setNewProductName(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <label className="input-label">SKU</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g. TEA-005-MAT"
                  value={newSku}
                  onChange={(e) => setNewSku(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <label className="input-label">Category</label>
                <select className="select-field" value={newCategory} onChange={(e) => setNewCategory(e.target.value)}>
                  <option value="Cosmetics">Cosmetics</option>
                  <option value="Food">Food & Dietary Supplements</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Clothing">Clothing</option>
                </select>
              </div>

              <div className="input-group">
                <label className="input-label">Net Weight (grams)</label>
                <input
                  type="number"
                  className="input-field"
                  value={newWeight}
                  onChange={(e) => setNewWeight(Number(e.target.value))}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Create Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
