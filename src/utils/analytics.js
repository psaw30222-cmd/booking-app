export function initGA(measurementId) {
  if (!measurementId || typeof window === 'undefined') return;

  // Add the gtag script tag if not present
  if (!document.querySelector(`script[src*="https://www.googletagmanager.com/gtag/js?id=${measurementId}"]`)) {
    const s = document.createElement('script');
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(s);
  }

  // Initialize dataLayer and gtag
  window.dataLayer = window.dataLayer || [];
  function gtag(){window.dataLayer.push(arguments);} // eslint-disable-line no-inner-declarations
  window.gtag = window.gtag || gtag;

  window.gtag('js', new Date());
  window.gtag('config', measurementId, { send_page_view: false }); // we'll send manual page_view events
}

export function trackPageView(path, measurementId) {
  if (!measurementId || typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', 'page_view', {
    page_path: path,
  });
}

export function trackEvent(name, params = {}) {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', name, params);
}
