import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Categories from '../Category';
import Card from '../components/Card';
import Card2 from '../components/CardDua';
import { Goat } from '../Data';
import { dataContext } from '../context/userContext';
import { RxCross2 } from "react-icons/rx";
import { useSelector } from 'react-redux';
import { supabase } from '../lib/supabaseClient';
import { formatCurrencyIDR } from '../utils/format';
// import CategoryTabs from '../components/CategoryTabs';

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
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get('category') || 'kambingHidup'; // Default to kambingHidup
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const items = useSelector(state => state.cart);

    

    // Fetch data from local data or Supabase
    useEffect(() => {
        const fetchProducts = () => {
            try {
                setIsLoading(true);
                
                // Use local data for now
                let data = [];
                if (category === 'kambingHidup') {
                    data = Goat.kambingHidup;
                } else if (category === 'kambingMasak') {
                    data = Goat.kambingMasak;
                }
                
                setProducts(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, [category]);

    // Filter products based on search input
    const filteredList = products.filter((item) => 
        item && item.food_name && item.food_category &&
        (item.food_name.toLowerCase().includes(input.toLowerCase()) ||
        item.food_category.toLowerCase().includes(input.toLowerCase()))
    );

    // Calculate cart totals
    const subtotal = items.reduce((total, item) => total + (item.price * item.qty), 0);
    const deliferyFee = 0; // You can adjust this as needed
    const taxes = subtotal * 0.005; // 0.5% tax
    const total = subtotal + deliferyFee + taxes;

    const handlePesan = (e) => {
        e.preventDefault();
        
        if (items.length === 0) {
            alert('Keranjang masih kosong. Silakan tambahkan produk terlebih dahulu.');
            return;
        }
        
        // Build order details message
        let message = "Halo, saya ingin memesan:\n\n";
        
        // Add each item in cart to the message
        items.forEach(item => {
            // Gunakan food_name jika ada, jika tidak gunakan name
            const itemName = item.food_name || item.name || 'Produk';
            message += `- ${itemName} (${item.qty} x ${formatCurrencyIDR(item.price)}) = ${formatCurrencyIDR(item.price * item.qty)}\n`;
        });
        
        // Add summary
        message += `\nSubtotal: ${formatCurrencyIDR(subtotal)}\n`;
        message += `Total: ${formatCurrencyIDR(total)}\n\n`;
        message += "Apakah pesanan ini bisa diproses?";
        
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

    const handlePesan2 = (e) => {
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
        <div className='bg-slate-200 w-full min-h-screen'>
            <div className="container mx-auto px-4 pt-28 pb-8">
                {isLoading ? (
                    <LoadingMessage />
                ) : (
                    <>  
                        {filteredList.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
                                {filteredList.map((item) => (
                                    <Card 
                                        key={item.id}
                                        name={item.food_name}
                                        img={item.food_img}
                                        price={item.price}
                                        id={item.id}
                                        category={item.food_category}
                                    />
                                ))}
                            </div>
                        ) : (
                            <EmptyState message={
                                input 
                                    ? `Tidak ada produk yang cocok dengan "${input}"` 
                                    : `Tidak ada produk yang tersedia untuk kategori ${category === 'kambingHidup' ? 'Kambing Hidup' : 'Kambing Masak'}`
                            } />
                        )}
                    </>
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
                    onClick={handlePesan2}
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
    );
}

export default Kambing