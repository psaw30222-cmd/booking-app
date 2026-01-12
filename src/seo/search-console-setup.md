# Google Search Console & GA4 Setup (Step-by-step)

## 1) Create Google Search Console property
- Go to https://search.google.com/search-console
- Add a property. Prefer **Domain** verification (covers all subdomains/protocols) OR **URL prefix**.
- For Domain verification: add the provided DNS TXT record to your domain registrar and wait for verification.
- For URL prefix verification: you can verify with an **HTML meta tag** or an **HTML file**.
  - To use an HTML meta tag, add the following to your `index.html` <head> (or set it via `SEO` if preferred):
    <meta name="google-site-verification" content="<YOUR_VERIFICATION_TOKEN>" />

## 2) Submit sitemap(s)
- Ensure your sitemap is accessible at `https://bookease.com/sitemap.xml` (already present in `public/`).
- In Search Console, go to **Sitemaps** → enter `/sitemap.xml` → Submit.
- Also submit any secondary sitemaps (e.g., `sitemap-cities.xml`, `sitemap-services.xml`).

## 3) Set up GA4 (Google Analytics)
- Go to https://analytics.google.com and create a GA4 property.
- Get the Measurement ID (format: `G-XXXXXXX`).
- Add this measurement ID to your environment: create `.env` on your server with `VITE_GA_MEASUREMENT_ID=G-XXXXXXX` and redeploy.

## 4) Deploy and test
- After deployment, confirm the GA script loads on the site (`Network` tab -> `gtag/js?id=G-XXXXXXX`).
- In Analytics -> Realtime, you should see active users after visiting the site.
- In GSC, use **URL Inspection** to request indexing for changed pages (especially top city pages).

## 5) Link GSC with GA4
- In GSC, go to Settings → Associations → add your GA4 property (optional but recommended to see Search Console data in GA).

## 6) Request index coverage and monitor
- Use **URL Inspection** → Copy test live URL for important pages (e.g., `/delhi`, `/mumbai`) → Request indexing.
- Monitor performance and coverage in GSC and GA4 for traffic, CTR, and ranking changes.

## 7) Helpful checks
- Check `robots.txt` and `sitemap.xml` entries (already in `public/`).
- Ensure your critical pages are prerendered so meta tags are readable by crawlers (we added `react-snap`).
- Use the **URL Inspection** tool to confirm the rendered HTML includes the updated meta tags and structured data.

---
If you want, I can:
- Add the `google-site-verification` meta tag to `index.html` (requires providing the verification token), or
- Create a deployment checklist and a small script to automatically ping the Search Console API to submit sitemaps programmatically (requires OAuth credentials).
