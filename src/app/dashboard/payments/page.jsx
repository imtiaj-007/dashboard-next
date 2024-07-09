'use client'
import axios from "axios"
import Image from "next/image"
import { useRef, useState, useEffect } from "react"
import exportFromJSON from 'export-from-json'
import Cards from "@/app/ui/dashboard/Cards"
import Table from "@/app/ui/dashboard/Table"
import Pagination from "@/app/ui/dashboard/Pagination"
import { FiSearch, FiDownload } from "react-icons/fi"


const PaymentsPage = () => {
    const baseURL = process.env.PAYMENT_URL;
    const [active, setActive] = useState(true);
    const payoutRef = useRef();
    const refundRef = useRef();
    const [pageNo, setPageNo] = useState(1);
    const [sortValue, setSortvalue] = useState('-transactionDate');
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [metaData, setMetaData] = useState({});
    const [cardData, setCardData] = useState([
        { heading: 'Next Payout', amount: 1000.6, quantity: 3 },
        { heading: 'Amount Pending', amount: 20314.7, quantity: 6 },
        { heading: 'Amount Recieved', amount: 102456.2, quantity: 22 }
    ]);


    // Fetch Table Data from Backend
    const fetchData = async (url) => {
        try {
            setLoading(true);
            const res = await axios.get(url, {
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            console.log(res.data.payments)
            setTableData(res.data.payments);
            setMetaData(res.data.meta);
            setCardData(res.data.meta.card);
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }

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

    // Search Transactions by Order ID
    const searchByOrderId = async (e)=> {
        let url = `${baseURL}?orderID=${e.target.value}`
        fetchData(url);
    }

    // Sort Table Data
    const sortData = async (e)=> {
        e.preventDefault();
        setSortvalue(e.target.value);
        let url = `${baseURL}?page=${pageNo}&sort=${e.target.value}`
        fetchData(url);
    }

    // Download Table Data in CSV format
    const downloadTableData = ()=> {
        const fileName = 'transactions';
        const exportType =  exportFromJSON.types.csv;
        exportFromJSON({
            data: tableData,
            fileName,       
            fields: ['_id', 'userID', 'orderID', 'amount', 'status', 'paymentMethod', 'transactionDate'],
            exportType
        })
    }

    // Go to Previous Page
    const goToPrevPage = () => {
        setPageNo(prevPageNo => prevPageNo - 1);
        let url = `${baseURL}?page=${pageNo - 1}&sort=${sortValue}`
        fetchData(url);
    }

    // Go to Next Page
    const goToNextPage = () => {
        setPageNo(prevPageNo => prevPageNo + 1);
        let url = `${baseURL}?page=${pageNo + 1}&sort=${sortValue}`
        fetchData(url);
    }

    // Go to Clicked Page No
    const changePage = (e) => {
        e.preventDefault();
        let page = Number(e.target.dataset.pageno);
        setPageNo(page);

        let url = `${baseURL}?page=${page}&sort=${sortValue}`
        fetchData(url);
    }

    useEffect(() => {
        fetchData(baseURL);
    }, [])


    return (
        <section id="home" className="min-h-screen overflow-y-auto">
            
            {/* Overview Section */}
            <div id="overview" className="flex justify-between para items-center mt-3">
                <h6 className="heading-6">Overview</h6>
                <select id="month" className="font-semibold text-sm text-neutral-600 p-2 border border-gray-500 rounded-md">
                    <option value="current">This Month</option>
                    <option value="previous">Previous</option>
                    <option value="choose">Calender</option>
                </select>
            </div>

            {/* Payment Cards Section */}
            <div id="cards" className="grid grid-cols-3 gap-4 px-8 pb-5">
                {
                    cardData.map((item, idx) => {
                        return (
                            <Cards key={idx} item={item} index={idx} metaData={metaData} />
                        )
                    })
                }
            </div>
            
            {/* Table Section */}
            <div id="tableSection" className="para">
                <h6 className="heading-6 mb-2">Transactions | This Month</h6>
                <div className="flex gap-2 mb-4">
                    <button className="bg-[#1f5fae] font-bold text-xs text-white py-2 px-4 rounded-3xl" ref={payoutRef} onClick={toggleTableData} >Payouts (22)</button>
                    <button className="bg-gray-400 font-bold text-xs text-white py-2 px-4 rounded-3xl" ref={refundRef} onClick={toggleTableData} >Refunds (6)</button>
                </div>

                {/* Table Container */}
                <div className="table-container bg-white shadow-md rounded-md p-3">
                    <div className="table-header flex justify-between">
                        <div className="w-72 flex justify-center items-center gap-3 bg-white border border-gray-400 px-4 py-1 rounded-lg hover:opacity-80 hover:cursor-pointer ">
                            <FiSearch size={20} />
                            <input type="text" name="global-search" id="globalSearch" className=" w-full outline-none font-medium text-sm bg-white text-stone-700" placeholder="Search by order ID" onChange={searchByOrderId} />
                        </div>
                        <div className="options flex gap-2">
                            {loading &&
                                <Image src={'/spinner.gif'} width={30} height={30} alt="loading-animation" />
                            }
                            <select id="sort" className="outline outline-1 font-semibold text-sm text-neutral-600 px-2 rounded-sm" onChange={sortData}>
                                <option value="-transactionDate">Date (Latest to Oldest)</option>
                                <option value="transactionDate">Date (Oldest to Latest)</option>
                                <option value="amount">Amount (Low to High)</option>
                                <option value="-amount">Amount (High to Low).</option>
                            </select>
                            <button className="outline outline-1 rounded-sm px-2" onClick={downloadTableData}><FiDownload size={16} /></button>
                        </div>
                    </div>

                    {/* Table Body */}
                    <div className="table-body">
                        <Table tableData={tableData} pageNo={pageNo} type={'payments'} />
                    </div>

                    {/* Table Footer */}
                    <div className="table-footer flex justify-between items-center text-sm px-8 mt-3">
                        <section className="page-result">
                            <p>
                                Showing <span className="font-semibold">{10 * pageNo - 9}</span> to <span className="font-semibold">{Math.min(metaData.totalOrders, 10 * pageNo)}</span> of <span className="font-semibold">{metaData.totalOrders}</span> results
                            </p>
                        </section>
                        <section className="pagination h-12 flex items-center">
                            <Pagination size={metaData.totalPages} pageNo={pageNo} goToPrevPage={goToPrevPage} changePage={changePage} goToNextPage={goToNextPage} />
                        </section>
                    </div>

                </div>
            </div>

        </section>
    )
}

export default PaymentsPage
