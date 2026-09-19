import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Loader2 } from 'lucide-react';

export const ProtectedRoute: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'var(--bg-main)' }}>
        <Loader2 className="animate-spin" size={32} color="var(--accent-blue)" />
      </div>
    );
  }

  // Si non connecté (ou mode mock inactif pour une vraie prod), redirige vers home
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
