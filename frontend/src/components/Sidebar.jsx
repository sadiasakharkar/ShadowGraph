import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const links = [
  ['Overview', '/app/overview', '01'],
  ['Face Scan', '/app/face-scan', '02'],
  ['Fake Detection', '/app/fake-detection', '03'],
  ['Username Scan', '/app/username-scan', '04'],
  ['Web Aggregation', '/app/scrape', '05'],
  ['Research Papers', '/app/research', '06'],
  ['Exposure Score', '/app/exposure-score', '07'],
  ['Breach Monitor', '/app/breach', '08'],
  ['Graph View', '/app/graph', '09'],
  ['Reports', '/app/reports', '10'],
  ['Ops Dashboard', '/app/ops', '11'],
  ['Settings', '/app/settings', '12']
];

function Brand() {
  return (
    <div className="mb-7 border-b border-white/10 pb-5">
      <p className="sg-kicker">ShadowGraph</p>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight">Digital Shadow Console</h2>
      <p className="mt-2 text-xs text-muted">Consent-based identity intelligence platform</p>
    </div>
  );
}

function NavItems({ onClick }) {
  return (
    <nav className="space-y-1.5">
      {links.map(([label, href, idx]) => (
        <NavLink
          key={href}
          to={href}
          onClick={onClick}
          className={({ isActive }) =>
            `group flex items-center justify-between rounded-xl border px-3 py-2.5 text-sm transition ${
              isActive
                ? 'border-accent/50 bg-accent/15 text-text shadow-[0_10px_24px_rgba(59,130,246,0.22)]'
                : 'border-transparent text-muted hover:border-white/10 hover:bg-surface/75 hover:text-text'
            }`
          }
        >
          <span>{label}</span>
          <span className="text-[10px] tracking-[0.18em] text-muted transition group-hover:text-cyan">{idx}</span>
        </NavLink>
      ))}
    </nav>
  );
}

export default function Sidebar({ mobile = false, onNavigate }) {
  const { user } = useAuth();

  return (
    <aside className={`${mobile ? 'w-full' : 'hidden h-[calc(100vh-2rem)] w-80 shrink-0 lg:block'} sg-card p-5`}>
      <Brand />
      <NavItems onClick={onNavigate} />
      <div className="mt-6 rounded-xl border border-white/10 bg-surface/70 p-3">
        <p className="text-[11px] uppercase tracking-[0.16em] text-muted">Signed In</p>
        <p className="mt-1 truncate text-sm">{user?.email || 'analyst@shadowgraph.ai'}</p>
      </div>
    </aside>
  );
}
