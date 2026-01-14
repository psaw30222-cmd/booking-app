import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';
import { SearchProvider } from './context/SearchContext';
import TermsModal from './components/TermsModal';
import Home from './pages/Home';
import ServiceDetail from './pages/ServiceDetail';
import Booking from './pages/Booking';
import Confirmation from './pages/Confirmation';
import Success from './pages/Success';
import SearchResults from './pages/SearchResults';
import Legal from './pages/Legal';
import TermsAndConditions from './pages/TermsAndConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import CookiePolicy from './pages/CookiePolicy';
import Support from './pages/Support';
import ContactUs from './pages/ContactUs';
import HelpCenter from './pages/HelpCenter';
import Blog from './pages/Blog';
import Security from './pages/Security';
import HowToReportScam from './pages/HowToReportScam';
import Company from './pages/Company';
import BakecaIncontri from './pages/BakecaIncontri';
import Network from './pages/Network';
// city
import Mumbai from './pages/Mumbai';
import Delhi from './pages/Delhi';
import Bangalore from './pages/Bangalore';
// Pillar Pages
import VerifiedEscortServices from './pages/VerifiedEscortServices';
import MumbaiEscortServices from './pages/MumbaiEscortServices';
import MassageEscortServices from './pages/MassageEscortServices';
import CompanionEscortServices from './pages/CompanionEscortServices';
import { trackPageView } from './utils/analytics';



/**
 * Main App Component with Routing
 */
function App() {
  const location = useLocation();

  useEffect(() => {
    // Send a pageview to GA on location change
    const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
    if (measurementId) {
      trackPageView(location.pathname + location.search, measurementId);
    }
  }, [location]);

  return (
    <BookingProvider>
      <SearchProvider>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/service/:id" element={<ServiceDetail />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/success" element={<Success />} />
            <Route path="/search" element={<SearchResults />} />

            {/* Legal and Policy Routes */}
            <Route path="/legal" element={<Legal />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />

            {/* Support Routes */}
            <Route path="/support" element={<Support />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/help-center" element={<HelpCenter />} />

            {/* Content Routes */}
            <Route path="/blog" element={<Blog />} />

            {/* Security Routes */}
            <Route path="/security" element={<Security />} />
            <Route path="/how-to-report-scam" element={<HowToReportScam />} />

            {/* Company Routes */}
            <Route path="/company" element={<Company />} />
            <Route path="/bakeca-incontri" element={<BakecaIncontri />} />
            <Route path="/network" element={<Network />} />
{/* city */}
            <Route path="/mumbai" element={<Mumbai />} />
            <Route path="/delhi" element={<Delhi />} />
            <Route path="/bangalore" element={<Bangalore />} />

            {/* Pillar Pages */}
            <Route path="/verified-escort-services" element={<VerifiedEscortServices />} />
            <Route path="/mumbai-escort-services" element={<MumbaiEscortServices />} />
            <Route path="/delhi-escort-services" element={<Delhi />} />
            <Route path="/massage-escort-services" element={<MassageEscortServices />} />
            <Route path="/companion-escort-services" element={<CompanionEscortServices />} />

            {/* 404 Route */}
            <Route path="*" element={<Home />} />
          </Routes>
      </SearchProvider>
    </BookingProvider>
  );
}

export default App;