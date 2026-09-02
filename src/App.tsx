import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import RootLayout from './components/RootLayout';
import LandingPage from './Pages/LandingPage';
import AboutPage from './Pages/AboutPage';
import ClubsPage from './Pages/ClubsPage';
import ContactPage from './Pages/ContactPage';

export default function App() {
  return (
    <BrowserRouter>
      {/* Reset window scroll or handle hash section anchors on route change */}
      <ScrollToTop />

      <Routes>
        <Route element={<RootLayout />}>
          {/* Home / Overview with integrated Resources */}
          <Route path="/" element={<LandingPage />} />

          {/* Dedicated Menu Routes */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/clubs" element={<ClubsPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Direct /resources path redirects to integrated resources section on Landing Page */}
          <Route path="/resources" element={<Navigate to="/#resources" replace />} />

          {/* Catch-all fallback redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
