import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import FaceScanPage from './FaceScanPage';
import UsernameDiscoveryPage from './UsernameDiscoveryPage';
import ScrapeAggregationPage from './ScrapeAggregationPage';
import ResearchPaperPage from './ResearchPaperPage';
import ExposureScorePage from './ExposureScorePage';
import GraphVisualizationPage from './GraphVisualizationPage';
import SettingsPage from './SettingsPage';

const chapters = [
  ['Fake Recognition', '#fake-recognition'],
  ['Username Engine', '#username-engine'],
  ['Web Data Insights', '#web-data'],
  ['Research Papers', '#research-papers'],
  ['Risk Score', '#risk-score'],
  ['Profile & Dashboard', '#profile-dashboard']
];

function Chapter({ id, label, title, text, children }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4 }}
      className="sg-section px-6 py-12 md:px-10 md:py-14"
    >
      <p className="sg-kicker">{label}</p>
      <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-[48px]">{title}</h2>
      <p className="mt-4 max-w-4xl text-base leading-8 text-muted md:text-lg">{text}</p>
      <div className="mt-7">{children}</div>
    </motion.section>
  );
}

export default function DashboardPage() {
  const { user } = useAuth();
  const displayName = user?.email?.split('@')?.[0] || 'User';

  return (
    <div className="space-y-8 pb-10">
      <section className="sg-section px-6 py-14 text-center md:px-10 md:py-16">
        <p className="text-sm tracking-[0.28em] text-[#00BFFF]">SHADOWGRAPH WORKSPACE</p>
        <h1 className="mt-6 text-5xl font-semibold tracking-tight md:text-[64px] md:leading-[1.05]">
          Welcome, {displayName}
        </h1>
        <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-muted md:text-lg">
          This is your complete one-page dashboard. Scroll once to run each tool, understand your results, and update your profile.
        </p>

        <div className="mx-auto mt-9 flex max-w-4xl flex-wrap justify-center gap-2">
          {chapters.map(([name, anchor]) => (
            <a key={anchor} href={anchor} className="sg-button-secondary px-4 py-2 text-sm">
              {name}
            </a>
          ))}
        </div>
      </section>

      <Chapter
        id="fake-recognition"
        label="Chapter 01"
        title="Fake Recognition"
        text="Upload an image and get a simple authenticity check. This helps you quickly spot whether a photo might be manipulated."
      >
        <FaceScanPage fakeMode embedded />
      </Chapter>

      <Chapter
        id="username-engine"
        label="Chapter 02"
        title="Username Display Engine"
        text="Enter a username or full name. The system checks practical profile variants and shows where you are likely visible online."
      >
        <UsernameDiscoveryPage embedded />
      </Chapter>

      <Chapter
        id="web-data"
        label="Chapter 03"
        title="Web Scraping & Data Aggregation"
        text="Add public website links and keywords. ShadowGraph collects public data and turns it into clear, useful summaries."
      >
        <ScrapeAggregationPage embedded />
      </Chapter>

      <Chapter
        id="research-papers"
        label="Chapter 04"
        title="Research Paper Detection"
        text="Search by full name, institution, or both. Results are filtered to better match the person you are searching for."
      >
        <ResearchPaperPage embedded />
      </Chapter>

      <Chapter
        id="risk-score"
        label="Chapter 05"
        title="Risk Scoring System"
        text="View your overall exposure score with easy recommendations to reduce risk step by step."
      >
        <ExposureScorePage embedded />
      </Chapter>

      <Chapter
        id="profile-dashboard"
        label="Chapter 06"
        title="User Profile & Dashboard"
        text="Manage your profile, review your interactive graph, and update preferences in one place."
      >
        <div className="space-y-6">
          <GraphVisualizationPage embedded />
          <SettingsPage embedded />
        </div>
      </Chapter>
    </div>
  );
}
