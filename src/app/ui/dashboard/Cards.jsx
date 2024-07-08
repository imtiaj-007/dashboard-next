import Link from "next/link";
import { RiQuestionLine, RiArrowRightSLine } from "react-icons/ri";

const Cards = (props) => {
    const { heading, amount, quantity } = props.item;
    const index = props.index;
    return (
        <div className={`${index === 0 ? 'bg-[#1f5fae] text-white' : "bg-white shadow-md"} rounded-md`}>
            <div className="px-5 py-3">
                <div className="flex gap-2 justify-start items-center mb-2 ">
                    <p className="font-normal text-sm ">{heading}</p>
                    <RiQuestionLine size={16} color={`${index === 0 ? "white" : "black"}`} />
                </div>

                <div className="flex justify-between items-center ">
                    <h6 className={`font-semibold text-2xl ${index !== 0 ? 'text-gray-700' : ''}`} >{amount.toLocaleString('en-IN', {
                        maximumFractionDigits: 2,
                        style: 'currency',
                        currency: 'INR'
                    })}</h6>
                    <Link href={'/dashboard/orders'} className="flex gap-1">
                        <span className="font-body underline underline-offset-1 ">{quantity} orders</span>
                        <RiArrowRightSLine size={20} color={`${index === 0 ? "white" : "black"}`} />
                    </Link>
                </div>
            </div>

            {index === 0 &&
                <div className="flex justify-between font-small bg-[#02387b] rounded-b-md px-5 py-2">
                    <p>Next payout date:</p>
                    <p>Today 4.00PM</p>
                </div>
            }
        </div>
    )
}

export default Cards
