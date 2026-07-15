import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CheckCircle, Send, Loader2, AlertCircle } from 'lucide-react';
import { services } from '../../data/services';
import { counties } from '../../data/counties';
import { submitEnquiry } from '../../lib/enquiries';
import { trackEvent } from '../../lib/analytics';

export default function ContactForm({
  preselectedService = '',
  defaultCounty = '',
  compact = false,
  className = '',
}) {
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      service: preselectedService,
      county: defaultCounty,
    },
  });

  const onSubmit = async (data) => {
    setStatus('loading');
    setErrorMsg('');

    const { error } = await submitEnquiry(data, window.location.pathname);

    if (error) {
      setStatus('error');
      setErrorMsg(
        'Sorry, there was a problem sending your enquiry. Please try again, or email us directly at info@solarplanningireland.com.'
      );
      return;
    }

    trackEvent('enquiry_submitted', {
      service: data.service,
      county: data.county,
      scale: data.scale || 'unspecified',
    });
    setStatus('success');
  };

  /* ── Success state ─────────────────────────────────────────── */
  if (status === 'success') {
    return (
      <div className={`flex flex-col items-center justify-center text-center py-12 px-6 ${className}`}>
        <div className="w-16 h-16 rounded-full bg-forest-100 flex items-center justify-center mb-4">
          <CheckCircle className="w-8 h-8 text-forest-600" />
        </div>
        <h3 className="text-xl font-heading font-bold text-forest-900 mb-2">Enquiry Received!</h3>
        <p className="text-gray-600 max-w-sm leading-relaxed">
          Thank you for getting in touch. One of our consultants will review your project
          and respond within one business day.
        </p>
      </div>
    );
  }

  /* ── Form ──────────────────────────────────────────────────── */
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`space-y-4 ${className}`}
      noValidate
    >
      <div className={`grid gap-4 ${compact ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'}`}>
        {/* Name */}
        <div>
          <label className="form-label">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            {...register('name', { required: 'Name is required' })}
            className={`form-input ${errors.name ? 'border-red-400 ring-1 ring-red-400' : ''}`}
            placeholder="Your full name"
          />
          {errors.name && (
            <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="form-label">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' },
            })}
            className={`form-input ${errors.email ? 'border-red-400 ring-1 ring-red-400' : ''}`}
            placeholder="your@email.com"
          />
          {errors.email && (
            <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="form-label">Phone Number</label>
          <input
            type="tel"
            {...register('phone')}
            className="form-input"
            placeholder="+353 (0)1 234 5678"
          />
        </div>

        {/* Service */}
        <div>
          <label className="form-label">
            Service Required <span className="text-red-500">*</span>
          </label>
          <select
            {...register('service', { required: 'Please select a service' })}
            className={`form-input ${errors.service ? 'border-red-400 ring-1 ring-red-400' : ''}`}
          >
            <option value="">Select a service…</option>
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.shortTitle}
              </option>
            ))}
            <option value="multiple">Multiple Services</option>
            <option value="unsure">Not Sure — Need Advice</option>
          </select>
          {errors.service && (
            <p className="text-xs text-red-500 mt-1">{errors.service.message}</p>
          )}
        </div>

        {/* County */}
        <div>
          <label className="form-label">
            County <span className="text-red-500">*</span>
          </label>
          <select
            {...register('county', { required: 'Please select a county' })}
            className={`form-input ${errors.county ? 'border-red-400 ring-1 ring-red-400' : ''}`}
          >
            <option value="">Select county…</option>
            {counties.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {errors.county && (
            <p className="text-xs text-red-500 mt-1">{errors.county.message}</p>
          )}
        </div>

        {/* Scale */}
        <div>
          <label className="form-label">Project Capacity / Scale</label>
          <select {...register('scale')} className="form-input">
            <option value="">Select scale…</option>
            <option value="domestic">Domestic (&lt; 6kWp)</option>
            <option value="commercial-small">Commercial Small (6–50kWp)</option>
            <option value="commercial-large">Commercial Large (50kWp–1MW)</option>
            <option value="solar-farm-small">Solar Farm (&lt; 10MW)</option>
            <option value="solar-farm-medium">Solar Farm (10–50MW)</option>
            <option value="solar-farm-large">Solar Farm (50MW+)</option>
          </select>
        </div>
      </div>

      {/* Details */}
      <div>
        <label className="form-label">
          Project Details <span className="text-red-500">*</span>
        </label>
        <textarea
          {...register('details', { required: 'Please describe your project' })}
          rows={compact ? 3 : 5}
          className={`form-input resize-none ${errors.details ? 'border-red-400 ring-1 ring-red-400' : ''}`}
          placeholder="Briefly describe your project — location, approximate scale, any planning timeline…"
        />
        {errors.details && (
          <p className="text-xs text-red-500 mt-1">{errors.details.message}</p>
        )}
      </div>

      {/* Consent */}
      <div className="flex items-start gap-2">
        <input
          type="checkbox"
          id="consent"
          {...register('consent', { required: 'Please accept to continue' })}
          className="mt-1 w-4 h-4 accent-gold-500"
        />
        <label htmlFor="consent" className="text-sm text-gray-600">
          I agree to be contacted by SolarPlan Ireland regarding my enquiry. See our{' '}
          <a href="/privacy" className="text-gold-600 hover:underline">
            Privacy Policy
          </a>
          .
          {errors.consent && (
            <span className="block text-xs text-red-500 mt-0.5">{errors.consent.message}</span>
          )}
        </label>
      </div>

      {/* Error banner */}
      {status === 'error' && (
        <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          {errorMsg}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-primary w-full justify-center gap-2"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Send Enquiry
          </>
        )}
      </button>
    </form>
  );
}
