import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import SiteLayout from "./components/site/SiteLayout";
import ProtectedRoute from "./components/admin/ProtectedRoute";

import Home from "./pages/site/Home";
import Portfolio from "./pages/site/Portfolio";
import Services from "./pages/site/Services";
import About from "./pages/site/About";
import Films from "./pages/site/Films";
import Contact from "./pages/site/Contact";
import NotFound from "./pages/site/NotFound";

// Admin CMS is code-split into its own chunk — public visitors never download it.
const AdminLayout = lazy(() => import("./components/admin/AdminLayout"));
const Login = lazy(() => import("./pages/admin/Login"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const SiteSettings = lazy(() => import("./pages/admin/SiteSettings"));
const HeroManagement = lazy(() => import("./pages/admin/HeroManagement"));
const PortfolioManager = lazy(() => import("./pages/admin/PortfolioManager"));
const ServicesManager = lazy(() => import("./pages/admin/ServicesManager"));
const FoundersManager = lazy(() => import("./pages/admin/FoundersManager"));
const GalleryManager = lazy(() => import("./pages/admin/GalleryManager"));
const VideosManager = lazy(() => import("./pages/admin/VideosManager"));
const TestimonialsManager = lazy(() => import("./pages/admin/TestimonialsManager"));
const EnquiryManager = lazy(() => import("./pages/admin/EnquiryManager"));

export default function App() {
  return (
    <Routes>
      {/* Customer-facing website */}
      <Route element={<SiteLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/films" element={<Films />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Admin auth */}
      <Route path="/admin/login" element={<Suspense fallback={<AdminFallback />}><Login /></Suspense>} />

      {/* Admin CMS (protected) */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <Suspense fallback={<AdminFallback />}>
              <AdminLayout />
            </Suspense>
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="settings" element={<SiteSettings />} />
        <Route path="hero" element={<HeroManagement />} />
        <Route path="portfolio" element={<PortfolioManager />} />
        <Route path="services" element={<ServicesManager />} />
        <Route path="founders" element={<FoundersManager />} />
        <Route path="gallery" element={<GalleryManager />} />
        <Route path="videos" element={<VideosManager />} />
        <Route path="testimonials" element={<TestimonialsManager />} />
        <Route path="enquiries" element={<EnquiryManager />} />
      </Route>
    </Routes>
  );
}

function AdminFallback() {
  return (
    <div className="min-h-screen bg-ink flex items-center justify-center">
      <div className="w-10 h-10 border border-gold/30 border-t-gold rounded-full animate-spin" />
    </div>
  );
}
