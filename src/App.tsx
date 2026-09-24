import React, { useState, useMemo } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { AppMode, ClientTab, AdminTab, UniversalProduct } from './types';
import { MOCK_PRODUCTS } from './data/mockData';
import { evaluateAllProducts } from './engine/complianceEngine';
import { useAuth } from './context/AuthContext';
import { supabase } from './lib/supabase';

// Auth Components
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { AdminRoute } from './components/auth/AdminRoute';

// Components
import { Navigation } from './components/Navigation';
import { LandingPage } from './components/public/LandingPage';
import { AuthModal } from './components/public/AuthModal';
import { OnboardingWizard } from './components/client/OnboardingWizard';
import { DashboardOverview } from './components/client/DashboardOverview';
import { ProductsCatalog } from './components/client/ProductsCatalog';
import { ProductDetailModal } from './components/client/ProductDetailModal';
import { MarketsHub } from './components/client/MarketsHub';
import { ComplianceCenter } from './components/client/ComplianceCenter';
import { DocumentGenerator } from './components/client/DocumentGenerator';
import { AlertsView } from './components/client/AlertsView';
import { IntegrationsView } from './components/client/IntegrationsView';
import { BillingSettings } from './components/client/BillingSettings';

// Admin Components
import { AdminDashboard } from './components/admin/AdminDashboard';
import { RegulationsManager } from './components/admin/RegulationsManager';
import { RulesEngineEditor } from './components/admin/RulesEngineEditor';
import { AuditLogsView } from './components/admin/AuditLogsView';

// Sidebar Icons
import {
  LayoutDashboard,
  Package,
  ShieldAlert,
  Globe2,
  FileText,
  Bell,
  Zap,
  Settings,
  Database,
  History,
  Users
} from 'lucide-react';

export const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, role } = useAuth();
  
  // State for Navigation / Layout
  // We deduce "mode" for Navigation component based on current route
  const currentMode = location.pathname.startsWith('/admin') ? 'admin' 
                    : location.pathname.startsWith('/dashboard') ? 'client'
                    : location.pathname === '/onboarding' ? 'onboarding'
                    : 'public';

  const [clientTab, setClientTab] = useState<ClientTab>('overview');
  const [adminTab, setAdminTab] = useState<AdminTab>('overview');
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const [products, setProducts] = useState<UniversalProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<UniversalProduct | null>(null);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  React.useEffect(() => {
    const fetchProducts = async () => {
      if (!user) {
        setProducts(MOCK_PRODUCTS); // Pour la démo non connectée
        setIsLoadingProducts(false);
        return;
      }
      
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        
        if (data && data.length > 0) {
          const formattedProducts = data.map(item => ({
            id: item.id,
            sku: item.sku,
            name: item.name,
            description: item.description,
            category: item.category,
            subcategory: item.subcategory,
            brand: item.brand,
            manufacturer: item.manufacturer,
            countryOfOrigin: item.country_of_origin,
            ingredients: item.ingredients,
            materials: item.materials,
            weight: item.weight,
            weightUnit: item.weight_unit,
            packagingType: item.packaging_type,
            targetMarkets: item.target_markets,
            certifications: item.certifications,
            languageLabels: item.language_labels,
            hasLocalImporterRecord: item.has_local_importer_record,
            hasProductRegistration: item.has_product_registration,
            lastAnalyzedAt: item.last_analyzed_at,
            syncedFrom: item.synced_from
          }));
          setProducts(formattedProducts as UniversalProduct[]);
        } else {
          setProducts([]);
        }
      } catch (err) {
        console.error('Erreur Supabase:', err);
      } finally {
        setIsLoadingProducts(false);
      }
    };

    fetchProducts();
  }, [user]);

  const reports = useMemo(() => evaluateAllProducts(products), [products]);

  const handleUpdateProduct = (updated: UniversalProduct) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    setSelectedProduct(updated);
  };

  const handleAddProduct = (newProduct: UniversalProduct) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  return (
    <div className="app-container">
      <Navigation
        mode={currentMode}
        setMode={(m) => {
          if (m === 'admin') navigate('/admin');
          if (m === 'client') navigate('/dashboard');
          if (m === 'public') navigate('/');
        }}
        clientTab={clientTab}
        setClientTab={setClientTab}
        adminTab={adminTab}
        setAdminTab={setAdminTab}
        onOpenAuth={() => setIsAuthOpen(true)}
        role={role}
        isLoggedIn={!!user}
        onSignOut={async () => {
          await supabase.auth.signOut();
          navigate('/');
        }}
      />

      <Routes>
        {/* Public Routes */}
        <Route 
          path="/" 
          element={
            <LandingPage
              onStartOnboarding={() => navigate('/onboarding')}
              onOpenAuth={() => setIsAuthOpen(true)}
            />
          } 
        />
        
        {/* Could also protect onboarding if user must be signed up first */}
        <Route path="/onboarding" element={<OnboardingWizard onComplete={() => navigate('/dashboard')} />} />

        {/* Protected Client Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={
            <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', minHeight: 'calc(100vh - 65px)' }}>
              {/* Sidebar Nav */}
              <aside
                style={{
                  background: 'rgba(9, 13, 22, 0.95)',
                  borderRight: '1px solid var(--border-subtle)',
                  padding: '1.5rem 1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem'
                }}
              >
                <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontWeight: 700, paddingLeft: '0.75rem', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                  MERCHANT PLATFORM
                </div>

                <button
                  className={`mode-btn ${clientTab === 'overview' ? 'active' : ''}`}
                  style={{ borderRadius: '8px', padding: '0.65rem 0.85rem' }}
                  onClick={() => setClientTab('overview')}
                >
                  <LayoutDashboard size={18} /> Overview
                </button>

                <button
                  className={`mode-btn ${clientTab === 'products' ? 'active' : ''}`}
                  style={{ borderRadius: '8px', padding: '0.65rem 0.85rem' }}
                  onClick={() => setClientTab('products')}
                >
                  <Package size={18} /> Products ({products.length})
                </button>

                <button
                  className={`mode-btn ${clientTab === 'compliance' ? 'active' : ''}`}
                  style={{ borderRadius: '8px', padding: '0.65rem 0.85rem' }}
                  onClick={() => setClientTab('compliance')}
                >
                  <ShieldAlert size={18} /> Compliance Center
                </button>

                <button
                  className={`mode-btn ${clientTab === 'markets' ? 'active' : ''}`}
                  style={{ borderRadius: '8px', padding: '0.65rem 0.85rem' }}
                  onClick={() => setClientTab('markets')}
                >
                  <Globe2 size={18} /> Markets Hub
                </button>

                <button
                  className={`mode-btn ${clientTab === 'documents' ? 'active' : ''}`}
                  style={{ borderRadius: '8px', padding: '0.65rem 0.85rem' }}
                  onClick={() => setClientTab('documents')}
                >
                  <FileText size={18} /> Document Generator
                </button>

                <button
                  className={`mode-btn ${clientTab === 'alerts' ? 'active' : ''}`}
                  style={{ borderRadius: '8px', padding: '0.65rem 0.85rem' }}
                  onClick={() => setClientTab('alerts')}
                >
                  <Bell size={18} /> Regulatory Alerts
                </button>

                <button
                  className={`mode-btn ${clientTab === 'integrations' ? 'active' : ''}`}
                  style={{ borderRadius: '8px', padding: '0.65rem 0.85rem' }}
                  onClick={() => setClientTab('integrations')}
                >
                  <Zap size={18} /> Integrations
                </button>

                <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
                  <button
                    className={`mode-btn ${clientTab === 'settings' ? 'active' : ''}`}
                    style={{ borderRadius: '8px', padding: '0.65rem 0.85rem', width: '100%' }}
                    onClick={() => setClientTab('settings')}
                  >
                    <Settings size={18} /> Settings & Billing
                  </button>
                </div>
              </aside>

              <main style={{ padding: '2rem 2.5rem' }}>
                {clientTab === 'overview' && (
                  <DashboardOverview
                    reports={reports}
                    setClientTab={setClientTab}
                    onSelectProduct={(id) => {
                      const p = products.find((prod) => prod.id === id);
                      if (p) setSelectedProduct(p);
                    }}
                  />
                )}
                {clientTab === 'products' && (
                  <ProductsCatalog
                    products={products}
                    reports={reports}
                    onSelectProduct={(p) => setSelectedProduct(p)}
                    onAddProduct={handleAddProduct}
                    onSyncShopify={() => alert('Sync started')}
                  />
                )}
                {clientTab === 'compliance' && (
                  <ComplianceCenter
                    products={products}
                    reports={reports}
                    onSelectProduct={(p) => setSelectedProduct(p)}
                  />
                )}
                {clientTab === 'markets' && <MarketsHub />}
                {clientTab === 'documents' && <DocumentGenerator products={products} />}
                {clientTab === 'alerts' && <AlertsView setClientTab={setClientTab} />}
                {clientTab === 'integrations' && <IntegrationsView />}
                {clientTab === 'settings' && <BillingSettings />}
              </main>
            </div>
          } />
        </Route>

        {/* Protected Admin Routes */}
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={
            <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', minHeight: 'calc(100vh - 65px)' }}>
              <aside
                style={{
                  background: 'rgba(9, 13, 22, 0.95)',
                  borderRight: '1px solid var(--border-subtle)',
                  padding: '1.5rem 1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem'
                }}
              >
                <div style={{ fontSize: '0.7rem', color: 'var(--accent-purple)', fontWeight: 700, paddingLeft: '0.75rem', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                  CREATOR ADMIN
                </div>

                <button
                  className={`mode-btn ${adminTab === 'overview' ? 'active' : ''}`}
                  style={{ borderRadius: '8px', padding: '0.65rem 0.85rem' }}
                  onClick={() => setAdminTab('overview')}
                >
                  <LayoutDashboard size={18} /> Platform Overview
                </button>

                <button
                  className={`mode-btn ${adminTab === 'regulations' ? 'active' : ''}`}
                  style={{ borderRadius: '8px', padding: '0.65rem 0.85rem' }}
                  onClick={() => setAdminTab('regulations')}
                >
                  <Database size={18} /> Regulatory Database
                </button>

                <button
                  className={`mode-btn ${adminTab === 'rules' ? 'active' : ''}`}
                  style={{ borderRadius: '8px', padding: '0.65rem 0.85rem' }}
                  onClick={() => setAdminTab('rules')}
                >
                  <Zap size={18} /> Rules Engine Editor
                </button>

                <button
                  className={`mode-btn ${adminTab === 'audit' ? 'active' : ''}`}
                  style={{ borderRadius: '8px', padding: '0.65rem 0.85rem' }}
                  onClick={() => setAdminTab('audit')}
                >
                  <History size={18} /> Audit Trail Logs
                </button>
              </aside>

              <main style={{ padding: '2rem 2.5rem' }}>
                {adminTab === 'overview' && <AdminDashboard />}
                {adminTab === 'regulations' && <RegulationsManager />}
                {adminTab === 'rules' && <RulesEngineEditor />}
                {adminTab === 'audit' && <AuditLogsView />}
              </main>
            </div>
          } />
        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Selected Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          report={reports[selectedProduct.id]}
          onClose={() => setSelectedProduct(null)}
          onUpdateProduct={handleUpdateProduct}
        />
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={() => {
          setIsAuthOpen(false);
          // Le ProtectedRoute nous redirigera ou nous pourrons appeler navigate('/dashboard') dans onSuccess si on a géré le login Supabase.
          navigate('/dashboard');
        }}
      />
    </div>
  );
};

export default App;
