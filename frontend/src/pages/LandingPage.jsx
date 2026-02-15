import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import FeatureCard from '../components/FeatureCard';

const featureCards = [
  ['🎭', 'Fake Recognition', 'Signal-driven media authenticity scoring with anti-spoof confidence and explainable factors.'],
  ['👤', 'Username Display Engine', 'Cross-platform alias discovery with consistent status mapping and direct profile pivots.'],
  ['🕸️', 'Scraping & Aggregation', 'Seed-based crawl orchestration that extracts links, keywords, and public intelligence artifacts.'],
  ['📚', 'Research Paper Detection', 'Publication discovery and normalized metadata for institutional profile intelligence.'],
  ['📊', 'Risk Scoring System', 'Weighted exposure model with category vectors and prioritized remediation recommendations.']
];

const cinematicSections = [
  {
    key: 'fake',
    label: 'Module 01',
    title: 'Fake Recognition Intelligence',
    body:
      'Upload live media and run manipulation analysis through a confidence pipeline. The interface highlights risk bands, confidence drift, and anti-spoof observations in a way that is readable for both investigation and reporting.',
    points: ['Confidence telemetry panel', 'Signal trace details', 'Immediate scan trigger'],
    cta: '/app/fake-detection'
  },
  {
    key: 'username',
    label: 'Module 02',
    title: 'Username Display Engine',
    body:
      'Run one alias across multiple ecosystems and observe platform-by-platform findings in a clean operational table. Status states, links, and scan motion feedback are tuned for fast review.',
    points: ['Live progress indicator', 'Platform resolution matrix', 'Actionable profile linking'],
    cta: '/app/username-scan'
  },
  {
    key: 'scrape',
    label: 'Module 03',
    title: 'Web Scraping & Aggregation',
    body:
      'Define seed URLs and keyword interests, then gather public signal summaries. The experience is structured to feel like a controlled intelligence operation instead of a raw crawler console.',
    points: ['Seed orchestration inputs', 'Keyword aggregate summaries', 'Entity extraction overview'],
    cta: '/app/scrape'
  },
  {
    key: 'research',
    label: 'Module 04',
    title: 'Research Paper Detection',
    body:
      'Map institutional identity to publication footprint with a clear card-based output. Surface paper titles, author metadata, sources, years, and citation counts in one coherent timeline.',
    points: ['Institution-aware query flow', 'Structured publication cards', 'Future API-ready architecture'],
    cta: '/app/research'
  },
  {
    key: 'risk',
    label: 'Module 05',
    title: 'Risk Scoring & Profile Hardening',
    body:
      'Blend profile visibility, breach exposure, and leak indicators into an interpretable score. The score view pairs charts with clear recommendations to move from awareness to action.',
    points: ['Animated score dial', 'Radar vector diagnostics', 'Prioritized mitigation tips'],
    cta: '/app/exposure-score'
  }
];

const topStats = [
  ['34', 'Profiles Correlated', 'Across major social and developer platforms'],
  ['67', 'Current Exposure Score', 'Moderate risk based on active data signals'],
  ['2', 'High-Priority Breaches', 'Events requiring account hardening']
];

export default function LandingPage() {
  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <div className="relative min-h-screen overflow-hidden px-5 pb-16 pt-6 md:px-10 md:pt-10">
      <motion.div style={{ y: parallaxY }} className="grid-hero pointer-events-none absolute inset-0" />
      <div className="particle-layer" />
      <div className="pointer-events-none absolute inset-0 dot-grid opacity-20" />

      <div className="relative mx-auto max-w-7xl space-y-10">
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="sg-section px-6 py-14 text-center md:px-16 md:py-20"
        >
          <p className="sg-kicker">ShadowGraph Platform</p>
          <h1 className="mx-auto mt-6 max-w-5xl sg-heading">Map Your Digital Shadow</h1>
          <p className="mx-auto mt-6 max-w-4xl sg-body">
            A cinematic, intelligence-grade platform for consent-based digital footprint mapping. Discover identity overlap, fake media signals,
            publication traces, breach exposure, and operational risk posture in one unified interface.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link to="/auth" className="sg-button-primary">
              Start Scan
            </Link>
            <a href="#modules" className="sg-button-secondary">
              Explore Modules
            </a>
          </div>
        </motion.section>

        <section className="grid gap-4 md:grid-cols-3">
          {topStats.map(([value, label, desc]) => (
            <div key={label} className="sg-card p-6">
              <p className="text-4xl font-semibold tracking-tight">{value}</p>
              <p className="mt-2 text-sm text-text">{label}</p>
              <p className="mt-2 text-xs leading-6 text-muted">{desc}</p>
            </div>
          ))}
        </section>

        <section className="sg-section px-6 py-10 md:px-10" id="modules">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="sg-kicker">Core Modules</p>
              <h2 className="mt-3 sg-subheading">Operational intelligence modules built for real workflows</h2>
            </div>
            <Link to="/auth" className="sg-button-secondary self-start md:self-auto">
              Access Dashboard
            </Link>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {featureCards.map(([icon, title, desc], i) => (
              <FeatureCard key={title} icon={icon} title={title} desc={desc} index={i} cta="View module" />
            ))}
          </div>
        </section>

        {cinematicSections.map((section, idx) => (
          <motion.section
            key={section.key}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            viewport={{ once: true, amount: 0.25 }}
            className="sg-section grid gap-8 px-6 py-10 md:grid-cols-2 md:px-10 md:py-12"
          >
            <div>
              <p className="sg-kicker">{section.label}</p>
              <h3 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">{section.title}</h3>
              <p className="mt-4 text-sm leading-7 text-muted md:text-[15px]">{section.body}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {section.points.map((point) => (
                  <span key={point} className="sg-chip">
                    {point}
                  </span>
                ))}
              </div>
              <div className="mt-6">
                <Link to={section.cta} className="sg-button-primary">
                  Open Module
                </Link>
              </div>
            </div>

            <div className="relative rounded-2xl border border-white/10 bg-gradient-to-b from-surface/90 to-[#101018] p-5">
              <div className="pointer-events-none absolute -top-10 right-0 h-32 w-32 rounded-full bg-accent/20 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-8 left-0 h-24 w-24 rounded-full bg-cyan/20 blur-2xl" />

              <div className="relative space-y-4">
                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-surface/70 px-3 py-2">
                  <p className="text-xs uppercase tracking-[0.16em] text-muted">Live Preview</p>
                  <p className="text-xs text-cyan">Module Active</p>
                </div>

                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ repeat: Infinity, duration: 4 + idx * 0.3, ease: 'easeInOut' }}
                  className="rounded-xl border border-white/10 bg-surface/75 p-4"
                >
                  <p className="text-sm text-text">Signal Storyboard</p>
                  <p className="mt-2 text-xs leading-6 text-muted">
                    Cinematic module preview with smooth hover layers, documentary-style hierarchy, and contextual controls that mirror
                    the production module experience.
                  </p>
                </motion.div>

                <details className="rounded-xl border border-white/10 bg-surface/70 p-4 text-sm text-muted">
                  <summary className="cursor-pointer text-text">Expand detailed workflow</summary>
                  <p className="mt-3 leading-7">
                    Data enters through consented input, proceeds through module-specific enrichment, and returns as structured evidence cards
                    designed for quick interpretation and downstream reporting.
                  </p>
                </details>
              </div>
            </div>
          </motion.section>
        ))}

        <section className="sg-section px-6 py-12 md:px-10">
          <p className="sg-kicker">Platform Flow</p>
          <h2 className="mt-3 sg-subheading">From introduction to dashboard to profile hardening</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {['Discover', 'Analyze', 'Visualize', 'Respond'].map((step, i) => (
              <div key={step} className="rounded-xl border border-white/10 bg-surface/70 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-muted">0{i + 1}</p>
                <p className="mt-2 text-lg font-medium">{step}</p>
                <p className="mt-2 text-xs leading-6 text-muted">Documented and traceable workflow blocks that preserve clarity at every stage.</p>
              </div>
            ))}
          </div>
        </section>

        <footer className="border-t soft-divider py-7 text-sm text-muted">
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
