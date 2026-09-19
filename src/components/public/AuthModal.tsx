import React, { useState } from 'react';
import { X, Lock, Mail, Building, ArrowRight } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('alexandre@acmestore.com');
  const [password, setPassword] = useState('••••••••••••');
  const [company, setCompany] = useState('Acme Store');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '440px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>
            {isSignUp ? 'Create your Comvera account' : 'Log in to your account'}
          </h3>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {isSignUp && (
            <div className="input-group">
              <label className="input-label">Company Name</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Acme International Ltd"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  style={{ paddingLeft: '2.5rem' }}
                />
                <Building size={16} style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
              </div>
            </div>
          )}

          <div className="input-group">
            <label className="input-label">Work Email</label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                className="input-field"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ paddingLeft: '2.5rem' }}
                required
              />
              <Mail size={16} style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                className="input-field"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ paddingLeft: '2.5rem' }}
                required
              />
              <Lock size={16} style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem', padding: '0.75rem' }}>
            {isSignUp ? 'Create Account' : 'Log In'} <ArrowRight size={16} />
          </button>
        </form>

        <div style={{ textAlign: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          {isSignUp ? (
            <>
              Already have an account?{' '}
              <span
                style={{ color: 'var(--accent-blue)', cursor: 'pointer', fontWeight: 600 }}
                onClick={() => setIsSignUp(false)}
              >
                Log in
              </span>
            </>
          ) : (
            <>
              Don't have an account yet?{' '}
              <span
                style={{ color: 'var(--accent-blue)', cursor: 'pointer', fontWeight: 600 }}
                onClick={() => setIsSignUp(true)}
              >
                Sign up
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
