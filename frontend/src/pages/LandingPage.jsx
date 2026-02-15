import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const sections = [
  {
    id: 'fake',
    title: 'Fake Recognition',
    description:
      'Upload a photo and we check whether it looks natural or potentially manipulated. You get a simple confidence score and clear signal details.',
    cta: '/auth'
  },
  {
    id: 'username',
    title: 'Username Display Engine',
    description:
      'Enter a username or full name and we check common profile patterns across major platforms. Results show where your identity likely appears.',
    cta: '/auth'
  },
  {
    id: 'scrape',
    title: 'Web Scraping & Data Aggregation',
    description:
      'Provide website links and keywords. ShadowGraph collects public data and summarizes what matters so you can understand your online visibility quickly.',
    cta: '/auth'
  },
  {
    id: 'research',
    title: 'Research Paper Detection',
    description:
      'Search by full name, institution, or both. We find likely publication records and show citations, source, and year in one readable view.',
    cta: '/auth'
  },
  {
    id: 'risk',
    title: 'Risk Scoring System',
    description:
      'We combine profile visibility, research footprint, and exposure signals into one easy score so you know how urgent your next step is.',
    cta: '/auth'
  },
  {
    id: 'profile',
    title: 'User Profile & Dashboard',
    description:
      'After sign-in, you get a complete personal dashboard with editable profile settings, interactive graph views, and downloadable reports.',
    cta: '/auth'
  }
];

function StorySection({ section, index }) {
  return (
    <motion.section
      id={section.id}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45 }}
      className="sg-section mx-auto max-w-6xl px-6 py-14 md:px-10 md:py-20"
    >
      <p className="sg-kicker">Section {index}</p>
      <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-[48px]">{section.title}</h2>
      <p className="mt-5 max-w-3xl text-base leading-8 text-muted md:text-lg">{section.description}</p>
      <div className="mt-8">
        <Link to={section.cta} className="sg-button-primary">
          Open This Feature
        </Link>
      </div>
    </motion.section>
  );
}

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#121212] px-4 pb-20 pt-4 md:px-8">
      <div className="particle-layer" />

      <header className="relative z-10 mx-auto max-w-7xl py-4">
        <p className="text-center text-sm tracking-[0.32em] text-[#00BFFF]">SHADOWGRAPH</p>
      </header>

      <section className="relative mx-auto flex min-h-[84vh] max-w-7xl items-center justify-center px-4 text-center">
        <div className="pointer-events-none absolute -top-16 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-[#00BFFF]/20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-8 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-[#1ED760]/10 blur-3xl" />

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative z-10 max-w-4xl">
          <h1 className="text-5xl font-semibold tracking-tight md:text-[64px] md:leading-[1.05]">Map your digital shadow with clarity</h1>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-muted md:text-lg">
            A cinematic, easy-to-understand security experience that helps you discover your online presence, spot risks, and act with confidence.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link to="/auth" className="sg-button-primary">
              Start Secure Scan
            </Link>
            <a href="#fake" className="sg-button-secondary">
              Scroll to Explore
            </a>
          </div>
        </motion.div>
      </section>

      <div className="space-y-8">
        {sections.map((section, idx) => (
          <StorySection key={section.id} section={section} index={`0${idx + 1}`} />
        ))}
      </div>

      <footer className="mx-auto mt-12 max-w-6xl border-t border-white/10 py-6 text-center text-sm text-muted">
        © {new Date().getFullYear()} ShadowGraph
      </footer>
    </div>
  );
}
