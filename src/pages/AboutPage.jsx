import React from 'react';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Users, Award, Smile, MapPin, Phone, Mail, Heart, ChefHat, Coffee, Clock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const teamMembers = [
  { name: "Azka Qanita", role: "Founder & Head Chef", image: "Azka Qanita", description: "Dengan pengalaman 10 tahun di dunia kuliner, Azka memimpin dengan passion untuk menciptakan hidangan yang tak terlupakan." },
  { name: "Budi Santoso", role: "Sous Chef", image: "Budi Santoso", description: "Ahli dalam masakan tradisional Indonesia, Budi memastikan setiap hidangan memiliki cita rasa autentik." },
  { name: "Sri Dewi", role: "Kitchen Manager", image: "Sri Dewi", description: "Menjaga operasional dapur berjalan lancar dan memastikan kualitas serta konsistensi hidangan terjaga." },
];

const AboutPage = () => {
  const navigate = useNavigate();

  const handleScrollToSection = (sectionId) => {
    navigate('/', { state: { scrollToSection: sectionId } });
  };


  return (
    <Layout>
      <div className="container mx-auto px-4">
        {/* Hero About Section */}
        <section className="relative py-20 md:py-32 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-b-xl -mx-4 -mt-8">
          <div className="absolute inset-0 bg-black opacity-30 rounded-b-xl"></div>
          <div className="relative container mx-auto px-4 text-center">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              Tentang Dapur Azka Qanita
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Sejak 2015, kami telah menyajikan kelezatan rumahan dengan cinta dan bahan-bahan segar pilihan, menjadi bagian dari cerita kuliner mahasiswa dan masyarakat sekitar.
            </motion.p>
            <motion.div 
              className="flex justify-center space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <span className="bg-white text-orange-600 px-4 py-2 rounded-full text-sm font-semibold">Buka Setiap Hari</span>
              <span className="bg-white text-orange-600 px-4 py-2 rounded-full text-sm font-semibold">Dekat Kampus</span>
            </motion.div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl font-bold text-[#4A2C1A] mb-6">Cerita Kami: Dimulai dari Mimpi Sederhana</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Dapur Azka Qanita bermula dari sebuah mimpi sederhana: menyajikan makanan rumahan yang lezat, bergizi, dan terjangkau bagi para mahasiswa yang jauh dari rumah. Kami ingin menjadi tempat di mana mereka bisa merasakan kehangatan masakan ibu, bahkan saat berada di perantauan.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Dengan komitmen pada kualitas dan pelayanan, kami terus berinovasi dalam menyajikan menu-menu favorit yang diolah dari bahan-bahan segar pilihan. Setiap hidangan kami adalah perpaduan resep tradisional dan sentuhan modern, diciptakan dengan penuh cinta dan dedikasi.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Kini, kami bangga telah menjadi bagian dari perjalanan kuliner banyak orang, tidak hanya mahasiswa, tetapi juga masyarakat sekitar yang mencari cita rasa autentik dan suasana yang ramah.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-4"
            >
              <img  alt="Suasana dapur yang sibuk" className="rounded-lg shadow-xl w-full h-auto object-cover" src="https://images.unsplash.com/photo-1556742053-A5471990e0d5"/>
              <div className="grid grid-cols-2 gap-4">
                <img  alt="Bahan masakan segar" className="rounded-lg shadow-xl w-full h-auto object-cover" src="https://images.unsplash.com/photo-1556909006-3490b8946a40"/>
                <img  alt="Hidangan lezat disajikan" className="rounded-lg shadow-xl w-full h-auto object-cover" src="https://images.unsplash.com/photo-1506084868230-bb9d95c24759"/>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-yellow-50 -mx-4 px-4">
          <h2 className="text-3xl font-bold text-[#4A2C1A] mb-12 text-center">Nilai-Nilai Kami</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Heart className="w-10 h-10 text-orange-500" />, title: "Kualitas Terjamin", description: "Kami menggunakan bahan segar pilihan terbaik untuk setiap hidangan yang kami sajikan." },
              { icon: <ChefHat className="w-10 h-10 text-orange-500" />, title: "Pelayanan Ramah", description: "Tim kami siap melayani dengan senyuman dan memberikan pengalaman makan yang menyenangkan." },
              { icon: <Coffee className="w-10 h-10 text-orange-500" />, title: "Harga Terjangkau", description: "Makanan berkualitas tinggi dengan harga yang ramah di kantong, khususnya untuk mahasiswa." },
              { icon: <Award className="w-10 h-10 text-orange-500" />, title: "Resep Autentik", description: "Setiap hidangan dibuat dengan resep turun temurun yang telah teruji kelezatannya." },
            ].map((value, index) => (
              <motion.div 
                key={index}
                className="bg-white p-6 rounded-lg shadow text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex justify-center mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-[#4A2C1A] mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16">
          <h2 className="text-3xl font-bold text-[#4A2C1A] mb-12 text-center">Tim Kami</h2>
           <p className="text-gray-600 max-w-2xl mx-auto text-center mb-12">
            Orang-orang berbakat di balik setiap hidangan lezat yang kami sajikan.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div 
                key={index}
                className="bg-white p-6 rounded-lg shadow text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <img  alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-4 object-cover shadow-md" src={`https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200`} />
                <h3 className="text-xl font-semibold text-[#4A2C1A] mb-1">{member.name}</h3>
                <p className="text-orange-600 font-medium mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Visit Us Section */}
        <section className="py-16 bg-yellow-50 -mx-4 px-4">
          <h2 className="text-3xl font-bold text-[#4A2C1A] mb-12 text-center">Kunjungi Kami</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <motion.div 
              className="bg-white p-6 rounded-lg shadow"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0 }}
            >
              <MapPin className="w-10 h-10 text-orange-500 mx-auto mb-3" />
              <h3 className="font-semibold text-[#4A2C1A] mb-1">Alamat</h3>
              <p className="text-sm text-gray-600">Jl. Pendidikan No. 123, Dekat Kampus Universitas, Kota Pendidikan, 12345</p>
            </motion.div>
            <motion.div 
              className="bg-white p-6 rounded-lg shadow"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Phone className="w-10 h-10 text-orange-500 mx-auto mb-3" />
              <h3 className="font-semibold text-[#4A2C1A] mb-1">Telepon & Email</h3>
              <p className="text-sm text-gray-600">+62 812-3456-7890</p>
              <p className="text-sm text-gray-600">info@dapurazka.com</p>
            </motion.div>
            <motion.div 
              className="bg-white p-6 rounded-lg shadow"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Clock className="w-10 h-10 text-orange-500 mx-auto mb-3" />
              <h3 className="font-semibold text-[#4A2C1A] mb-1">Jam Buka</h3>
              <p className="text-sm text-gray-600">Senin - Jumat: 08:00 - 20:00</p>
              <p className="text-sm text-gray-600">Sabtu - Minggu: 09:00 - 18:00</p>
            </motion.div>
          </div>
          <div className="mt-12 h-64 bg-gray-300 rounded-lg shadow-md flex items-center justify-center">
            <p className="text-gray-500">Peta Lokasi akan ditampilkan di sini</p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 text-center bg-[#4A2C1A] text-white -mx-4 px-4 rounded-t-xl">
           <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7}}
           >
            <h2 className="text-3xl font-bold mb-4">Siap Merasakan Kelezatan Kami?</h2>
            <p className="max-w-xl mx-auto mb-8">
              Kunjungi Dapur Azka Qanita hari ini dan rasakan pengalaman kuliner yang tak terlupakan!
            </p>
            <div className="space-x-0 space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row justify-center items-center">
              <Button onClick={() => handleScrollToSection('menu')} className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg w-full sm:w-auto">
                Lihat Menu
              </Button>
              <Button onClick={() => handleScrollToSection('contact')} variant="outline" className="border-white text-orange-500 hover:text-orange-400 hover:bg-gray-200 px-8 py-3 text-lg w-full sm:w-auto">
                Hubungi Kami
              </Button>
            </div>
           </motion.div>
        </section>
      </div>
    </Layout>
  );
};

export default AboutPage;