'use client'
import { usePathname } from "next/navigation"
import Link from "next/link"
import mongoose from "mongoose";

const MenuItem = ({ menu }) => {
    let pathName = usePathname();
    let pathArr = pathName.split('/');
    if(mongoose.Types.ObjectId.isValid(pathArr.pop()))
        pathName = pathArr.join('/')

    return (
        <Link href={menu.path}>
            <button id={menu.name} className={`w-full flex gap-3 items-center px-4 py-2 mb-1 rounded-md ${pathName === menu.path ? "bg-gray-700" : ""} hover:bg-gray-600`} >
                {menu.icon}
                <p className="text-white capitalize" >{menu.name}</p>
            </button>
        </Link>
    )
}

export default MenuItem
