import { motion } from 'framer-motion';
import PageHeader from '../components/PageHeader';
import GlassCard from '../components/GlassCard';
import StatCard from '../components/StatCard';
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

const sectionLinks = [
  ['Quick View', '#quick-view'],
  ['Fake Check', '#fake-check'],
  ['Username Search', '#username-search'],
  ['Web Scan', '#web-scan'],
  ['Publications', '#publications'],
  ['Risk Score', '#risk-score'],
  ['Breach Check', '#breach-check'],
  ['Network Map', '#network-map'],
  ['Reports', '#reports'],
  ['Your Profile', '#your-profile']
];

function SectionBlock({ id, title, helpText, children }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      viewport={{ once: true, amount: 0.12 }}
      className="sg-section px-4 py-6 md:px-6 md:py-7"
    >
      <div className="mb-5">
        <p className="sg-kicker">Guided Section</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">{title}</h2>
        <p className="mt-2 text-sm text-muted">{helpText}</p>
      </div>
      {children}
    </motion.section>
  );
}

export default function DashboardPage() {
  const { user } = useAuth();
  const displayName = user?.email?.split('@')?.[0] || 'Operator';

  return (
    <div className="space-y-6">
      <PageHeader
        title="ShadowGraph One-Page Workspace"
        subtitle="Everything is on one long page. Scroll naturally, run each tool, and see your live results in one place."
        eyebrow="Simple, Guided Experience"
      />

      <div className="sticky top-3 z-20 -mt-2 overflow-x-auto rounded-xl border border-white/10 bg-[#11111a]/90 p-2 backdrop-blur-xl">
        <div className="flex min-w-max gap-2">
          {sectionLinks.map(([label, href]) => (
            <a key={href} href={href} className="sg-button-secondary whitespace-nowrap px-3 py-2 text-xs">
              {label}
            </a>
          ))}
        </div>
      </div>

      <section id="quick-view" className="grid gap-4 xl:grid-cols-[1.2fr_1fr]">
        <GlassCard className="p-5 md:p-6">
          <p className="sg-kicker">Welcome Back</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">Hi {displayName}, your digital footprint is ready to review.</h2>
          <p className="mt-3 text-sm leading-7 text-muted">
            This page is designed like a guided documentary. Every section below is live and connected to your backend tools.
            You can run scans, review findings, and update your profile without jumping between pages.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-surface/70 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-muted">Signed-in Account</p>
              <p className="mt-2 text-sm">{user?.email || 'analyst@shadowgraph.ai'}</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-surface/70 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-muted">Tip</p>
              <p className="mt-2 text-sm text-muted">Start with fake check or username search, then move to risk score.</p>
            </div>
          </div>
        </GlassCard>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
          <StatCard title="Profiles Found" value="34" hint="Across supported platforms" />
          <StatCard title="Possible Breaches" value="2" hint="Needs your attention" />
        </div>
      </section>

      <SectionBlock
        id="fake-check"
        title="Fake Recognition"
        helpText="Upload a face photo to check if the image looks authentic or manipulated."
      >
        <FaceScanPage fakeMode />
      </SectionBlock>

      <SectionBlock
        id="username-search"
        title="Username Display Engine"
        helpText="Type a username once and check where it appears online."
      >
        <UsernameDiscoveryPage />
      </SectionBlock>

      <SectionBlock
        id="web-scan"
        title="Web Scraping & Data Aggregation"
        helpText="Enter website links and keywords to gather public signals in one summary."
      >
        <ScrapeAggregationPage />
      </SectionBlock>

      <SectionBlock
        id="publications"
        title="Research Paper Detection"
        helpText="Search papers by name and institution to see publication visibility."
      >
        <ResearchPaperPage />
      </SectionBlock>

      <SectionBlock
        id="risk-score"
        title="Risk Scoring System"
        helpText="Get a clear risk score and practical improvement suggestions."
      >
        <ExposureScorePage />
      </SectionBlock>

      <SectionBlock
        id="breach-check"
        title="Breach Monitoring"
        helpText="Check if an email appears in known breaches and what data was exposed."
      >
        <BreachMonitorPage />
      </SectionBlock>

      <SectionBlock
        id="network-map"
        title="Visual Network Map"
        helpText="See your connected accounts, research signals, and events in an interactive graph."
      >
        <GraphVisualizationPage />
      </SectionBlock>

      <SectionBlock
        id="reports"
        title="Reports"
        helpText="Download your report and review recent scan history."
      >
        <ReportsPage />
      </SectionBlock>

      <SectionBlock
        id="your-profile"
        title="Your Profile & Settings"
        helpText="Edit preferences, privacy controls, and account actions from one place."
      >
        <SettingsPage />
      </SectionBlock>
    </div>
  );
}
