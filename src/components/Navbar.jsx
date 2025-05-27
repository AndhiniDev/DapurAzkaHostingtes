import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, User, MessageCircle, Bell, LogIn, UserPlus, LayoutDashboard, Settings, Package, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';

const NavLinkButton = ({ path, name, onClick }) => (
  <button
    onClick={() => onClick(path)}
    className="text-gray-700 hover:text-[#FF8A00] transition-colors px-3 py-2 rounded-md text-sm font-medium"
  >
    {name}
  </button>
);

const MobileNavLinkButton = ({ path, name, onClick, closeMenu }) => (
  <button
    onClick={() => { onClick(path); closeMenu(); }}
    className="block w-full text-left text-gray-700 hover:text-[#FF8A00] py-2 px-3 rounded-md hover:bg-gray-50"
  >
    {name}
  </button>
);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { cart } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  const commonNavLinks = [
    { name: 'Beranda', path: '/' }, // Path will be handled for scroll to top
    { name: 'Tentang Kami', path: '/#about' }, // Changed to scroll to section
    { name: 'Menu', path: '/#menu' },
    { name: 'Testimoni', path: '/#reviews' },
    { name: 'Kontak', path: '/#contact' },
  ];

  const adminNavLinks = [
    { name: 'Dasbor Admin', path: '/admin/dashboard/overview', icon: <LayoutDashboard size={18} className="mr-2"/> },
    { name: 'Produk', path: '/admin/products', icon: <Package size={18} className="mr-2"/> },
    { name: 'Pesanan', path: '/admin/orders', icon: <ShoppingCart size={18} className="mr-2"/> },
    { name: 'Pengguna', path: '/admin/users', icon: <Users size={18} className="mr-2"/> },
  ];

  const customerIconLinks = [
    { icon: <User className="h-5 w-5 text-gray-700" />, path: '/dashboard/profile', section: 'profile', requiresAuth: true },
    { icon: <MessageCircle className="h-5 w-5 text-gray-700" />, path: '/dashboard/messages', section: 'messages', requiresAuth: true },
    { icon: <Bell className="h-5 w-5 text-gray-700" />, path: '/dashboard/notifications', section: 'notifications', requiresAuth: true },
  ];

  const handleNavLinkClick = (path) => {
    setIsMenuOpen(false);
    if (path === '/') { // Specifically for 'Beranda'
        if (location.pathname === '/') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            navigate('/'); // Will trigger ScrollToTop component
        }
    } else if (path.startsWith('/#')) {
      if (location.pathname !== '/') {
        navigate('/', { state: { scrollToSection: path.substring(2) } });
      } else {
        const elementId = path.substring(2);
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      navigate(path);
    }
  };
  
  useEffect(() => {
    if (location.state?.scrollToSection) {
      const element = document.getElementById(location.state.scrollToSection);
      if (element) {
        // Timeout to ensure element is available after navigation
        setTimeout(() => element.scrollIntoView({ behavior: 'smooth' }), 100);
      }
      // Clear the state to prevent re-scrolling on refresh or back navigation
      navigate(location.pathname, { replace: true, state: {} }); 
    }
  }, [location, navigate]);

  const currentNavLinks = user?.role === 'admin' ? adminNavLinks : commonNavLinks;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <button onClick={() => handleNavLinkClick('/')} className="flex items-center space-x-2 focus:outline-none">
            <img  alt="Dapur Azka Qanita Logo" className="h-10 w-10" src="https://images.unsplash.com/photo-1535743152831-b30477188917" />
            <span className="font-bold text-xl text-[#4A4A4A]">Dapur Azka Qanita</span>
          </button>

          <div className="hidden md:flex items-center space-x-1">
            {currentNavLinks.map((link) => (
              <NavLinkButton key={link.name} path={link.path} name={link.name} onClick={handleNavLinkClick} />
            ))}
          </div>

          <div className="flex items-center space-x-2 md:space-x-4">
            {isAuthenticated ? (
              <>
                {user?.role !== 'admin' && customerIconLinks.map((linkInfo) => linkInfo.requiresAuth && (
                  <Link key={linkInfo.path} to={linkInfo.path} className="hidden md:block hover:bg-gray-100 p-2 rounded-full">
                    {linkInfo.icon}
                  </Link>
                ))}
                 {user?.role !== 'admin' && (
                    <Link to="/cart" className="relative hover:bg-gray-100 p-2 rounded-full">
                    <ShoppingCart className="h-5 w-5 text-gray-700" />
                    {cartItemCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                        {cartItemCount}
                        </span>
                    )}
                    </Link>
                 )}
                 {user?.role === 'admin' && (
                    <Button variant="ghost" onClick={() => navigate('/dashboard/settings')} className="hidden md:flex items-center text-sm">
                        <Settings size={16} className="mr-1"/> Pengaturan Admin
                    </Button>
                 )}
              </>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Button variant="outline" onClick={() => navigate('/login')} className="text-orange-500 border-orange-500 hover:bg-orange-50">
                  <LogIn size={16} className="mr-2"/> Masuk
                </Button>
                <Button onClick={() => navigate('/login?action=register')} className="bg-orange-500 hover:bg-orange-600 text-white">
                  <UserPlus size={16} className="mr-2"/> Daftar
                </Button>
              </div>
            )}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700 hover:text-[#FF8A00] focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
              </svg>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden pb-4"
            >
              <div className="flex flex-col space-y-1">
                {currentNavLinks.map((link) => (
                  <MobileNavLinkButton key={link.name} path={link.path} name={link.name} onClick={handleNavLinkClick} closeMenu={() => setIsMenuOpen(false)} />
                ))}
                
                {isAuthenticated ? (
                  <>
                    {user?.role !== 'admin' && (
                        <div className="flex justify-around pt-2 mt-2 border-t border-gray-200">
                            {customerIconLinks.map((linkInfo) => linkInfo.requiresAuth && (
                            <Link key={linkInfo.path} to={linkInfo.path} className="hover:bg-gray-100 p-2 rounded-full" onClick={() => setIsMenuOpen(false)}>
                                {linkInfo.icon}
                            </Link>
                            ))}
                            <Link to="/cart" className="relative hover:bg-gray-100 p-2 rounded-full" onClick={() => setIsMenuOpen(false)}>
                                <ShoppingCart className="h-5 w-5 text-gray-700" />
                                {cartItemCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                                    {cartItemCount}
                                    </span>
                                )}
                            </Link>
                        </div>
                    )}
                    {user?.role === 'admin' && (
                        <Button variant="ghost" onClick={() => {navigate('/dashboard/settings'); setIsMenuOpen(false);}} className="w-full justify-start mt-2 border-t pt-3">
                            <Settings size={16} className="mr-2"/> Pengaturan Admin
                        </Button>
                    )}
                     <Button variant="outline" onClick={() => { logout(); setIsMenuOpen(false); navigate('/login'); }} className="w-full mt-2 text-red-500 border-red-500 hover:bg-red-50">
                        Keluar
                    </Button>
                  </>
                ) : (
                  <div className="flex flex-col space-y-2 px-3 pt-2 mt-2 border-t border-gray-200">
                     <Button variant="outline" onClick={() => { navigate('/login'); setIsMenuOpen(false); }} className="w-full text-orange-500 border-orange-500 hover:bg-orange-50">
                        <LogIn size={16} className="mr-2"/> Masuk
                    </Button>
                    <Button onClick={() => { navigate('/login?action=register'); setIsMenuOpen(false);}} className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                        <UserPlus size={16} className="mr-2"/> Daftar
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;