import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserPlus, Edit, Trash2, Search, CheckSquare, XSquare, ShieldCheck, UserCog } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const initialUsersData = [
  { id: 'user123', name: 'Test User', email: 'test@example.com', role: 'customer', joinDate: '2025-05-01', status: 'Aktif', avatar: null },
  { id: 'admin001', name: 'Admin Utama', email: 'admin@example.com', role: 'admin', joinDate: '2025-01-15', status: 'Aktif', avatar: null },
  { id: 'collab001', name: 'Kolaborator Keren', email: 'kolaborator@example.com', role: 'collaborator', joinDate: '2025-04-20', status: 'Verifikasi Tertunda', avatar: null },
];

const roles = ['customer', 'admin', 'collaborator'];
const statuses = ['Aktif', 'Nonaktif', 'Verifikasi Tertunda'];

const AdminUserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [userForm, setUserForm] = useState({ name: '', email: '', role: 'customer', password: '', status: 'Aktif' });
  const { toast } = useToast();

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('allAppUsers') || JSON.stringify(initialUsersData));
    setUsers(storedUsers);
  }, []);

  useEffect(() => {
    localStorage.setItem('allAppUsers', JSON.stringify(users));
  }, [users]);

  const handleUserInputChange = (e) => {
    const { name, value } = e.target;
    setUserForm(prev => ({ ...prev, [name]: value }));
  };

  const resetUserForm = () => {
    setUserForm({ name: '', email: '', role: 'customer', password: '', status: 'Aktif' });
    setEditingUser(null);
    setIsUserDialogOpen(false);
  };

  const handleUserSubmit = (e) => {
    e.preventDefault();
    if (!userForm.name || !userForm.email || (!editingUser && !userForm.password)) {
        toast({ title: "Form Tidak Lengkap", description: "Nama, email, dan password (untuk user baru) wajib diisi.", variant: "destructive"});
        return;
    }

    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? { ...editingUser, ...userForm, password: userForm.password || editingUser.password } : u));
      toast({ title: "Pengguna Diperbarui", description: `Data ${userForm.name} berhasil diperbarui.` });
    } else {
      setUsers([...users, { ...userForm, id: `user-${Date.now()}`, joinDate: new Date().toISOString().split('T')[0] }]);
      toast({ title: "Pengguna Ditambahkan", description: `${userForm.name} berhasil ditambahkan.` });
    }
    resetUserForm();
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setUserForm({ name: user.name, email: user.email, role: user.role, password: '', status: user.status }); // Don't prefill password for editing
    setIsUserDialogOpen(true);
  };

  const handleDeleteUser = (userId) => {
    setUsers(users.filter(u => u.id !== userId));
    toast({ title: "Pengguna Dihapus", description: "Pengguna berhasil dihapus.", variant: "destructive" });
  };
  
  const handleVerifyCollaborator = (userId) => {
    setUsers(users.map(u => u.id === userId ? {...u, status: 'Aktif', role: 'collaborator'} : u));
    toast({title: "Kolaborator Diverifikasi", description: "Status kolaborator telah diaktifkan."});
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">Manajemen Pengguna & Kolaborator</h1>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-auto">
                <Input 
                    type="text" 
                    placeholder="Cari pengguna..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                    className="pl-10 w-full"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            <Button onClick={() => { resetUserForm(); setIsUserDialogOpen(true); }} className="bg-orange-500 hover:bg-orange-600 w-full sm:w-auto">
                <UserPlus size={18} className="mr-2" /> Tambah Pengguna
            </Button>
        </div>
      </div>

      <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editingUser ? 'Edit Pengguna' : 'Tambah Pengguna Baru'}</DialogTitle>
            <DialogDescription>
              {editingUser ? 'Ubah detail pengguna di bawah ini.' : 'Isi detail untuk pengguna baru.'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUserSubmit} className="space-y-4 py-2">
            <div><Label htmlFor="userName">Nama Lengkap</Label><Input id="userName" name="name" value={userForm.name} onChange={handleUserInputChange} required /></div>
            <div><Label htmlFor="userEmail">Email</Label><Input id="userEmail" name="email" type="email" value={userForm.email} onChange={handleUserInputChange} required /></div>
            {!editingUser && <div><Label htmlFor="userPassword">Password</Label><Input id="userPassword" name="password" type="password" value={userForm.password} onChange={handleUserInputChange} required /></div>}
            {editingUser && <div><Label htmlFor="userPasswordEdit">Password Baru (Opsional)</Label><Input id="userPasswordEdit" name="password" type="password" value={userForm.password} onChange={handleUserInputChange} placeholder="Kosongkan jika tidak ingin diubah"/></div>}
            <div>
                <Label htmlFor="userRole">Peran</Label>
                <Select name="role" onValueChange={(value) => setUserForm(prev => ({...prev, role: value}))} value={userForm.role}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{roles.map(r => <SelectItem key={r} value={r}>{r.charAt(0).toUpperCase() + r.slice(1)}</SelectItem>)}</SelectContent>
                </Select>
            </div>
            <div>
                <Label htmlFor="userStatus">Status</Label>
                <Select name="status" onValueChange={(value) => setUserForm(prev => ({...prev, status: value}))} value={userForm.status}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{statuses.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                </Select>
            </div>
            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={resetUserForm}>Batal</Button>
              <Button type="submit" className="bg-orange-500 hover:bg-orange-600">{editingUser ? 'Simpan Perubahan' : 'Tambah Pengguna'}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px]">Avatar</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Peran</TableHead>
              <TableHead>Tgl Bergabung</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center w-[150px]">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length > 0 ? filteredUsers.map(user => (
              <TableRow key={user.id}>
                <TableCell>
                  <img  
                    src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name.charAt(0))}&background=random&color=fff&size=40`} 
                    alt={user.name} 
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </TableCell>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                        user.role === 'admin' ? 'bg-red-100 text-red-700' :
                        user.role === 'collaborator' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                    }`}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                </TableCell>
                <TableCell>{new Date(user.joinDate).toLocaleDateString('id-ID')}</TableCell>
                <TableCell>
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                        user.status === 'Aktif' ? 'bg-green-100 text-green-700' :
                        user.status === 'Verifikasi Tertunda' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                    }`}>
                        {user.status}
                    </span>
                </TableCell>
                <TableCell className="text-center space-x-1">
                  {user.role === 'collaborator' && user.status === 'Verifikasi Tertunda' && (
                    <Button variant="ghost" size="icon" onClick={() => handleVerifyCollaborator(user.id)} className="text-green-600 hover:text-green-800" title="Verifikasi Kolaborator">
                      <ShieldCheck size={16} />
                    </Button>
                  )}
                  <Button variant="ghost" size="icon" onClick={() => handleEditUser(user)} className="text-blue-600 hover:text-blue-800" title="Edit Pengguna">
                    <Edit size={16} />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDeleteUser(user.id)} className="text-red-600 hover:text-red-800" title="Hapus Pengguna">
                    <Trash2 size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-gray-500 py-8">
                  Tidak ada pengguna ditemukan.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
       <div className="mt-8 bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Permintaan Kolaborasi (Placeholder)</h2>
            <p className="text-gray-600">Fitur untuk mengelola permintaan kolaborasi dari penjual lain akan tersedia di sini. Admin dapat menyetujui atau menolak permintaan.</p>
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md text-yellow-700">
                <UserCog size={20} className="inline mr-2"/> Fitur ini sedang dalam pengembangan.
            </div>
        </div>
    </AdminLayout>
  );
};

export default AdminUserManagementPage;