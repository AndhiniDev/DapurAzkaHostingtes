import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Eye, EyeOff, LogIn, UserPlus } from 'lucide-react';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { toast } = useToast();
  
  const queryParams = new URLSearchParams(location.search);
  const initialAction = queryParams.get('action') === 'register' ? 'register' : 'login';
  const redirectPath = queryParams.get('redirect') || '/';

  const [isLogin, setIsLogin] = useState(initialAction === 'login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      // Simulate login
      if (email === 'test@example.com' && password === 'password') {
        login({ 
            id: 'user123', 
            name: 'Test User', 
            email: 'test@example.com',
            phone: '081234567890',
            address: 'Jl. Contoh No. 1',
            city: 'Kota Contoh',
            postalCode: '12345',
            role: 'customer', // Default role for test user
            avatar: null, // Default avatar
            profileStatus: 'Mahasiswa', // Example profile status
        });
        toast({ title: "Login Berhasil!", description: "Selamat datang kembali." });
        navigate(redirectPath, { replace: true });
      } else if (email === 'admin@example.com' && password === 'passwordadmin') {
        login({
            id: 'admin001',
            name: 'Admin Utama',
            email: 'admin@example.com',
            role: 'admin',
            avatar: null,
            profileStatus: 'Administrator',
        });
        toast({ title: "Login Admin Berhasil!", description: "Selamat datang, Admin." });
        navigate('/admin/dashboard/overview', { replace: true });
      } else {
        toast({ title: "Login Gagal", description: "Email atau password salah.", variant: "destructive" });
      }
    } else {
      // Simulate registration
      if (password !== confirmPassword) {
        toast({ title: "Registrasi Gagal", description: "Password tidak cocok.", variant: "destructive" });
        return;
      }
      if (password.length < 6) {
        toast({ title: "Registrasi Gagal", description: "Password minimal 6 karakter.", variant: "destructive" });
        return;
      }
      
      // Simulate successful registration then login
       login({ 
           id: `user-${Date.now()}`, 
           name, 
           email,
           phone: '', 
           address: '',
           city: '',
           postalCode: '',
           role: 'customer', // Default role for new registration
           avatar: null,
           profileStatus: 'Pelanggan Baru',
        });
      toast({ title: "Registrasi Berhasil!", description: "Akun Anda telah dibuat. Selamat datang!" });
      navigate(redirectPath, { replace: true });
    }
  };

  return (
    <Layout simpleNavbar={true}>
      <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-[calc(100vh-160px)]">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl">
          <div className="text-center mb-8">
            <Link to="/" className="inline-block mb-4">
              <img  alt="Dapur Azka Qanita Logo" className="h-16 w-16 mx-auto" src="https://images.unsplash.com/photo-1535743152831-b30477188917" />
            </Link>
            <h1 className="text-3xl font-bold text-[#4A2C1A]">{isLogin ? 'Selamat Datang Kembali' : 'Buat Akun Baru'}</h1>
            <p className="text-gray-600 mt-2">
              {isLogin ? 'Masuk untuk melanjutkan pesanan Anda.' : 'Daftar untuk menikmati berbagai kemudahan.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <Label htmlFor="name">Nama Lengkap</Label>
                <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Masukkan nama lengkap Anda" required />
              </div>
            )}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@contoh.com" required />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input id="password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Minimal 6 karakter" required />
                <Button type="button" variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </Button>
              </div>
            </div>
            {!isLogin && (
              <div>
                <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
                <div className="relative">
                    <Input id="confirmPassword" type={showConfirmPassword ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Ulangi password Anda" required />
                    <Button type="button" variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </Button>
                </div>
              </div>
            )}
            <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 text-lg">
              {isLogin ? <><LogIn size={20} className="mr-2"/> Masuk</> : <><UserPlus size={20} className="mr-2"/> Daftar</>}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button onClick={() => setIsLogin(!isLogin)} className="text-sm text-orange-600 hover:underline">
              {isLogin ? 'Belum punya akun? Daftar di sini' : 'Sudah punya akun? Masuk di sini'}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;