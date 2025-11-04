// import logo from '../../assets/logo.png'; // adjust path

import { Heart, MenuIcon, Phone, Search, ShoppingCart, User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const MiddleBar = ({toogleshow}) => {
    const [show,setshow]=useState(false)
  return (
    <div className="py-4 bg-white shadow-sm px-2 ">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button onClick={toogleshow} className="text-lg block lg:hidden">
                   <MenuIcon/>

          </button>
          <Link to="/">
            <img  width={120} src={'/QuickCart/logopng.png'} alt="Logo" className=" w-[90px] lg:w-[120px]" />
          </Link>
        </div>
        <div className="shadow-sm w-1/2 text-gray-600 lg:flex items-center hidden font-light text-sm  pl-4 bg-gray-100 rounded-2xl ">
          <input type="text" placeholder="Search..." className="w-full bg-transparent   border border-none   py-3 px-2 focus:outline-none" />
          <div className="  top-0 gap-2 right-0 flex border-l-2 border-white  items-center ">
            <div className="">

            <select className="focus:outline-none  px-2 bg-transparent "  name="" id="">
                <option value="">All Categories</option>
            </select>
            </div>
            <div className="py-2 px-4 border-l-2 border-white bg-[#0371a8] rounded-r-2xl text-white">
                <Search/>
            </div>
          </div>

        </div>
        <div className="flex items-center space-x-6">
            <div className="lg:flex items-center gap-2 hidden">
                <Phone/>
          <div className="text-right">
            <div className="text-xs text-gray-500">CALL US NOW</div>
            <div className="font-semibold text-lg  text-gray-800">+123 5678 890</div>
          </div>
          </div>
          <div className="flex gap-2 text-gray-500 font-light">
            <div className="relative hidden  md:block lg:hidden">

                <Search className={`${show?'text-[#0371a8]':''} `} onClick={()=>setshow((prev)=>prev==true?false:true)}/>

                    {show&&<div className="absolute shadow-sm  -right-10 mt-2 text-gray-600 flex items-center  font-light text-sm  pl-4 bg-gray-100 rounded-2xl ">
          <input type="text" placeholder="Search..." className="   border border-none   py-2 focus:outline-none" />
          <div className="  gap-2 flex border-l-2 border-white  items-center ">
            <div className="">

            <select className="focus:outline-none  px-2 "  name="" id="">
                <option value="">All Categories</option>
            </select>
            </div>
            <div className="py-2 px-4 border-l-2 border-white bg-[#0371a8] rounded-r-2xl text-white">
                <Search/>
            </div>
          </div>

        </div>}

                    
                    

            </div>
          <Link to={'/profile'}><User /></Link>
          <Link><Heart/></Link>
          <Link to="/mycart" className="relative">
            <ShoppingCart />
            <span className="absolute -top-1 -right-2 text-xs bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center">0</span>
          </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiddleBar;
