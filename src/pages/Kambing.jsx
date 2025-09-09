import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import Categories from '../Category'
import Card from '../components/Card'
import Card2 from '../components/CardDua'
import { Goat } from '../Data'
import { dataContext } from '../context/userContext'
import { RxCross2 } from "react-icons/rx";
import { useSelector } from 'react-redux'
function Kambing() {
    let {cate, setCate, input, showCart, setShowCart} = useContext(dataContext)

    function filter(category) {
        if(category === "semua") {
            setCate(Goat)
        } else{
            let newList = Goat.filter((item) => ( item.food_category === category));
            setCate(newList);
        }
    }

    let items = useSelector(state => state.cart)

    let subtotal = items.reduce((total, item) => total + item.qty * item.price, 0)
    let deliferyFee = 20;
    let taxes = subtotal * 0.5/100;
    let total = Math.floor(subtotal + deliferyFee + taxes)

    // Filter berdasarkan input pencarian
    const query = input.trim().toLowerCase();
    const filteredCate = query
        ? cate.filter((item) => item.food_name.toLowerCase().includes(query))
        : cate;

  return (
    <div className='bg-slate-200 w-full min-h-screen'>
        <div className="w-full flex flex-wrap gap-5 px-5 justify-center items-center pt-8 pb-8">
            {filteredCate.length > 0 ? (
                filteredCate.map((item) => (
                    <Card 
                        key={`goat-${item.id}`}
                        name={item.food_name} 
                        img={item.food_img} 
                        price={item.price} 
                        id={`goat-${item.id}`} 
                        type={item.food_type} 
                    />
                ))
            ) : (
                <div className="text-center text-2xl text-blue-300 font-semibold pt-5">
                    Tidak ada hasil untuk pencarian
                </div>
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
                <span className='text-blue-300 font-semibold text-lg'>Rp {subtotal}</span>
            </div>
            <div className="w-full flex justify-between items-center">
                <span className='text-lg text-gray-600 font-semibold'>Biaya Pengiriman</span>
                <span className='text-blue-300 font-semibold text-lg'>Rp {deliferyFee}</span>
            </div>
            <div className="w-full flex justify-between items-center">
                <span className='text-lg text-gray-600 font-semibold'>Pajak</span>
                <span className='text-blue-300 font-semibold text-lg'>Rp {taxes}</span>
            </div>
        </div>
                <div className="w-full flex justify-between items-center p-8">
                    <span className='text-lg text-gray-600 font-semibold'>Total</span>
                    <span className='text-blue-300 font-semibold text-lg text-2xl'>Rp {total}</span>
                </div>
                <button className='w-full p-3 rounded-lg bg-blue-300 text-gray-700 hover:bg-blue-100 transition-all cursor-pointer'>pesan</button>
            </> : <div className="text-center text-2xl text-blue-300 font-semibold pt-5">Empty Cart</div>
            }

        </div>

        {/* Floating Contacts */}
        <div className="fixed right-6 bottom-6 z-[1000] flex flex-col items-end gap-3">
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