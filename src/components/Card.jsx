import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { AddItem } from "../redux/cartSlice";
import { toast } from 'react-toastify';
import { formatCurrencyIDR } from "../utils/format";
import { FaRegCommentDots, FaTimes } from "react-icons/fa";

function Card({ name, img, id, price }) {
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();

    const handleWhatsAppClick = (e) => {
        e.preventDefault();
        const message = `Halo, saya ingin menawar harga untuk produk ${name} dengan harga ${formatCurrencyIDR(price)}, apakah bisa ditawar?`;
        const encodedMessage = encodeURIComponent(message);
        
        // Check if it's a mobile device
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        if (isMobile) {
            // For mobile devices
            window.location.href = `whatsapp://send?phone=6285241180699&text=${encodedMessage}`;
        } else {
            // For desktop
            window.open(`https://web.whatsapp.com/send?phone=6285241180699&text=${encodedMessage}`, '_blank');
        }
    };

    return (
        <div className="w-full bg-white p-3 rounded-lg flex flex-col gap-3 shadow-lg hover:border-2 border-blue-300">
            <div className="w-full overflow-hidden rounded-lg aspect-[4/3] cursor-pointer" onClick={() => setShowModal(true)}>
                <img src={img} alt={name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
            </div>
            
            {/* Image Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
                    <div className="relative max-w-4xl w-full max-h-[90vh]" onClick={e => e.stopPropagation()}>
                        <button 
                            className="absolute -top-10 right-0 text-white text-2xl hover:text-gray-300"
                            onClick={() => setShowModal(false)}
                        >
                            <FaTimes />
                        </button>
                        <div className="bg-white rounded-lg overflow-hidden">
                            <img 
                                src={img} 
                                alt={name} 
                                className="w-full h-full max-h-[80vh] object-contain"
                            />
                        </div>
                    </div>
                </div>
            )}

            <div className="text-xl font-semibold">
                {name}
            </div>
            
            <div className="w-full flex justify-between items-center">
                <div className="text-lg font-bold text-blue-300">{formatCurrencyIDR(price)}</div>
                <button 
                    onClick={handleWhatsAppClick}
                    className="flex justify-center items-center gap-2 text-lg hover:text-blue-500 transition-colors"
                >
                    Nego
                    <FaRegCommentDots className="w-[20px] h-[20px]" />
                </button>
            </div>

            <button 
                className="w-full p-3 rounded-lg bg-blue-300 text-gray-700 hover:bg-blue-100 transition-all cursor-pointer" 
                onClick={() => {
                    dispatch(AddItem({ id, name, price, img, qty: 1 }));
                    toast.success("Barang telah ditambahkan ke keranjang!");
                }}
            >
                Tambah
            </button>
        </div>
    );
}

export default Card;