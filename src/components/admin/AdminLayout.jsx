import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { LayoutDashboard, Package, ShoppingCart, Users, MessageSquare, Settings, LogOut, ChevronLeft, ChevronRight, Bell } from 'lucide-react';

const AdminLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const sidebarNavItems = [
    { name: 'Ringkasan', icon: LayoutDashboard, path: '/admin/dashboard/overview' },
    { name: 'Produk', icon: Package, path: '/admin/products' },
    { name: 'Pesanan', icon: ShoppingCart, path: '/admin/orders' },
    { name: 'Pengguna', icon: Users, path: '/admin/users' },
    { name: 'Pesan', icon: MessageSquare, path: '/admin/dashboard/messages' }, // Assuming messages are part of dashboard
    { name: 'Pengaturan', icon: Settings, path: '/dashboard/settings' }, // Link to general settings page
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`bg-[#4A2C1A] text-white ${isSidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 ease-in-out flex flex-col`}>
        <div className={`p-4 flex items-center ${isSidebarOpen ? 'justify-between' : 'justify-center'} border-b border-gray-700`}>
          {isSidebarOpen && (
            <Link to="/admin/dashboard/overview" className="flex items-center space-x-2">
                <img  alt="Logo" className="h-8 w-8" src="https://images.unsplash.com/photo-1655184128397-5009b5a40ea6" />
                <span className="font-bold text-lg">Admin Panel</span>
            </Link>
          )}
          <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-white hover:bg-gray-700">
            {isSidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </Button>
        </div>
        <nav className="flex-grow mt-4">
          {sidebarNavItems.map(item => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center px-4 py-3 hover:bg-gray-700 transition-colors ${location.pathname.startsWith(item.path) ? 'bg-orange-600' : ''} ${!isSidebarOpen ? 'justify-center' : ''}`}
              title={isSidebarOpen ? '' : item.name}
            >
              <item.icon size={20} className={isSidebarOpen ? 'mr-3' : 'mx-auto'} />
              {isSidebarOpen && <span className="truncate">{item.name}</span>}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-700">
          <Button onClick={handleLogout} variant="ghost" className={`w-full text-left text-red-400 hover:bg-red-700 hover:text-white ${!isSidebarOpen ? 'justify-center' : 'justify-start'}`}>
            <LogOut size={20} className={isSidebarOpen ? 'mr-3' : 'mx-auto'} />
            {isSidebarOpen && <span>Keluar</span>}
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
          <div className="font-semibold text-xl text-gray-700">
            {sidebarNavItems.find(item => location.pathname.startsWith(item.path))?.name || 'Dasbor Admin'}
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-gray-600 hover:bg-gray-100">
              <Bell size={20} />
            </Button>
            <div className="flex items-center">
              <img  
                src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'A')}&background=4A2C1A&color=fff&size=40`} 
                alt="Admin Avatar" 
                className="w-8 h-8 rounded-full object-cover mr-2"
              />
              <span className="text-sm text-gray-700">{user?.name || 'Admin'}</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;