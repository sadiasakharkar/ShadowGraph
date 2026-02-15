import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';

const sections = [
  {
    id: 'face',
    label: '01',
    title: 'Find your public profiles from a photo',
    description:
      'Upload one photo and ShadowGraph checks public profile pages where your image or identity may appear. You get readable cards with links and confidence.',
    bullets: ['Upload once, scan many public sources', 'See profile links and confidence in one place', 'Only ethical, public pages are checked'],
  },
  {
    id: 'username',
    label: '02',
    title: 'Search people by name or handle',
    description:
      'Type a name or username. We try practical variations and show reachable links across social, coding, and research platforms.',
    bullets: ['Supports full names and handles', 'Shows only reachable links', 'Useful for your own profile and external lookups'],
  },
  {
    id: 'footprint',
    label: '03',
    title: 'Discover your digital presence',
    description:
      'Get a clean overview of where you appear online. Categories, platform counts, and profile cards are grouped for easy understanding.',
    bullets: ['Social, coding, academic, and blog signals', 'Readable summary cards', 'Live updates as scans complete'],
  },
  {
    id: 'research',
    label: '04',
    title: 'Find your research publications',
    description:
      'Search by full name, institution, or both. ShadowGraph highlights likely papers with source, year, and citation details.',
    bullets: ['Name and institution matching', 'Publication cards with links', 'Built for quick verification'],
  },
  {
    id: 'insight',
    label: '05',
    title: 'Understand how visible you are online',
    description:
      'Reputation Insight turns raw scan data into practical next steps. You can quickly see strengths, gaps, and what to improve first.',
    bullets: ['Simple visibility indicators', 'Actionable recommendations', 'Designed for non-technical users'],
  },
  {
    id: 'dashboard',
    label: '06',
    title: 'Control everything from one dashboard',
    description:
      'Your profile, activity timeline, charts, and reports live in one immersive dashboard. It updates smoothly with every scan.',
    bullets: ['Interactive profile and settings', 'Neon-highlighted charts and timeline', 'Export-ready reports'],
  },
];

function FeatureSection({ section, index }) {
  return (
    <motion.section
      id={section.id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: index * 0.04 }}
      className="sg-section mx-auto max-w-7xl px-6 py-14 md:px-12 md:py-20"
    >
      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <p className="sg-kicker">Feature {section.label}</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-text md:text-[48px]">{section.title}</h2>
          <p className="mt-5 max-w-3xl text-base leading-8 text-muted md:text-lg">{section.description}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {section.bullets.map((item) => (
              <span key={item} className="sg-chip">
                {item}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/auth" className="sg-button-primary">
              Open This Feature
            </Link>
            <Link to="/app/overview" className="sg-button-secondary">
              View Live Dashboard
            </Link>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          className="sg-card p-5 md:p-6"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-[#00BFFF]">Module Preview</p>
          <div className="mt-4 space-y-3">
            <div className="rounded-xl border border-white/10 bg-[#1a1a1f]/80 p-3">
              <p className="text-sm text-text">Live status</p>
              <div className="mt-2 h-2 rounded bg-white/10">
                <motion.div
                  initial={{ width: '22%' }}
                  whileInView={{ width: '84%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, ease: 'easeOut' }}
                  className="h-2 rounded bg-gradient-to-r from-[#00BFFF] via-[#1ED760] to-[#FF6B6B]"
                />
              </div>
            </div>
            <div className="rounded-xl border border-white/10 bg-[#1a1a1f]/80 p-3 text-xs leading-6 text-muted">
              This preview represents live backend-connected cards, scan states, and profile insights from your actual modules.
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default function LandingPage() {
  const { scrollYProgress } = useScroll();
  const parallax = useTransform(scrollYProgress, [0, 1], [0, -110]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#000000] px-4 pb-20 pt-4 md:px-8">
      <motion.div style={{ y: parallax }} className="matrix-overlay pointer-events-none absolute inset-0" />
      <div className="cyber-grid pointer-events-none absolute inset-0 opacity-35" />
      <div className="particle-layer" />

      <header className="relative z-10 mx-auto max-w-7xl py-4">
        <p className="text-center text-sm tracking-[0.34em] text-[#00BFFF]">SHADOWGRAPH</p>
      </header>

      <section className="relative mx-auto flex min-h-[88vh] max-w-7xl items-center justify-center px-4 text-center">
        <div className="pointer-events-none absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#00BFFF]/20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-10 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-[#1ED760]/10 blur-3xl" />

        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="relative z-10 max-w-5xl">
          <h1 className="hero-glow text-5xl font-semibold tracking-tight text-text md:text-[64px] md:leading-[1.02]">
            Understand your digital presence in one cinematic workspace
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-muted md:text-lg">
            ShadowGraph helps you find public profiles, review visibility, and take practical action. Built for clarity, speed, and real-world use.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link to="/auth" className="sg-button-primary">
              Start Your Scan
            </Link>
            <a href="#face" className="sg-button-secondary">
              Explore Features
            </a>
          </div>
        </motion.div>
      </section>

      <div className="space-y-8">
        {sections.map((section, idx) => (
          <FeatureSection key={section.id} section={section} index={idx} />
        ))}
      </div>

      <section className="sg-section mx-auto mt-8 max-w-7xl px-6 py-10 text-center md:px-12 md:py-14">
        <h3 className="text-3xl font-semibold tracking-tight text-text md:text-[36px]">Ready to map your digital shadow?</h3>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-muted">
          Sign in, run scans, and see your full profile intelligence in the live dashboard.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link to="/auth" className="sg-button-primary">
            Go to Sign In
          </Link>
          <Link to="/app/overview" className="sg-button-secondary">
            Open Dashboard
          </Link>
        </div>
      </section>

      <footer className="mx-auto mt-12 max-w-7xl border-t border-white/10 py-6 text-center text-sm text-muted">
        © {new Date().getFullYear()} ShadowGraph
      </footer>
    </div>
  );
}
