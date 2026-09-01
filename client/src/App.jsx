import React, { useState } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Navbar from './components/public/Navbar';
import MobileMenu from './components/public/MobileMenu';
import MobileActionBar from './components/public/MobileActionBar';
import Footer from './components/public/Footer';
import AdminSidebar from './components/admin/AdminSidebar';
import { useAuth } from './context/AuthContext';

// Public Pages
import Home from './pages/public/Home';
import About from './pages/public/About';
import Services from './pages/public/Services';
import ServiceDetail from './pages/public/ServiceDetail';
import Products from './pages/public/Products';
import ProductDetail from './pages/public/ProductDetail';
import CategoryProducts from './pages/public/CategoryProducts';
import Partners from './pages/public/Partners';
import PartnerDetail from './pages/public/PartnerDetail';
import Blog from './pages/public/Blog';
import BlogDetail from './pages/public/BlogDetail';
import Contact from './pages/public/Contact';
import Privacy from './pages/public/Privacy';
import DisclaimerPage from './pages/public/DisclaimerPage';
import Terms from './pages/public/Terms';
import NotFound from './pages/public/NotFound';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminPartners from './pages/admin/AdminPartners';
import AdminServices from './pages/admin/AdminServices';
import AdminCategories from './pages/admin/AdminCategories';
import AdminBlog from './pages/admin/AdminBlog';
import AdminSubscribers from './pages/admin/AdminSubscribers';
import AdminSettings from './pages/admin/AdminSettings';

/**
 * Layout for Public Pages
 */
function PublicLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Navbar onOpenMobileMenu={() => setMobileMenuOpen(true)} />
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      
      <main className="flex-grow pb-16 lg:pb-0">
        <Outlet />
      </main>

      <Footer />
      <MobileActionBar />
    </div>
  );
}

/**
 * Layout & Protection for Admin Pages
 */
function ProtectedAdminLayout() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-cream text-brand-dark-green font-serif font-bold text-xl">
        Authenticating Aninta CMS...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen flex bg-gray-50 text-brand-text-dark">
      <AdminSidebar />
      <div className="flex-1 overflow-y-auto min-h-screen flex flex-col justify-between">
        <Outlet />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      {/* Admin Unprotected Route */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Admin Protected Routes */}
      <Route element={<ProtectedAdminLayout />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/products/new" element={<AdminProducts />} />
        <Route path="/admin/products/:id/edit" element={<AdminProducts />} />
        <Route path="/admin/partners" element={<AdminPartners />} />
        <Route path="/admin/services" element={<AdminServices />} />
        <Route path="/admin/categories" element={<AdminCategories />} />
        <Route path="/admin/blog" element={<AdminBlog />} />
        <Route path="/admin/blog/new" element={<AdminBlog />} />
        <Route path="/admin/blog/:id/edit" element={<AdminBlog />} />
        <Route path="/admin/subscribers" element={<AdminSubscribers />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
      </Route>

      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:slug" element={<ProductDetail />} />
        <Route path="/categories/:slug" element={<CategoryProducts />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/partners/:slug" element={<PartnerDetail />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/disclaimer" element={<DisclaimerPage />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
