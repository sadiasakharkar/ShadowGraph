import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import GlassCard from '../components/GlassCard';
import { useAuth } from '../context/AuthContext';

const quickActions = [
  ['Run Face Scan', '/app/face-scan', 'Validate identity overlap across visual web surfaces.', 'Face'],
  ['Discover Usernames', '/app/username-scan', 'Find profile associations across major platforms.', 'Identity'],
  ['Check Breaches', '/app/breach', 'Audit known account exposure using breach intelligence.', 'Breach'],
  ['Open Graph', '/app/graph', 'View network-level topology of your digital shadow.', 'Graph']
];

const usage = [
  ['Face/Fake Scans', '18'],
  ['Username Runs', '27'],
  ['Research Queries', '12'],
  ['Breach Checks', '9']
];

export default function DashboardPage() {
  const { user } = useAuth();
  const displayName = user?.email?.split('@')?.[0] || 'Operator';

  return (
    <div>
      <PageHeader
        title="Overview"
        subtitle="Unified operational cockpit for digital shadow mapping, exposure detection, and response planning."
        actions={
          <Link to="/app/reports" className="sg-button-secondary">
            Open Reports
          </Link>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Profiles Correlated" value="34" hint="Across 18 platforms" />
        <StatCard title="Potential Breaches" value="2" hint="1 high-risk event" />
        <StatCard title="Research Records" value="6" hint="Indexed publication entities" />
        <StatCard title="Current Risk Score" value="67" hint="Moderate exposure" />
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-[1.35fr_1fr]">
        <GlassCard className="p-5 md:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="sg-kicker">Personalized Profile</p>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight">{displayName}</h3>
              <p className="mt-1 text-sm text-muted">{user?.email || 'analyst@shadowgraph.ai'}</p>
            </div>
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan/35 bg-cyan/10 text-lg">
              {displayName.slice(0, 2).toUpperCase()}
            </div>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {usage.map(([label, value]) => (
              <div key={label} className="rounded-xl border border-white/10 bg-surface/70 px-4 py-3">
                <p className="text-xs uppercase tracking-[0.14em] text-muted">{label}</p>
                <p className="mt-2 text-2xl font-semibold tracking-tight">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <Link to="/app/settings" className="sg-button-primary px-4 py-2.5">
              Edit Profile Settings
            </Link>
            <Link to="/app/exposure-score" className="sg-button-secondary px-4 py-2.5">
              Review Risk Vector
            </Link>
          </div>
        </GlassCard>

        <GlassCard className="p-5 md:p-6">
          <p className="sg-kicker">Live Modules</p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight">Interactive module previews</h3>
          <div className="mt-4 space-y-3">
            {quickActions.slice(0, 3).map(([title, href, desc]) => (
              <Link key={href} to={href} className="block rounded-xl border border-white/10 bg-surface/65 p-3 transition hover:border-cyan/35 hover:bg-surface/85">
                <p className="text-sm font-medium">{title}</p>
                <p className="mt-1 text-xs leading-6 text-muted">{desc}</p>
              </Link>
            ))}
          </div>
        </GlassCard>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {quickActions.map(([title, href, desc, badge], idx) => (
          <motion.div
            key={href}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <Link to={href}>
              <GlassCard className="h-full p-6 transition hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
                  <span className="sg-chip">{badge}</span>
                </div>
                <p className="mt-3 text-sm text-muted">{desc}</p>
              </GlassCard>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
