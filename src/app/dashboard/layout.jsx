'use client'
import { useState } from "react"
import Navbar from "../ui/dashboard/Navbar"
import Sidebar from "../ui/dashboard/Sidebar"

const DashboardLayout = ({ children }) => {
    const [isSidebarVisible, setSidebarVisible] = useState(false);

    const toggleSideBar = () => {
        setSidebarVisible(!isSidebarVisible);
    };

    return (
        <div className="flex">
            <div className={`fixed top-0 left-0 w-4/5 md:w-1/2 lg:static lg:w-1/6 h-screen bg-gray-800 z-50 transition-transform transform ${
                isSidebarVisible ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
            }`}>
                <Sidebar hideSideBar={toggleSideBar} />
            </div>
            <div className="w-full lg:w-5/6 h-screen overflow-y-auto bg-gray-200 ">
                <Navbar showSideBar={toggleSideBar} />
                {children}
            </div>                    
        </div>
    )
}

export default DashboardLayout
