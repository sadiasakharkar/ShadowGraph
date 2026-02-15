import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import FeatureCard from '../components/FeatureCard';

const features = [
  ['🧠', 'Face Recognition Module', 'Camera-ready identity matching pipeline with confidence telemetry and profile correlation placeholders.'],
  ['🕵️', 'Fake Detection Module', 'Deepfake and manipulated media signal checks with explainable confidence output.'],
  ['🔗', 'Username Discovery Engine', 'Cross-platform alias resolution for social, developer, and research profiles.'],
  ['🌐', 'Web Scraping & Aggregation', 'Structured public-signal ingestion layer prepared for controlled OSINT connectors.'],
  ['📄', 'Research Paper Detection', 'Semantic Scholar / ORCID style publication discovery with normalized metadata cards.'],
  ['📈', 'Risk Scoring System', 'Weighted exposure scoring model blending profile visibility, breach, and leak indicators.'],
  ['🛡️', 'Breach Monitoring', 'HIBP-compatible breach exposure tracking with risk-tiered response cards.']
];

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden px-5 py-8 md:px-10 md:py-10">
      <div className="grid-hero pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute inset-0 dot-grid opacity-20" />

      <div className="relative mx-auto max-w-6xl">
        <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="pt-16 text-center md:pt-24">
          <p className="text-[11px] uppercase tracking-[0.34em] text-cyan">SHADOWGRAPH PLATFORM</p>
          <h1 className="mx-auto mt-5 max-w-4xl text-4xl font-semibold tracking-tight md:text-7xl">Map Your Digital Shadow</h1>
          <p className="mx-auto mt-6 max-w-3xl text-sm leading-7 text-muted md:text-lg md:leading-8">
            Industrial-grade digital footprint intelligence platform for consent-based identity discovery, breach visibility,
            research footprint mapping, and graph-driven risk analysis.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link to="/auth" className="rounded-xl bg-accent px-7 py-3 text-sm font-medium transition hover:brightness-110">
              Start Scan
            </Link>
            <a href="#features" className="rounded-xl border border-white/15 bg-surface/55 px-7 py-3 text-sm transition hover:border-cyan/40 hover:bg-surface/90">
              Learn More
            </a>
          </div>
        </motion.section>

        <section className="mt-16 grid gap-4 md:grid-cols-3">
          {[
            ['34', 'Profiles Correlated'],
            ['67', 'Exposure Score'],
            ['2', 'Active Breach Alerts']
          ].map(([value, label]) => (
            <div key={label} className="glass-card rounded-2xl p-5 text-left">
              <p className="text-3xl font-semibold tracking-tight">{value}</p>
              <p className="mt-1 text-sm text-muted">{label}</p>
            </div>
          ))}
        </section>

        <section id="features" className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map(([icon, title, desc], i) => (
            <FeatureCard key={title} icon={icon} title={title} desc={desc} index={i} />
          ))}
        </section>

        <footer className="mt-16 border-t soft-divider py-7 text-sm text-muted">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p>© {new Date().getFullYear()} ShadowGraph</p>
            <div className="flex flex-wrap gap-4">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms</a>
              <a href="https://github.com">GitHub</a>
              <a href="#">Contact</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
