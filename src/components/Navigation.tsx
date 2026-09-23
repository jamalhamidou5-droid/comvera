import React from 'react';
import { AppMode, ClientTab, AdminTab } from '../types';
import { ShieldCheck, LayoutDashboard, Database, UserCheck, Sparkles } from 'lucide-react';

interface NavigationProps {
  mode: AppMode;
  setMode: (mode: AppMode) => void;
  clientTab: ClientTab;
  setClientTab: (tab: ClientTab) => void;
  adminTab: AdminTab;
  setAdminTab: (tab: AdminTab) => void;
  onOpenAuth: () => void;
  role?: 'client' | 'admin' | null;
  isLoggedIn?: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({
  mode,
  setMode,
  onOpenAuth,
  role,
  isLoggedIn
}) => {
  return (
    <nav className="top-nav">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <div
          className="brand-logo"
          style={{ cursor: 'pointer' }}
          onClick={() => setMode('public')}
        >
          <ShieldCheck size={26} color="#3b82f6" />
          <span>Comvera</span>
          <span
            style={{
              fontSize: '0.65rem',
              background: 'rgba(59, 130, 246, 0.2)',
              color: '#60a5fa',
              padding: '0.15rem 0.45rem',
              borderRadius: '999px',
              fontWeight: 600,
              letterSpacing: '0.05em'
            }}
          >
            CaaS v2.4
          </span>
        </div>
      </div>

      {/* Mode Switcher */}
      <div className="mode-pill-selector">
        <button
          className={`mode-btn ${mode === 'public' ? 'active' : ''}`}
          onClick={() => setMode('public')}
        >
          <Sparkles size={14} />
          Landing Site
        </button>
        <button
          className={`mode-btn ${mode === 'onboarding' ? 'active' : ''}`}
          onClick={() => setMode('onboarding')}
        >
          <UserCheck size={14} />
          Onboarding
        </button>
        {isLoggedIn && (
          <button
            className={`mode-btn ${mode === 'client' ? 'active' : ''}`}
            onClick={() => setMode('client')}
          >
            <LayoutDashboard size={14} />
            Dashboard Client
          </button>
        )}
        {role === 'admin' && (
          <button
            className={`mode-btn ${mode === 'admin' ? 'active' : ''}`}
            onClick={() => setMode('admin')}
          >
            <Database size={14} />
            Admin Platform
          </button>
        )}
      </div>

      {/* Right side CTA */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        {mode === 'public' ? (
          <>
            <button className="btn btn-secondary btn-sm" onClick={onOpenAuth}>
              Log In
            </button>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => setMode('onboarding')}
            >
              Analyze My Store
            </button>
          </>
        ) : (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              background: 'rgba(255,255,255,0.05)',
              padding: '0.35rem 0.75rem',
              borderRadius: '8px',
              fontSize: '0.8rem'
            }}
          >
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#10b981'
              }}
            />
            <span style={{ fontWeight: 600 }}>Acme Global Store</span>
            <span style={{ color: 'var(--text-dim)', fontSize: '0.725rem' }}>
              (Growth Plan)
            </span>
          </div>
        )}
      </div>
    </nav>
  );
};
