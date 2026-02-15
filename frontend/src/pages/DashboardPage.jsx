import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import FaceScanPage from './FaceScanPage';
import UsernameDiscoveryPage from './UsernameDiscoveryPage';
import ScrapeAggregationPage from './ScrapeAggregationPage';
import ResearchPaperPage from './ResearchPaperPage';
import ExposureScorePage from './ExposureScorePage';
import BreachMonitorPage from './BreachMonitorPage';
import GraphVisualizationPage from './GraphVisualizationPage';
import ReportsPage from './ReportsPage';
import SettingsPage from './SettingsPage';

const sections = [
  ['Fake Recognition', '#fake-recognition'],
  ['Username Engine', '#username-engine'],
  ['Web Aggregation', '#web-aggregation'],
  ['Research Papers', '#research-papers'],
  ['Risk Score', '#risk-score'],
  ['Breach Check', '#breach-check'],
  ['Network Graph', '#network-graph'],
  ['Reports', '#reports'],
  ['Profile', '#profile-dashboard']
];

function StorySection({ id, index, title, subtitle, children }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.45 }}
      className="sg-section px-6 py-10 md:px-10 md:py-12"
    >
      <div className="mb-7 max-w-4xl">
        <p className="sg-kicker">Chapter {index}</p>
        <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">{title}</h2>
        <p className="mt-3 text-base leading-8 text-muted">{subtitle}</p>
      </div>
      {children}
    </motion.section>
  );
}

export default function DashboardPage() {
  const { user } = useAuth();
  const displayName = user?.email?.split('@')?.[0] || 'Operator';

  return (
    <div className="space-y-8 pb-8">
      <section className="sg-section relative overflow-hidden px-6 py-14 md:px-10 md:py-20">
        <div className="pointer-events-none absolute -left-14 top-0 h-48 w-48 rounded-full bg-[#00bfff]/15 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 bottom-0 h-44 w-44 rounded-full bg-[#1ed760]/10 blur-3xl" />

        <div className="relative mx-auto max-w-5xl text-center">
          <p className="sg-kicker">ShadowGraph Workspace</p>
          <h1 className="mt-6 text-5xl font-semibold tracking-tight md:text-[64px] md:leading-[1.05]">
            One clean view for your full digital footprint
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-muted md:text-lg">
            Welcome back, {displayName}. Scroll once from top to bottom to run each module, review findings, and update your profile.
            Every panel below is live and connected to your backend.
          </p>

          <div className="mx-auto mt-9 flex max-w-3xl flex-wrap justify-center gap-2">
            {sections.map(([label, href]) => (
              <a key={href} href={href} className="sg-button-secondary px-4 py-2 text-xs md:text-sm">
                {label}
              </a>
            ))}
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-surface/70 p-5 text-left">
              <p className="text-xs uppercase tracking-[0.16em] text-muted">Active Account</p>
              <p className="mt-2 text-sm">{user?.email || 'analyst@shadowgraph.ai'}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-surface/70 p-5 text-left">
              <p className="text-xs uppercase tracking-[0.16em] text-muted">Quick Advice</p>
              <p className="mt-2 text-sm text-muted">Start with username + fake recognition, then review risk and breach sections.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-surface/70 p-5 text-left">
              <p className="text-xs uppercase tracking-[0.16em] text-muted">Goal</p>
              <p className="mt-2 text-sm text-muted">Understand your online visibility and reduce exposure with clear next steps.</p>
            </div>
          </div>
        </div>
      </section>

      <StorySection
        id="fake-recognition"
        index="01"
        title="Fake Recognition"
        subtitle="Upload an image and instantly check whether it looks natural or manipulated, with confidence indicators and signal details."
      >
        <FaceScanPage fakeMode embedded />
      </StorySection>

      <StorySection
        id="username-engine"
        index="02"
        title="Username Engine"
        subtitle="Search using a username or full name. The system checks practical name variants and shows where you appear online."
      >
        <UsernameDiscoveryPage embedded />
      </StorySection>

      <StorySection
        id="web-aggregation"
        index="03"
        title="Web Scraping & Data Aggregation"
        subtitle="Provide websites and keywords to collect open web signals, then review pages, links, and summary counts in one place."
      >
        <ScrapeAggregationPage embedded />
      </StorySection>

      <StorySection
        id="research-papers"
        index="04"
        title="Research Paper Detection"
        subtitle="Find publications by full name, reversed name order, institution-only search, or both together, then review citations and sources."
      >
        <ResearchPaperPage embedded />
      </StorySection>

      <StorySection
        id="risk-score"
        index="05"
        title="Risk Scoring System"
        subtitle="Get a simple risk score from 0–100 with category breakdown and direct recommendations to improve your security posture."
      >
        <ExposureScorePage embedded />
      </StorySection>

      <StorySection
        id="breach-check"
        index="06"
        title="Breach Monitoring"
        subtitle="Check whether an email appears in known breach datasets and understand what information may have been exposed."
      >
        <BreachMonitorPage embedded />
      </StorySection>

      <StorySection
        id="network-graph"
        index="07"
        title="User Profile & Dashboard Graph"
        subtitle="Explore your connected footprint in an interactive graph showing platforms, research records, and breach events."
      >
        <GraphVisualizationPage embedded />
      </StorySection>

      <StorySection
        id="reports"
        index="08"
        title="Reports"
        subtitle="Download a polished PDF report and review the most recent activity timeline from your scans."
      >
        <ReportsPage embedded />
      </StorySection>

      <StorySection
        id="profile-dashboard"
        index="09"
        title="Profile & Personal Settings"
        subtitle="Edit your profile card, adjust privacy preferences, and manage account actions from one focused section."
      >
        <SettingsPage embedded />
      </StorySection>
    </div>
  );
}
