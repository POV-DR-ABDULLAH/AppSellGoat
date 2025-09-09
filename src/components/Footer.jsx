import React from 'react';
import { FaFacebook, FaInstagram, FaWhatsapp, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#E2E8F0] h-[200px] pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="col-span-1">
            <h3 className="text-xl font-bold mb-4">Tentang Kami</h3>
            <p className="mb-4">
              AppSellGoat adalah platform jual beli kambing dan produk olahan susu kambing berkualitas tinggi.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className=" hover:text-gray-300">
                <FaFacebook size={24} />
              </a>
              <a href="#" className=" hover:text-gray-300">
                <FaInstagram size={24} />
              </a>
              <a href="#" className=" hover:text-gray-300">
                <FaWhatsapp size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-xl font-bold mb-4">Tautan Cepat</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:">Beranda</Link></li>
              <li><Link to="/kambing" className="hover:">Kambing</Link></li>
              <li><Link to="/susu" className="hover:">Susu Kambing</Link></li>
              <li><Link to="/about" className="hover:">Tentang Kami</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h3 className="text-xl font-bold mb-4">Hubungi Kami</h3>
            <ul className="space-y-3">
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
            <h3 className="text-xl font-bold mb-4">Berlangganan</h3>
            <p className=" mb-4">Dapatkan informasi terbaru dan penawaran spesial dari kami.</p>
            <div className="flex hover:rounded-lg border border-gray-600">
              <input 
                type="email" 
                placeholder="Email Anda" 
                className="px-4 py-2 w-full rounded-l-md text-gray-800 focus:outline-none"
              />
              <button className="bg-gray-500 hover:bg-gray-600  px-4 ">
                Kirim
              </button>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-green-700 mt-8 pt-6 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} AppSellGoat. Semua hak dilindungi.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
