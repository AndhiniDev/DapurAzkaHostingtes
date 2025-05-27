
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#4A2C1A] text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <img  alt="Dapur Azka Qanita Logo Putih" className="h-10 w-10" src="https://images.unsplash.com/photo-1655184128397-5009b5a40ea6" />
              <span className="font-bold text-xl">Dapur Azka Qanita</span>
            </Link>
            <p className="text-sm text-gray-300 mb-4">
              Dapur rumahan dengan cita rasa istimewa. Menyajikan makanan lezat dengan harga terjangkau.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-[#FF8A00] transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-gray-300 hover:text-[#FF8A00] transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-gray-300 hover:text-[#FF8A00] transition-colors"><Youtube size={20} /></a>
              <a href="#" className="text-gray-300 hover:text-[#FF8A00] transition-colors"><Twitter size={20} /></a>
            </div>
          </div>

          <div>
            <p className="font-semibold text-lg mb-4">Menu Favorit</p>
            <ul className="space-y-2 text-sm">
              <li><Link to="/product/ayam-geprek" className="text-gray-300 hover:text-[#FF8A00] transition-colors">Ayam Geprek</Link></li>
              <li><Link to="/product/mie-ayam" className="text-gray-300 hover:text-[#FF8A00] transition-colors">Mie Ayam</Link></li>
              <li><Link to="/product/bakso-goreng" className="text-gray-300 hover:text-[#FF8A00] transition-colors">Bakso Goreng</Link></li>
              <li><Link to="/product/es-rencengan" className="text-gray-300 hover:text-[#FF8A00] transition-colors">Es Rencengan</Link></li>
              <li><Link to="/product/paket-hemat" className="text-gray-300 hover:text-[#FF8A00] transition-colors">Paket Hemat</Link></li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-lg mb-4">Layanan</p>
            <ul className="space-y-2 text-sm">
              <li><span className="text-gray-300">Dine-in</span></li>
              <li><span className="text-gray-300">Take Away</span></li>
              <li><span className="text-gray-300">Delivery</span></li>
              <li><span className="text-gray-300">Catering</span></li>
              <li><span className="text-gray-300">Reservasi</span></li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-lg mb-4">Kontak</p>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Jl. Pendidikan No. 123, Kota Pendidikan, 12345</li>
              <li>Telepon: <a href="tel:+6281234567890" className="hover:text-[#FF8A00] transition-colors">+62 812-3456-7890</a></li>
              <li>Email: <a href="mailto:info@dapurazka.com" className="hover:text-[#FF8A00] transition-colors">info@dapurazka.com</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
          <p>© {currentYear} Dapur Azka Qanita. All rights reserved.</p>
          <p>
            <Link to="/syarat-ketentuan" className="hover:text-[#FF8A00] transition-colors">Syarat & Ketentuan</Link> | <Link to="/kebijakan-privasi" className="hover:text-[#FF8A00] transition-colors">Kebijakan Privasi</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
