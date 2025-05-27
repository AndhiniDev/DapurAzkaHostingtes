import React from 'react';
import Layout from '@/components/Layout';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2, ShoppingCart as ShoppingCartIcon, AlertTriangle } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth(); // Get user profile
  const navigate = useNavigate();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = 5000; 
  const total = subtotal + deliveryFee;

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(productId, newQuantity);
  };

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
    toast({
        title: "Produk dihapus",
        description: "Produk telah dihapus dari keranjang.",
        variant: "destructive",
        duration: 2000,
    });
  };

  const handleClearCart = () => {
    clearCart();
    toast({
        title: "Keranjang dikosongkan",
        description: "Semua produk telah dihapus dari keranjang.",
        variant: "destructive",
        duration: 2000,
    });
  };

  const isProfileComplete = () => {
    if (!isAuthenticated || !user) return false;
    // Check for essential profile fields. Adjust as needed.
    return user.name && user.phone && user.address;
  };

  const handleProceedToCheckout = () => {
    if (!isAuthenticated) {
      toast({
        title: "Login Diperlukan",
        description: "Silakan login terlebih dahulu untuk melanjutkan checkout.",
        variant: "destructive",
        duration: 3000,
      });
      navigate('/login?redirect=/cart');
      return;
    }

    if (cart.length === 0) {
        toast({
            title: "Keranjang Kosong",
            description: "Tambahkan produk ke keranjang sebelum checkout.",
            variant: "destructive",
            duration: 3000,
        });
        return;
    }

    if (!isProfileComplete()) {
      // Trigger AlertDialog instead of navigating directly
      document.getElementById('profile-incomplete-trigger')?.click();
    } else {
      navigate('/checkout');
    }
  };
  
  const handleScrollToMenu = () => {
    navigate('/', { state: { scrollToSection: 'menu' } });
  };


  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-[#4A2C1A] mb-8">Keranjang Belanja</h1>

        {cart.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg shadow-md">
            <ShoppingCartIcon size={64} className="mx-auto text-gray-400 mb-6" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">Keranjang Anda Kosong</h2>
            <p className="text-gray-500 mb-6">Belum ada item yang ditambahkan ke keranjang.</p>
            <Button onClick={handleScrollToMenu} className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg">
              Mulai Belanja
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-700">Produk ({cart.length})</h2>
                <Button variant="outline" onClick={handleClearCart} className="text-red-500 border-red-500 hover:bg-red-50">
                  <Trash2 size={16} className="mr-2" /> Kosongkan Keranjang
                </Button>
              </div>
              
              {cart.map(item => (
                <div key={item.id} className="flex items-center border-b border-gray-200 py-4 last:border-b-0">
                  <div className="w-20 h-20 bg-gray-100 rounded mr-4 flex-shrink-0">
                    <img  src={`/images/products/${item.image.toLowerCase().replace(/\s+/g, '-')}.jpg`} alt={item.name} className="w-full h-full object-cover rounded" src="https://images.unsplash.com/photo-1697256200022-f61abccad430" />
                  </div>
                  <div className="flex-grow">
                    <Link to={`/product/${item.id}`} className="text-lg font-medium text-gray-800 hover:text-orange-500">{item.name}</Link>
                    <p className="text-sm text-gray-500">Rp {item.price.toLocaleString('id-ID')}</p>
                  </div>
                  <div className="flex items-center mx-4">
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}>
                      <Minus size={16} />
                    </Button>
                    <span className="text-lg font-medium w-10 text-center">{item.quantity}</span>
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>
                      <Plus size={16} />
                    </Button>
                  </div>
                  <p className="text-lg font-semibold text-gray-800 w-32 text-right">Rp {(item.price * item.quantity).toLocaleString('id-ID')}</p>
                  <Button variant="ghost" size="icon" className="ml-4 text-red-500 hover:bg-red-50" onClick={() => handleRemoveFromCart(item.id)}>
                    <Trash2 size={20} />
                  </Button>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md h-fit">
              <h2 className="text-xl font-semibold text-gray-700 mb-6">Ringkasan Pesanan</h2>
              <div className="space-y-3 text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>Rp {subtotal.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Biaya Pengiriman</span>
                  <span>Rp {deliveryFee.toLocaleString('id-ID')}</span>
                </div>
                <div className="border-t border-gray-200 my-3"></div>
                <div className="flex justify-between text-lg font-bold text-gray-800">
                  <span>Total</span>
                  <span>Rp {total.toLocaleString('id-ID')}</span>
                </div>
              </div>
              <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 text-lg mt-8" onClick={handleProceedToCheckout}>
                Lanjutkan ke Pembayaran
              </Button>
              <Button onClick={handleScrollToMenu} variant="outline" className="w-full mt-4 text-orange-500 border-orange-500 hover:bg-orange-50">
                  Kembali Belanja
              </Button>
            </div>
          </div>
        )}
      </div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button id="profile-incomplete-trigger" className="hidden">Trigger Dialog</button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex justify-center mb-4">
                <AlertTriangle className="w-16 h-16 text-yellow-500" />
            </div>
            <AlertDialogTitle className="text-center text-2xl font-bold text-[#4A2C1A]">Lengkapi Profil Anda</AlertDialogTitle>
            <AlertDialogDescription className="text-center text-gray-600">
              Untuk melanjutkan checkout, mohon lengkapi informasi berikut di profil Anda: Nama, Nomor Telepon, dan Alamat.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-col sm:flex-row gap-2">
            <AlertDialogCancel className="w-full sm:w-auto">Nanti Saja</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => navigate('/dashboard/profile')}
              className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white"
            >
              Lengkapi Profil
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
};

export default CartPage;