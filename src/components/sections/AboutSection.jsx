import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Users, Award, Smile } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const AboutSection = () => {
  const navigate = useNavigate();

  return (
    <section id="about" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <img  
              alt="Tim Dapur Azka Qanita sedang memasak" 
              className="rounded-lg shadow-xl w-full h-auto max-h-[400px] object-cover"
             src="https://images.unsplash.com/photo-1535743152831-b30477188917" />
          </motion.div>
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#4A2C1A] mb-6">Tentang Dapur Azka Qanita</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Sejak 2015, Dapur Azka Qanita telah menjadi rumah kedua bagi para mahasiswa dan pekerja di sekitar kampus. Kami bangga menyajikan makanan rumahan yang lezat dengan cita rasa autentik dan harga yang terjangkau.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Dengan komitmen pada kualitas bahan baku segar dan resep turun temurun, setiap hidangan kami dibuat dengan penuh cinta untuk memberikan pengalaman kuliner yang tak terlupakan.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div className="bg-yellow-50 p-6 rounded-lg shadow">
                <Users className="w-10 h-10 text-orange-500 mb-3" />
                <p className="text-2xl font-bold text-orange-600">1000+</p>
                <p className="text-gray-600">Pelanggan Setia</p>
              </div>
              <div className="bg-yellow-50 p-6 rounded-lg shadow">
                <Award className="w-10 h-10 text-orange-500 mb-3" />
                <p className="text-2xl font-bold text-orange-600">9</p>
                <p className="text-gray-600">Tahun Berpengalaman</p>
              </div>
            </div>
            <ul className="space-y-3 mb-8 text-gray-700">
              <li className="flex items-center">
                <Smile className="w-5 h-5 text-orange-500 mr-3" /> Bahan segar pilihan terbaik
              </li>
              <li className="flex items-center">
                <Smile className="w-5 h-5 text-orange-500 mr-3" /> Pelayanan cepat dan ramah
              </li>
              <li className="flex items-center">
                <Smile className="w-5 h-5 text-orange-500 mr-3" /> Harga terjangkau untuk mahasiswa
              </li>
            </ul>
            <Button onClick={() => navigate('/about')} className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg text-lg">
              Selengkapnya Tentang Kami
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;