'use client'
import { useRef, useState } from "react"
import Cards from "@/app/ui/dashboard/Cards"
import { FiSearch, FiDownload } from "react-icons/fi";
import { BiSortAlt2 } from "react-icons/bi";
import Table from "@/app/ui/dashboard/Table";
import Pagination from "@/app/ui/dashboard/Pagination";

const cards = [
    {
        heading: 'Next Payout',
        amount: '2,144.2',
        quantity: 23,
    },
    {
        heading: 'Amount Pending',
        amount: '1,254.0',
        quantity: 8,
    },
    {
        heading: 'Amount Recieved',
        amount: '8,637.6',
        quantity: 15,
    }
]

const PaymentsPage = () => {
    const [month, setMonth] = useState('This Month');
    const [active, setActive] = useState(true);
    const payoutRef = useRef();
    const refundRef = useRef();
    const [pageNo, setPageNo] = useState(1);
    const [totalResults, setTotalResults] = useState(43);

    const toggleTableData = () => {
        if (active) {
            payoutRef.current.classList.remove('bg-[#1f5fae]');
            payoutRef.current.classList.add('bg-gray-400');
            refundRef.current.classList.remove('bg-gray-400');
            refundRef.current.classList.add('bg-[#1f5fae]');
            setActive(false);
        }
        else {
            payoutRef.current.classList.remove('bg-gray-400');
            payoutRef.current.classList.add('bg-[#1f5fae]');
            refundRef.current.classList.remove('bg-[#1f5fae]');
            refundRef.current.classList.add('bg-gray-400');
            setActive(true);
        }
    }

    const goToPrevPage = ()=> {
        setPageNo(prevPageNo => prevPageNo - 1);
    }

    const goToNextPage = ()=> {
        setPageNo(prevPageNo => prevPageNo + 1);
    }

    const changePage = (e)=> {
        e.preventDefault();
        setPageNo(Number(e.target.dataset.pageno));
    }


    return (
        <section id="home" className="min-h-screen overflow-y-auto">

            <div id="overview" className="flex justify-between para items-center mt-3">
                <h6 className="heading-6">Overview</h6>
                <select id="month" className="font-semibold text-sm text-neutral-600 p-2 border border-gray-500 rounded-md">
                    <option value="current">This Month</option>
                    <option value="previous">Previous</option>
                    <option value="choose">Calender</option>
                </select>
            </div>

            <div id="cards" className="grid grid-cols-3 gap-4 px-8 pb-5">
                {
                    cards.map((item, idx) => {
                        return (
                            <Cards key={idx} item={item} index={idx} />
                        )
                    })
                }
            </div>

            <div id="tableSection" className="para">
                <h6 className="heading-6 mb-2">Transactions | {month}</h6>
                <div className="flex gap-2 mb-4">
                    <button className="bg-[#1f5fae] font-bold text-xs text-white py-2 px-4 rounded-3xl" ref={payoutRef} onClick={toggleTableData} >Payouts (22)</button>
                    <button className="bg-gray-400 font-bold text-xs text-white py-2 px-4 rounded-3xl" ref={refundRef} onClick={toggleTableData} >Refunds (6)</button>
                </div>

                <div className="table-container bg-white shadow-md rounded-md p-3">
                    <div className="table-header flex justify-between">
                        <div className="w-72 flex justify-center items-center gap-3 bg-white border border-gray-400 px-4 py-1 rounded-lg hover:opacity-80 hover:cursor-pointer ">
                            <FiSearch size={20} />
                            <input type="text" name="global-search" id="globalSearch" className=" w-full outline-none font-medium text-sm bg-white text-stone-700" placeholder="Search by order ID" />
                        </div>
                        <div className="options flex gap-2">
                            <button className="outline outline-1 rounded-sm font-medium text-sm flex gap-1 items-center px-2"><span>Sort</span> <BiSortAlt2 size={16} /></button>
                            <button className="outline outline-1 rounded-sm px-2"><FiDownload size={16} /></button>
                        </div>
                    </div>

                    <div className="table-body">
                        <Table />
                    </div>

                    <div className="table-footer flex justify-between items-center text-sm px-8 mt-3">
                        <section className="page-result">
                            <p>
                                Showing <span className="font-semibold">{10 * pageNo - 9}</span> to <span className="font-semibold">{Math.min(totalResults, 10 * pageNo)}</span> of <span className="font-semibold">{totalResults}</span> results
                            </p>
                        </section>
                        <section className="pagination h-12 flex items-center">
                            <Pagination size={Math.ceil(totalResults/10)} pageNo={pageNo} goToPrevPage={goToPrevPage} changePage={changePage} goToNextPage={goToNextPage} />
                        </section>
                    </div>

                </div>
            </div>

        </section>
    )
}

export default PaymentsPage
