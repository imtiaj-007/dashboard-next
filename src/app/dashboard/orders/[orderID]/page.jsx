'use client'
import axios from "axios";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AiFillAmazonCircle, AiFillApple, AiFillChrome } from "react-icons/ai";
import { BsQrCode } from "react-icons/bs";

const SingleOrderPage = () => {
    const baseURL = process.env.ORDER_URL;
    const path = usePathname();
    const orderID = path.split('/').pop();
    const [singleOrder, setSingleOrder] = useState(null);


    // Fetch Single Order Details
    const fetchSingleProduct = async () => {
        try {
            const url = baseURL + '/' + orderID;
            const res = await axios.get(url, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            console.log(url, res.data.singleOrder)
            setSingleOrder(res.data.singleOrder)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchSingleProduct();
    }, [])

    return (
        <section id="singleOrder" className="w-full para-base lg:para-lg">

            <h6 className="heading-6 my-3">Order Details (3) </h6>
            
            {singleOrder && 
            <div className="font-medium ">

                {/* Order Table Heading */}
                <div className="order-table text-center ">
                    <ul className="grid grid-cols-8 items-center text-md text-white bg-indigo-500 rounded-t-md py-5">
                        <li className="col-span-3">Product Name</li>
                        <li className="col-span-2">Product ID</li>
                        <li className="col-span-1">Quantity</li>
                        <li className="col-span-2">Price</li>
                    </ul>

                    {/* Order Items */}
                    <ul className="grid grid-cols-8 items-center text-sm bg-white rounded-sm py-5 border-b-2">
                        <li className="col-span-3 flex gap-2 items-center justify-center">
                            <AiFillAmazonCircle size={44} className="hidden md:block" />
                            <div className="flex flex-col gap-1 items-start">
                                <p>{singleOrder.productName}</p>
                                <p className="text-xs">Color: Black</p>
                            </div>
                        </li>
                        <li className="col-span-2">{Date.now()}</li>
                        <li className="col-span-1">x{singleOrder.qty}</li>
                        <li className="col-span-2">{(singleOrder.price).toLocaleString('en-IN', {
                            maximumFractionDigits: 2,
                            style: 'currency',
                            currency: 'INR'
                        })}</li>
                    </ul>

                    <ul className="grid grid-cols-8 items-center text-sm bg-white rounded-sm py-5 border-b-2">
                        <li className="col-span-3 flex gap-2 items-center justify-center">
                            <AiFillApple size={44} className="hidden md:block" />
                            <div className="flex flex-col gap-1 items-start">
                                <p>Extra Product 1</p>
                                <p className="text-xs">Color: Red</p>
                            </div>
                        </li>
                        <li className="col-span-2">{Date.now()}</li>
                        <li className="col-span-1">x2</li>
                        <li className="col-span-2">{Number(50).toLocaleString('en-IN', {
                            maximumFractionDigits: 2,
                            style: 'currency',
                            currency: 'INR'
                        })}</li>
                    </ul>

                    <ul className="grid grid-cols-8 items-center text-sm shadow-sm bg-white rounded-sm py-5">
                        <li className="col-span-3 flex gap-2 items-center justify-center">
                            <AiFillChrome size={44} className="hidden md:block" />
                            <div className="flex flex-col gap-1 items-start">
                                <p>Extra Product 2</p>
                                <p className="text-xs">Color: Blue</p>
                            </div>
                        </li>
                        <li className="col-span-2">{Date.now()}</li>
                        <li className="col-span-1">x3</li>
                        <li className="col-span-2">{Number(124).toLocaleString('en-IN', {
                            maximumFractionDigits: 2,
                            style: 'currency',
                            currency: 'INR'
                        })}</li>
                    </ul>
                </div>
                
                {/* Price Summary */}
                <div className="flex flex-col-reverse md:grid md:grid-cols-2 bg-white rounded-md mt-1">
                    <div className="flex flex-col items-center text-xs px-12 py-8">
                        <BsQrCode size={110} />
                        <p className="mt-2">#{orderID}</p>
                    </div>
                    <div className="flex gap-2 px-8 md:px-12 py-8">
                        <p className="w-1/3 md:w-1/2 font-semibold text-md">Order Summary</p>
                        <div className="w-2/3 md:w-1/2 flex flex-col gap-2 text-sm text-gray-700">
                            <div className="flex justify-between">

                                <p>Subtotal</p>
                                <p>{(singleOrder.price).toLocaleString('en-IN', {
                                    maximumFractionDigits: 2,
                                    style: 'currency',
                                    currency: 'INR'
                                })}</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Shipping Fee</p>
                                <p>{Number(120).toLocaleString('en-IN', {
                                    maximumFractionDigits: 2,
                                    style: 'currency',
                                    currency: 'INR'
                                })}</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Tax Amount</p>
                                <p>{Number(1100).toLocaleString('en-IN', {
                                    maximumFractionDigits: 2,
                                    style: 'currency',
                                    currency: 'INR'
                                })}</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Discount</p>
                                <p>{Number(700).toLocaleString('en-IN', {
                                    maximumFractionDigits: 2,
                                    style: 'currency',
                                    currency: 'INR'
                                })}</p>
                            </div>

                            <div className="flex justify-between">
                                <p>Total</p>
                                <p>{(singleOrder.price).toLocaleString('en-IN', {
                                    maximumFractionDigits: 2,
                                    style: 'currency',
                                    currency: 'INR'
                                })}</p>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
            }
        </section>
    )
}

export default SingleOrderPage
