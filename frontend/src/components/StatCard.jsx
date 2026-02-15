import GlassCard from './GlassCard';

export default function StatCard({ title, value, hint }) {
  return (
    <GlassCard className="p-5">
      <p className="text-xs uppercase tracking-[0.16em] text-muted">{title}</p>
      <p className="mt-2 text-3xl font-semibold tracking-tight">{value}</p>
      <p className="mt-1 text-sm text-muted">{hint}</p>
    </GlassCard>
  );
}
