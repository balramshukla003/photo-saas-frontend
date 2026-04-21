import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import { Input, InputPassword } from '../components/ui/Input';
import { Alert } from '../components/ui/Feedback';

export default function LoginPage() {
  const { login, loading, error, clearError, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/photo';

  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors]     = useState({});

  // Redirect if already logged in
  useEffect(() => { if (user) navigate(from, { replace: true }); }, [user]);

  const validate = () => {
    const e = {};
    if (!email.trim())                       e.email    = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(email))   e.email    = 'Enter a valid email address.';
    if (!password)                           e.password = 'Password is required.';
    else if (password.length < 6)           e.password = 'Password must be at least 6 characters.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();
    if (!validate()) return;
    const result = await login(email.trim(), password);
    if (result.success) navigate(from, { replace: true });
  };

  return (
    <>
      {/* SEO title update */}
      <title>Sign In — PhotoPrint</title>

      {/* Full-screen background */}
      <div
        className="min-h-dvh w-full flex items-center justify-center relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0d1117 0%, #1e1e2e 40%, #1a2744 70%, #0f2257 100%)',
        }}
        aria-label="Login page background"
      >
        {/* Ambient decorative blobs — aria-hidden */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, #3b70f6 0%, transparent 70%)' }} />
          <div className="absolute top-1/2 -right-24 w-80 h-80 rounded-full opacity-15"
            style={{ background: 'radial-gradient(circle, #2550eb 0%, transparent 70%)' }} />
          <div className="absolute -bottom-20 left-1/3 w-72 h-72 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #8eb8fd 0%, transparent 70%)' }} />
          {/* Grid pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-5" aria-hidden="true">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#fff" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Login card — square, Windows style */}
        <div
          className="relative z-10 w-full max-w-sm mx-4 xs:mx-6 sm:mx-auto animate-slide-up"
          role="main"
        >
          {/* Card */}
          <div
            className="rounded-xl border border-white/10 overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.96)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 24px 64px rgba(0,0,0,0.5), 0 4px 16px rgba(0,0,0,0.3)',
            }}
          >
            {/* Card header strip */}
            <div className="bg-brand-700 px-8 py-5 flex items-center gap-3">
              <span aria-hidden="true" className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/15 text-white">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
                </svg>
              </span>
              <div>
                <h1 className="text-lg font-bold text-white leading-tight">PhotoPrint</h1>
                <p className="text-xs text-blue-100 font-medium">Professional Photo Service</p>
              </div>
            </div>

            {/* Form area */}
            <div className="px-8 py-8">
              <h2 className="text-xl font-bold text-ink-900 mb-1">Sign in</h2>
              <p className="text-sm text-ink-500 mb-6">Enter your credentials to continue</p>

              {/* API error */}
              {error && (
                <div className="mb-5">
                  <Alert type="error" message={error} onDismiss={clearError} />
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                noValidate
                aria-label="Sign in form"
                className="flex flex-col gap-5"
              >
                <Input
                  label="Email address"
                  type="email"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: '' })); }}
                  placeholder="you@example.com"
                  error={errors.email}
                  required
                  autoComplete="email"
                  inputMode="email"
                  icon={<EmailIcon />}
                />

                <div className="flex flex-col gap-1.5">
                  <InputPassword
                    label="Password"
                    value={password}
                    onChange={e => { setPassword(e.target.value); setErrors(p => ({ ...p, password: '' })); }}
                    error={errors.password}
                    required
                    autoComplete="current-password"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  loading={loading}
                  aria-label="Sign in to PhotoPrint"
                >
                  Sign in
                </Button>
              </form>

              {/* Footer note */}
              <p className="mt-6 text-center text-xs text-ink-300">
                Access is managed by your administrator.
                <br />Contact support if you cannot sign in.
              </p>
            </div>
          </div>

          {/* Below-card version */}
          <p className="mt-4 text-center text-xs text-white/30" aria-hidden="true">
            PhotoPrint v1.0 · Licensed Software
          </p>
        </div>
      </div>
    </>
  );
}

const EmailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);
