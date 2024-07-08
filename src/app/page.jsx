import Link from "next/link"

const HomePage = () => {
    return (
        <section className="flex h-screen">
            <div className="m-auto text-center items-center ">
                <h1 className="font-medium text-5xl mb-6">Welcome to Frontend Assignment Task</h1>
                <p className="font-normal text-2xl mb-8">This Project is made using Next.js. To checkout our dashboard click the button below.</p>
                <Link href={'./dashboard'}><button className="btn">Click Here</button></Link>
            </div>
        </section>
    )
}

export default HomePage
