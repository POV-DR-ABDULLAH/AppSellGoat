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
import CategoryTabs from './CategoryTabs';

function Nav() {
    let { input, setInput, cate, setCate, showCart, setShowCart} = useContext(dataContext)

    let items = useSelector(state => state.cart)

    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false); // mobile menu toggle
    const [isNavDropdownOpen, setIsNavDropdownOpen] = useState(false); // desktop dropdown near Login
    const navDropdownRef = useRef(null);
    const userMenuRef = useRef(null);
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false); // accordion inside mobile menu
    const [isSearchOpen, setIsSearchOpen] = useState(false); // toggle for slide-down search on kambing & susu
    const [activeTab, setActiveTab] = useState('all'); // 'all', 'live', 'cooked'
    const [isCategoryOpen, setIsCategoryOpen] = useState(false); // toggle kategori di mobile
    const searchRef = useRef(null); // ref untuk menangani klik di luar
    const [user, setUser] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState('');
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const navigate = useNavigate();

    // Cek halaman aktif
    const isKambingPage = location.pathname === '/kambing';
    const isSusuPage = location.pathname === '/susu';
    const showNavBar = isKambingPage || isSusuPage;
    const showNavBar3 = isKambingPage || isSusuPage || location.pathname === '/';
    const showNavBar2 = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
          setIsScrolled(window.scrollY > 0); // kalau scrollY > 0 artinya sudah discroll
        };
    
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
      }, []);

    // Lock scroll and close on Escape when mobile menu open
    useEffect(() => {
        const onKeyDown = (e) => {
            if (e.key === 'Escape') setIsMenuOpen(false);
        };
        if (isMenuOpen) {
            document.addEventListener('keydown', onKeyDown);
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
        return () => {
            document.removeEventListener('keydown', onKeyDown);
            document.body.classList.remove('overflow-hidden');
        };
    }, [isMenuOpen]);

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

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (navDropdownRef.current && !navDropdownRef.current.contains(e.target)) {
                setIsNavDropdownOpen(false);
            }
            if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
                setIsUserMenuOpen(false);
            }
            // Untuk desktop (lebar layar >= 768px), tutup search saat klik di luar
            if (isSearchOpen && searchRef.current && !searchRef.current.contains(e.target)) {
                // Tambahkan kelas animasi sebelum menutup
                const searchBar = searchRef.current;
                searchBar.classList.add('search-bar-hide');
                
                // Tunggu animasi selesai sebelum menyembunyikan elemen
                setTimeout(() => {
                    setIsSearchOpen(false);
                    // Hapus kelas animasi setelah selesai
                    searchBar.classList.remove('search-bar-hide');
                }, 300); // Sesuaikan dengan durasi animasi CSS
            }
        };
        
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isSearchOpen]);

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
    <div className="w-full h-[70px] bg-[#E2E8F0]">
        <div className='w-full h-[70px] fixed top-0 left-0 z-40 shadow-md flex justify-between items-center px-5 md:px-8 bg-gray-300'>
            {/* Navbar */}
            <div className="w-full flex justify-between items-center px-1 md:px-8 h-[70px]">
                
                {/* Logo + Tulisan */}
                
                <Link to="/" className="flex items-center">
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
            onClick={() => {
              // Hanya toggle untuk mobile
              if (window.innerWidth < 768) {
                setIsSearchOpen(prev => !prev);
              }
            }}
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
                        onClick={(e) => {
                            e.stopPropagation();
                            // Di desktop, toggle search
                            if (window.innerWidth >= 768) {
                                setIsSearchOpen(prev => !prev);
                                // Fokus ke input search saat dibuka
                                if (!isSearchOpen) {
                                    setTimeout(() => {
                                        const searchInput = document.querySelector('.search-input');
                                        if (searchInput) searchInput.focus();
                                    }, 100);
                                }
                            } else {
                                // Di mobile, selalu buka search
                                setIsSearchOpen(true);
                            }
                        }}
                        className="px-3 py-2 bg-white text-slate-700 rounded-lg hover:bg-gray-100 transition-colors shadow flex items-center gap-2"
                        aria-label={isSearchOpen ? 'Tutup pencarian' : 'Buka pencarian'}
                      >
                        <FiSearch className="w-5 h-5" />
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
                
                {/* Mobile actions: hamburger dulu, baru user/keranjang */}
                <div className="md:hidden flex items-center gap-3">
                  {/* Hamburger menu - selalu di kiri */}
                  <button
                    type="button"
                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-200 transition-colors"
                    aria-label="Toggle navigation menu"
                    aria-expanded={isMenuOpen}
                    onClick={() => setIsMenuOpen(prev => !prev)}
                  >
                    <svg className={`h-6 w-6 transition-transform duration-300 ${isMenuOpen ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      {isMenuOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                      )}
                    </svg>
                  </button>
                  
                  {/* User/Keranjang - selalu di kanan */}
                  {(location.pathname === '/kambing' || location.pathname === '/susu') ? (
                    // Keranjang untuk halaman kambing/susu
                    <button
                      type="button"
                      onClick={() => setShowCart(true)}
                      className="relative p-2 text-gray-700 hover:bg-gray-200 rounded-full transition-colors"
                      aria-label="Keranjang belanja"
                    >
                      <FaShoppingBasket className="w-5 h-5" />
                      {items.length > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                          {items.length}
                        </span>
                      )}
                    </button>
                  ) : location.pathname === '/' ? (
                    // User untuk halaman home
                    <div className="relative" ref={userMenuRef}>
                      {user ? (
                        <>
                          <button
                            type="button"
                            onClick={() => setIsUserMenuOpen(p => !p)}
                            className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden border-2 border-gray-300 hover:border-blue-500 transition-colors"
                            aria-label="User menu"
                          >
                            {avatarUrl ? (
                              <img src={avatarUrl} alt="User" className="w-full h-full object-cover" />
                            ) : (
                              <FiUser className="text-gray-700" size={20} />
                            )}
                          </button>
                          {isUserMenuOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50">
                              <Link to="/user" onClick={() => setIsUserMenuOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Profile</Link>
                              <button onClick={() => { handleLogout(); setIsUserMenuOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Logout</button>
                              <button onClick={() => { if(window.confirm('Yakin ingin menghapus akun?')) { handleDeleteAccount(); } }} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">Delete Account</button>
                            </div>
                          )}
                        </>
                      ) : (
                        <Link to="/login" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors">
                          Login
                        </Link>
                      )}
                    </div>
                  ) : null}

                </div>
            </div>
        </div>
        {/* Category Tabs - Hanya muncul di halaman kambing */}
        {isKambingPage && !isSearchOpen && (
            <div className="hidden md:flex w-full py-2 justify-center fixed top-[70px] left-0 right-0 z-30 bg-white shadow-sm">
                <div className="w-full max-w-7xl flex justify-center">
                    <CategoryTabs 
                        activeTab={activeTab} 
                        onTabChange={setActiveTab}
                        isSearchOpen={isSearchOpen}
                    />
                </div>
            </div>
        )}

        {/* Desktop Search Bar - Muncul saat tombol search ditekan */}
        {isSearchOpen && (
            <div 
                ref={searchRef}
                className="hidden md:flex w-full items-center justify-center gap-6 px-8 fixed top-[70px] left-0 right-0 z-30 shadow-md bg-[#E2E8F0] py-2 transition-all duration-300 transform translate-y-0 search-bar-animate"
                style={{
                    animation: 'slideDown 0.3s ease-out forwards'
                }}
            >
                <Link to="/about" className='w-[60px] h-[60px] justify-center items-center rounded-md bg-white shadow-xl border-3 border-transparent hover:border-gray-300 hidden md:flex'>
                    <img src={Goatt} className='w-[50px] h-[50px] text-gray-300' alt="Logo" />
                </Link>

                <form
                    className='w-[70%] h-[60px] flex items-center rounded-md bg-white shadow-xl px-5 border-3 border-transparent hover:border-gray-300 transition-all duration-300'
                    onSubmit={(e) => {
                        e.preventDefault();
                        setIsSearchOpen(false);
                    }}
                >
                    <input
                        type="text"
                        placeholder='Cari item...'
                        className='w-full outline-none text-[20px]'
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                setIsSearchOpen(false);
                            }
                        }}
                        value={input}
                        autoFocus
                    />
                </form>

                <Link to="/about" className='w-[60px] h-[60px] justify-center items-center rounded-md bg-white shadow-xl border-3 border-transparent hover:border-gray-300 hidden md:flex'>
                    <img src={Goatt} className='w-[50px] h-[50px] text-gray-300' alt="Logo" />
                </Link>
            </div>
        )}

        {/* Backdrop + Mobile dropdown menu with animations */}
        {/* Backdrop closes the menu when clicking outside */}
        <div
          className={`md:hidden fixed top-[70px] left-0 right-0 bottom-0 z-20 bg-black/30 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Sliding panel */}
        <div className={`md:hidden fixed top-[70px] left-0 right-0 max-h-[80vh] z-30 bg-white border-t border-gray-200 shadow-lg transform transition-transform duration-300 overflow-y-auto ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
            <div className="p-3 flex flex-col gap-2">
              {/* Kategori Dropdown untuk Mobile - Hanya di halaman kambing */}
              {isKambingPage && (
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <button 
                    type="button"
                    className="w-full flex items-center justify-between px-3 py-2.5 text-slate-700 font-medium text-sm"
                    onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  >
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                      <span>Kategori Produk</span>
                    </div>
                    <svg 
                      className={`w-4 h-4 text-gray-500 transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`}
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isCategoryOpen && (
                    <div className="border-t border-gray-100">
                      {[
                        { id: 'all', label: 'Semua' },
                        { id: 'live', label: 'Kambing Hidup' },
                        { id: 'cooked', label: 'Kambing Masak' },
                        { id: 'cut', label: 'Potongan' }
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => {
                            setActiveTab(tab.id);
                            setIsMenuOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-2 ${
                            activeTab === tab.id 
                              ? 'bg-blue-50 text-blue-600 font-medium' 
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <span className="w-4 flex-shrink-0">
                            {activeTab === tab.id && (
                              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </span>
                          <span className="truncate">{tab.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

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
            </div>
        </div>

        {/* Sticky Search Button - Hanya untuk mobile di halaman kambing/susu */}
        {showNavBar && (
          <div className="md:hidden fixed bottom-4 left-4 z-40 flex flex-col items-start gap-2">
            {/* Tombol toggle search */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                // Toggle search bar
                if (window.innerWidth >= 768) {
                  // Di desktop, langsung toggle
                  setIsSearchOpen(prev => !prev);
                } else {
                  // Di mobile, biarkan tombol floating yang menangani
                  if (!isSearchOpen) {
                    setIsSearchOpen(true);
                  }
                }
              }}
              className="p-3 rounded-full shadow-xl bg-gray-800 text-white hover:bg-gray-700 transition-colors"
              aria-label={isSearchOpen ? 'Tutup pencarian' : 'Buka pencarian'}
            >
              <FiSearch className="w-5 h-5" />
            </button>
            
            {/* Search Box */}
            {isSearchOpen && (
              <div 
                ref={searchRef} 
                className="w-[calc(100vw-2rem)] bg-white p-3 rounded-lg shadow-lg"
                onClick={(e) => e.stopPropagation()}
              >
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsSearchOpen(false);
                  }} 
                  className="w-full"
                >
                  <input
                    type="text"
                    placeholder='Cari item...'
                    className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        e.stopPropagation();
                        setIsSearchOpen(false);
                      }
                    }}
                    onClick={(e) => e.stopPropagation()}
                    value={input}
                    autoFocus
                  />
                </form>
              </div>
            )}
          </div>
        )}

  </div>
);
}

// Tambahkan style untuk animasi
const style = document.createElement('style');
style.textContent = `
  @keyframes slideDown {
    from {
      transform: translateY(-100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  .search-bar-hide {
    animation: slideUp 0.3s ease-out forwards !important;
  }
  
  @keyframes slideUp {
    from {
      transform: translateY(0);
      opacity: 1;
    }
    to {
      transform: translateY(-100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

export default Nav;