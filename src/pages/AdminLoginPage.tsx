import { useState, useEffect } from 'react';
import { Lock, Mail, ArrowLeft, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/lib/auth';
import { Link, useRouter } from '@/lib/router';

const LOGO_URL =
  'https://dbzrxxwjkpbhfwhrcgxv.supabase.co/storage/v1/object/public/logosImages/logo.svg';

export function AdminLoginPage() {
  const { session, loading } = useAuth();
  const { navigate } = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && session) {
      navigate('/admin/dashboard');
    }
  }, [session, loading, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setSubmitting(true);
    setError('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setSubmitting(false);
    } else {
      navigate('/admin/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950 px-4 relative overflow-hidden">

      {/* Ambient animated orbs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl orb-wander pointer-events-none" />

      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl orb-wander delay-1000 pointer-events-none" />

      {/* Back to site */}
      <div className="absolute top-6 left-6 z-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to site
        </Link>
      </div>

      {/* Main content */}
      <div className="max-w-md w-full relative z-10">

        {/* Header */}
        <div className="text-center mb-8 animate-fade-in-down">

          {/* LOGO - NO WHITE BACKGROUND */}
          <div className="flex justify-center items-center mb-5 animate-float">

            <img
              src={LOGO_URL}
              alt="R&T Global Education & Ventures Logo"
              className="
                w-60
                h-60
                object-contain
                scale-125
                drop-shadow-[0_8px_20px_rgba(0,0,0,0.35)]
              "
              onError={(e) => {
                const image = e.target as HTMLImageElement;

                image.style.display = 'none';

                const parent = image.parentElement;

                if (parent) {
                  parent.innerHTML = `
                    <span
                      style="
                        color:#ffffff;
                        font-weight:700;
                        font-size:28px;
                        letter-spacing:1px;
                      "
                    >
                      R&amp;T
                    </span>
                  `;
                }
              }}
            />

          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-white mb-2 animate-fade-in-up delay-200">
            Admin Portal
          </h1>

          {/* Subtitle */}
          <p className="text-white/60 animate-fade-in-up delay-300">
            Sign in to manage student applications
          </p>

        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 animate-fade-in-scale delay-400">

          {/* Error Message */}
          {error && (
            <div className="mb-5 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 animate-fade-in-down">

              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />

              <span className="text-red-700 text-sm">
                {error}
              </span>

            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">

            {/* Email */}
            <div>

              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email Address
              </label>

              <div className="relative group">

                <Mail
                  className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    w-5
                    h-5
                    text-slate-400
                    group-focus-within:text-blue-600
                    transition-colors
                  "
                />

                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="
                    w-full
                    pl-11
                    pr-4
                    py-3
                    bg-gray-50
                    border
                    border-gray-200
                    rounded-xl
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500
                    focus:border-transparent
                    transition-all
                    focus:bg-white
                  "
                  placeholder="admin@rtglobaleducation.com"
                />

              </div>

            </div>

            {/* Password */}
            <div>

              <label className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>

              <div className="relative group">

                <Lock
                  className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    w-5
                    h-5
                    text-slate-400
                    group-focus-within:text-blue-600
                    transition-colors
                  "
                />

                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="
                    w-full
                    pl-11
                    pr-4
                    py-3
                    bg-gray-50
                    border
                    border-gray-200
                    rounded-xl
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500
                    focus:border-transparent
                    transition-all
                    focus:bg-white
                  "
                  placeholder="••••••••"
                />

              </div>

            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={submitting}
              className="
                w-full
                py-3.5
                bg-blue-600
                text-white
                rounded-xl
                font-semibold
                hover:bg-blue-700
                transition-all
                shadow-md
                hover:shadow-blue-500/30
                hover:-translate-y-0.5
                disabled:opacity-60
                disabled:cursor-not-allowed
                disabled:hover:translate-y-0
              "
            >
              {submitting ? 'Signing in...' : 'Sign In'}
            </button>

          </form>

          {/* Security Notice */}
          <div className="mt-6 p-4 bg-amber-50 rounded-xl text-sm text-amber-800">

            <p className="font-medium mb-1">
              Heavily Encrypted
            </p>

            <p>
              @CodeWithTed CyberSecurity.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}