import React from 'react';
import { useDispatch } from "react-redux";
import { AddItem } from "../redux/cartSlice";
import { toast } from 'react-toastify';
import { formatCurrencyIDR } from "../utils/format";
import { FaRegCommentDots } from "react-icons/fa";

function Card({ name, img, id, price }) {
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
            <div className="w-full overflow-hidden rounded-lg aspect-[4/3]">
                <img src={img} alt={name} className="w-full h-full object-cover" />
            </div>

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