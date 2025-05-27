import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { ChevronLeft, CreditCard, Truck, Package, MapPin, Phone, User as UserIcon } from 'lucide-react';

const CheckoutPage = () => {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [deliveryDetails, setDeliveryDetails] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || '',
    postalCode: user?.postalCode || '',
  });
  const [deliveryMethod, setDeliveryMethod] = useState('regular');
  const [paymentMethod, setPaymentMethod] = useState('bank-transfer-bca');
  const [orderNotes, setOrderNotes] = useState('');

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFees = {
    regular: 5000,
    express: 15000,
  };
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax + deliveryFees[deliveryMethod];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeliveryDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      toast({ title: "Keranjang Kosong", description: "Tambahkan produk untuk membuat pesanan.", variant: "destructive" });
      return;
    }
    // Basic validation
    if (!deliveryDetails.name || !deliveryDetails.phone || !deliveryDetails.address || !deliveryDetails.city || !deliveryDetails.postalCode) {
      toast({ title: "Alamat Tidak Lengkap", description: "Mohon lengkapi semua detail alamat pengiriman.", variant: "destructive" });
      return;
    }

    const orderData = {
      items: cart,
      deliveryDetails,
      deliveryMethod,
      paymentMethod,
      orderNotes,
      subtotal,
      tax,
      shippingCost: deliveryFees[deliveryMethod],
      total,
      orderDate: new Date().toISOString(),
    };

    // Store order data in localStorage for OrderSummaryPage (or send to backend in a real app)
    localStorage.setItem('latestOrder', JSON.stringify(orderData));
    clearCart(); // Clear cart after order is placed
    navigate('/order-summary');
  };

  return (
    <Layout simpleNavbar={true}>
      <div className="container mx-auto px-4 py-8">
        <Button variant="outline" onClick={() => navigate('/cart')} className="mb-6 text-orange-500 border-orange-500 hover:bg-orange-50">
          <ChevronLeft size={16} className="mr-2" /> Kembali ke Keranjang
        </Button>
        <h1 className="text-3xl font-bold text-[#4A2C1A] mb-8">Checkout</h1>

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Delivery & Payment */}
          <div className="lg:col-span-2 space-y-8">
            {/* Delivery Address */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center"><MapPin size={20} className="mr-2 text-orange-500" /> Alamat Pengiriman</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nama Penerima</Label>
                  <Input type="text" id="name" name="name" value={deliveryDetails.name} onChange={handleInputChange} placeholder="John Doe" required />
                </div>
                <div>
                  <Label htmlFor="phone">Nomor Telepon</Label>
                  <Input type="tel" id="phone" name="phone" value={deliveryDetails.phone} onChange={handleInputChange} placeholder="+62 812 3456 7890" required />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="address">Alamat Lengkap</Label>
                  <Textarea id="address" name="address" value={deliveryDetails.address} onChange={handleInputChange} placeholder="Jl. Pendidikan No. 123, RT 01 RW 02" required />
                </div>
                <div>
                  <Label htmlFor="city">Kota/Kabupaten</Label>
                  <Input type="text" id="city" name="city" value={deliveryDetails.city} onChange={handleInputChange} placeholder="Kota Pendidikan" required />
                </div>
                <div>
                  <Label htmlFor="postalCode">Kode Pos</Label>
                  <Input type="text" id="postalCode" name="postalCode" value={deliveryDetails.postalCode} onChange={handleInputChange} placeholder="12345" required />
                </div>
              </div>
            </div>

            {/* Delivery Method */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center"><Truck size={20} className="mr-2 text-orange-500" /> Metode Pengiriman</h2>
              <RadioGroup defaultValue="regular" value={deliveryMethod} onValueChange={setDeliveryMethod}>
                <div className="flex items-center space-x-2 p-3 border rounded-md hover:border-orange-500 cursor-pointer has-[:checked]:border-orange-500 has-[:checked]:bg-orange-50">
                  <RadioGroupItem value="regular" id="regular" />
                  <Label htmlFor="regular" className="flex-grow cursor-pointer">Pengiriman Regular (2-3 hari) <span className="font-semibold ml-2">Rp {deliveryFees.regular.toLocaleString('id-ID')}</span></Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-md hover:border-orange-500 cursor-pointer has-[:checked]:border-orange-500 has-[:checked]:bg-orange-50">
                  <RadioGroupItem value="express" id="express" />
                  <Label htmlFor="express" className="flex-grow cursor-pointer">Pengiriman Express (1 hari) <span className="font-semibold ml-2">Rp {deliveryFees.express.toLocaleString('id-ID')}</span></Label>
                </div>
              </RadioGroup>
            </div>

            {/* Payment Method */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center"><CreditCard size={20} className="mr-2 text-orange-500" /> Metode Pembayaran</h2>
              <RadioGroup defaultValue="bank-transfer-bca" value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="flex items-center space-x-2 p-3 border rounded-md hover:border-orange-500 cursor-pointer has-[:checked]:border-orange-500 has-[:checked]:bg-orange-50">
                  <RadioGroupItem value="bank-transfer-bca" id="bca" />
                  <Label htmlFor="bca" className="cursor-pointer">Transfer Bank BCA</Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-md hover:border-orange-500 cursor-pointer has-[:checked]:border-orange-500 has-[:checked]:bg-orange-50">
                  <RadioGroupItem value="bank-transfer-mandiri" id="mandiri" />
                  <Label htmlFor="mandiri" className="cursor-pointer">Transfer Bank Mandiri</Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-md hover:border-orange-500 cursor-pointer has-[:checked]:border-orange-500 has-[:checked]:bg-orange-50">
                  <RadioGroupItem value="cod" id="cod" />
                  <Label htmlFor="cod" className="cursor-pointer">Bayar di Tempat (COD)</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Order Notes */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Catatan Pesanan (Opsional)</h2>
              <Textarea value={orderNotes} onChange={(e) => setOrderNotes(e.target.value)} placeholder="Misalnya: jangan pakai bawang, sambal dipisah, dll." />
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow sticky top-24">
              <h2 className="text-xl font-semibold text-gray-700 mb-6 flex items-center"><Package size={20} className="mr-2 text-orange-500"/> Ringkasan Pesanan</h2>
              {cart.map(item => (
                <div key={item.id} className="flex justify-between items-center text-sm mb-2">
                  <span className="text-gray-600">{item.name} x {item.quantity}</span>
                  <span className="text-gray-800">Rp {(item.price * item.quantity).toLocaleString('id-ID')}</span>
                </div>
              ))}
              <div className="border-t border-gray-200 my-4"></div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-600">Subtotal</span><span className="text-gray-800">Rp {subtotal.toLocaleString('id-ID')}</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Pajak (10%)</span><span className="text-gray-800">Rp {tax.toLocaleString('id-ID')}</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Ongkos Kirim</span><span className="text-gray-800">Rp {deliveryFees[deliveryMethod].toLocaleString('id-ID')}</span></div>
              </div>
              <div className="border-t border-gray-200 my-4"></div>
              <div className="flex justify-between text-lg font-bold">
                <span className="text-gray-700">Total</span>
                <span className="text-orange-600">Rp {total.toLocaleString('id-ID')}</span>
              </div>
              <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 text-lg mt-6">
                Buat Pesanan
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CheckoutPage;