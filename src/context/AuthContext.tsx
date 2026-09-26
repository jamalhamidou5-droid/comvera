import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  role: 'client' | 'admin' | null;
  organizationId: string | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  role: null,
  organizationId: null,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<'client' | 'admin' | null>(null);
  const [organizationId, setOrganizationId] = useState<string | null>(null);

  useEffect(() => {
    // Bypass pour le mode développement (Mock)
    if (import.meta.env.VITE_SUPABASE_URL.includes('mock-project-id')) {
      setUser({ id: 'mock-user-123', email: 'test@comvera.com' } as User);
      setRole('client'); // Mettre 'admin' pour tester l'admin
      setOrganizationId('mock-org-123');
      setLoading(false);
      return;
    }

    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) fetchUserDetails(session.user.id);
      else {
        setLoading(false);
      }
    });

    // Listen for changes on auth state (log in, log out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) fetchUserDetails(session.user.id);
      else {
        setRole(null);
        setOrganizationId(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserDetails = async (userId: string) => {
    try {
      // 1. Fetch Global Admin status
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('is_global_admin')
        .eq('id', userId)
        .single();
        
      if (profile?.is_global_admin) {
        setRole('admin');
      } else {
        setRole('client');
      }

      // 2. Fetch Organization
      const { data: orgMember } = await supabase
        .from('organization_members')
        .select('organization_id')
        .eq('user_id', userId)
        .limit(1)
        .single();

      if (orgMember) {
        setOrganizationId(orgMember.organization_id);
      } else {
        setOrganizationId(null);
      }

    } catch (err) {
      console.error('Error fetching user details:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, role, organizationId }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
