import Link from "next/link"

const HomePage = () => {
    return (
        <section className="flex h-screen bg-gradient">
            <div className="m-auto text-center items-center p-3 ">
                <h1 className="font-medium mb-6 text-neutral-700 drop-shadow-sm text-4xl lg:text-5xl ">Welcome to Frontend Assignment Task</h1>
                <p className="font-normal text-2xl mb-8">This Project is made using Next.js. To checkout our dashboard click the button below.</p>
                <Link href={'./dashboard'}><button className="btn">Click Here</button></Link>
            </div>
        </section>
    )
}

export default HomePage
