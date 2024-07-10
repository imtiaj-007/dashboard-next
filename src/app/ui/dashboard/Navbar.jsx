'use client'
import mongoose from "mongoose";
import { usePathname } from "next/navigation";
import { FaRegQuestionCircle } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { AiFillNotification } from "react-icons/ai";
import { IoMdArrowDropdown } from "react-icons/io";
import { RiMenu2Line } from "react-icons/ri";

const Navbar = ({ showSideBar }) => {
    let path = usePathname();
    let pagePath = path.split('/').pop();
    if(mongoose.Types.ObjectId.isValid(pagePath)) {
        let pathArr = path.split('/');
        pagePath = pathArr[pathArr.length - 2]
    }

    return (
        <nav id="navbar" className="flex justify-between items-center lg:grid grid-cols-3 h-14 mt-3 mx-3 px-6 py-2 bg-white rounded-lg">
            <RiMenu2Line size={24} className="float-left lg:hidden" onClick={showSideBar} />
            <div className="flex justify-start gap-2 items-center">
                <h4 className="font-bold text-center text-gray-600 capitalize text-lg">{pagePath}</h4>
                <FaRegQuestionCircle size={15} />
                <p className="text-sm">How it works</p>
            </div>

            <div className="hidden lg:flex w-96 justify-center items-center gap-3 bg-stone-100 px-6 py-2 rounded-lg hover:opacity-80 hover:cursor-pointer hover:border border-gray-400">
                <FiSearch size={20} />
                <input type="text" name="global-search" id="globalSearch" className=" w-full outline-none font-medium text-sm bg-stone-100 text-stone-700" placeholder="search features, tutorials etc."/>
            </div>

            <div className="hidden sm:flex gap-2 justify-end items-center ">
                <button type="button" className="w-10 h-10 rounded-full bg-stone-100 flex justify-center items-center" ><AiFillNotification size={22} /></button>
                <button type="button" className="w-10 h-10 rounded-full bg-stone-100 flex justify-center items-center" ><IoMdArrowDropdown size={28} /></button>
            </div>

        </nav>
    )
}

export default Navbar
