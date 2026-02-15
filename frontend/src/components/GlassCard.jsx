export default function GlassCard({ className = '', children }) {
  return <section className={`glass-card rounded-2xl ${className}`}>{children}</section>;
}
