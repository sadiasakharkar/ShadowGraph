import { Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import FaceScanPage from './pages/FaceScanPage';
import UsernameDiscoveryPage from './pages/UsernameDiscoveryPage';
import ScrapeAggregationPage from './pages/ScrapeAggregationPage';
import ResearchPaperPage from './pages/ResearchPaperPage';
import BreachMonitorPage from './pages/BreachMonitorPage';
import ExposureScorePage from './pages/ExposureScorePage';
import GraphVisualizationPage from './pages/GraphVisualizationPage';
import SettingsPage from './pages/SettingsPage';
import ReportsPage from './pages/ReportsPage';
import OpsDashboardPage from './pages/OpsDashboardPage';
import AppLayout from './components/AppLayout';
import ProtectedRoute from './components/routes/ProtectedRoute';
import PublicOnlyRoute from './components/routes/PublicOnlyRoute';

export default function App() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route element={<PublicOnlyRoute />}>
          <Route path="/auth" element={<AuthPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<Navigate to="/app/overview" replace />} />
            <Route path="overview" element={<DashboardPage />} />
            <Route path="face-scan" element={<FaceScanPage />} />
            <Route path="fake-detection" element={<FaceScanPage fakeMode />} />
            <Route path="username-scan" element={<UsernameDiscoveryPage />} />
            <Route path="scrape" element={<ScrapeAggregationPage />} />
            <Route path="research" element={<ResearchPaperPage />} />
            <Route path="breach" element={<BreachMonitorPage />} />
            <Route path="exposure-score" element={<ExposureScorePage />} />
            <Route path="graph" element={<GraphVisualizationPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="ops" element={<OpsDashboardPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/app/overview" replace />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}
