import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import ProductDetailPage from '@/pages/ProductDetailPage';
import CartPage from '@/pages/CartPage';
import DashboardPage from '@/pages/DashboardPage';
import AboutPage from '@/pages/AboutPage';
import CheckoutPage from '@/pages/CheckoutPage';
import OrderSummaryPage from '@/pages/OrderSummaryPage';
import LoginPage from '@/pages/LoginPage';
import ReviewsPage from '@/pages/ReviewsPage';
import ChangePasswordPage from '@/pages/ChangePasswordPage';
import AdminDashboardPage from '@/pages/admin/AdminDashboardPage'; 
import AdminProductManagementPage from '@/pages/admin/AdminProductManagementPage';
import AdminOrderManagementPage from '@/pages/admin/AdminOrderManagementPage';
import AdminUserManagementPage from '@/pages/admin/AdminUserManagementPage';

import ScrollToTop from '@/components/ScrollToTop';
import { Toaster } from '@/components/ui/toaster';
import { CartProvider } from '@/contexts/CartContext';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (adminOnly && user?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />; 
  }
  return children;
};

const AppRoutes = () => {
  const { user } = useAuth();
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/product/:id" element={<ProductDetailPage />} />
      <Route path="/reviews" element={<ReviewsPage />} />
      <Route path="/cart" element={<CartPage />} />
      
      <Route 
        path="/checkout" 
        element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} 
      />
      <Route 
        path="/order-summary" 
        element={<ProtectedRoute><OrderSummaryPage /></ProtectedRoute>} 
      />
      <Route 
        path="/dashboard/:section?" 
        element={
          <ProtectedRoute>
            {user?.role === 'admin' ? <Navigate to="/admin/dashboard/overview" replace /> : <DashboardPage />}
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
             {user?.role === 'admin' ? <Navigate to="/admin/dashboard/overview" replace /> : <DashboardPage />}
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/change-password" 
        element={<ProtectedRoute><ChangePasswordPage /></ProtectedRoute>} 
      />

      {/* Admin Routes */}
      <Route 
        path="/admin/dashboard/:section?" 
        element={<ProtectedRoute adminOnly={true}><AdminDashboardPage /></ProtectedRoute>} 
      />
      <Route 
        path="/admin/products" 
        element={<ProtectedRoute adminOnly={true}><AdminProductManagementPage /></ProtectedRoute>} 
      />
      <Route 
        path="/admin/orders" 
        element={<ProtectedRoute adminOnly={true}><AdminOrderManagementPage /></ProtectedRoute>} 
      />
       <Route 
        path="/admin/users" 
        element={<ProtectedRoute adminOnly={true}><AdminUserManagementPage /></ProtectedRoute>} 
      />

    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />
          <AppRoutes />
          <Toaster />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;