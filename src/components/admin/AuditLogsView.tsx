import React, { useState, useEffect } from 'react';
import { ShieldCheck, History, Filter, Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';

export const AuditLogsView: React.FC = () => {
  const { user } = useAuth();
  const [logs, setLogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, [user]);

  const fetchLogs = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('audit_logs')
        .select(`
          id,
          action,
          resource_type,
          details,
          ip_address,
          created_at,
          user_id
        `)
        .order('created_at', { ascending: false })
        .limit(50);
        
      if (error) throw error;
      setLogs(data || []);
    } catch (err) {
      console.error('Failed to fetch audit logs', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Immutable Compliance Audit Logs</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Journal d'audit traçant l'ensemble des actions, analyses exécutées et modifications du système.
        </p>
      </div>

      <div className="glass-panel table-container">
        {isLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
            <Loader2 className="animate-spin" size={32} color="var(--accent-blue)" />
          </div>
        ) : logs.length === 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
            <AlertCircle size={48} style={{ opacity: 0.5, marginBottom: '1rem' }} />
            <p>Aucun log d'audit trouvé.</p>
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Timestamp (UTC)</th>
                <th>Resource Type</th>
                <th>User ID</th>
                <th>Action</th>
                <th>Details</th>
                <th>IP Address</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id}>
                  <td>
                    <code style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                      {new Date(log.created_at).toLocaleString()}
                    </code>
                  </td>
                  <td>
                    <span className="badge badge-info">{log.resource_type || 'System'}</span>
                  </td>
                  <td>
                    <span style={{ fontWeight: 500, fontSize: '0.75rem', fontFamily: 'monospace' }}>
                      {log.user_id ? log.user_id.substring(0, 8) + '...' : 'System'}
                    </span>
                  </td>
                  <td>
                    <span style={{ fontWeight: 600 }}>{log.action}</span>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {log.details ? JSON.stringify(log.details) : 'N/A'}
                    </span>
                  </td>
                  <td>
                    <code style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{log.ip_address || 'N/A'}</code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
