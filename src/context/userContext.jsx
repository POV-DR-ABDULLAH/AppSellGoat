import React, { createContext, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Goat, Milk } from '../Data'

export const dataContext = createContext()

function UserContext({children}) {
    const location = useLocation()
    const [cate, setCate] = useState([])
    const [input, setInput] = useState("")
    const [showCart, setShowCart] = useState(false)

    // Set data awal berdasarkan halaman aktif
    useEffect(() => {
        if (location.pathname === '/susu') {
            setCate(Milk)
        } else {
            setCate(Goat)
        }
    }, [location.pathname])

    const data = {
        input,
        setInput,
        cate,
        setCate,
        showCart,
        setShowCart
    }

    return (
        <dataContext.Provider value={data}>
            {children}
        </dataContext.Provider>
    )
}

export default UserContext