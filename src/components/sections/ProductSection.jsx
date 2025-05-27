import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Minus, Plus, ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/components/ui/use-toast';

const initialProducts = [
  { id: 'ayam-geprek-original', name: 'Ayam Geprek Original', description: 'Ayam geprek dengan sambal pedas level 1-5.', price: 15000, image: 'Ayam Geprek Original', category: 'Makanan Utama' },
  { id: 'ayam-geprek-keju', name: 'Ayam Geprek Keju', description: 'Ayam geprek dengan topping keju mozzarella.', price: 20000, image: 'Ayam Geprek Keju', category: 'Makanan Utama' },
  { id: 'mie-ayam-original', name: 'Mie Ayam Original', description: 'Mie ayam dengan topping ayam cincang dan pangsit.', price: 12000, image: 'Mie Ayam Original', category: 'Makanan Utama' },
  { id: 'mie-ayam-bakso', name: 'Mie Ayam Bakso', description: 'Mie ayam dengan tambahan bakso sapi.', price: 15000, image: 'Mie Ayam Bakso', category: 'Makanan Utama' },
  { id: 'bakso-goreng', name: 'Bakso Goreng (5 pcs)', description: 'Bakso goreng renyah dengan isian daging sapi.', price: 10000, image: 'Bakso Goreng (5 pcs)', category: 'Snack' },
  { id: 'bakso-goreng-pedas', name: 'Bakso Goreng Pedas (5 pcs)', description: 'Bakso goreng dengan bumbu pedas.', price: 12000, image: 'Bakso Goreng Pedas (5 pcs)', category: 'Snack' },
  { id: 'es-rencengan-original', name: 'Es Rencengan Original', description: 'Minuman segar dengan campuran buah-buahan.', price: 8000, image: 'Es Rencengan Original', category: 'Minuman' },
  { id: 'es-rencengan-spesial', name: 'Es Rencengan Spesial', description: 'Es rencengan dengan tambahan jelly dan boba.', price: 10000, image: 'Es Rencengan Spesial', category: 'Minuman' },
  { id: 'nasi-goreng-kampung', name: 'Nasi Goreng Kampung', description: 'Nasi goreng klasik dengan bumbu khas.', price: 13000, image: 'Nasi Goreng Kampung', category: 'Makanan Utama' },
  { id: 'soto-ayam', name: 'Soto Ayam Lamongan', description: 'Soto ayam dengan kuah kuning gurih.', price: 14000, image: 'Soto Ayam Lamongan', category: 'Makanan Utama' },
  { id: 'pisang-cokelat', name: 'Pisang Cokelat Keju', description: 'Pisang goreng dengan topping cokelat dan keju.', price: 9000, image: 'Pisang Cokelat Keju', category: 'Snack' },
  { id: 'es-teh-manis', name: 'Es Teh Manis Jumbo', description: 'Es teh manis ukuran besar.', price: 5000, image: 'Es Teh Manis Jumbo', category: 'Minuman' },
];

const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast({
      title: `${product.name} ditambahkan!`,
      description: `${quantity} ${product.name} telah ditambahkan ke keranjang.`,
      duration: 3000,
    });
    setQuantity(1);
  };

  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col justify-between"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="w-full h-48 bg-gray-200">
          <img  
            src={`/images/products/${product.image.toLowerCase().replace(/\s+/g, '-')}.jpg`} 
            alt={product.name} 
            className="w-full h-full object-cover"
           src="https://images.unsplash.com/photo-1675023112817-52b789fd2ef0" />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-[#4A2C1A] mb-1 h-12 overflow-hidden">{product.name}</h3>
          <p className="text-sm text-gray-600 mb-2 h-10 overflow-hidden">{product.description}</p>
          <p className="text-lg font-bold text-orange-600">Rp {product.price.toLocaleString('id-ID')}</p>
        </div>
      </Link>
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <Button variant="outline" size="sm" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-2">
            <Minus size={16} />
          </Button>
          <span className="text-md font-medium w-8 text-center">{quantity}</span>
          <Button variant="outline" size="sm" onClick={() => setQuantity(quantity + 1)} className="px-2">
            <Plus size={16} />
          </Button>
        </div>
        <Button 
          className="w-full bg-orange-500 hover:bg-orange-600 text-white"
          onClick={handleAddToCart}
        >
          <ShoppingCart size={18} className="mr-2" /> Tambah
        </Button>
      </div>
    </motion.div>
  );
};


const ProductSection = () => {
  const [activeCategory, setActiveCategory] = useState('Semua Menu');
  const categories = ['Semua Menu', 'Makanan Utama', 'Snack', 'Minuman'];
  
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8; // Show 8 products, 2 rows

  const filteredProducts = activeCategory === 'Semua Menu'
    ? initialProducts
    : initialProducts.filter(p => p.category === activeCategory);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section id="menu" className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#4A2C1A] mb-4">Menu Kami</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Nikmati berbagai pilihan menu lezat dari Dapur Azka Qanita dengan harga terjangkau.
          </p>
        </motion.div>

        <div className="flex justify-center space-x-2 md:space-x-4 mb-10 flex-wrap">
          {categories.map(category => (
            <Button
              key={category}
              variant={activeCategory === category ? 'default' : 'outline'}
              onClick={() => {
                setActiveCategory(category);
                setCurrentPage(1);
              }}
              className={`mb-2 md:mb-0 ${activeCategory === category ? 'bg-orange-500 hover:bg-orange-600 text-white' : 'text-orange-500 border-orange-500 hover:bg-orange-50'}`}
            >
              {category}
            </Button>
          ))}
        </div>
        
        {currentProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {currentProducts.map((product, index) => (
                <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }} // Faster delay for more items
                >
                <ProductCard product={product} />
                </motion.div>
            ))}
            </div>
        ) : (
            <p className="text-center text-gray-600">Tidak ada produk dalam kategori ini.</p>
        )}


        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-12">
            <Button 
              onClick={() => paginate(currentPage - 1)} 
              disabled={currentPage === 1}
              variant="outline"
              className="text-orange-500 border-orange-500 hover:bg-orange-50 disabled:opacity-50"
            >
              Sebelumnya
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
              <Button
                key={number}
                onClick={() => paginate(number)}
                variant={currentPage === number ? 'default' : 'outline'}
                className={`${currentPage === number ? 'bg-orange-500 hover:bg-orange-600 text-white' : 'text-orange-500 border-orange-500 hover:bg-orange-50'}`}
              >
                {number}
              </Button>
            ))}
            <Button 
              onClick={() => paginate(currentPage + 1)} 
              disabled={currentPage === totalPages}
              variant="outline"
              className="text-orange-500 border-orange-500 hover:bg-orange-50 disabled:opacity-50"
            >
              Berikutnya
            </Button>
          </div>
        )}
         <p className="text-center text-sm text-gray-500 mt-4">
          Halaman {currentPage} dari {totalPages} ({filteredProducts.length} menu)
        </p>
      </div>
    </section>
  );
};

export default ProductSection;