import GlassCard from './GlassCard';

export function ErrorState({ message, onRetry, className = '' }) {
  return (
    <GlassCard className={`p-6 text-center ${className}`}>
      <p className="text-sm text-red-300">{message}</p>
      {onRetry ? (
        <button onClick={onRetry} className="mt-3 rounded-xl bg-surface px-4 py-2 text-sm hover:border hover:border-cyan/30">
          Retry
        </button>
      ) : null}
    </GlassCard>
  );
}

export function EmptyState({ message, className = '' }) {
  return (
    <GlassCard className={`p-8 text-center text-sm text-muted ${className}`}>
      {message}
    </GlassCard>
  );
}
