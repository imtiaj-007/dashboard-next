import Link from "next/link"

const Table = ({ pageNo, tableData }) => {

    return (
        <table className="w-full text-sm mt-4">
            <thead className="font-semibold bg-gray-200 ">
                <tr className="h-10">
                    <th>SL No.</th>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Transaction ID</th>
                    <th>Product Name</th>
                    <th>Order Amount</th>
                    <th>Details</th>
                </tr>
            </thead>
            <tbody>
                {tableData ?
                    tableData.map((item, index) => {
                        return (
                            <tr key={item._id} className="h-10 shadow-sm text-center border-b-2">
                                <td>{(pageNo - 1) * 10 + index + 1}</td>
                                <td>{item._id}</td>
                                <td>{item.createdAt.substring(0, 10)}</td>
                                <td className="h-10 flex gap-2 justify-center items-center"><span className={`w-2 h-2 rounded-full ${(item.orderStatus === 'Pending' || item.orderStatus === 'Cancelled') ? 'bg-red-500' : 'bg-green-600'}`}></span>{item.orderStatus}</td>
                                <td>{Date.now()}</td>
                                <td>{item.productName}</td>
                                <td>{(item.price * 36.12).toLocaleString('en-IN', {
                                    maximumFractionDigits: 2,
                                    style: 'currency',
                                    currency: 'INR'
                                })}</td>
                                <td><Link href={`/dashboard/orders/${item._id}`}>
                                    <button className="font-semibold text-xs text-white rounded-md px-2 py-1 bg-indigo-600/90 hover:bg-indigo-700/90" >view</button>
                                </Link></td>
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
