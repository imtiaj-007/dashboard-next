'use client'
import axios from "axios";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { HiCreditCard } from "react-icons/hi2";


const SinglePaymentPage = () => {
    const path = usePathname();
    const paymentID = path.split('/').pop();
    const [singlePayment, setSinglePayment] = useState(null);
    const baseURL = process.env.PAYMENT_URL;


    // Fetch Single Transaction with ID
    const fetchSinglePayment = async () => {
        try {
            const url = baseURL + '/' + paymentID;
            const res = await axios.get(url, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            console.log(res.data.singlePayment)
            setSinglePayment(res.data.singlePayment)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchSinglePayment();
    }, [])


    return (
        <section id="singleOrder" className="w-full para-base lg:para-lg">

            <h6 className="heading-6 my-3">Transactions Details</h6>

            {singlePayment &&
                <div className="w-full flex justify-center items-center py-10 md:p-10">
                    <div className="w/full lg:w-1/2 bg-white rounded-md p-5">
                        {/* Transaction ID */}
                        <p className="font-semibold text-sm mb-8">Transaction ID: #{singlePayment?._id}</p>

                        {/* Transaction Heading */}
                        <div className="flex justify-between items-center font-semibold text-sm border-b-2 pb-4">
                            <div className="flex gap-2 items-center">
                                <HiCreditCard size={36} />
                                <p className="flex flex-col">
                                    <span className="text-gray-500">Account</span>
                                    <span className="text-gray-700">Visa Platinum</span>
                                </p>
                            </div>
                            <p>Date: {new Date(singlePayment?.transactionDate).toDateString()}</p>
                        </div>

                        {/* Transaction Amount */}
                        <div className="flex justify-between items-center font-semibold text-sm py-5 ">
                            <div className="flex flex-col gap-1">
                                <p className="text-2xl">{(singlePayment?.amount).toLocaleString('en-IN', {
                                    maximumFractionDigits: 2,
                                    style: 'currency',
                                    currency: 'INR'
                                })}</p>
                                <p className="text-gray-500">Total Fee</p>
                            </div>
                            <p className={`text-xs px-5 py-1 rounded-3xl ${singlePayment.status === 'Completed' ? 'bg-green-300' : 'bg-red-300 text-red-900'}`}>{singlePayment?.status}</p>
                        </div>

                        {/* Transaction Details */}
                        <p className="font-semibold text-sm text-center bg-gray-200/90 text-stone-900 rounded-lg p-2 mb-3" >Payment Information</p>
                        <div className="font-medium text-sm text-gray-800 ring-1 ring-slate-300 rounded-lg ">
                            <div className="grid grid-cols-6 md:grid-cols-8 p-4">
                                <div className="col-start-1 md:col-start-2 col-span-2 flex flex-col gap-1">
                                    <p>User ID</p>
                                    <p>OrderID</p>
                                    <p>Method</p>
                                    <p>Date</p>
                                </div>
                                <div className="col-span-4 flex flex-col gap-1">
                                    <p>{singlePayment?.userID}</p>
                                    <p>{singlePayment?.orderID}</p>
                                    <p>{singlePayment?.paymentMethod}</p>
                                    <p>{singlePayment?.transactionDate}</p>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            }

        </section>
    )
}

export default SinglePaymentPage
