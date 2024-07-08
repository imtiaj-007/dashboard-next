'use client'
import axios from "axios"
import { useRef, useState, useEffect } from "react"
import exportFromJSON from 'export-from-json'
import Cards from "@/app/ui/dashboard/Cards"
import Table from "@/app/ui/dashboard/Table"
import Pagination from "@/app/ui/dashboard/Pagination"
import { FiSearch, FiDownload } from "react-icons/fi"


const baseURL = 'http://localhost:3000/api/orders'

const PaymentsPage = () => {
    const [month, setMonth] = useState('This Month');
    const [active, setActive] = useState(true);
    const payoutRef = useRef();
    const refundRef = useRef();
    const [pageNo, setPageNo] = useState(1);
    const [sortValue, setSortvalue] = useState('-createdAt');
    const [metaData, setMetaData] = useState({});
    const [tableData, setTableData] = useState([]);
    const [cardData, setCardData] = useState([]);


    const fetchData = async (url) => {
        try {
            const res = await axios.get(url, {
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            setTableData(res.data.orders);
            setMetaData(res.data.meta);
            setCardData(res.data.meta.card);
        } catch (error) {
            console.log(error)
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

    const searchByOrderId = async (e)=> {
        let url = `${baseURL}?orderID=${e.target.value}`
        fetchData(url);
    }

    const sortData = async (e)=> {
        e.preventDefault();
        setSortvalue(e.target.value);
        let url = `${baseURL}?page=${pageNo}&sort=${e.target.value}`
        fetchData(url);
    }

    const downloadTableData = ()=> {
        const fileName = 'transactions';
        const exportType =  exportFromJSON.types.csv;
        exportFromJSON({
            data: tableData,
            fileName,       
            fields: ['_id', 'userID', 'productName', 'qty', 'price', 'orderStatus', 'paymentMethod', 'createdAt'],
            exportType
        })
    }

    const goToPrevPage = () => {
        setPageNo(prevPageNo => prevPageNo - 1);
        let url = `${baseURL}?page=${pageNo - 1}&sort=${sortValue}`
        fetchData(url);
    }

    const goToNextPage = () => {
        setPageNo(prevPageNo => prevPageNo + 1);
        let url = `${baseURL}?page=${pageNo + 1}&sort=${sortValue}`
        fetchData(url);
    }

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
                    cardData.map((item, idx) => {
                        return (
                            <Cards key={idx} item={item} index={idx} metaData={metaData} />
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
                            <input type="text" name="global-search" id="globalSearch" className=" w-full outline-none font-medium text-sm bg-white text-stone-700" placeholder="Search by order ID" onChange={searchByOrderId} />
                        </div>
                        <div className="options flex gap-2">
                            
                            <select id="sort" className="outline outline-1 font-semibold text-sm text-neutral-600 px-2 rounded-sm" onChange={sortData}>
                                <option value="-createdAt">Date (Latest to Oldest)</option>
                                <option value="createdAt">Date (Oldest to Latest)</option>
                                <option value="price">Amount (Low to High)</option>
                                <option value="-price">Amount (High to Low).</option>
                            </select>
                            <button className="outline outline-1 rounded-sm px-2" onClick={downloadTableData}><FiDownload size={16} /></button>
                        </div>
                    </div>

                    <div className="table-body">
                        <Table tableData={tableData} pageNo={pageNo} />
                    </div>

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
