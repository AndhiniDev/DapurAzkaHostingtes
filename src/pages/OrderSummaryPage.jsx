import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle, ShoppingCart, Printer, ExternalLink } from 'lucide-react';

const OrderSummaryPage = () => {
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedOrder = localStorage.getItem('latestOrder');
    if (storedOrder) {
      setOrder(JSON.parse(storedOrder));
    } else {
      // If no order found, redirect to home or cart
      navigate('/cart');
    }
  }, [navigate]);

  if (!order) {
    return <Layout><div className="container mx-auto p-4 text-center">Memuat ringkasan pesanan...</div></Layout>;
  }
  
  const whatsAppMessage = `Halo Dapur Azka Qanita, saya ingin konfirmasi pesanan:
Nomor Pesanan (Simulasi): ORD-${new Date(order.orderDate).getTime().toString().slice(-6)}
Nama: ${order.deliveryDetails.name}
Total: Rp ${order.total.toLocaleString('id-ID')}
Metode Pembayaran: ${order.paymentMethod.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
---
Mohon konfirmasi dan info lanjut mengenai pembayaran. Terima kasih!
(Rincian pesanan terlampir di screenshot)`;

  const handleWhatsAppOrder = () => {
    const encodedMessage = encodeURIComponent(whatsAppMessage);
    const whatsappUrl = `https://wa.me/628276729787?text=${encodedMessage}`; // Ganti dengan nomor WA Anda
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Layout simpleNavbar={true}>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-xl text-center">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-green-600 mb-3">Pesanan Berhasil Dibuat!</h1>
          <p className="text-gray-600 mb-8">
            Terima kasih telah memesan di Dapur Azka Qanita. Pesanan Anda sedang kami proses.
          </p>

          <div id="order-details-to-screenshot" className="text-left bg-gray-50 p-6 rounded-lg border border-gray-200 mb-8">
            <h2 className="text-xl font-semibold text-[#4A2C1A] mb-4">Ringkasan Pesanan</h2>
            <div className="space-y-2 text-sm">
              <p><strong>Nomor Pesanan (Simulasi):</strong> ORD-{new Date(order.orderDate).getTime().toString().slice(-6)}</p>
              <p><strong>Tanggal:</strong> {new Date(order.orderDate).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              <p><strong>Nama Penerima:</strong> {order.deliveryDetails.name}</p>
              <p><strong>Telepon:</strong> {order.deliveryDetails.phone}</p>
              <p><strong>Alamat:</strong> {order.deliveryDetails.address}, {order.deliveryDetails.city}, {order.deliveryDetails.postalCode}</p>
              <p><strong>Metode Pengiriman:</strong> {order.deliveryMethod === 'regular' ? 'Regular' : 'Express'}</p>
              <p><strong>Metode Pembayaran:</strong> {order.paymentMethod.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
              {order.orderNotes && <p><strong>Catatan:</strong> {order.orderNotes}</p>}
              
              <div className="border-t border-gray-300 mt-3 pt-3">
                <h3 className="font-semibold mb-1">Detail Item:</h3>
                {order.items.map(item => (
                  <div key={item.id} className="flex justify-between">
                    <span>{item.name} x {item.quantity}</span>
                    <span>Rp {(item.price * item.quantity).toLocaleString('id-ID')}</span>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-300 mt-3 pt-3 space-y-1">
                <div className="flex justify-between"><p>Subtotal:</p><p>Rp {order.subtotal.toLocaleString('id-ID')}</p></div>
                <div className="flex justify-between"><p>Pajak (10%):</p><p>Rp {order.tax.toLocaleString('id-ID')}</p></div>
                <div className="flex justify-between"><p>Ongkos Kirim:</p><p>Rp {order.shippingCost.toLocaleString('id-ID')}</p></div>
                <div className="flex justify-between font-bold text-lg text-orange-600"><p>Total Pembayaran:</p><p>Rp {order.total.toLocaleString('id-ID')}</p></div>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md mb-8 text-left">
            <p className="font-bold">PENTING: Instruksi Pembayaran & Konfirmasi</p>
            <p className="text-sm">
              Silakan lakukan screenshot (tangkap layar) rincian pesanan di atas. Kemudian, kirimkan screenshot tersebut beserta konfirmasi pesanan Anda melalui WhatsApp ke nomor kami.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              onClick={() => window.print()}
              variant="outline" 
              className="w-full sm:w-auto text-orange-500 border-orange-500 hover:bg-orange-50"
            >
              <Printer size={18} className="mr-2" /> Cetak Ringkasan
            </Button>
            <Button 
              onClick={handleWhatsAppOrder}
              className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white"
            >
              <ExternalLink size={18} className="mr-2" /> Kirim via WhatsApp
            </Button>
          </div>

          <Link to="/" className="block mt-8 text-orange-600 hover:underline">
            <ShoppingCart size={16} className="inline mr-1" /> Kembali ke Beranda
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default OrderSummaryPage;