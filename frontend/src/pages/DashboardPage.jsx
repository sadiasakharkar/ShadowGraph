import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import GlassCard from '../components/GlassCard';

const quickActions = [
  ['Run Face Scan', '/app/face-scan', 'Validate identity overlap across visual web surfaces.'],
  ['Discover Usernames', '/app/username-scan', 'Find profile associations across major platforms.'],
  ['Check Breaches', '/app/breach', 'Audit known account exposure using breach intelligence.']
];

export default function DashboardPage() {
  return (
    <div>
      <PageHeader
        title="Overview"
        subtitle="Unified operational cockpit for digital shadow mapping, exposure detection, and response planning."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Profiles Correlated" value="34" hint="Across 18 platforms" />
        <StatCard title="Potential Breaches" value="2" hint="1 high-risk event" />
        <StatCard title="Research Records" value="6" hint="Indexed publication entities" />
        <StatCard title="Current Risk Score" value="67" hint="Moderate exposure" />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {quickActions.map(([title, href, desc]) => (
          <Link key={href} to={href}>
            <GlassCard className="h-full rounded-2xl p-6 transition hover:-translate-y-1 hover:border-cyan/25">
              <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
              <p className="mt-2 text-sm text-muted">{desc}</p>
            </GlassCard>
          </Link>
        ))}
      </div>
    </div>
  );
}
