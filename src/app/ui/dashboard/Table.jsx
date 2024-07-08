'use client'
import axios from "axios";
import { useEffect, useState } from "react"

const baseURL = 'http://localhost:3000/api/orders'

const Table = () => {     
    const [tableData, setTableData] = useState([]);
    

    const fetchData = async(url)=> {
        try {
            const res = await axios.get(url, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setTableData(res.data.orders);
        } catch (error) {
            throw error
        }
    }

    const randomDate = ()=> {
        let date = Math.floor(Math.random()*(30-1)+1)
        let month = Math.floor(Math.random()*(13-1)+1)
        let year = Math.floor(Math.random()*(2023-2020)+2020)
        let st = `${date}-${month}-${year}`
        console.log(st)
        return new Date(st);
    }

    useEffect(()=>{
        fetchData(baseURL);
    }, [])

    return (
        <table className="w-full text-sm mt-4">
            <thead className="font-semibold bg-gray-200 ">
                <tr className="h-10">
                    <th>Order ID</th>
                    <th>Status</th>
                    <th>Transaction ID</th>
                    <th>Refund Date</th>
                    <th>Order Amount</th>
                </tr>
            </thead>
            <tbody>
                {tableData ?
                    tableData.map((item)=> {
                        return (
                            <tr key={item._id} className="h-10 shadow-sm text-center border-b-2">
                                <td>{item._id}</td>
                                <td className="h-10 flex gap-2 justify-center items-center"><span className={`w-2 h-2 rounded-full ${(item.orderStatus === 'Pending' || item.orderStatus === 'Cancelled') ? 'bg-red-500' : 'bg-green-600'}`}></span>{item.orderStatus}</td>
                                <td>{Date.now()}</td>
                                <td>{new Date().toISOString().substring(0, 10)}</td>
                                <td>&#8377; {Math.ceil(item.price * 36.12)}</td>
                            </tr>
                        )
                    })
                    :
                    <tr>
                        <td>No Data Available</td>
                    </tr>
                }
            </tbody>            
        </table>
    )
}

export default Table
