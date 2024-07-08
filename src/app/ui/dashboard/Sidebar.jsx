import Image from "next/image"
import Link from "next/link"
import MenuItem from "./Menu";

import { 
    IoIosArrowDropdown,
    IoMdListBox,
} from "react-icons/io";

import { 
    AiFillProduct,
    AiFillNotification,
    AiFillTool
} from "react-icons/ai";

import { 
    MdHomeFilled ,
    MdBarChart,
    MdPayments,
    MdDiscount,
    MdGroup,
    MdColorLens
} from "react-icons/md";

import { TbTruckDelivery } from "react-icons/tb";
import { BsPlugin } from "react-icons/bs";
import { FaWallet } from "react-icons/fa6";


const menuItems = [
    {
        name: 'home',
        path: '/dashboard',
        icon: <MdHomeFilled size={24} color="white" />
    },
    {
        name: 'orders',
        path: '/dashboard/orders',
        icon: <IoMdListBox size={24} color="white" />
    },
    {
        name: 'products',
        path: '/dashboard/products',
        icon: <AiFillProduct size={24} color="white" />
    },
    {
        name: 'delivery',
        path: '/dashboard/delivery',
        icon: <TbTruckDelivery size={24} color="white" />
    },
    {
        name: 'marketing',
        path: '/dashboard/marketing',
        icon: <AiFillNotification size={24} color="white" />
    },
    {
        name: 'analytics',
        path: '/dashboard/analytics',
        icon: <MdBarChart size={24} color="white" />
    },
    {
        name: 'payments',
        path: '/dashboard/payments',
        icon: <MdPayments size={24} color="white" />
    },
    {
        name: 'tools',
        path: '/dashboard/tools',
        icon: <AiFillTool size={24} color="white" />
    },
    {
        name: 'discounts',
        path: '/dashboard/discounts',
        icon: <MdDiscount size={24} color="white" />
    },
    {
        name: 'audience',
        path: '/dashboard/audience',
        icon: <MdGroup size={24} color="white" />
    },
    {
        name: 'appearance',
        path: '/dashboard/appearance',
        icon: <MdColorLens size={24} color="white" />
    },
    {
        name: 'plugins',
        path: '/dashboard/plugins',
        icon: <BsPlugin size={24} color="white" />
    },
]


const Sidebar = () => {

    return (
        <section id="sidebar" className="w-full h-full">
            <div id="head-section" className="w-full flex gap-3 justify-between items-center px-5 pt-5 pb-4 bg-gray-900 ">
                <div className="flex gap-3 items-center ">
                    <Image src={'/user.png'} width={44} height={40} className="bg-white p-1 rounded-md" alt="icons" />
                    <div className="text-white">
                        <p className="font-medium ">Nishyan</p>
                        <Link href={'/dashboard'} ><p className="font-light text-sm underline underline-offset-1">Visit Store</p></Link>
                    </div>
                </div>                
                <IoIosArrowDropdown size={20} color="white" />        
            </div>

            <div id="menus" className="flex flex-col mt-3 px-2">
                {
                    menuItems.map((item)=> {
                        return (
                            <MenuItem key={item.name} menu={item} />
                        )
                    })
                }
            </div>

            <div id="wallet" className="fixed bottom-0 w-1/6 p-2  ">
                <div className="flex gap-3 items-center rounded-md px-4 py-2 bg-gray-700">
                    <FaWallet size={24} color="white"/>
                    <div className="font-medium text-sm text-white">
                        <p>Available Credits</p>
                        <p className="font-semibold ">222.10</p>
                    </div>   
                </div>                             
            </div>

        </section>
    )
}

export default Sidebar
