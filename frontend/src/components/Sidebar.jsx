import { NavLink } from 'react-router-dom';

const links = [
  ['Overview', '/app/overview'],
  ['Face Scan', '/app/face-scan'],
  ['Fake Detection', '/app/fake-detection'],
  ['Username Scan', '/app/username-scan'],
  ['Web Aggregation', '/app/scrape'],
  ['Research Papers', '/app/research'],
  ['Exposure Score', '/app/exposure-score'],
  ['Breach Monitor', '/app/breach'],
  ['Graph View', '/app/graph'],
  ['Reports', '/app/reports'],
  ['Ops Dashboard', '/app/ops'],
  ['Settings', '/app/settings']
];

function Brand() {
  return (
    <div className="mb-8">
      <p className="text-[11px] uppercase tracking-[0.28em] text-cyan">ShadowGraph</p>
      <h2 className="mt-1 text-xl font-semibold tracking-tight">Digital Footprint Intel</h2>
    </div>
  );
}

function NavItems({ onClick }) {
  return (
    <nav className="space-y-1.5">
      {links.map(([label, href]) => (
        <NavLink
          key={href}
          to={href}
          onClick={onClick}
          className={({ isActive }) =>
            `group block rounded-xl px-4 py-2.5 text-sm transition ${
              isActive ? 'bg-accent/90 text-text shadow-lg shadow-blue-500/20' : 'text-muted hover:bg-surface/70 hover:text-text'
            }`
          }
        >
          <span className="inline-block transition group-hover:translate-x-0.5">{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}

export default function Sidebar({ mobile = false, onNavigate }) {
  return (
    <aside className={`${mobile ? 'w-full' : 'hidden h-[calc(100vh-2rem)] w-72 shrink-0 lg:block'} glass-card rounded-2xl p-5`}>
      <Brand />
      <NavItems onClick={onNavigate} />
    </aside>
  );
}
