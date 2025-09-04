import { LuLeafyGreen } from "react-icons/lu";
import { GiChickenOven } from "react-icons/gi";
import React from 'react'
import { useDispatch } from "react-redux";
import { AddItem } from "../redux/cartSlice";
import { toast } from 'react-toastify';

function Card({name, img, id, price, type}) {
    let dispatch = useDispatch()

  return (
    <div className="w-[250px] h-[400] bg-white p-3 rouned-lg flex flex-col gap-3 shadow-lg hover:border-2 border-blue-300">
        <div className="w-[100%] h-[60%] overflow-hidden rounded-lg">
            <img src={img} alt="" className="object-cover" />
        </div>

        <div className="text-2xl font-semibold">
            {name}
        </div>
        
        <div className="w-full flex justify-between items-center">
            <div className="text-lg font-bold text-blue-300">Rp {price}</div>
            <div className="flex justify-center items-center gap-2 text-blue-300 text-lg font-semibold">{type === "non_veg"?<GiChickenOven />:<LuLeafyGreen />}<span>{type}</span></div>
        </div>
            <button className="w-full p-3 rounded-lg bg-blue-300 text-gray-700 hover:bg-blue-100 transition-all cursor-pointer" onClick={() => {dispatch(AddItem({id:id, name:name, price:price, img:img, qty:1})); 
        toast("Barang Telah Di Tambahkan") }}>tambahkan ke keranjang</button>
    </div>
  )
}

export default Card