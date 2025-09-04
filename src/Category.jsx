import Goat from "./assets/Goat.png"
import { IoMdHome } from "react-icons/io";
import Susu from "./assets/Milk.png"

export const Categories = [
  {
    id: 1,
    name: "Dashboard",
    path: "/",
    img: <IoMdHome className="w-[30px] h-[30px] text-black-700"/>
  },
  {
    id: 2,
    name: "Show Kambing",
    path: "/kambing",
    img: <img src={Goat} alt="Kambing" className="w-[30px] h-[30px] text-black-900" />
  },
  {
    id: 3,
    name: "Show Susu",
    path: "/susu",
    img: <img src={Susu} alt="Susu" className="w-[30px] h-[30px] text-black-900" />
  },
]

export default Categories;
