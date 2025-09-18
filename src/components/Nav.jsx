import React, { useContext, useEffect, useState, useRef } from 'react';
import { IoFastFoodOutline } from "react-icons/io5";
import { FaShoppingBasket } from "react-icons/fa";
import { dataContext } from '../context/userContext';
import { Goat } from '../Data';
import { useSelector } from 'react-redux';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import Goatt from '../assets/Kambing.jpg';
import Kambingg from '../assets/Kambing1.png';
import { Categories } from '../Category';
import { FiSearch } from 'react-icons/fi';
import { FiUser } from 'react-icons/fi';
import { supabase } from '../lib/supabaseClient';

function Nav() {
    let { input, setInput, cate, setCate, showCart, setShowCart} = useContext(dataContext)

    let items = useSelector(state => state.cart)

    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false); // mobile menu toggle
    const [isNavDropdownOpen, setIsNavDropdownOpen] = useState(false); // desktop dropdown near Login
    const navDropdownRef = useRef(null);
    const userMenuRef = useRef(null);
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false); // accordion inside mobile menu
    const [isSearchOpen, setIsSearchOpen] = useState(false); // toggle for slide-down search on kambing & susu
    const [user, setUser] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState('');
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const navigate = useNavigate();

    // Cek apakah sedang di halaman Kambing atau Susu
    const showNavBar = location.pathname === '/kambing' || location.pathname === '/susu';
    const showNavBar3 = location.pathname === '/kambing' || location.pathname === '/susu' || location.pathname === '/';
    const showNavBar2 = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
          setIsScrolled(window.scrollY > 0); // kalau scrollY > 0 artinya sudah discroll
        };
    
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
      }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setIsUserMenuOpen(false);
        navigate('/');
    }

    const handleDeleteAccount = async () => {
        if (!confirm('Yakin ingin menghapus akun secara permanen? Tindakan ini tidak bisa dibatalkan.')) return;
        try {
            const endpoint = import.meta.env.VITE_DELETE_USER_ENDPOINT;
            if (!endpoint) {
                alert('Endpoint penghapusan akun belum diset. Tambahkan VITE_DELETE_USER_ENDPOINT di .env');
                return;
            }
            const { data: sessionData } = await supabase.auth.getSession();
            const accessToken = sessionData?.session?.access_token;
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ action: 'delete_self' }),
            });
            if (!res.ok) {
                const txt = await res.text();
                throw new Error(txt || 'Gagal menghapus akun');
            }
            await supabase.auth.signOut();
            navigate('/');
        } catch (err) {
            alert(err.message || 'Gagal menghapus akun');
        } finally {
            setIsUserMenuOpen(false);
        }
    }

    // Close desktop dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (navDropdownRef.current && !navDropdownRef.current.contains(e.target)) {
                setIsNavDropdownOpen(false);
            }
            if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
                setIsUserMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Supabase auth state
    useEffect(() => {
        let mounted = true;
        const init = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!mounted) return;
            setUser(session?.user || null);
            setAvatarUrl(session?.user?.user_metadata?.avatar_url || '');
        }
        init();
        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user || null);
            setAvatarUrl(session?.user?.user_metadata?.avatar_url || '');
        })
        return () => {
            mounted = false;
            listener.subscription.unsubscribe();
        }
    }, []);

  return (
    <div className={`w-full ${showNavBar ? (isSearchOpen ? 'min-h-[185px]' : 'h-[70px]') : 'h-[70px]'} bg-[#E2E8F0]`}>
        <div className='w-full h-[70px] fixed top-0 left-0 z-40 shadow-md flex justify-between items-center px-5 md:px-8 bg-gray-300'>
            {/* Navbar */}
            <div className="w-full flex justify-between items-center px-5 md:px-8 h-[70px]">
                
                {/* Logo + Tulisan */}
                
                <Link to="/" className="flex items-center gap-3">
                    <img src={Kambingg} className='w-[50px] h-[50px] text-gray-300' />
                    <h1 className="text-xl font-semibold text-gray-600">Master Kambing</h1>
                </Link>

                {/* Menu */}
                <div className={`hidden lg:flex flex-col items-center gap-2 flex-1 ${showNavBar ? 'pt-2' : 'pt-2'}`}>
                {showNavBar3 && (
                    <div className="flex flex-wrap justify-center items-center gap-3 w-full">
                        {Categories.map((item) => (
                            <Link 
                                to={item.path}
                                key={item.id}
                                className={`2xl:w-56 xl:w-45 lg:w-30 h-14 bg-white flex flex-col justify-center items-center cursor-pointer text-sm xl:text-[15px] 2xl:text-base hover:bg-gray-100 font-semibold text-slate-600 rounded-lg shadow-xl transition-all duration-300 ${location.pathname === item.path ? 'border-2 border-blue-500' : 'border-2 border-gray-500'}`}
                            >
                                {item.img}
                                <span>{item.name}</span>
                            </Link>
                        ))}
                    </div>
                )}

        {/* Floating search button for mobile on kambing & susu */}
        {showNavBar && (
          <button
            type="button"
            className="md:hidden fixed bottom-4 right-4 z-40 p-4 rounded-full shadow-xl bg-gray-800 text-white hover:bg-gray-700"
            onClick={() => setIsSearchOpen(prev => !prev)}
            aria-label="Toggle search"
          >
            <FiSearch className="w-6 h-6" />
          </button>
        )}
                    {/* Removed home anchor chips here; now provided in Menu dropdown near Login */}
                </div>

                {/* Tombol Aksi Kanan (Desktop) */}
                {showNavBar3 && (
                <div className="hidden md:flex items-center gap-3 relative">
                      <div 
                      className="relative"
                      ref={navDropdownRef}
                      >
                        {showNavBar2 && (
                          <button 
                            type="button"
                            onClick={() => setIsNavDropdownOpen(prev => !prev)}
                            className="px-4 py-2 bg-white text-slate-700 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2 shadow"
                          >
                            Menu
                            <svg className={`w-4 h-4 transition-transform ${isNavDropdownOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.084l3.71-3.853a.75.75 0 111.08 1.04l-4.24 4.4a.75.75 0 01-1.08 0l-4.24-4.4a.75.75 0 01.02-1.06z" clipRule="evenodd"/></svg>
                          </button>
                        )}
                          {isNavDropdownOpen && (
                            <div className="absolute right-0 top-full mt-1 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                              <a 
                                href="#home"
                                className="block px-4 py-2 text-sky-600 hover:bg-gray-50"
                                onClick={(e) => { e.preventDefault(); document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' }); setIsNavDropdownOpen(false); }}
                              >Home</a>
                              <div className="my-1 border-t"/>
                              <a 
                                href="#kambing"
                                className="block px-4 py-2 text-sky-600 hover:bg-gray-50"
                                onClick={(e) => { e.preventDefault(); document.getElementById('kambing')?.scrollIntoView({ behavior: 'smooth' }); setIsNavDropdownOpen(false); }}
                              >Kambing</a>
                              <div className="my-1 border-t"/>
                              <a 
                                href="#susu"
                                className="block px-4 py-2 text-sky-600 hover:bg-gray-50"
                                onClick={(e) => { e.preventDefault(); document.getElementById('susu')?.scrollIntoView({ behavior: 'smooth' }); setIsNavDropdownOpen(false); }}
                              >Susu</a>
                              <div className="my-1 border-t"/>
                              <a 
                                href="#ulasan"
                                className="block px-4 py-2 text-sky-600 hover:bg-gray-50"
                                onClick={(e) => { e.preventDefault(); document.getElementById('ulasan')?.scrollIntoView({ behavior: 'smooth' }); setIsNavDropdownOpen(false); }}
                              >Ulasan</a>
                            </div>
                          )}
                      </div>
                    {/* Tombol Pencarian khusus halaman Kambing & Susu */}
                    {showNavBar && (
                      <button
                        type="button"
                        onClick={() => setIsSearchOpen(prev => !prev)}
                        className="px-3 py-2 bg-white text-slate-700 rounded-lg hover:bg-gray-100 transition-colors shadow flex items-center gap-2"
                        aria-label="Toggle search"
                      >
                        <FiSearch className="w-5 h-5" />{isSearchOpen ? '' : ''}
                      </button>
                    )}
                    {/* Swap Login <-> Cart hanya di /kambing & /susu */}
                    {showNavBar ? (
                      <button
                        type="button"
                        onClick={() => setShowCart(true)}
                        className="relative px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
                        aria-label="Buka Keranjang"
                      >
                        <FaShoppingBasket className='w-5 h-5' />
                        {items.length > 0 && (
                          <span className='absolute -top-2 -right-2 bg-white text-gray-700 text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow'>
                            {items.length}
                          </span>
                        )}
                      </button>
                    ) : (
                      user ? (
                        <div className="relative" ref={userMenuRef}>
                          <button
                            type="button"
                            onClick={() => setIsUserMenuOpen(p => !p)}
                            className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden border border-gray-300 hover:shadow"
                            aria-label="User menu"
                          >
                            {avatarUrl ? (
                              <img src={avatarUrl} alt="User" className="w-full h-full object-cover" />
                            ) : (
                              <FiUser className="text-gray-700" size={20} />
                            )}
                          </button>
                          {isUserMenuOpen && (
                            <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50">
                              <Link to="/user" onClick={() => setIsUserMenuOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Profile</Link>
                              <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Logout</button>
                              <button onClick={handleDeleteAccount} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">Delete Account</button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <Link to="/login" className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                          Login
                        </Link>
                      )
                    )}
                </div>
                )}
                
                {/* Hamburger for mobile */}
                <button
                  type="button"
                  className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-200"
                  aria-label="Toggle navigation menu"
                  onClick={() => setIsMenuOpen(prev => !prev)}
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
            </div>
        </div>
        {showNavBar && (
            <div className={`w-full flex items-center justify-center gap-3 md:gap-6 px-5 md:px-8 fixed top-[70px] left-0 right-0 z-30 transition-all duration-300 shadow-md bg-[#E2E8F0] ${isSearchOpen ? 'translate-y-0 opacity-100 py-2' : '-translate-y-full opacity-0 pointer-events-none'}`}> 
                {/* Logo kiri - sembunyikan di mobile */}
                <Link to="/about" className='hidden md:flex w-[60px] h-[60px] justify-center items-center rounded-md bg-white shadow-xl border-3 border-transparent hover:border-gray-300'>
                    <img src={Goatt} className='w-[50px] h-[50px] text-gray-300' />
                </Link>

                {/* Search */}
                <form
                    className='w-full md:w-[70%] h-[54px] md:h-[60px] flex items-center rounded-md bg-white shadow-xl px-4 md:px-5 border-3 border-transparent hover:border-gray-300'
                    onSubmit={(e) => e.preventDefault()}
                >
                    <input
                    type="text"
                    placeholder='Cari item...'
                    className='w-full outline-none text-[16px] md:text-[20px]'
                    onChange={(e) => setInput(e.target.value)}
                    value={input}
                    />
                </form>

                {/* Logo kanan - sembunyikan di mobile */}
                <Link to="/about" className='hidden md:flex w-[60px] h-[60px] justify-center items-center rounded-md bg-white shadow-xl border-3 border-transparent hover:border-gray-300'>
                    <img src={Goatt} className='w-[50px] h-[50px] text-gray-300' />
                </Link>
            </div>
        )}

        {/* Mobile dropdown menu */}
        {isMenuOpen && (
          <div className="md:hidden fixed top-[70px] left-0 right-0 z-30 bg-gray-100 border-t border-gray-200 shadow-lg">
            <div className="p-4 flex flex-col gap-3">
              {showNavBar3 && (
                <div className="grid grid-cols-3 gap-1">
                  {Categories.map((item) => (
                    <Link 
                      to={item.path}
                      key={item.id}
                      onClick={() => setIsMenuOpen(false)}
                      className={`p-1 bg-white rounded-lg w-100% text-center text-sm font-semibold text-slate-600 shadow ${location.pathname === item.path ? 'border-2 border-blue-500' : 'border border-gray-300'}`}
                    >
                      <div className="flex flex-col items-center gap-1">
                        {item.img}
                        <span>{item.name}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
              
              {showNavBar2 && (
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <button 
                    type="button"
                    className="w-full flex items-center justify-between px-4 py-3 text-slate-700 font-semibold border-b"
                    onClick={() => setIsMobileNavOpen(prev => !prev)}
                  >
                    Navigasi
                    <span className="text-xl">{isMobileNavOpen ? '−' : '+'}</span>
                  </button>
                  {isMobileNavOpen && (
                    <div className="flex flex-col">
                      <a href="#home" className="px-6 py-3 hover:bg-gray-50 border-b text-sky-600" onClick={() => { document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' }); setIsMenuOpen(false); }}>Home</a>
                      <a href="#kambing" className="px-6 py-3 hover:bg-gray-50 border-b text-sky-600" onClick={() => { document.getElementById('kambing')?.scrollIntoView({ behavior: 'smooth' }); setIsMenuOpen(false); }}>Kambing</a>
                      <a href="#susu" className="px-6 py-3 hover:bg-gray-50 border-b text-sky-600" onClick={() => { document.getElementById('susu')?.scrollIntoView({ behavior: 'smooth' }); setIsMenuOpen(false); }}>Susu</a>
                      <a href="#ulasan" className="px-6 py-3 hover:bg-gray-50 text-sky-600" onClick={() => { document.getElementById('ulasan')?.scrollIntoView({ behavior: 'smooth' }); setIsMenuOpen(false); }}>Ulasan</a>
                    </div>
                  )}
                </div>
              )}
              
              {/* Pencarian trigger di mobile, hanya di Kambing & Susu */}
              {showNavBar && (
                <button
                  type="button"
                  onClick={() => { setIsSearchOpen(prev => !prev); setIsMenuOpen(false); }}
                  className="mt-2 px-4 py-3 bg-white text-slate-700 rounded-lg text-center border border-gray-300 flex items-center"
                >
                  <FiSearch className="w-5 h-5" />
                  <span className="hidden sm:inline">{isSearchOpen ? '' : ''}</span>
                </button>
              )}
              
              {showNavBar3 && (
                showNavBar ? (
                  <button onClick={() => { setShowCart(true); setIsMenuOpen(false); }} className="mt-2 px-4 py-3 bg-gray-700 text-white rounded-lg text-center flex items-center justify-center gap-2">
                    <FaShoppingBasket className='w-5 h-5' />
                    {items.length > 0 && (
                      <span className='ml-2 bg-white text-gray-700 text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center'>
                        {items.length}
                      </span>
                    )}
                  </button>
                ) : (
                  user ? (
                    <div className="relative" ref={userMenuRef}>
                      <button
                        type="button"
                        onClick={() => setIsUserMenuOpen(p => !p)}
                        className="mt-2 px-3 py-2 bg-white rounded-full inline-flex items-center justify-center border border-gray-300 self-start"
                      >
                        {avatarUrl ? (
                          <img src={avatarUrl} alt="User" className="w-8 h-8 rounded-full object-cover" />
                        ) : (
                          <FiUser className='w-6 h-6 text-gray-700' />
                        )}
                      </button>
                      {isUserMenuOpen && (
                        <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50">
                          <Link to="/user" onClick={() => { setIsUserMenuOpen(false); setIsMenuOpen(false); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Profile</Link>
                          <button onClick={() => { setIsMenuOpen(false); handleLogout(); }} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Logout</button>
                          <button onClick={() => { setIsMenuOpen(false); handleDeleteAccount(); }} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">Delete Account</button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link to="/login" onClick={() => setIsMenuOpen(false)} className="mt-2 px-4 py-3 bg-gray-700 text-white rounded-lg text-center">Login</Link>
                  )
                )
              )}
            </div>
          </div>
        )}
    </div>
      )
}

export default Nav;