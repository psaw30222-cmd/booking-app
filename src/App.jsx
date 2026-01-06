import React from 'react';
import { Routes, Route } from 'react-router-dom';
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



/**
 * Main App Component with Routing
 */
function App() {
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
            

            {/* 404 Route */}
            <Route path="*" element={<Home />} />
          </Routes>
      </SearchProvider>
    </BookingProvider>
  );
}

export default App;