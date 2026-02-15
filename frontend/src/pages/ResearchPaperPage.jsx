import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import GlassCard from '../components/GlassCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { EmptyState, ErrorState } from '../components/AsyncState';
import { searchResearch } from '../services/endpoints';
import { getDisplayError } from '../services/apiErrors';
import { useToast } from '../context/ToastContext';

export default function ResearchPaperPage() {
  const [name, setName] = useState('');
  const [institution, setInstitution] = useState('');
  const [loading, setLoading] = useState(false);
  const [papers, setPapers] = useState([]);
  const [error, setError] = useState('');
  const { info, success, error: showError } = useToast();

  const run = async () => {
    if (!name.trim() || !institution.trim()) {
      info('Enter full name and institution first.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const data = await searchResearch(name.trim(), institution.trim());
      setPapers(data);
      success('Research lookup completed.');
    } catch (err) {
      const message = getDisplayError(err, 'Failed to search publications.');
      setError(message);
      showError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageHeader title="Research Paper Detection" subtitle="Publication fingerprint mapping prepared for Semantic Scholar and ORCID API adapters." />

      <GlassCard className="p-5 md:p-6">
        <div className="grid gap-3 md:grid-cols-[1fr_1fr_auto]">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" className="sg-input" />
          <input value={institution} onChange={(e) => setInstitution(e.target.value)} placeholder="Institution" className="sg-input" />
          <button onClick={run} className="sg-button-primary flex items-center justify-center gap-2">
            {loading ? <LoadingSpinner /> : null}
            Search Publications
          </button>
        </div>
      </GlassCard>

      {error ? <ErrorState className="mt-4" message={error} onRetry={run} /> : null}

      {!error ? (
        <div className="mt-4 grid gap-4 xl:grid-cols-2">
          {papers.map((paper) => (
            <GlassCard key={paper.title} className="p-5">
              <h3 className="text-lg font-semibold tracking-tight">{paper.title}</h3>
              <div className="mt-3 space-y-1 text-sm text-muted">
                <p>Authors: {paper.authors}</p>
                <p>Publication Source: {paper.source}</p>
                <p>Year: {paper.year}</p>
              </div>
              <p className="mt-3 text-sm text-cyan">Citation Count: {paper.citations}</p>
            </GlassCard>
          ))}

          {!papers.length && !loading ? <EmptyState className="xl:col-span-2" message="Submit name and institution to fetch publication results." /> : null}
        </div>
      ) : null}
    </div>
  );
}
