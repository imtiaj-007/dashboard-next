import Link from "next/link"

const AppearancePage = () => {
    return (
        <section id="orders" className="flex flex-col gap-5 justify-center items-center p-5">
            <h1 className="font-medium text-3xl text-gray-700 ">This is Appearance Page</h1>
            <p className="font-normal text-lg ">To view transactions, please visit Payments Page by clicking the payments menu from the sidebar or by clicking the below button</p>
            <Link href={'/dashboard/payments'} ><button className="btn">Click Here</button></Link>
        </section>
    )
}

export default AppearancePage
