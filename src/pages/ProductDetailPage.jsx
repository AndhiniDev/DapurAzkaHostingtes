import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Minus, Plus, ShoppingCart, Star, Heart, Share2, Clock, Flame, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";


const initialProducts = [
  { id: 'ayam-geprek-original', name: 'Ayam Geprek Original', description: 'Ayam geprek renyah dengan sambal pedas level 1-5 yang menggugah selera. Disajikan dengan nasi hangat dan lalapan segar.', price: 15000, image: 'Ayam Geprek Original', category: 'Makanan Utama', rating: 4.8, reviews: 120, prepTime: "10-12 menit", spiceLevel: "Level 1-5", tags: ["Fresh", "Populer"], ingredients: ["Ayam", "Cabai", "Bawang", "Nasi", "Lalapan"] },
  { id: 'ayam-geprek-keju', name: 'Ayam Geprek Keju', description: 'Kombinasi sempurna ayam geprek pedas dengan lelehan keju mozzarella yang gurih. Wajib coba!', price: 20000, image: 'Ayam Geprek Keju', category: 'Makanan Utama', rating: 4.9, reviews: 95, prepTime: "12-15 menit", spiceLevel: "Level 1-5", tags: ["Best Seller", "Keju"], ingredients: ["Ayam", "Cabai", "Keju Mozzarella", "Nasi", "Lalapan"] },
  { id: 'mie-ayam-original', name: 'Mie Ayam Original', description: 'Mie kenyal dengan topping ayam cincang bumbu spesial, sawi hijau, dan pangsit renyah. Kuah kaldu ayamnya bikin nagih.', price: 12000, image: 'Mie Ayam Original', category: 'Makanan Utama', rating: 4.7, reviews: 150, prepTime: "8-10 menit", spiceLevel: "Tidak Pedas", tags: ["Klasik"], ingredients: ["Mie", "Ayam Cincang", "Sawi", "Pangsit", "Kaldu Ayam"] },
  { id: 'nasi-goreng-kampung', name: 'Nasi Goreng Kampung', description: 'Nasi goreng klasik dengan bumbu khas.', price: 13000, image: 'Nasi Goreng Kampung', category: 'Makanan Utama', rating: 4.5, reviews: 80, prepTime: "10-12 menit", spiceLevel: "Bisa Request", tags: ["Favorit"], ingredients: ["Nasi", "Telur", "Bumbu Kampung", "Kerupuk"] },
  { id: 'es-rencengan-original', name: 'Es Rencengan Original', description: 'Minuman segar dengan campuran buah-buahan.', price: 8000, image: 'Es Rencengan Original', category: 'Minuman', rating: 4.6, reviews: 70, prepTime: "5 menit", spiceLevel: "Tidak Ada", tags: ["Segar"], ingredients: ["Buah-buahan", "Sirup", "Es Batu"] },
];

const customerReviewsData = [
    { id: 1, user: "Budi Santoso", avatar: "Budi Santoso Avatar", rating: 5, comment: "Ayam gepreknya mantap betul! Pedasnya pas, ayamnya empuk. Recommended!", date: "4 hari lalu", photos: ["https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200", "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=200"] },
    { id: 2, user: "Siti Rahayu", avatar: "Siti Rahayu Avatar", rating: 4, comment: "Porsinya banyak, harganya terjangkau. Cocok buat mahasiswa.", date: "1 minggu lalu", photos: [] },
    { id: 3, user: "Ahmad Rizki", avatar: "Ahmad Rizki Avatar", rating: 5, comment: "Selalu jadi pilihan utama kalau lagi pengen makan enak tapi gak mahal. Pertahankan kualitasnya!", date: "2 minggu lalu", photos: ["https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=200"] },
    { id: 4, user: "Dewi Lestari", avatar: "Dewi Lestari Avatar", rating: 4, comment: "Mie ayamnya enak, kuahnya gurih. Anak saya suka.", date: "3 hari lalu", photos: [] },
    { id: 5, user: "Rian Ardianto", avatar: "Rian Ardianto Avatar", rating: 5, comment: "Es rencengannya seger banget, pas buat cuaca panas!", date: "5 hari lalu", photos: ["https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=200"] },
];


const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [allProductReviews, setAllProductReviews] = useState([]);
  const [displayedReviews, setDisplayedReviews] = useState([]);
  const [reviewSortOrder, setReviewSortOrder] = useState('rating-tinggi');
  const [reviewPage, setReviewPage] = useState(1);
  const reviewsPerPage = 3;
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [currentPhotoModalImage, setCurrentPhotoModalImage] = useState('');

  const { addToCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    const foundProduct = initialProducts.find(p => p.id === id);
    setProduct(foundProduct);
    if (foundProduct) {
      // Filter reviews for this specific product
      const productSpecificReviews = customerReviewsData.filter(r => r.comment.toLowerCase().includes(foundProduct.name.split(" ")[0].toLowerCase())); // Simple match
      setAllProductReviews(productSpecificReviews);
    }
  }, [id]);

  useEffect(() => {
    let sortedReviews = [...allProductReviews];
    if (reviewSortOrder === 'rating-tinggi') {
      sortedReviews.sort((a, b) => b.rating - a.rating || new Date(b.date) - new Date(a.date));
    } else if (reviewSortOrder === 'rating-rendah') {
      sortedReviews.sort((a, b) => a.rating - b.rating || new Date(b.date) - new Date(a.date));
    } else if (reviewSortOrder === 'terbaru') {
      sortedReviews.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    
    const startIndex = (reviewPage - 1) * reviewsPerPage;
    const endIndex = startIndex + reviewsPerPage;
    setDisplayedReviews(sortedReviews.slice(startIndex, endIndex));
  }, [allProductReviews, reviewSortOrder, reviewPage]);


  if (!product) {
    return <Layout><div className="text-center py-10">Produk tidak ditemukan. <Link to="/" className="text-orange-500 hover:underline">Kembali ke Beranda</Link></div></Layout>;
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
     toast({
      title: `${product.name} ditambahkan!`,
      description: `${quantity} ${product.name} telah ditambahkan ke keranjang.`,
      duration: 3000,
    });
  };
  
  const averageRating = product.rating;
  const totalReviews = allProductReviews.length > 0 ? allProductReviews.length : product.reviews; // Use actual filtered reviews if available

  const ratingDistribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  allProductReviews.forEach(r => ratingDistribution[r.rating]++);
  if (allProductReviews.length === 0 && totalReviews > 0) { // Fallback if no specific reviews loaded yet
    ratingDistribution[5] = Math.floor(totalReviews * 0.7);
    ratingDistribution[4] = Math.floor(totalReviews * 0.2);
    ratingDistribution[3] = Math.floor(totalReviews * 0.05);
    ratingDistribution[2] = Math.floor(totalReviews * 0.03);
    ratingDistribution[1] = Math.floor(totalReviews * 0.02);
  }
  
  const totalReviewPages = Math.ceil(allProductReviews.length / reviewsPerPage);

  const handleReviewPageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalReviewPages) {
      setReviewPage(newPage);
    }
  };

  const openPhotoModal = (photoUrl) => {
    setCurrentPhotoModalImage(photoUrl);
    setIsPhotoModalOpen(true);
  };
  
  const canUserReview = () => {
    if (!isAuthenticated) return false;
    const userOrders = JSON.parse(localStorage.getItem('userOrders') || '[]');
    return userOrders.some(order => 
        order.status === 'Selesai' && 
        order.items.some(item => item.id === product.id)
    );
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Image and Info */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="relative mb-4">
              <img  
                src={`/images/products/${product.image.toLowerCase().replace(/\s+/g, '-')}.jpg`} 
                alt={product.name} 
                className="w-full h-auto max-h-[400px] object-contain rounded-md"
               src="https://images.unsplash.com/photo-1635865165118-917ed9e20936" />
              <div className="absolute top-4 right-4 flex space-x-2">
                <Button variant="outline" size="icon" className="bg-white/80 hover:bg-white"><Heart className="h-5 w-5 text-red-500" /></Button>
                <Button variant="outline" size="icon" className="bg-white/80 hover:bg-white"><Share2 className="h-5 w-5 text-gray-600" /></Button>
              </div>
            </div>
            <div className="flex space-x-2 mb-4">
              {product.tags && product.tags.map(tag => (
                <span key={tag} className={`px-3 py-1 text-xs font-semibold rounded-full ${tag === "Fresh" ? "bg-green-100 text-green-700" : tag === "Populer" || tag === "Best Seller" ? "bg-orange-100 text-orange-700" : "bg-blue-100 text-blue-700"}`}>
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center"><Clock size={16} className="mr-1 text-orange-500" /> Waktu Masak: {product.prepTime}</div>
                <div className="flex items-center"><Flame size={16} className="mr-1 text-red-500" /> Level Pedas: {product.spiceLevel}</div>
            </div>
          </div>

          {/* Product Details and Actions */}
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col justify-between">
            <div>
                <h1 className="text-3xl font-bold text-[#4A2C1A] mb-2">{product.name}</h1>
                <div className="flex items-center mb-4">
                <Star className="text-yellow-400 fill-yellow-400 mr-1" size={20}/>
                <span className="text-lg font-semibold text-gray-700">{averageRating.toFixed(1)}</span>
                <span className="text-sm text-gray-500 ml-2">({totalReviews} reviews)</span>
                </div>
                <p className="text-2xl font-bold text-orange-600 mb-6">Rp {product.price.toLocaleString('id-ID')}</p>
                <p className="text-gray-700 mb-6">{product.description}</p>

                <div className="flex items-center space-x-4 mb-6">
                <span className="text-gray-700 font-medium">Jumlah:</span>
                <Button variant="outline" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                    <Minus size={18} />
                </Button>
                <span className="text-xl font-semibold w-10 text-center">{quantity}</span>
                <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
                    <Plus size={18} />
                </Button>
                </div>
            </div>

            <div>
                <Button 
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 text-lg mb-4"
                    onClick={handleAddToCart}
                >
                    <ShoppingCart size={20} className="mr-2" /> Tambah ke Keranjang
                </Button>
                <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger className="text-gray-700 hover:text-orange-500">Detail Product</AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                    Informasi detail tambahan mengenai produk ini. Bisa berisi cerita produk, keunikan, atau tips penyajian.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger className="text-gray-700 hover:text-orange-500">Full Ingredients List</AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                    {product.ingredients.join(", ")}. Kami hanya menggunakan bahan-bahan segar dan berkualitas.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger className="text-gray-700 hover:text-orange-500">Notes</AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                    Tambahkan catatan khusus untuk pesanan ini, misalnya level pedas tertentu atau permintaan tanpa bahan tertentu (jika memungkinkan).
                    </AccordionContent>
                </AccordionItem>
                </Accordion>
            </div>
          </div>
        </div>
        
        {/* Customer Reviews Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-[#4A2C1A] mb-6">Customer Reviews</h2>
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            {/* Overall Rating */}
            <div className="md:w-1/3">
              <div className="text-center mb-4">
                <p className="text-5xl font-bold text-orange-600">{averageRating.toFixed(1)}</p>
                <div className="flex justify-center mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} className={`mr-1 ${i < Math.round(averageRating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-1">{totalReviews} verified reviews total</p>
              </div>
              {/* Rating Breakdown */}
              <div className="space-y-1">
                {[5, 4, 3, 2, 1].map(star => (
                  <div key={star} className="flex items-center">
                    <span className="text-sm text-gray-600 w-6">{star}</span>
                    <Star size={14} className="text-yellow-400 fill-yellow-400 mx-1" />
                    <div className="flex-grow bg-gray-200 rounded-full h-2 mx-2">
                      <div 
                        className="bg-yellow-400 h-2 rounded-full" 
                        style={{ width: `${totalReviews > 0 ? (ratingDistribution[star] / totalReviews) * 100 : 0}%`}}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-8 text-right">({ratingDistribution[star]})</span>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <p className="text-sm text-gray-600 mb-2">Media</p>
                <Dialog open={isPhotoModalOpen} onOpenChange={setIsPhotoModalOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="w-full mb-2 text-gray-700 hover:bg-gray-50">Lihat Foto & Video Pembeli</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md p-0">
                        <DialogHeader className="p-4 border-b">
                            <DialogTitle>Foto dari Pembeli</DialogTitle>
                        </DialogHeader>
                        <div className="p-4">
                            {currentPhotoModalImage ? (
                                <img  src={currentPhotoModalImage} alt="Review media" className="w-full h-auto rounded-md object-contain max-h-[70vh]" />
                            ) : (
                                <p className="text-center text-gray-500 py-8">Tidak ada foto untuk ditampilkan.</p>
                            )}
                        </div>
                    </DialogContent>
                </Dialog>
                <Button variant="outline" className="w-full text-gray-700 hover:bg-gray-50" onClick={() => toast({title: "Fitur Segera Hadir", description: "Video pembeli akan segera tersedia."})}>Lihat Video Pembeli</Button>
              </div>
              {canUserReview() && (
                <Button onClick={() => navigate(`/reviews#give-review&productId=${product.id}`)} className="w-full mt-4 bg-orange-500 hover:bg-orange-600">
                    Beri Ulasan untuk Produk Ini
                </Button>
              )}
            </div>
            
            {/* Individual Reviews */}
            <div className="md:w-2/3">
                <div className="flex justify-between items-center mb-4">
                    <p className="text-lg font-semibold text-[#4A2C1A]">Ulasan Pilihan ({allProductReviews.length})</p>
                    <select value={reviewSortOrder} onChange={(e) => setReviewSortOrder(e.target.value)} className="text-sm border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-orange-500">
                        <option value="rating-tinggi">Rating tertinggi</option>
                        <option value="rating-rendah">Rating terendah</option>
                        <option value="terbaru">Terbaru</option>
                    </select>
                </div>
              {displayedReviews.length > 0 ? displayedReviews.map(review => (
                <div key={review.id} className="border-b border-gray-200 py-4 last:border-b-0">
                  <div className="flex items-start mb-2">
                     <div className="w-10 h-10 rounded-full bg-gray-200 mr-3 flex-shrink-0">
                        <img  
                            src={`/images/avatars/${review.avatar.toLowerCase().replace(/\s+/g, '-')}.png`} 
                            alt={review.user} 
                            className="w-full h-full object-cover rounded-full"
                         src="https://images.unsplash.com/photo-1675023112817-52b789fd2ef0" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{review.user}</p>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} className={`mr-1 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                        ))}
                         <span className="text-xs text-gray-500 ml-2">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{review.comment}</p>
                  {review.photos && review.photos.length > 0 && (
                    <div className="flex space-x-2">
                      {review.photos.map((photoUrl, index) => (
                        <button key={index} onClick={() => openPhotoModal(photoUrl)} className="w-16 h-16 bg-gray-200 rounded overflow-hidden focus:outline-none ring-2 ring-transparent focus:ring-orange-500">
                            <img  alt={`Review photo ${index+1} by ${review.user}`} className="w-full h-full object-cover" src={photoUrl} />
                        </button>
                      ))}
                    </div>
                  )}
                   <p className="text-xs text-orange-500 mt-2 cursor-pointer hover:underline">Membantu...</p>
                </div>
              )) : <p className="text-gray-500 text-center py-4">Belum ada ulasan untuk produk ini.</p>}
              {/* Pagination for reviews */}
              {totalReviewPages > 1 && (
                <div className="flex justify-center items-center space-x-1 mt-6">
                    <Button variant="outline" size="icon" onClick={() => handleReviewPageChange(reviewPage - 1)} disabled={reviewPage === 1} className="h-8 w-8"> <ChevronLeft size={16}/> </Button>
                    {Array.from({ length: totalReviewPages }, (_, i) => i + 1).map(page => (
                        <Button key={page} variant={reviewPage === page ? "default" : "outline"} size="icon" onClick={() => handleReviewPageChange(page)} className="h-8 w-8">
                            {page}
                        </Button>
                    ))}
                    <Button variant="outline" size="icon" onClick={() => handleReviewPageChange(reviewPage + 1)} disabled={reviewPage === totalReviewPages} className="h-8 w-8"> <ChevronRight size={16}/> </Button>
                </div>
              )}
              {allProductReviews.length > 0 && <p className="text-center text-xs text-gray-500 mt-2">Halaman {reviewPage} dari {totalReviewPages} ({allProductReviews.length} ulasan)</p>}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetailPage;