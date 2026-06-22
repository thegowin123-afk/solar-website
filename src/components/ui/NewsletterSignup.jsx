import { useState } from 'react';
import { Mail, CheckCircle, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import { subscribeNewsletter } from '../../lib/enquiries';

export default function NewsletterSignup({ compact = false }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | already | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    setErrorMsg('');

    const { error, alreadySubscribed } = await subscribeNewsletter(
      email,
      window.location.pathname
    );

    if (error) {
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again or email us directly.');
      return;
    }

    setStatus(alreadySubscribed ? 'already' : 'success');
  };

  /* ── Compact variant (used in sidebar) ───────────────────── */
  if (compact) {
    return (
      <div>
        {status === 'success' || status === 'already' ? (
          <div className="flex items-center gap-2 text-forest-700 text-sm">
            <CheckCircle className="w-5 h-5 text-forest-600 flex-shrink-0" />
            {status === 'already'
              ? 'You\'re already subscribed — thanks!'
              : 'Subscribed! Check your inbox.'}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={status === 'loading'}
              className="form-input flex-grow"
              placeholder="Enter your email"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-primary py-3 px-4 flex-shrink-0"
            >
              {status === 'loading' ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <ArrowRight className="w-4 h-4" />
              )}
            </button>
          </form>
        )}
        {status === 'error' && (
          <p className="text-xs text-red-500 mt-2 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" /> {errorMsg}
          </p>
        )}
      </div>
    );
  }

  /* ── Full section variant ─────────────────────────────────── */
  return (
    <section className="bg-gradient-to-r from-forest-900 to-forest-800 py-16">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-12 h-12 rounded-2xl bg-gold-500 flex items-center justify-center mx-auto mb-5">
            <Mail className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl font-heading font-bold text-white mb-3">
            Stay Ahead of Irish Solar Planning
          </h2>
          <p className="text-gray-300 mb-8">
            Join 1,200+ solar developers and contractors who receive our monthly planning insights,
            policy updates, and technical guidance.
          </p>

          {status === 'success' ? (
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-forest-700 flex items-center justify-center">
                <CheckCircle className="w-7 h-7 text-green-400" />
              </div>
              <p className="text-white font-semibold text-lg">You're subscribed!</p>
              <p className="text-gray-300 text-sm">
                We've sent a welcome email to <strong className="text-white">{email}</strong>.
                Check your inbox (and spam folder, just in case).
              </p>
            </div>
          ) : status === 'already' ? (
            <div className="flex flex-col items-center gap-3">
              <CheckCircle className="w-8 h-8 text-green-400" />
              <p className="text-white font-semibold">You're already on our list — thanks!</p>
            </div>
          ) : (
            <>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={status === 'loading'}
                  className="form-input flex-grow bg-white/10 border-white/20 text-white placeholder-gray-400 focus:ring-gold-400"
                  placeholder="your@email.com"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary flex-shrink-0"
                >
                  {status === 'loading' ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Subscribing…</>
                  ) : (
                    'Subscribe Free'
                  )}
                </button>
              </form>

              {status === 'error' && (
                <div className="flex items-center justify-center gap-2 mt-3 text-red-300 text-sm">
                  <AlertCircle className="w-4 h-4" /> {errorMsg}
                </div>
              )}

              <p className="text-xs text-gray-500 mt-4">
                No spam. Unsubscribe anytime. We respect your privacy.
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
