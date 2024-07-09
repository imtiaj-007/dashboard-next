import Link from "next/link"

const Table = ({ pageNo, tableData }) => {

    return (
        <table className="w-full text-sm mt-4">
            <thead className="font-semibold bg-gray-200 ">
                <tr className="h-10">
                    <th>SL No.</th>
                    <th>Transaction ID</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Order ID</th>                    
                    <th>Order Amount</th>
                </tr>
            </thead>
            <tbody>
                {tableData ?
                    tableData.map((item, index) => {
                        return (
                            <tr key={item._id} className="h-10 shadow-sm text-center border-b-2">
                                <td>{(pageNo - 1) * 10 + index + 1}</td>
                                <td className="font-semibold text-[#1f5fae]">
                                    <Link href={`/dashboard/payments/${item._id}`}>{item._id}</Link>
                                </td>
                                <td>{item.transactionDate.substring(0, 10)}</td>
                                <td className="h-10 flex gap-2 justify-center items-center"><span className={`w-2 h-2 rounded-full ${(item.status === 'Pending' || item.status === 'Cancelled' || item.status === 'Failed') ? 'bg-red-500' : 'bg-green-600'}`}></span>{item.status}</td>
                                <td className="font-semibold text-[#1f5fae]">
                                    <Link href={`/dashboard/orders/${item.orderID}`}>{item.orderID}</Link>
                                </td>
                                <td>{(item.amount).toLocaleString('en-IN', {
                                    maximumFractionDigits: 2,
                                    style: 'currency',
                                    currency: 'INR'
                                })}</td>                                
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
