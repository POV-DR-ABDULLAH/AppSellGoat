import React, { useState, useEffect, useRef } from 'react';
import { FaChevronDown, FaTimes, FaHorseHead, FaUtensils, FaList } from 'react-icons/fa';

const CategoryTabs = ({ activeTab, onTabChange, isSearchOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Tutup dropdown saat klik di luar
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Sembunyikan dropdown saat search dibuka
  useEffect(() => {
    if (isSearchOpen) {
      setIsOpen(false);
    }
  }, [isSearchOpen]);

  // Close dropdown when search is opened
  useEffect(() => {
    if (isSearchOpen) {
      setIsOpen(false);
    }
  }, [isSearchOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors focus:outline-none"
        aria-label="Pilih Kategori"
      >
        {isOpen ? (
          <FaTimes className="w-5 h-5 text-gray-700" />
        ) : (
          <FaChevronDown className="w-5 h-5 text-gray-700" />
        )}
      </button>

      <div 
        className={`absolute left-1/2 transform -translate-x-1/2 mt-2 bg-white rounded-lg shadow-xl z-40 overflow-hidden transition-all duration-200 ${
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}
        style={{ minWidth: '200px' }}
      >
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => {
              onTabChange(category.id);
              setIsOpen(false);
            }}
            className={`w-full px-6 py-3 text-left hover:bg-gray-50 flex items-center gap-3 transition-colors ${
              activeTab === category.id ? 'text-blue-600' : 'text-gray-700'
            }`}
          >
            <span className={`${activeTab === category.id ? 'text-blue-500' : 'text-gray-400'}`}>
              {category.icon}
            </span>
            <span className="text-sm font-medium">
              {tab.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryTabs;
