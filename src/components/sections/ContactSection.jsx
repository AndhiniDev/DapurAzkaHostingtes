
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const ContactSection = () => {
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Pesan Terkirim!",
      description: "Terima kasih telah menghubungi kami. Kami akan segera merespons pesan Anda.",
      duration: 3000,
    });
    e.target.reset();
  };

  return (
    <section id="contact" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#4A2C1A] mb-4">Hubungi Kami</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Punya pertanyaan atau ingin memesan catering? Hubungi kami melalui form di bawah ini.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12">
          <motion.div
            className="lg:w-1/3 bg-yellow-50 p-8 rounded-lg shadow-lg"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-2xl font-semibold text-[#4A2C1A] mb-6">Informasi Kontak</h3>
            <div className="space-y-4 text-gray-700">
              <div className="flex items-start">
                <MapPin className="w-6 h-6 text-orange-500 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">Alamat</p>
                  <p>Jl. Pendidikan No. 123, Dekat Kampus Universitas, Kota Pendidikan, 12345</p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="w-6 h-6 text-orange-500 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">Telepon</p>
                  <p>+62 812-3456-7890</p>
                  <p>+62 898-7654-3210</p>
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="w-6 h-6 text-orange-500 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">Email</p>
                  <p>info@dapurazka.com</p>
                  <p>catering@dapurazka.com</p>
                </div>
              </div>
            </div>
            <h3 className="text-2xl font-semibold text-[#4A2C1A] mt-8 mb-4">Jam Operasional</h3>
            <div className="space-y-2 text-gray-700">
              <div className="flex justify-between"><span>Senin - Jumat</span><span>08:00 - 20:00</span></div>
              <div className="flex justify-between"><span>Sabtu</span><span>09:00 - 20:00</span></div>
              <div className="flex justify-between"><span>Minggu</span><span>10:00 - 18:00</span></div>
            </div>
          </motion.div>

          <motion.div
            className="lg:w-2/3"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-gray-700">Nama</Label>
                <Input type="text" id="name" placeholder="Nama Lengkap Anda" required className="mt-1"/>
              </div>
              <div>
                <Label htmlFor="email" className="text-gray-700">Email</Label>
                <Input type="email" id="email" placeholder="Alamat Email Anda" required className="mt-1"/>
              </div>
              <div>
                <Label htmlFor="subject" className="text-gray-700">Subjek</Label>
                <Input type="text" id="subject" placeholder="Subjek Pesan Anda" required className="mt-1"/>
              </div>
              <div>
                <Label htmlFor="message" className="text-gray-700">Pesan</Label>
                <Textarea id="message" rows="5" placeholder="Tuliskan pesan Anda di sini..." required className="mt-1"/>
              </div>
              <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 text-lg">
                Kirim Pesan
              </Button>
            </form>
            <div className="mt-8 h-64 bg-gray-200 rounded-lg shadow">
              <p className="text-center text-gray-500 p-4">Peta Lokasi Dapur Azka Qanita akan ditampilkan di sini.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
