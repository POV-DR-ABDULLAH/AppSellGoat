import React, { useContext, useEffect, useState } from 'react';
import { IoFastFoodOutline } from "react-icons/io5";
import { FaShoppingBasket } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { dataContext } from '../context/userContext';
import { Goat } from '../Goat';
import { useSelector } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import Goatt from '../assets/Kambing.jpg';
import Kambingg from '../assets/Kambing1.png';
import { Categories } from '../Category';

function Nav() {
    let { input, setInput, cate, setCate, showCart, setShowCart} = useContext(dataContext)

    let items = useSelector(state => state.cart)

    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);

    // Cek apakah sedang di halaman Kambing atau Susu
    const showNavBar = location.pathname === '/kambing' || location.pathname === '/susu';
    const showNavBar2 = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
          setIsScrolled(window.scrollY > 0); // kalau scrollY > 0 artinya sudah discroll
        };
    
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
      }, []);

  return (
    <div className={`w-full ${showNavBar ? 'h-[185px]' : 'h-[70px]'} bg-[#E2E8F0]`}>
        <div className='w-full h-[70px] fixed top-0 left-0 z-40 shadow-md flex justify-between items-center px-5 md:px-8 bg-gray-300'>
            {/* Navbar */}
            <div className="w-full flex justify-between items-center px-5 md:px-8 h-[80px]">
                
                {/* Logo + Tulisan */}
                <div className="flex items-center gap-3">
                    <img src={Kambingg} className='w-[50px] h-[50px] text-gray-300' />
                    <h1 className="text-xl font-semibold text-gray-600">Jual Kambing</h1>
                </div>

                {/* Menu */}
                <div className={`hidden md:flex flex-col items-center gap-2 flex-1 ${showNavBar ? 'pt-12' : 'pt-16'}`}>
                    <div className="flex flex-wrap justify-center items-center gap-5 w-full">
                        {Categories.map((item) => (
                            <Link 
                                to={item.path}
                                key={item.id}
                                className={`w-[200px] h-[60px] bg-white flex flex-col justify-center items-center gap-1 cursor-pointer text-[14px] hover:bg-gray-100 font-semibold text-slate-600 rounded-lg shadow-xl transition-all duration-300 ${location.pathname === item.path ? 'border-2 border-blue-500' : 'border-2 border-gray-500'}`}
                            >
                                {item.img}
                                <span>{item.name}</span>
                            </Link>
                        ))}
                    </div>
            
                    {showNavBar && (
                        <div className='flex flex-wrap justify-center items-center gap-5 w-full  rounded-lg'>
                            {location.pathname === '/kambing' && (
                                <>
                                    <div className="px-4 py-2 bg-white hover:bg-gray-100 rounded-lg shadow cursor-pointer transition-all duration-300">
                                        Semua
                                    </div>
                                    <div className="px-4 py-2 bg-white hover:bg-gray-100 rounded-lg shadow cursor-pointer transition-all duration-300">
                                        Kambing Hidup
                                    </div>
                                    <div className="px-4 py-2 bg-white hover:bg-gray-100 rounded-lg shadow cursor-pointer transition-all duration-300">
                                        Daging Segar
                                    </div>
                                </>
                            )}
                            {location.pathname === '/susu' && (
                                <>
                                    <div className="px-4 py-2 bg-white hover:bg-gray-100 rounded-lg shadow cursor-pointer transition-all duration-300">
                                        Semua
                                    </div>
                                    <div className="px-4 py-2 bg-white hover:bg-gray-100 rounded-lg shadow cursor-pointer transition-all duration-300">
                                        Susu Segar
                                    </div>
                                    <div className="px-4 py-2 bg-white hover:bg-gray-100 rounded-lg shadow cursor-pointer transition-all duration-300">
                                        Olahan Susu
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                    {showNavBar2 && (
                        <div className='flex flex-wrap justify-center items-center gap-5 px-5 border-1 border-gray-500 bg-gray-100 py-2 rounded-lg'>
                            {location.pathname === '/' && (
                                <>
                                    <a 
                                        href="#home" 
                                        className="px-4 py-2 bg-white hover:bg-gray-100 rounded-lg shadow cursor-pointer transition-all duration-300"
                                        onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })}
                                    >
                                        Home
                                    </a>
                                    <a 
                                        href="#kambing" 
                                        className="px-4 py-2 bg-white hover:bg-gray-100 rounded-lg shadow cursor-pointer transition-all duration-300"
                                        onClick={() => document.getElementById('kambing')?.scrollIntoView({ behavior: 'smooth' })}
                                    >
                                        Kambing
                                    </a>
                                    <a 
                                        href="#susu" 
                                        className="px-4 py-2 bg-white hover:bg-gray-100 rounded-lg shadow cursor-pointer transition-all duration-300"
                                        onClick={() => document.getElementById('susu')?.scrollIntoView({ behavior: 'smooth' })}
                                    >
                                        Susu
                                    </a>
                                    <a 
                                        href="#ulasan" 
                                        className="px-4 py-2 bg-white hover:bg-gray-100 rounded-lg shadow cursor-pointer transition-all duration-300"
                                        onClick={() => document.getElementById('ulasan')?.scrollIntoView({ behavior: 'smooth' })}
                                    >
                                        Ulasan
                                    </a>
                                </>
                            )}
                        </div>
                    )}
                </div>

                {/* Tombol Login */}
                <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
                Login
                </button>
            </div>
        </div>
        {showNavBar && (
            <div className={`w-full flex justify-between items-center px-5 md:px-8 fixed transition-all duration-300 shadow-md ${isScrolled ? "pt-30" : "pt-35"}`}>
                {/* Logo */}
                <div className='w-[60px] h-[60px] flex justify-center items-center rounded-md bg-white shadow-xl border-3 border-transparent hover:border-gray-300'>
                    <img src={Goatt} className='w-[50px] h-[50px] text-gray-300' />
                </div>

                {/* Search */}
                <form
                    className='w-[45%] h-[60px] flex items-center rounded-md bg-white shadow-xl px-5 gap-5 md:w-[70%] border-3 border-transparent hover:border-gray-300'
                    onSubmit={(e) => e.preventDefault()}
                >
                    <IoIosSearch className='text-[#07080C] w-[20px] h-[20px]' />
                    <input
                    type="text"
                    placeholder='search item...'
                    className='w-[100%] outline-none text-[16px] md:text-[20px]'
                    onChange={(e) => setInput(e.target.value)}
                    value={input}
                    />
                </form>

                {/* Cart */}
                <div
                    className='w-[60px] h-[60px] flex justify-center items-center rounded-md bg-white shadow-xl relative cursor-pointer border-3 border-transparent hover:border-gray-300'
                    onClick={() => setShowCart(true)}
                >
                    <span className='absolute top-0 right-2 text-gray-300 font-bold text-[18px] shadow-xl'>
                    {items.length}
                    </span>
                    <FaShoppingBasket className='w-[30px] h-[30px] text-gray-300' />
                </div>
            </div>
        )}
    </div>
      )
}

export default Nav;