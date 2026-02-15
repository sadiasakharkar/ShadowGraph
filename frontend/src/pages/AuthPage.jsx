import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import LoadingSpinner from '../components/LoadingSpinner';
import { useAuth } from '../context/AuthContext';
import { exchangeOAuthCode, getOAuthStartUrl } from '../services/authService';
import { getDisplayError } from '../services/apiErrors';

export default function AuthPage() {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useAuth();

  const redirectTo = location.state?.from || '/app/overview';

  useEffect(() => {
    const search = new URLSearchParams(location.search);
    const code = search.get('code');
    const state = search.get('state');
    const provider = search.get('provider') || search.get('oauth');

    if (!code || !state || !provider) {
      return;
    }

    const completeOAuth = async () => {
      try {
        setOauthLoading(provider);
        setError('');
        const redirectUri = `${window.location.origin}/auth?provider=${provider}`;
        const result = await exchangeOAuthCode({ provider, code, state, redirectUri });
        await signIn({ email: result.user.email, password: 'oauth-session', mode: 'login', directSession: result });
        navigate(redirectTo, { replace: true });
      } catch (err) {
        setError(getDisplayError(err, 'OAuth authentication failed.'));
      } finally {
        setOauthLoading('');
      }
    };

    completeOAuth();
  }, [location.search]);

  const submit = async (e) => {
    e.preventDefault();
    if (!email.includes('@') || password.length < 8) {
      setError('Use a valid email and strong password (8+ chars, upper/lower/digit).');
      return;
    }

    try {
      setError('');
      setLoading(true);
      await signIn({ email, password, mode });
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err?.message || 'Authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  const startOAuth = async (provider) => {
    try {
      setError('');
      setOauthLoading(provider);
      const redirectUri = `${window.location.origin}/auth?provider=${provider}`;
      const { auth_url } = await getOAuthStartUrl(provider, redirectUri);
      window.location.href = auth_url;
    } catch (err) {
      setError(getDisplayError(err, `Unable to start ${provider} OAuth.`));
      setOauthLoading('');
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      <div className="pointer-events-none absolute inset-0 grid-hero opacity-60" />
      <motion.form
        onSubmit={submit}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card relative z-10 w-full max-w-md rounded-3xl p-7"
      >
        <p className="text-[11px] uppercase tracking-[0.25em] text-cyan">Secure Access</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">{mode === 'login' ? 'Welcome back' : 'Create your account'}</h1>
        <p className="mt-2 text-sm text-muted">Authenticate to launch your digital footprint intelligence workspace.</p>

        <div className="mt-6 space-y-3">
          <input
            className={`w-full rounded-xl border bg-surface/85 px-4 py-3 text-sm outline-none transition ${
              error ? 'border-red-400' : 'border-white/10 focus:border-accent'
            }`}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className={`w-full rounded-xl border bg-surface/85 px-4 py-3 text-sm outline-none transition ${
              error ? 'border-red-400' : 'border-white/10 focus:border-accent'
            }`}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error ? <p className="text-xs text-red-400">{error}</p> : null}
          <button disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-3 text-sm font-medium">
            {loading ? <LoadingSpinner /> : null}
            {loading ? 'Authenticating...' : mode === 'login' ? 'Login' : 'Create Account'}
          </button>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => startOAuth('google')}
            className="rounded-xl border border-white/10 bg-surface py-2.5 text-sm transition hover:border-cyan/35"
          >
            {oauthLoading === 'google' ? 'Redirecting...' : 'Continue with Google'}
          </button>
          <button
            type="button"
            onClick={() => startOAuth('github')}
            className="rounded-xl border border-white/10 bg-surface py-2.5 text-sm transition hover:border-cyan/35"
          >
            {oauthLoading === 'github' ? 'Redirecting...' : 'Continue with GitHub'}
          </button>
        </div>

        <p className="mt-4 text-sm text-muted">
          {mode === 'login' ? 'No account?' : 'Already registered?'}{' '}
          <button type="button" className="text-cyan hover:text-accent" onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}>
            {mode === 'login' ? 'Sign up' : 'Login'}
          </button>
        </p>
        <Link to="/" className="mt-2 block text-xs text-muted hover:text-text">
          Back to landing
        </Link>
      </motion.form>
    </div>
  );
}
