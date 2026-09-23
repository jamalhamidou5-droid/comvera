import React, { useState } from 'react';
import { X, Lock, Mail, Building, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [company, setCompany] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (isSignUp) {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });
        if (signUpError) throw signUpError;
        
        // Si Supabase demande de confirmer l'email, la session sera nulle
        if (data.user && !data.session) {
          setError("Compte créé avec succès ! Veuillez vérifier vos e-mails pour le confirmer avant de vous connecter.");
          setIsLoading(false);
          return;
        }
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) throw signInError;
      }
      
      onSuccess();
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Une erreur est survenue lors de l\'authentification.');
    } finally {
      setIsLoading(false);
    }
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

        {error && (
          <div style={{ marginTop: '1rem', padding: '0.75rem', borderRadius: '8px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: error ? '1rem' : '1.5rem' }}>
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

          <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem', padding: '0.75rem' }} disabled={isLoading}>
            {isLoading ? <Loader2 size={16} className="animate-spin" /> : (isSignUp ? 'Créer le compte' : 'Se connecter')}
            {!isLoading && <ArrowRight size={16} />}
          </button>
        </form>

        <div style={{ textAlign: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          {isSignUp ? (
            <>
              Déjà un compte ?{' '}
              <span
                style={{ color: 'var(--accent-blue)', cursor: 'pointer', fontWeight: 600 }}
                onClick={() => { setIsSignUp(false); setError(null); }}
              >
                Se connecter
              </span>
            </>
          ) : (
            <>
              Pas encore de compte ?{' '}
              <span
                style={{ color: 'var(--accent-blue)', cursor: 'pointer', fontWeight: 600 }}
                onClick={() => { setIsSignUp(true); setError(null); }}
              >
                Créer un compte
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
