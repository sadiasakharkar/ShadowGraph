import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import GlassCard from '../components/GlassCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { ErrorState } from '../components/AsyncState';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';
import { deleteAccount, exportPdfReport, getSettings, saveSettings } from '../services/endpoints';
import { getDisplayError } from '../services/apiErrors';

const defaultSettings = {
  profile_visible: true,
  allow_aggregation: true,
  breach_alerts: true,
  light_theme: false
};

export default function SettingsPage() {
  const [settings, setSettings] = useState(defaultSettings);
  const [loading, setLoading] = useState(false);
  const [savingKey, setSavingKey] = useState('');
  const [error, setError] = useState('');
  const [busyAction, setBusyAction] = useState('');
  const { info, success, error: toastError } = useToast();
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const load = async () => {
    setError('');
    setLoading(true);
    try {
      const data = await getSettings();
      setSettings(data);
      document.body.classList.toggle('light', Boolean(data.light_theme));
    } catch (err) {
      const message = getDisplayError(err, 'Failed to load settings.');
      setError(message);
      toastError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const toggle = async (key) => {
    const next = { ...settings, [key]: !settings[key] };
    setSettings(next);
    setSavingKey(key);
    try {
      const saved = await saveSettings(next);
      setSettings(saved);
      if (key === 'light_theme') {
        document.body.classList.toggle('light', Boolean(saved.light_theme));
      }
      success('Setting updated');
    } catch (err) {
      setSettings(settings);
      const message = getDisplayError(err, 'Failed to save setting.');
      toastError(message);
    } finally {
      setSavingKey('');
    }
  };

  const onExport = async () => {
    try {
      setBusyAction('export');
      const blob = await exportPdfReport();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'shadowgraph-report.pdf';
      link.click();
      URL.revokeObjectURL(url);
      success('Report download started');
    } catch (err) {
      toastError(getDisplayError(err, 'Failed to export report.'));
    } finally {
      setBusyAction('');
    }
  };

  const onDelete = async () => {
    const ok = window.confirm('Delete your account and all scan history? This cannot be undone.');
    if (!ok) return;

    try {
      setBusyAction('delete');
      await deleteAccount();
      signOut();
      info('Account deleted');
      navigate('/auth', { replace: true });
    } catch (err) {
      toastError(getDisplayError(err, 'Failed to delete account.'));
    } finally {
      setBusyAction('');
    }
  };

  return (
    <div>
      <PageHeader title="Settings" subtitle="Manage consent, privacy controls, account actions, and report export." />

      {error ? <ErrorState message={error} onRetry={load} /> : null}
      {loading ? (
        <div className="rounded-xl border border-white/10 bg-surface/70 p-4 text-sm text-muted">
          <LoadingSpinner /> Loading settings...
        </div>
      ) : null}

      {!loading && !error ? (
        <div className="grid gap-4 xl:grid-cols-2">
          <GlassCard className="space-y-3 p-5">
            {[
              ['profile_visible', 'Public profile scanning consent'],
              ['allow_aggregation', 'Allow data aggregation'],
              ['breach_alerts', 'Breach alert notifications'],
              ['light_theme', 'Light theme mode']
            ].map(([key, label]) => (
              <label key={key} className="flex items-center justify-between rounded-xl border border-white/10 bg-surface/70 p-3 text-sm">
                <span>{label}</span>
                <button
                  type="button"
                  disabled={savingKey === key}
                  onClick={() => toggle(key)}
                  className={`relative h-6 w-11 rounded-full transition ${settings[key] ? 'bg-accent' : 'bg-white/20'}`}
                >
                  <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${settings[key] ? 'left-5' : 'left-0.5'}`} />
                </button>
              </label>
            ))}
          </GlassCard>

          <GlassCard className="space-y-3 p-5">
            <button
              onClick={onExport}
              disabled={busyAction === 'export'}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-surface px-4 py-3 text-sm transition hover:border hover:border-cyan/30"
            >
              {busyAction === 'export' ? <LoadingSpinner /> : null}
              Export Report (PDF)
            </button>
            <button
              onClick={onDelete}
              disabled={busyAction === 'delete'}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500/20 px-4 py-3 text-sm text-red-200 transition hover:bg-red-500/30"
            >
              {busyAction === 'delete' ? <LoadingSpinner /> : null}
              Delete Account
            </button>
          </GlassCard>
        </div>
      ) : null}
    </div>
  );
}
