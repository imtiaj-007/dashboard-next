'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"

const CommonSection = () => {
    const pathName = usePathname();
    const pageName = pathName.split('/').pop();

    return (
        <div className="flex flex-col gap-5 justify-center items-center text-center p-5">
            <h1 className="font-medium text-4xl text-gray-700 capitalize ">{pageName === "dashboard" ? 'home' : pageName} Page</h1>
            <p className="font-normal text-lg ">
                In This project Order's page and Transaction's page are fully functional. Please visit any of these two pages by navigating through the sidebar or by clicking the buttons given below.
            </p>

            <div className="flex gap-5">
                <Link href={'/dashboard/payments'} ><button className="btn">Order's Page</button></Link>
                <Link href={'/dashboard/payments'} ><button className="btn">Payment's Page</button></Link>
            </div>
        </div>
    )
}

export default CommonSection
