export default function CircularScore({ score }) {
  const gradient = `conic-gradient(#3B82F6 ${score * 3.6}deg, rgba(255,255,255,0.08) 0)`;

  return (
    <div className="mx-auto flex h-56 w-56 items-center justify-center rounded-full neon-ring" style={{ background: gradient }}>
      <div className="flex h-44 w-44 flex-col items-center justify-center rounded-full bg-bg/95">
        <p className="text-5xl font-semibold">{score}</p>
        <p className="text-xs uppercase tracking-[0.2em] text-muted">Risk Score</p>
      </div>
    </div>
  );
}
