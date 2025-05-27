import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PlusCircle, Edit, Trash2, Search, ImagePlus, XCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const initialProductsData = [
  { id: 'ayam-geprek-original', name: 'Ayam Geprek Original', description: 'Ayam geprek dengan sambal pedas level 1-5.', price: 15000, image: 'Ayam Geprek Original', category: 'Makanan Utama', stock: 100 },
  { id: 'ayam-geprek-keju', name: 'Ayam Geprek Keju', description: 'Ayam geprek dengan topping keju mozzarella.', price: 20000, image: 'Ayam Geprek Keju', category: 'Makanan Utama', stock: 50 },
  { id: 'mie-ayam-original', name: 'Mie Ayam Original', description: 'Mie ayam dengan topping ayam cincang dan pangsit.', price: 12000, image: 'Mie Ayam Original', category: 'Makanan Utama', stock: 80 },
];

const categories = ['Makanan Utama', 'Snack', 'Minuman', 'Paket Hemat'];

const AdminProductManagementPage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({ name: '', description: '', price: '', category: '', stock: '', image: '', imagePreview: null });
  const { toast } = useToast();

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('adminProducts') || JSON.stringify(initialProductsData));
    setProducts(storedProducts);
  }, []);

  useEffect(() => {
    localStorage.setItem('adminProducts', JSON.stringify(products));
  }, [products]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductForm(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductForm(prev => ({ ...prev, image: file.name, imagePreview: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setProductForm({ name: '', description: '', price: '', category: '', stock: '', image: '', imagePreview: null });
    setEditingProduct(null);
    setIsDialogOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productForm.name || !productForm.price || !productForm.category || !productForm.stock) {
        toast({ title: "Form Tidak Lengkap", description: "Nama, harga, kategori, dan stok wajib diisi.", variant: "destructive"});
        return;
    }

    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? { ...productForm, id: editingProduct.id } : p));
      toast({ title: "Produk Diperbarui", description: `${productForm.name} berhasil diperbarui.` });
    } else {
      setProducts([...products, { ...productForm, id: `prod-${Date.now()}` }]);
      toast({ title: "Produk Ditambahkan", description: `${productForm.name} berhasil ditambahkan.` });
    }
    resetForm();
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setProductForm({ ...product, imagePreview: product.image ? `/images/products/${product.image.toLowerCase().replace(/\s+/g, '-')}.jpg` : null }); // Simulate image preview path
    setIsDialogOpen(true);
  };

  const handleDelete = (productId) => {
    setProducts(products.filter(p => p.id !== productId));
    toast({ title: "Produk Dihapus", description: "Produk berhasil dihapus.", variant: "destructive" });
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">Manajemen Produk</h1>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-auto">
                <Input 
                    type="text" 
                    placeholder="Cari produk..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                    className="pl-10 w-full"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            <Button onClick={() => { resetForm(); setIsDialogOpen(true); }} className="bg-orange-500 hover:bg-orange-600 w-full sm:w-auto">
                <PlusCircle size={18} className="mr-2" /> Tambah Produk
            </Button>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>{editingProduct ? 'Edit Produk' : 'Tambah Produk Baru'}</DialogTitle>
            <DialogDescription>
              {editingProduct ? 'Ubah detail produk di bawah ini.' : 'Isi detail untuk produk baru.'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 py-2">
            <div>
              <Label htmlFor="name">Nama Produk</Label>
              <Input id="name" name="name" value={productForm.name} onChange={handleInputChange} required />
            </div>
            <div>
              <Label htmlFor="description">Deskripsi</Label>
              <Textarea id="description" name="description" value={productForm.description} onChange={handleInputChange} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Harga (Rp)</Label>
                <Input id="price" name="price" type="number" value={productForm.price} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="stock">Stok</Label>
                <Input id="stock" name="stock" type="number" value={productForm.stock} onChange={handleInputChange} required />
              </div>
            </div>
            <div>
              <Label htmlFor="category">Kategori</Label>
              <Select name="category" onValueChange={(value) => setProductForm(prev => ({...prev, category: value}))} value={productForm.category}>
                <SelectTrigger><SelectValue placeholder="Pilih kategori" /></SelectTrigger>
                <SelectContent>
                  {categories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
                <Label htmlFor="image">Gambar Produk</Label>
                <div className="mt-1 flex items-center space-x-2">
                    <Input id="image" type="file" accept="image/*" onChange={handleImageChange} className="hidden"/>
                    <Button type="button" variant="outline" onClick={() => document.getElementById('image').click()}>
                        <ImagePlus size={16} className="mr-2"/> {productForm.imagePreview ? 'Ganti Gambar' : 'Pilih Gambar'}
                    </Button>
                    {productForm.imagePreview && (
                        <div className="relative w-20 h-20">
                            <img  src={productForm.imagePreview} alt="Preview" className="w-full h-full object-cover rounded border"/>
                            <Button type="button" variant="ghost" size="icon" className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-white/70 hover:bg-white" onClick={() => setProductForm(prev => ({...prev, image: '', imagePreview: null}))}>
                                <XCircle size={16} className="text-red-500"/>
                            </Button>
                        </div>
                    )}
                </div>
                {productForm.image && !productForm.imagePreview && <p className="text-xs text-gray-500 mt-1">File: {productForm.image}</p>}
            </div>
            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={resetForm}>Batal</Button>
              <Button type="submit" className="bg-orange-500 hover:bg-orange-600">{editingProduct ? 'Simpan Perubahan' : 'Tambah Produk'}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Gambar</TableHead>
              <TableHead>Nama Produk</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead className="text-right">Harga</TableHead>
              <TableHead className="text-right">Stok</TableHead>
              <TableHead className="text-center w-[120px]">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length > 0 ? filteredProducts.map(product => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden">
                    <img  
                        src={product.imagePreview || (product.image ? `/images/products/${product.image.toLowerCase().replace(/\s+/g, '-')}.jpg` : `https://ui-avatars.com/api/?name=${encodeURIComponent(product.name.charAt(0))}&background=E2E8F0&color=64748B`)} 
                        alt={product.name} 
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(product.name.charAt(0))}&background=E2E8F0&color=64748B`; }}
                    />
                  </div>
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell className="text-right">Rp {Number(product.price).toLocaleString('id-ID')}</TableCell>
                <TableCell className="text-right">{product.stock}</TableCell>
                <TableCell className="text-center">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(product)} className="text-blue-600 hover:text-blue-800">
                    <Edit size={16} />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(product.id)} className="text-red-600 hover:text-red-800">
                    <Trash2 size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-gray-500 py-8">
                  Tidak ada produk ditemukan.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </AdminLayout>
  );
};

export default AdminProductManagementPage;