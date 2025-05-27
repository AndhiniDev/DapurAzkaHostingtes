import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Search, Filter, CheckCircle, Truck, XCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const AdminOrderManagementPage = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('semua');
  const { toast } = useToast();

  useEffect(() => {
    // Simulate fetching orders. In a real app, this would be from a backend.
    // We'll use the 'userOrders' from localStorage which is populated after checkout.
    const storedOrders = JSON.parse(localStorage.getItem('userOrders') || '[]');
    // Add a default status if not present
    const ordersWithStatus = storedOrders.map(order => ({
        ...order,
        id: order.orderId || new Date(order.orderDate).getTime().toString().slice(-8), // Ensure an ID
        status: order.status || 'Diproses' 
    })).sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
    setOrders(ordersWithStatus);
  }, []);

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prevOrders => {
        const updatedOrders = prevOrders.map(order => 
            order.id === orderId ? { ...order, status: newStatus } : order
        );        localStorage.setItem('userOrders', JSON.stringify(updatedOrders)); // Save back to localStorage
        return updatedOrders;
    });
    toast({ title: "Status Pesanan Diperbarui", description: `Pesanan #${orderId.slice(-6)} statusnya menjadi ${newStatus}.` });
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.deliveryDetails.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'semua' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const orderStatuses = ['Diproses', 'Dikirim', 'Selesai', 'Dibatalkan'];

  return (
    <AdminLayout>
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">Manajemen Pesanan</h1>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-auto">
                <Input 
                    type="text" 
                    placeholder="Cari (ID Pesanan, Nama)..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                    className="pl-10 w-full"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                    <Filter size={16} className="mr-2 text-gray-500" />
                    <SelectValue placeholder="Filter Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="semua">Semua Status</SelectItem>
                    {orderStatuses.map(status => <SelectItem key={status} value={status}>{status}</SelectItem>)}
                </SelectContent>
            </Select>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID Pesanan</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead>Pelanggan</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.length > 0 ? filteredOrders.map(order => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">#{order.id.slice(-6)}</TableCell>
                <TableCell>{new Date(order.orderDate).toLocaleDateString('id-ID')}</TableCell>
                <TableCell>{order.deliveryDetails.name}</TableCell>
                <TableCell className="text-right">Rp {order.total.toLocaleString('id-ID')}</TableCell>
                <TableCell>
                  <Select value={order.status} onValueChange={(newStatus) => updateOrderStatus(order.id, newStatus)}>
                    <SelectTrigger className={`h-8 text-xs w-[120px] ${
                        order.status === 'Selesai' ? 'border-green-500 text-green-700' :
                        order.status === 'Dikirim' ? 'border-blue-500 text-blue-700' :
                        order.status === 'Dibatalkan' ? 'border-red-500 text-red-700' :
                        'border-yellow-500 text-yellow-700'
                    }`}>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {orderStatuses.map(status => <SelectItem key={status} value={status}>{status}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="text-center">
                  <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-800" onClick={() => alert(`Detail pesanan ${order.id.slice(-6)} akan ditampilkan.`)}>
                    <Eye size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-gray-500 py-8">
                  Tidak ada pesanan ditemukan.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </AdminLayout>
  );
};

export default AdminOrderManagementPage;