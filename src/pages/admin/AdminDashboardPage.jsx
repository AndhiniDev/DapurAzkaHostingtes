import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useParams, useNavigate } from 'react-router-dom';
import { BarChart, ShoppingCart, Users, DollarSign, PackagePlus, MessageSquare } from 'lucide-react';

// Placeholder components for dashboard sections
const OverviewSection = () => {
    // Simulate data fetching
    const [stats, setStats] = useState({
        totalOrders: 0,
        totalRevenue: 0,
        newCustomers: 0,
        pendingMessages: 0,
    });

    useEffect(() => {
        const orders = JSON.parse(localStorage.getItem('userOrders') || '[]');
        const chats = JSON.parse(localStorage.getItem('allUserChats') || '[]');
        
        const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
        const pendingMessages = chats.reduce((sum, chat) => sum + (chat.unread || 0), 0); // Assuming admin unread count

        setStats({
            totalOrders: orders.length,
            totalRevenue: totalRevenue,
            newCustomers: 5, // Placeholder
            pendingMessages: pendingMessages,
        });
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-bold text-[#4A2C1A] mb-6">Ringkasan Dasbor</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard icon={<ShoppingCart size={24} className="text-blue-500"/>} title="Total Pesanan" value={stats.totalOrders} color="blue" />
                <StatCard icon={<DollarSign size={24} className="text-green-500"/>} title="Total Pendapatan" value={`Rp ${stats.totalRevenue.toLocaleString('id-ID')}`} color="green" />
                <StatCard icon={<Users size={24} className="text-purple-500"/>} title="Pelanggan Baru (Bulan Ini)" value={stats.newCustomers} color="purple" />
                <StatCard icon={<MessageSquare size={24} className="text-red-500"/>} title="Pesan Belum Dibaca" value={stats.pendingMessages} color="red" />
            </div>
            <div className="mt-8 bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Grafik Penjualan (Placeholder)</h3>
                <div className="h-64 bg-gray-100 flex items-center justify-center rounded">
                    <BarChart size={48} className="text-gray-400"/>
                    <p className="ml-2 text-gray-500">Data grafik akan ditampilkan di sini.</p>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ icon, title, value, color }) => (
    <div className={`bg-white p-6 rounded-lg shadow-md border-l-4 border-${color}-500`}>
        <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">{title}</h3>
            {icon}
        </div>
        <p className="text-3xl font-bold text-gray-800">{value}</p>
    </div>
);


const AdminDashboardPage = () => {
  const { section = 'overview' } = useParams();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(section);

  useEffect(() => {
    setActiveSection(section);
  }, [section]);

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return <OverviewSection />;
      // Add more cases for other admin dashboard sections if needed
      default:
        return <OverviewSection />;
    }
  };

  return (
    <AdminLayout>
      {renderSection()}
    </AdminLayout>
  );
};

export default AdminDashboardPage;