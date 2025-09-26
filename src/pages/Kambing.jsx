import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Categories from '../Category';
import Card from '../components/Card';
import Card2 from '../components/CardDua';
import { Goat } from '../Data';
import { dataContext } from '../context/userContext';
import { RxCross2 } from "react-icons/rx";
import { useSelector } from 'react-redux';
import { supabase } from '../lib/supabaseClient';
import { formatCurrencyIDR } from '../utils/format';

// Komponen Loading
const LoadingMessage = () => (
  <div className="text-center py-10 col-span-full">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
    <p className="mt-2 text-gray-600">Memuat data...</p>
  </div>
);

// Komponen Empty State
const EmptyState = ({ message = 'Tidak ada produk yang tersedia' }) => (
  <div className="text-center py-10 col-span-full">
    <div className="text-gray-400 mb-2">
      <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
    <p className="text-gray-500">{message}</p>
  </div>
);

function Kambing() {
    const { input, showCart, setShowCart } = useContext(dataContext);
    const [activeTab, setActiveTab] = useState('all'); // 'all', 'live', 'cooked', 'cut'
    const [showTabs, setShowTabs] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const items = useSelector(state => state.cart);

    // Fetch data dari Supabase
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data, error } = await supabase
                    .from('products')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error) throw error;
                
                setProducts(data || []);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Hitung total belanja
    const subtotal = items.reduce((total, item) => total + item.qty * item.price, 0);
    const deliferyFee = 20000; // Biaya pengiriman Rp 20.000
    const taxes = subtotal * 0.5 / 100; // Pajak 0.5%
    const total = Math.floor(subtotal + deliferyFee + taxes);

    // Filter produk berdasarkan pencarian dan tab aktif
    const query = input.trim().toLowerCase();
    let filteredList = [...Goat]; // Menggunakan data dari Data.js
    
    // Filter berdasarkan tab aktif
    if (activeTab === 'live') {
        filteredList = filteredList.filter(item => item.food_category === 'goat_live');
    } else if (activeTab === 'cooked') {
        filteredList = filteredList.filter(item => item.food_category === 'goat_cooked');
    } else if (activeTab === 'cut') {
        filteredList = filteredList.filter(item => item.food_category === 'goat_cut');
    } else {
        // Untuk tab 'all', tampilkan semua produk kambing
        filteredList = [...Goat];
    }
    
    // Filter berdasarkan pencarian
    if (query) {
        filteredList = filteredList.filter(item => 
            item.food_name.toLowerCase().includes(query)
        );
    }

    // Handler tombol pesan: arahkan ke login jika belum login
    const handlePesan = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
            navigate('/login');
            return;
        }
        // Jika sudah login, lanjutkan proses pemesanan (placeholder)
        // TODO: arahkan ke halaman checkout jika sudah tersedia
    }

  // Fungsi untuk menangani perubahan tab
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className='bg-slate-200 w-full min-h-screen'>
      {/* Tabs untuk filter */}
      <div className="w-full bg-white shadow-sm py-2 px-4 sticky top-0 z-10">
        <div className="flex space-x-4 overflow-x-auto">
          <button
            onClick={() => handleTabChange('all')}
            className={`px-4 py-2 rounded-lg whitespace-nowrap ${
              activeTab === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            Semua
          </button>
          <button
            onClick={() => handleTabChange('live')}
            className={`px-4 py-2 rounded-lg whitespace-nowrap ${
              activeTab === 'live' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            Kambing Hidup
          </button>
          <button
            onClick={() => handleTabChange('cooked')}
            className={`px-4 py-2 rounded-lg whitespace-nowrap ${
              activeTab === 'cooked' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            Kambing Masak
          </button>
          <button
            onClick={() => handleTabChange('cut')}
            className={`px-4 py-2 rounded-lg whitespace-nowrap ${
              activeTab === 'cut' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            Potongan
          </button>
        </div>
      </div>

      {/* Daftar Produk */}
      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <LoadingMessage />
        ) : filteredList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredList.map((item) => (
              <Card 
                key={`goat-${item.id}`}
                name={item.food_name} 
                img={item.food_img} 
                price={item.price} 
                id={`goat-${item.id}`} 
                category={item.food_category}
              />
            ))}
          </div>
        ) : (
          <EmptyState message={query ? `Tidak ada produk yang cocok dengan "${query}"` : 'Tidak ada produk yang tersedia'} />
        )}
      </div>
      {/* Cart Sidebar */}
      <div className={`w-full md:w-[40vw] h-[100%] fixed top-0 right-0 bg-white shadow-xl z-[999] p-6 transition-all duration-500 overflow-auto ${showCart ? "translate-x-0" : "translate-x-full"}`}>
        <header className='w-[100%] flex justify-between items-center'>
          <span className='text-blue-300 text-[18px] font-semibold'>Keranjang Belanja</span>
          <RxCross2 
            className='w-[30px] h-[30px] text-blue-300 text-[18px] font-semibold cursor-pointer hover:text-gray-700' 
            onClick={() => setShowCart(false)} 
          />
        </header>

        {items.length > 0 ? (
          <div className="w-full mt-9 flex flex-col gap-8">
            {/* Daftar Item di Keranjang */}
            {items.map((item) => (
              <Card2 
                key={item.id}
                name={item.name}
                price={item.price}
                img={item.img}
                id={item.id}
                qty={item.qty}
              />
            ))}

            {/* Ringkasan Pembayaran */}
            <div className="mt-8 space-y-4">
              <div className="w-full flex justify-between items-center">
                <span className='text-gray-600'>Subtotal</span>
                <span className='font-medium'>{formatCurrencyIDR(subtotal)}</span>
              </div>
              <div className="w-full flex justify-between items-center">
                <span className='text-gray-600'>Biaya Pengiriman</span>
                <span className='text-gray-600'>{formatCurrencyIDR(deliferyFee)}</span>
              </div>
              <div className="w-full flex justify-between items-center">
                <span className='text-gray-600'>Pajak (0.5%)</span>
                <span className='text-gray-600'>{formatCurrencyIDR(taxes)}</span>
              </div>
              <div className="border-t border-gray-200 my-2"></div>
              <div className="w-full flex justify-between items-center">
                <span className='text-lg font-semibold'>Total</span>
                <span className='text-lg font-bold text-blue-600'>{formatCurrencyIDR(total)}</span>
              </div>
            </div>

            {/* Tombol Pesan */}
            <button 
              onClick={handlePesan}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 mt-4"
            >
              Pesan Sekarang
            </button>
          </div>
        ) : (
          <div className="text-center text-2xl text-blue-300 font-semibold pt-5">Keranjang Kosong</div>
        )}
      </div>

      {/* Floating Contacts */}
      <div className="fixed right-6 bottom-6 z-[100] flex flex-col items-end gap-3">
        <a
          href="https://wa.me/6285241180699?text=Assalamu'alaikum%2C%20saya%20ingin%20tanya%20tentang%20aqiqah%20%2F%20susu."
          target="_blank"
          rel="noreferrer"
          className="group flex items-center gap-2 px-4 py-3 rounded-full shadow-xl bg-green-500 text-white hover:bg-green-600 transition-colors"
          title="Hubungi WhatsApp"
          aria-label="Hubungi WhatsApp"
        >
          <span className="text-lg">💬</span>
          <span className="hidden sm:block font-medium">WhatsApp</span>
        </a>
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
    </div>
  )
}

export default Kambing