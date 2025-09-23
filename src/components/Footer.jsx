import React from 'react';
import { FaFacebook, FaInstagram, FaWhatsapp, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-200 pt-10 pb-6 text-gray-700">
      <div className="container mx-auto px-4">
        {/* Grid sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="col-span-1">
            <h3 className="text-lg md:text-xl font-bold mb-3">Tentang Kami</h3>
            <p className="mb-4 text-sm md:text-base">
              AppSellGoat adalah platform jual beli kambing dan produk olahan susu kambing berkualitas tinggi.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="hover:text-gray-900">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="hover:text-gray-900">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="hover:text-gray-900">
                <FaWhatsapp size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg md:text-xl font-bold mb-3">Tautan Cepat</h3>
            <ul className="space-y-2 text-sm md:text-base">
              <li><Link to="/" className="hover:underline">Beranda</Link></li>
              <li><Link to="/kambing" className="hover:underline">Kambing</Link></li>
              <li><Link to="/susu" className="hover:underline">Susu Kambing</Link></li>
              <li><Link to="/about" className="hover:underline">Tentang Kami</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h3 className="text-lg md:text-xl font-bold mb-3">Hubungi Kami</h3>
            <ul className="space-y-3 text-sm md:text-base">
              <li className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-3 flex-shrink-0" />
                <span>Jl. Dg. Tata Lama, Mangasa, Kec. Somba Opu, Kabupaten Gowa, Sulawesi Selatan 90221</span>
              </li>
              <li className="flex items-center">
                <FaPhone className="mr-3 flex-shrink-0" />
                <a href="tel:+62 852-4118-0699" className="hover:underline">0852-4118-0699</a>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-3 flex-shrink-0" />
                <a href="mailto:appsellgoat@gmail.com" className="hover:underline">appsellgoat@gmail.com</a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-1">
            <h3 className="text-lg md:text-xl font-bold mb-3">Berlangganan</h3>
            <p className="mb-4 text-sm md:text-base">Dapatkan informasi terbaru dan penawaran spesial dari kami.</p>
            <form className="flex items-stretch rounded-lg overflow-hidden border border-gray-400 bg-white max-w-md">
              <input
                type="email"
                placeholder="Email Anda"
                className="px-3 py-2 w-full text-gray-800 focus:outline-none"
              />
              <button type="submit" className="bg-gray-700 hover:bg-gray-800 text-white px-4 text-sm md:text-base">
                Kirim
              </button>
            </form>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-400 mt-8 pt-6 text-center text-gray-600 text-sm">
          <p>&copy; {new Date().getFullYear()} AppSellGoat. Semua hak dilindungi.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

