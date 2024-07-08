import Navbar from "../ui/dashboard/Navbar"
import Sidebar from "../ui/dashboard/Sidebar"

const DashboardLayout = ({ children }) => {
    return (
        <div className="flex">
            <div className="w-1/6 h-screen bg-gray-800 ">
                <Sidebar />
            </div>
            <div className="w-5/6 h-screen overflow-y-auto bg-gray-200 ">
                <Navbar />
                {children}
            </div>                    
        </div>
    )
}

export default DashboardLayout
