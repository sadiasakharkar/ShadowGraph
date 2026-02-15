import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Topbar({ onOpenMenu }) {
  const progress = useMemo(() => Math.floor(52 + Math.random() * 35), []);
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const logout = () => {
    signOut();
    navigate('/auth');
  };

  return (
    <header className="glass-card mb-6 rounded-2xl px-4 py-4 md:px-5">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button onClick={onOpenMenu} className="rounded-lg border border-white/10 bg-surface/80 px-3 py-2 text-sm lg:hidden">
            Menu
          </button>
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-muted">Active Intelligence</p>
            <h3 className="text-sm font-medium text-text md:text-base">Continuous footprint correlation</h3>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <button className="rounded-lg border border-white/10 bg-surface/85 px-3 py-2 text-sm text-muted transition hover:text-text">Alerts</button>
          <span className="hidden rounded-lg border border-white/10 bg-surface/85 px-3 py-2 text-sm text-muted md:inline">{user?.email || 'Profile'}</span>
          <button onClick={logout} className="rounded-lg border border-white/10 bg-surface/85 px-3 py-2 text-sm text-muted transition hover:text-text">
            Logout
          </button>
        </div>
      </div>

      <div className="mt-4">
        <div className="mb-1 flex items-center justify-between text-[11px] text-muted">
          <span>Scan Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-surface">
          <div className="h-full rounded-full bg-gradient-to-r from-accent via-blue-500 to-cyan transition-all duration-700" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </header>
  );
}
