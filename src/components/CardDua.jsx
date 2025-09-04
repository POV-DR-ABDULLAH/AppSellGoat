import React from 'react'
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from 'react-redux';
import { DecrementQty, RemoveItem, IcrementQty} from '../redux/cartSlice';

function Card2({name, id, price, img, qty}) {
    let dispatch = useDispatch()

  return (
    <div className='w-full h-[120px] p-2 shadow-lg flex justify-between'>
        <div className="w-[60%] h-full flex gap-5">
            <div className="w-[60%] h-full overflow-hidden rounded-lg ">
                <img src={img} alt="" className='object-cover' />
            </div>

            <div className="w-[40%] h-full flex flex-col gap-3">
                <div className="text-lg text-gray-600 font-semibold">{name}</div>
                <div className="w-[110px] h-[50px] bg-slate-300 flex rounded-lg overflow-hidden shadow-lg font-semibold border-2 border-blue-300">
                    <button className='w-[30%] h-full bg-white flex justify-center items-center text-blue-300 hover:bg-gray-100 cursor-pointer' onClick={() => { qty>1?dispatch(DecrementQty(id)) : 1}}>-</button>
                    <span className='w-[40%] h-full bg-white-300 flex justify-center items-center text-blue-500'>{qty}</span>
                    <button className='w-[30%] h-full bg-white flex justify-center items-center text-blue-300 hover:bg-gray-100 cursor-pointer' onClick={() => {dispatch(IcrementQty(id))}}>+</button>
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-start items-end gap-6">
            <span className="text-blue-300 text-xl font-semibold">Rp {price}</span>
            <RiDeleteBin6Line className='w-[30px] h-[30px] text-red-300 cursor-pointer' onClick={() => dispatch(RemoveItem(id))} />
        </div>
    </div>
  )
}

export default Card2