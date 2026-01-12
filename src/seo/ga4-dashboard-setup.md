# GA4 Dashboard & Alerts Setup (Recommended)

This guide walks through creating a GA4 dashboard, defining conversions, and linking Search Console.

## Events to track (we instrumented these in the app)
- begin_checkout: Fired when user starts a booking on a service detail page. (tracked with service_id, service_name, value, currency)
- add_payment_info: Fired when user provides booking details and proceeds to confirmation (date/time). (tracked with service_id, value)
- purchase: Fired when booking is confirmed (transaction_id, value, currency, items)
- contact_submit: (recommended) Track when contact form is submitted (implement trackEvent on Contact form submission)

## Recommended GA4 configuration
1. Conversions
   - Mark `purchase` as a conversion in GA4 (Events → Mark as conversion)
   - Optionally mark `begin_checkout` as a conversion for funnel analysis

2. Custom Dimensions
   - `service_id` (scope: event)
   - `service_name` (scope: event)
   - `city` (if available)

3. Audiences
   - Users who initiated checkout but didn't convert in 7 days
   - High-value customers (total spend > X)

4. Funnels & Explorations
   - Create a funnel exploration: begin_checkout → add_payment_info → purchase
   - Breakdown by `city` and `service_name` to prioritize markets

5. Looker Studio (formerly Data Studio) Dashboard
   - Create a dashboard with: Sessions, Users, Conversions (purchase), Conversion Rate, Revenue (if using value), Top cities by conversions, Top services by conversions, Funnel visualization, Page performance (landing pages with highest drop-off)
   - Use GA4 connector in Looker Studio and save the report template for reuse

6. Alerts & Reporting
   - Set up custom alerts in GA4 for: conversion drop (>30% week over week), sudden traffic drop, or spike in 404s
   - Schedule weekly email reports for KPI summary

## Linking Search Console
- In Search Console: go to **Settings → Associations** and link the GA4 property (requires GA permissions)
- In GA4: Admin → Product Links → Search Console → Link the verified property to see Search Console metrics in GA4

## Implementation notes
- Add contact form event tracking: call `trackEvent('contact_submit', {method: 'form', page: 'contact-us'})` when the Contact form is submitted.
- Ensure that GA4 measurement ID is set in production env (`VITE_GA_MEASUREMENT_ID=G-XXXXXXX`) and deployed.
- Use `Realtime` in GA4 to validate events after testing actions (start booking, fill booking details, confirm booking).

---
If you want, I can:
- Add `contact_submit` tracking to `ContactUs.jsx` now. ✅
- Create a sample Looker Studio template and share JSON / link you can copy. ✅
- Help run a verification test and create the first set of conversions & audience lists for you. ✅
