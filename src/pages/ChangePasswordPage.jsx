import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, KeyRound, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const ChangePasswordPage = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth(); // Assuming user object might contain info for password change validation

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast({ title: "Form Tidak Lengkap", description: "Mohon isi semua field.", variant: "destructive" });
      return;
    }
    if (newPassword !== confirmPassword) {
      toast({ title: "Password Tidak Cocok", description: "Password baru dan konfirmasi password tidak sama.", variant: "destructive" });
      return;
    }
    if (newPassword.length < 8) {
      toast({ title: "Password Terlalu Pendek", description: "Password baru minimal 8 karakter.", variant: "destructive" });
      return;
    }

    // Simulate password change logic
    // In a real app, you'd send this to a backend for verification and update
    console.log("Changing password for:", user?.email);
    console.log("Current:", currentPassword, "New:", newPassword);

    // Simulate success
    toast({ title: "Password Berhasil Diubah", description: "Password Anda telah berhasil diperbarui." });
    navigate('/dashboard/settings'); 
  };

  return (
    <Layout simpleNavbar={true}>
      <div className="container mx-auto px-4 py-8">
        <Button variant="outline" onClick={() => navigate('/dashboard/settings')} className="mb-6 text-orange-500 border-orange-500 hover:bg-orange-50">
          <ChevronLeft size={16} className="mr-2" /> Kembali ke Pengaturan
        </Button>
        
        <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow-2xl">
          <div className="text-center mb-8">
            <KeyRound size={48} className="mx-auto text-orange-500 mb-4" />
            <h1 className="text-3xl font-bold text-[#4A2C1A]">Ubah Password</h1>
            <p className="text-gray-600 mt-2">
              Masukkan password lama Anda dan buat password baru.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="currentPassword">Password Saat Ini</Label>
              <div className="relative">
                <Input 
                  id="currentPassword" 
                  type={showCurrentPassword ? "text" : "password"} 
                  value={currentPassword} 
                  onChange={(e) => setCurrentPassword(e.target.value)} 
                  placeholder="Masukkan password lama Anda" 
                  required 
                />
                <Button type="button" variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8" onClick={() => setShowCurrentPassword(!showCurrentPassword)}>
                  {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </Button>
              </div>
            </div>
            <div>
              <Label htmlFor="newPassword">Password Baru</Label>
              <div className="relative">
                <Input 
                  id="newPassword" 
                  type={showNewPassword ? "text" : "password"} 
                  value={newPassword} 
                  onChange={(e) => setNewPassword(e.target.value)} 
                  placeholder="Minimal 8 karakter" 
                  required 
                />
                <Button type="button" variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8" onClick={() => setShowNewPassword(!showNewPassword)}>
                  {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </Button>
              </div>
            </div>
            <div>
              <Label htmlFor="confirmPassword">Konfirmasi Password Baru</Label>
              <div className="relative">
                <Input 
                  id="confirmPassword" 
                  type={showConfirmPassword ? "text" : "password"} 
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)} 
                  placeholder="Ulangi password baru Anda" 
                  required 
                />
                <Button type="button" variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </Button>
              </div>
            </div>
            <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 text-lg">
              Simpan Perubahan Password
            </Button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ChangePasswordPage;