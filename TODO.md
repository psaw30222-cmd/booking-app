# ESLint Fixes TODO

## Components
- [x] HtmlSitemap.jsx: Move SitemapSection component outside render
- [x] LazyImage.jsx: Remove unused props (srcSet, webpSrc, webpSrcSet, quality), remove unused semanticKeywords, fix setState in useEffect
- [x] SEO.jsx: Remove unused props (author, publishedDate, modifiedDate)
- [x] SEOMonitoringDashboard.jsx: Remove unused setRefreshInterval, move loadData before useEffect

## Context Files
- [x] BookingContext.jsx: Move constants to separate file or disable fast refresh warning
- [x] SearchContext.jsx: Same as BookingContext

## Page Files
- [x] Bangalore.jsx: Remove unused aeoStrategy, structuredDataEnhanced, breadcrumbData
- [ ] Booking.jsx: Remove unused setSelectedDate, setSelectedTime, setSelectedBarber, handleConfirm, dates, times, barbers
- [x] CompanionEscortServices.jsx: Remove unused aeoStrategy, structuredDataEnhanced, aiContentEnhancement
- [ ] ContactUs.jsx: Remove unused aeoStrategy
- [ ] Custom404.jsx: Fix setState in useEffect
- [ ] Delhi.jsx: Remove unused aeoStrategy, structuredDataEnhanced, breadcrumbData, faqJsonLd
- [ ] HelpCenter.jsx: Remove unused zeroClickOptimization
- [ ] Home.jsx: Remove unused faqSchema
- [ ] MassageEscortServices.jsx: Remove unused phone
- [ ] Mumbai.jsx: Remove unused aeoStrategy, structuredDataEnhanced, faqJsonLd
- [x] MumbaiEscortServices.jsx: Fix undefined MumbaiEscortServices
- [ ] SearchResults.jsx: Remove unused searchQuery
- [ ] Success.jsx: Move Math.random to useMemo/useState
- [ ] VerifiedEscortServices.jsx: Remove unused aeoStrategy, structuredDataEnhanced

## Utils/SEO Files
- [ ] citation-builder.js: Remove unused city, citation
- [ ] citation-demo.js: Remove unused index, fix undefined process
- [ ] core-update-preparation.js: Remove unused page variables
- [ ] international-seo.js: Fix lexical declaration in case block
- [ ] keyword-cannibalization.js: Remove unused index
- [ ] keyword-research-automation.js: Remove unused seedKeyword, fix undefined process
- [ ] local-seo-config.js: Remove unused nameVariations, cityData
- [ ] orphan-page-detector.js: Fix url self-assignment
- [ ] analytics.js: Remove unnecessary eslint-disable
- [ ] brokenLinkDetector.js: Fix undefined useState
- [ ] canonicalHelper.js: Remove unused variables
- [ ] httpsSecurityManager.js: Fix undefined process
- [ ] openGraphManager.js: Remove unused pageData, fix undefined process
- [ ] redirectManager.js: Fix undefined variables, remove useless escape
- [ ] twitterCardManager.js: Remove unused canonicalUrl
