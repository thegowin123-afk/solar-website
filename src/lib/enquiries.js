/**
 * Supabase data access helpers for enquiries and newsletter subscribers.
 * Used by ContactForm and NewsletterSignup components.
 */

import { supabase } from './supabase';

/**
 * Submit a new enquiry to the `enquiries` table.
 * On success, the Supabase database trigger fires the Edge Function
 * which sends the notification + confirmation emails automatically.
 *
 * @param {object} formData – values from react-hook-form
 * @param {string} sourcePage – window.location.pathname at submission time
 * @returns {{ data, error }}
 */
export async function submitEnquiry(formData, sourcePage = '') {
  // Extract UTM params from the current URL
  const searchParams = new URLSearchParams(window.location.search);

  const payload = {
    name:         formData.name,
    email:        formData.email.toLowerCase().trim(),
    phone:        formData.phone || null,
    service:      formData.service || null,
    county:       formData.county || null,
    scale:        formData.scale || null,
    details:      formData.details,
    consent:      formData.consent === true,
    source_page:  sourcePage || window.location.pathname,
    utm_source:   searchParams.get('utm_source') || null,
    utm_medium:   searchParams.get('utm_medium') || null,
    utm_campaign: searchParams.get('utm_campaign') || null,
  };

  // Insert without reading the row back — the anon key has insert-only
  // access so enquiry data can never be read from the public site.
  const { error } = await supabase.from('enquiries').insert(payload);

  if (error) {
    console.error('[submitEnquiry] Supabase error:', error.message);
  }

  return { data: null, error };
}

/**
 * Subscribe an email address to the newsletter.
 * Insert-only: the anon key cannot read the subscriber list, so a duplicate
 * is detected via the unique-violation error rather than a lookup.
 *
 * @param {string} email
 * @param {string} sourcePage
 * @returns {{ data, error, alreadySubscribed }}
 */
export async function subscribeNewsletter(email, sourcePage = '') {
  const normalised = email.toLowerCase().trim();

  const { error } = await supabase
    .from('newsletter_subscribers')
    .insert({ email: normalised, source_page: sourcePage || window.location.pathname });

  // 23505 = unique_violation → this email is already subscribed
  if (error?.code === '23505') {
    return { data: null, error: null, alreadySubscribed: true };
  }

  if (error) {
    console.error('[subscribeNewsletter] Supabase error:', error.message);
  }

  return { data: null, error, alreadySubscribed: false };
}
