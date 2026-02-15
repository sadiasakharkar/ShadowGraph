import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import PageHeader from '../components/PageHeader';
import LoadingSpinner from '../components/LoadingSpinner';
import { ErrorState } from '../components/AsyncState';
import { getDisplayError } from '../services/apiErrors';
import { getProfileDashboard } from '../services/endpoints';

export default function ProfileDashboardPage({ embedded = false }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      setData(await getProfileDashboard());
    } catch (err) {
      setError(getDisplayError(err, 'Could not load profile dashboard.'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      {!embedded ? <PageHeader title="User Profile & Dashboard" subtitle="Your editable profile, live stats, and activity overview." /> : null}
      {error ? <ErrorState message={error} onRetry={load} /> : null}
      {loading ? (
        <div className="rounded-xl border border-white/10 bg-surface/70 p-4 text-sm text-muted">
          <LoadingSpinner /> Loading your profile dashboard...
        </div>
      ) : null}
      {!loading && !error && data ? (
        <div className="grid gap-4 xl:grid-cols-[1.2fr_1fr]">
          <GlassCard className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="sg-kicker">Profile</p>
                <h3 className="mt-2 text-2xl font-semibold">{data.profile.name}</h3>
                <p className="text-sm text-muted">{data.profile.email}</p>
                <p className="mt-1 text-xs text-muted">Member since: {new Date(data.profile.member_since).toLocaleDateString()}</p>
              </div>
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-[#00BFFF]/45 bg-[#00BFFF]/15 text-sm">
                {String(data.profile.name || 'U').slice(0, 2).toUpperCase()}
              </div>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                ['Accounts Found', data.stats.accounts_found],
                ['Platforms', data.stats.platforms],
                ['Publications', data.stats.papers],
                ['Breach Records', data.stats.breaches]
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl border border-white/10 bg-surface/70 p-3">
                  <p className="text-xs uppercase tracking-[0.16em] text-muted">{label}</p>
                  <p className="mt-2 text-2xl font-semibold">{value}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link to="/app/settings" className="sg-button-secondary px-4 py-2 text-sm">Edit Profile</Link>
              <Link to="/app/reports" className="sg-button-primary px-4 py-2 text-sm">Open Reports</Link>
            </div>
          </GlassCard>

          <GlassCard className="p-5">
            <h3 className="text-lg font-semibold">Activity overview (last 30 days)</h3>
            <div className="mt-3 space-y-2">
              {(data.activity || []).slice(-12).map((row) => (
                <div key={row.date}>
                  <div className="mb-1 flex items-center justify-between text-xs text-muted">
                    <span>{row.date}</span>
                    <span>{row.count}</span>
                  </div>
                  <div className="h-2 rounded bg-white/10">
                    <div className="h-2 rounded bg-gradient-to-r from-[#00BFFF] to-[#1ED760]" style={{ width: `${Math.min(100, row.count * 12)}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-5 xl:col-span-2">
            <h3 className="text-lg font-semibold">Top platforms</h3>
            <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {(data.top_profiles || []).map((row) => (
                <div key={`${row.platform}-${row.profile_url}`} className="rounded-xl border border-white/10 bg-surface/70 p-3">
                  <p className="text-sm font-medium">{row.platform}</p>
                  <p className="text-xs text-muted">@{row.username || 'unknown'}</p>
                  <a href={row.profile_url} className="mt-2 block truncate text-xs text-accent hover:underline">{row.profile_url}</a>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      ) : null}
    </div>
  );
}
