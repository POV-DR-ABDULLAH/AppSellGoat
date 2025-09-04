import React, { useContext, useState } from 'react'
import Categories from '../Category'
import Card from '../components/Card'
import Card2 from '../components/CardDua'
import { Milk } from '../Goat'
import { dataContext } from '../context/userContext'
import { RxCross2 } from "react-icons/rx";
import { useSelector } from 'react-redux'
function Susu() {
    let {cate, setCate, input, showCart, setShowCart} = useContext(dataContext)

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

  return (
    <div className='bg-slate-200 w-full min-h-screen'>
        <div className="w-full flex flex-wrap gap-5 px-5 justify-center items-center pt-8 pb-8">
            {cate.length > 1?
                cate.map((item) => (
                    <Card name={item.food_name} img={item.food_img} price={item.price} id={item.id} type={item.food_type} />
                )) : <div className="text-center text-2xl text-blue-300 font-semibold pt-5">Tidak Ada Di Menu</div>
            }
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
    </div>
  )
}

export default Susu