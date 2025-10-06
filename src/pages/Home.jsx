import React from 'react';
import { Link } from 'react-router-dom';
import GoatImage from '../assets/Goat.png';
import dummy from '../assets/Kambing1.jpg';
import GoatMilkImage from '../assets/GoatMilk.jpg';
import Footer from '../components/Footer';

const Home = () => {
  const handlePesan = (e) => {
          e.preventDefault();

          // Build order details message
          let message = "Assalamu'alaikum, saya ingin tanya tentang aqiqah / susu.";
          
          const encodedMessage = encodeURIComponent(message);
          
          // Check if it's a mobile device
          const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
          
          if (isMobile) {
              // For mobile devices
              window.location.href = `whatsapp://send?phone=6285241180699&text=${encodedMessage}`;
          } else {
              // For desktop
              window.open(`https://wa.me/6285241180699?text=${encodedMessage}`, '_blank');
          }
      };

  return (
    <div className='bg-gray-50'>
      {/* Hero Section */}
      <section id="home" className='min-h-screen flex items-center justify-center bg-green-50 px-4 py-16'>
        <div className='container mx-auto px-4'>
          <div className='flex flex-col items-center justify-center text-center'>
            <div className='mb-10 max-w-4xl'>
              <img 
                src={GoatImage} 
                alt='Kambing Sehat' 
                className='mx-auto mb-8 w-[200px] h-[200px] object-cover  '
              />
              <h1 className='text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-6 leading-tight'>
                Jual Kambing
                Aqiqah <br /> & Susu Segar <br />
                di <span className='text-gray-600 font-caveat'>Aqiqah Mas Ali</span>
              </h1>
              {/* <p className='text-xl text-gray-600 mb-10 max-w-2xl mx-auto'>
                Layanan aqiqah, penjualan kambing & susu murni segar yang sehat, higienis, 
                dan 100% halal terpercaya. oleh <span className='font-semibold text-gray-800'>Mas Ali</span>
              </p> */}
              <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
                <Link 
                  to='/kambing' 
                  className='w-full sm:w-auto bg-gray-400 hover:bg-gray-500 text-white font-semibold py-4 px-8 rounded-lg text-center transition duration-300 transform hover:scale-105'
                >
                  Lihat Kambing
                </Link>
                <Link 
                  to='/susu' 
                  className='w-full sm:w-auto bg-gray hover:bg-gray-50 text-gray-600 border-2 border-gray-600 font-semibold py-4 px-8 rounded-lg text-center transition duration-300 transform hover:scale-105'
                >
                  Pesan Susu Segar
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Goat Section */}
      <section id="kambing" className='min-h-screen flex items-center py-20 bg-white'>
        <div className='container mx-auto px-6'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold text-gray-800 mb-4'>🐐 Tentang Kambing Kami</h2>
            <div className='w-24 h-1 bg-green-500 mx-auto'></div>
          </div>
          
          <div className='flex flex-col lg:flex-row items-center gap-12'>
            <div className='lg:w-1/2'>
              <img 
                src={dummy} 
                alt='Kambing Sehat' 
                className='rounded-xl shadow-xl w-56 sm:w-72 md:w-80 lg:w-[400px] max-w-full h-auto mx-auto transform motion-safe:hover:scale-105 active:scale-105 transition-transform duration-500'
              />
            </div>
            <div className='lg:w-1/2 mt-12 lg:mt-0'>
              <h3 className='text-3xl font-bold text-gray-800 mb-6'>Kambing Sehat & Berkualitas</h3>
              <p className='text-lg text-gray-600 mb-8 leading-relaxed'>
                Kami menyediakan berbagai jenis kambing sehat dan terawat dengan baik untuk berbagai keperluan. Setiap kambing dipelihara dengan standar kebersihan dan kesehatan yang tinggi.
              </p>
              <ul className='space-y-4 mb-10'>
                {[
                  'Kambing Aqiqah',
                  'Kambing Qurban',
                  'Kambing Konsumsi Harian'
                ].map((item, index) => (
                  <li key={index} className='flex items-start'>
                    <span className='text-green-500 text-xl mr-3 mt-1'>✓</span>
                    <span className='text-gray-700 text-lg'>{item}</span>
                  </li>
                ))}
              </ul>
              <Link 
                to='/kambing' 
                className='inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105'
              >
                Lihat Harga & Pemesanan
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Milk Section */}
      <section id="susu" className='min-h-screen flex items-center py-20 bg-gray-50'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold text-gray-800 mb-4'>🥛 Susu Kambing Segar</h2>
            <div className='w-24 h-1 bg-green-500 mx-auto'></div>
          </div>
          
          <div className='flex flex-col lg:flex-row-reverse items-center gap-12'>
            <div className='lg:w-1/2'>
              <img 
                src={GoatMilkImage} 
                alt='Susu Kambing Segar' 
                className='rounded-xl shadow-xl w-56 xs:w-64 sm:w-72 md:w-80 lg:w-[400px] max-w-full h-auto mx-auto transform motion-safe:hover:scale-105 active:scale-105 transition-transform duration-500'
              />
            </div>
            <div className='lg:w-1/2 mt-12 lg:mt-0'>
              <h3 className='text-3xl font-bold text-gray-800 mb-6'>Susu Kambing Murni & Berkhasiat</h3>
              <p className='text-lg text-gray-600 mb-8 leading-relaxed'>
                Nikmati manfaat susu kambing segar yang diproses dengan higienis tanpa bahan pengawet. Susu kami diproses dengan standar kebersihan tinggi untuk menjaga kualitas dan nutrisinya.
              </p>
              <ul className='space-y-4 mb-10'>
                {[
                  'Diperah langsung setiap pagi',
                  'Tanpa bahan pengawet',
                  'Kaya nutrisi dan gizi',
                  'Dikemas dengan baik dan higienis'
                ].map((item, index) => (
                  <li key={index} className='flex items-start'>
                    <span className='text-green-500 text-xl mr-3 mt-1'>✓</span>
                    <span className='text-gray-700 text-lg'>{item}</span>
                  </li>
                ))}
              </ul>
              <Link 
                to='/susu' 
                className='inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105'
              >
                Pesan Sekaran
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="ulasan" className='py-20 bg-white'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold text-gray-800 mb-4'>✅ Kenapa Harus Beli di Sini?</h2>
            <div className='w-24 h-1 bg-green-500 mx-auto mb-12'></div>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              Kami memberikan pelayanan terbaik dengan kualitas produk yang tidak perlu diragukan lagi.
            </p>
          </div>
          
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {[
              {
                icon: '🐐',
                title: 'Hewan Sehat',
                description: 'Kambing kami dipelihara dengan baik dan bebas penyakit'
              },
              {
                icon: '🥛',
                title: '100% Murni',
                description: 'Susu segar tanpa campuran bahan pengawet'
              },
              {
                icon: '💰',
                title: 'Harga Bersaing',
                description: 'Harga terjangkau dengan kualitas terjamin'
              },
              {
                icon: '🚚',
                title: 'Layanan Antar',
                description: 'Gratis ongkir untuk area tertentu'
              },
              {
                icon: '📱',
                title: 'Praktis',
                description: 'Bisa pesan online kapan saja'
              },
              {
                icon: '🔄',
                title: 'Garansi',
                description: 'Garansi kepuasan pelanggan'
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className='bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 hover:border-green-100 transform hover:-translate-y-1'
              >
                <div className='text-5xl mb-6'>{feature.icon}</div>
                <h3 className='text-xl font-bold text-gray-800 mb-3'>{feature.title}</h3>
                <p className='text-gray-600'>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Floating Contacts */}
      <div className="fixed right-6 bottom-6 z-[10] flex flex-col items-end gap-3">
        <button
          onClick={handlePesan}
          className="group flex items-center gap-2 px-4 py-3 rounded-full shadow-xl bg-green-500 text-white hover:bg-green-600 transition-colors"
          title="Hubungi WhatsApp"
          aria-label="Hubungi WhatsApp"
        >
          <span className="text-lg">💬</span>
          <span className="hidden sm:block font-medium">WhatsApp</span>
        </button>
        <Link
          to="/about"
          className="group flex items-center gap-2 px-4 py-3 rounded-full shadow-xl bg-gray-800 text-white hover:bg-gray-700 transition-colors"
          title="Tentang Kami"
          aria-label="Tentang Kami"
        >
          <span className="text-lg">ℹ️</span>
          <span className="hidden sm:block font-medium">Tentang Kami</span>
        </Link>
      </div>

      <Footer />
    </div>
  );
};

export default Home;