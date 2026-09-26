import React, { useEffect, useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';

interface AuditLog {
  id: string;
  user_id: string | null;
  action: string;
  resource_type: string;
  resource_id: string | null;
  created_at: string;
}

export const AuditLogsView: React.FC = () => {
  const { organizationId } = useAuth();
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!organizationId) {
      setLoading(false);
      return;
    }

    const loadLogs = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('audit_logs')
        .select('*')
        .eq('organization_id', organizationId)
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) {
        console.error(error);
      } else {
        setLogs(data || []);
      }
      setLoading(false);
    };

    loadLogs();
  }, [organizationId]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Immutable Compliance Audit Logs</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Journal d'audit traçant l'ensemble des actions, analyses exécutées et modifications du système.
        </p>
      </div>

      <div className="glass-panel table-container">
        <table>
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Resource Type</th>
              <th>User ID</th>
              <th>Action</th>
              <th>Resource ID</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '2rem' }}>Loading audit logs...</td>
              </tr>
            ) : logs.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '2rem' }}>No audit activity yet.</td>
              </tr>
            ) : (
              logs.map((log) => (
                <tr key={log.id}>
                  <td>
                    <code>{new Date(log.created_at).toLocaleString()}</code>
                  </td>
                  <td>
                    <span className="badge badge-info">{log.resource_type}</span>
                  </td>
                  <td>{log.user_id || 'System'}</td>
                  <td>{log.action}</td>
                  <td>{log.resource_id || '—'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
