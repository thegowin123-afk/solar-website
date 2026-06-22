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

  const { data, error } = await supabase
    .from('enquiries')
    .insert(payload)
    .select('id')
    .single();

  if (error) {
    console.error('[submitEnquiry] Supabase error:', error.message);
  }

  return { data, error };
}

/**
 * Subscribe an email address to the newsletter.
 * Uses upsert so re-subscribing an existing address doesn't error.
 * On insert, the database trigger sends the welcome email automatically.
 *
 * @param {string} email
 * @param {string} sourcePage
 * @returns {{ data, error, alreadySubscribed }}
 */
export async function subscribeNewsletter(email, sourcePage = '') {
  const normalised = email.toLowerCase().trim();

  // Check if already subscribed
  const { data: existing } = await supabase
    .from('newsletter_subscribers')
    .select('id, status')
    .eq('email', normalised)
    .maybeSingle();

  if (existing) {
    if (existing.status === 'active') {
      return { data: existing, error: null, alreadySubscribed: true };
    }
    // Re-activate if previously unsubscribed
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .update({ status: 'active', unsubscribed_at: null })
      .eq('id', existing.id)
      .select('id')
      .single();
    return { data, error, alreadySubscribed: false };
  }

  // New subscriber
  const { data, error } = await supabase
    .from('newsletter_subscribers')
    .insert({ email: normalised, source_page: sourcePage || window.location.pathname })
    .select('id')
    .single();

  if (error) {
    console.error('[subscribeNewsletter] Supabase error:', error.message);
  }

  return { data, error, alreadySubscribed: false };
}
