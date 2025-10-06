import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Categories from '../Category'
import Card from '../components/Card'
import Card2 from '../components/CardDua'
import { Milk } from '../Data'
import { dataContext } from '../context/userContext'
import { RxCross2 } from "react-icons/rx";
import { useSelector } from 'react-redux'
import { supabase } from '../lib/supabaseClient'
import { formatCurrencyIDR } from '../utils/format'

function Susu() {
    let {cate, setCate, input, showCart, setShowCart} = useContext(dataContext)
    const navigate = useNavigate();

    function filter(category) {
        if(category === "semua") {
            setCate(Milk)
        } else{
            let newList = Milk.filter((item) => ( item.food_category === category));
            setCate(newList);
        }
    }

    let items = useSelector(state => state.cart)

    let subtotal = items.reduce((total, item) => total + item.qty * item.price, 0)
    let deliferyFee = 20;
    let taxes = subtotal * 0.5/100;
    let total = Math.floor(subtotal + deliferyFee + taxes)

    // Filter: pencarian hanya berdasarkan nama menu
    const query = input.trim().toLowerCase();
    const baseList = Milk;
    const filteredList = query
        ? baseList.filter((item) => item.food_name.toLowerCase().includes(query))
        : baseList;

    // Handler tombol pesan: arahkan ke login jika belum login
    const handlePesan = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
            navigate('/login');
            return;
        }
        // TODO: arahkan ke halaman checkout jika sudah tersedia
    }

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
    <div className='bg-slate-200 w-full min-h-screen pt-[80px]'>
        <div className="w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 px-5 justify-items-center pt-2 pb-8">
            {filteredList.length > 0 ? (
                filteredList.map((item) => (
                    <Card 
                        key={`milk-${item.id}`}
                        name={item.food_name} 
                        img={item.food_img} 
                        price={item.price} 
                        id={`milk-${item.id}`} 
                        type={item.food_type} 
                    />
                ))
            ) : (
                <div className="text-center text-2xl text-blue-300 font-semibold pt-5">Tidak ada di menu</div>
            )}
        </div>

        <div className={`w-full md:w-[40vw] h-[100%] fixed top-0 right-0 bg-white shodaw-xl z-[999] p-6 transition-all duration-500 overflow-auto ${showCart?"translate-x-0":"translate-x-full"}` }>
            <header className='w-[100%] flex justify-between item-center'>
                <span className='text-blue-300 text-[18px] font-semibold'>Belli Barang</span>
                <RxCross2 className='w-[30px] h-[30px] text-blue-300 text-[18px] font-semibold cursor-pointer hover:text-gray-700' onClick={() => setShowCart(false)} />
            </header>

            {items.length > 0?
            <>
            <div className="w-full mt-9 flex flex-col gap-8">
                {items.map((item)=>(
                    <Card2 name={item.name} price={item.price} img={item.img} id={item.id} qty={item.qty} />
                ))}
            </div>

            <div className="w-full border-t-2 border-gray-400 border-b-2 mt-7 flex flex-col gap-2 p-8">
                <div className="w-full flex justify-between items-center">
                    <span className='text-lg text-gray-600 font-semibold'>Jumlah keseluruhan</span>
                    <span className='text-blue-300 font-semibold text-lg'>{formatCurrencyIDR(subtotal)}</span>
                </div>
                <div className="w-full flex justify-between items-center">
                    <span className='text-lg text-gray-600 font-semibold'>Biaya Pengiriman</span>
                    <span className='text-blue-300 font-semibold text-lg'>{formatCurrencyIDR(deliferyFee)}</span>
                </div>
                <div className="w-full flex justify-between items-center">
                    <span className='text-lg text-gray-600 font-semibold'>Pajak</span>
                    <span className='text-blue-300 font-semibold text-lg'>{formatCurrencyIDR(taxes)}</span>
                </div>
            </div>
            <div className="w-full flex justify-between items-center p-8">
                <span className='text-lg text-gray-600 font-semibold'>Total</span>
                <span className='text-blue-300 font-semibold text-lg text-2xl'>{formatCurrencyIDR(total)}</span>
            </div>
            <button onClick={handlePesan} className='w-full p-3 rounded-lg bg-blue-300 text-gray-700 hover:bg-blue-100 transition-all cursor-pointer'>pesan</button>
                </> : <div className="text-center text-2xl text-blue-300 font-semibold pt-5">Empty Cart</div>
                }

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
  )
}

export default Susu