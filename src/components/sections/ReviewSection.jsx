import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Star, MessageSquare, ArrowRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const reviews = [
  {
    id: 1,
    name: 'Budi Santoso',
    avatar: 'Budi Santoso Avatar',
    rating: 5,
    comment: 'Mie ayamnya juara! Kuahnya kental, ayamnya banyak, harganya juga pas di kantong mahasiswa. Pasti balik lagi!',
    date: '4 hari lalu',
    productName: 'Mie Ayam Original'
  },
  {
    id: 2,
    name: 'Siti Rahayu',
    avatar: 'Siti Rahayu Avatar',
    rating: 4,
    comment: 'Tempatnya nyaman buat nongkrong sambil nugas. Ayam gepreknya enak, sambelnya mantap. Pelayanannya juga ramah.',
    date: '1 minggu lalu',
    productName: 'Ayam Geprek Keju'
  },
  {
    id: 3,
    name: 'Ahmad Rizki',
    avatar: 'Ahmad Rizki Avatar',
    rating: 5,
    comment: 'Pesen lewat ojol, datengnya cepet, packing rapi. Rasanya konsisten enak. Es rencengannya seger banget!',
    date: '2 minggu lalu',
    productName: 'Es Rencengan Spesial'
  },
];

const ReviewCard = ({ review }) => (
  <motion.div
    className="bg-white p-6 rounded-lg shadow-lg flex flex-col justify-between"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    <div>
      <div className="flex items-start mb-3">
        <div className="w-12 h-12 rounded-full bg-gray-200 mr-4 flex-shrink-0">
          <img  
              src={`/images/avatars/${review.avatar.toLowerCase().replace(/\s+/g, '-')}.png`} 
              alt={review.name} 
              className="w-full h-full object-cover rounded-full"
           src="https://images.unsplash.com/photo-1694388001616-1176f534d72f" />
        </div>
        <div>
          <h4 className="font-semibold text-[#4A2C1A]">{review.name}</h4>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} className={`mr-1 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-1">{review.date}</p>
        </div>
      </div>
      <p className="text-gray-700 text-sm leading-relaxed mb-3">{review.comment}</p>
    </div>
    <p className="text-xs text-orange-600 font-medium mt-auto">Review untuk: {review.productName}</p>
  </motion.div>
);

const ReviewSection = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleWriteReview = () => {
    if (isAuthenticated) {
      navigate('/reviews#give-review');
    } else {
      navigate('/login?redirect=/reviews%23give-review');
    }
  };

  return (
    <section id="reviews" className="py-16 bg-yellow-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#4A2C1A] mb-4">Apa Kata Mereka</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Pendapat pelanggan setia kami tentang pengalaman mereka di Dapur Azka Qanita.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {reviews.slice(0,3).map(review => ( // Show only 3 reviews on homepage
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-12"
        >
          <Button 
            variant="outline" 
            onClick={() => navigate('/reviews')}
            className="text-orange-600 border-orange-500 hover:bg-orange-50 hover:text-orange-700 px-6 py-3 text-lg"
          >
            Lihat Semua Review ({reviews.length}) <ArrowRight size={18} className="ml-2" />
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto">
            <Star className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
             <h3 className="text-xl font-semibold text-[#4A2C1A] mb-2">Bagikan Pengalaman Anda</h3>
            <p className="text-gray-600 mb-6">
              Sudah mencoba menu kami? Berikan ulasan Anda dan bantu pelanggan lain!
            </p>
            <Button 
              onClick={handleWriteReview}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg"
            >
              <MessageSquare size={18} className="mr-2" /> {isAuthenticated ? 'Tulis Review Sekarang' : 'Login untuk Review'}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ReviewSection;