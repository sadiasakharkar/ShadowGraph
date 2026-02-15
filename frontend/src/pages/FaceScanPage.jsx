import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import GlassCard from '../components/GlassCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { EmptyState, ErrorState } from '../components/AsyncState';
import { scanFace } from '../services/endpoints';
import { getDisplayError } from '../services/apiErrors';
import { useToast } from '../context/ToastContext';

export default function FaceScanPage({ fakeMode = false }) {
  const [preview, setPreview] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const { success, error: showError, info } = useToast();

  const runScan = async () => {
    if (!selectedFile) {
      info('Upload an image first.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const data = await scanFace(selectedFile);
      setResult(data);
      success(fakeMode ? 'Fake detection complete' : 'Face scan complete');
    } catch (err) {
      const message = getDisplayError(err, 'Failed to complete scan.');
      setError(message);
      showError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageHeader
        title={fakeMode ? 'Fake Detection' : 'Face Scan'}
        subtitle={
          fakeMode
            ? 'Assess synthetic media probability and manipulation signals.'
            : 'Capture or upload facial input to correlate profiles with confidence scoring.'
        }
      />

      <div className="grid gap-4 xl:grid-cols-2">
        <GlassCard className="p-5 md:p-6">
          <p className="text-sm text-muted">Image Upload + Face Analysis</p>
          <div className="mt-4 flex h-72 items-center justify-center rounded-xl border border-dashed border-white/20 bg-surface/45 md:h-80">
            {preview ? <img src={preview} alt="Face preview" className="h-full w-full rounded-xl object-cover" /> : <p className="text-sm text-muted">Upload image to start scan</p>}
          </div>

          <div className="mt-4 grid gap-2 md:grid-cols-2">
            <label className="cursor-pointer rounded-xl border border-white/10 bg-surface/85 px-4 py-3 text-center text-sm transition hover:border-cyan/35">
              Upload Image
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setSelectedFile(file);
                    setPreview(URL.createObjectURL(file));
                  }
                }}
              />
            </label>
            <button onClick={runScan} disabled={loading} className="flex items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 text-sm font-medium">
              {loading ? <LoadingSpinner /> : null}
              {loading ? 'Scanning...' : fakeMode ? 'Run Fake Detection' : 'Scan Face'}
            </button>
          </div>
        </GlassCard>

        <div>
          {error ? <ErrorState message={error} onRetry={runScan} /> : null}
          {!error ? (
            <GlassCard className="p-5 md:p-6">
              <h3 className="text-lg font-semibold">Scan Results</h3>
              {!result ? <EmptyState className="mt-3" message="No result yet. Execute a scan to view matched identities and model confidence." /> : null}

              {result ? (
                <div className="mt-4 space-y-3">
                  <div className="rounded-xl border border-white/10 bg-surface/85 p-3 text-sm text-muted">Faces detected: {result.faces_detected}</div>

                  {result.matched_profiles.length ? (
                    result.matched_profiles.map((profile, idx) => (
                      <div key={`${profile.platform}-${idx}`} className="rounded-xl border border-white/10 bg-surface/85 p-3">
                        <div className="flex items-center justify-between">
                          <p className="text-sm">{profile.platform}</p>
                          <p className="text-sm text-cyan">{profile.confidence}%</p>
                        </div>
                        {profile.profile_url ? (
                          <a href={profile.profile_url} className="mt-1 block text-xs text-accent hover:underline">
                            {profile.profile_url}
                          </a>
                        ) : null}
                        <div className="mt-2 h-1.5 overflow-hidden rounded bg-white/10">
                          <div className="h-full rounded bg-gradient-to-r from-accent to-cyan" style={{ width: `${profile.confidence}%` }} />
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-xl border border-white/10 bg-surface/85 p-3 text-sm text-muted">No gallery matches found.</div>
                  )}

                  <div className="rounded-xl border border-cyan/30 bg-cyan/10 p-3">
                    <p className="text-sm">Fake detection confidence: {result.fake_detection_confidence}%</p>
                    <p className="mt-1 text-xs text-muted">Label: {result.fake_detection_label}</p>
                  </div>

                  {result.anti_spoof_model ? (
                    <div className="rounded-xl border border-white/10 bg-surface/85 p-3 text-xs text-muted">
                      <p>Anti-spoof model: {result.anti_spoof_model}</p>
                    </div>
                  ) : null}

                  {result.signals && Object.keys(result.signals).length ? (
                    <div className="rounded-xl border border-white/10 bg-surface/85 p-3 text-xs text-muted">
                      <p>Blur variance: {result.signals.blur_variance}</p>
                      <p>Brightness mean: {result.signals.brightness_mean}</p>
                      <p>Edge ratio: {result.signals.edge_ratio}</p>
                      <p>Face area ratio: {result.signals.face_area_ratio}</p>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </GlassCard>
          ) : null}
        </div>
      </div>
    </div>
  );
}
