export const SITE_URL = 'https://www.solarplanningireland.com';
export const SITE_NAME = 'SolarPlan Ireland';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export function canonical(path) {
  return `${SITE_URL}${path}`;
}

export const DEFAULT_META = {
  title: 'Solar Planning Application Ireland | SolarPlan Ireland',
  description:
    'Expert solar planning application services across Ireland. Glint & glare analysis, Landscape Plans, PV planning drawings. 94% first-application approval rate. India-based (Mumbai), Irish planning specialists.',
};
