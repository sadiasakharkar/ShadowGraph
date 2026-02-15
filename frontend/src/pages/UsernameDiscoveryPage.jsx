import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import GlassCard from '../components/GlassCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { EmptyState, ErrorState } from '../components/AsyncState';
import { scanUsername } from '../services/endpoints';
import { getDisplayError } from '../services/apiErrors';
import { useToast } from '../context/ToastContext';

export default function UsernameDiscoveryPage() {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [rows, setRows] = useState([]);
  const [error, setError] = useState('');
  const { info, success, error: showError } = useToast();

  const run = async () => {
    if (!username.trim()) {
      info('Enter a username to scan.');
      return;
    }

    setLoading(true);
    setError('');
    setRows([]);
    setProgress(0);

    const timer = setInterval(() => {
      setProgress((value) => (value >= 93 ? value : value + 7));
    }, 140);

    try {
      const result = await scanUsername(username.trim());
      setRows(result);
      success('Username scan completed.');
    } catch (err) {
      const message = getDisplayError(err, 'Failed to scan username.');
      setError(message);
      showError(message);
    } finally {
      clearInterval(timer);
      setProgress(100);
      setLoading(false);
    }
  };

  return (
    <div>
      <PageHeader title="Username Discovery" subtitle="Search platform presence and profile footprint using alias-based correlation." />

      <GlassCard className="p-5">
        <div className="flex flex-col gap-3 md:flex-row">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            className="flex-1 rounded-xl border border-white/10 bg-surface/80 px-4 py-3 text-sm outline-none transition focus:border-accent"
          />
          <button onClick={run} className="flex min-w-56 items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 text-sm font-medium">
            {loading ? <LoadingSpinner /> : null}
            Scan Across Platforms
          </button>
        </div>

        <div className="mt-4 h-2 overflow-hidden rounded-full bg-surface">
          <div className="h-full rounded-full bg-gradient-to-r from-accent to-cyan transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>

        {error ? <ErrorState className="mt-5" message={error} onRetry={run} /> : null}

        {!error ? (
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[680px] text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-muted">
                  <th className="pb-2">Platform</th>
                  <th className="pb-2">Username</th>
                  <th className="pb-2">Status</th>
                  <th className="pb-2">Profile Link</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.platform} className="border-b border-white/5">
                    <td className="py-3">{row.platform}</td>
                    <td className="py-3">{row.username}</td>
                    <td className={`py-3 ${row.status === 'Found' ? 'text-cyan' : 'text-muted'}`}>{row.status}</td>
                    <td className="py-3">{row.link === '-' ? '-' : <a className="text-accent hover:underline" href={row.link}>{row.link}</a>}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {!rows.length && !loading ? <EmptyState className="mt-3" message="Enter a username and launch scan." /> : null}
          </div>
        ) : null}
      </GlassCard>
    </div>
  );
}
