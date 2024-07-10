import Link from "next/link"

const checkObj = {
    'Pending': 1,
    'Cancelled': 1,
    'Failed': 1,
}

const Table = ({ pageNo, tableData, type }) => {

    return (
        <table className="lg:w-full text-sm mt-4 text-nowrap">
            <thead className="font-semibold bg-gray-200 ">
                <tr className="h-10">
                    <th>SL No.</th>
                    {type === 'payments' ? <th>Transaction ID</th> : <th>Order ID</th>}
                    <th>Date</th>
                    <th>Status</th>
                    {type === 'payments' ? <th>Order ID</th> : <th>Product Name</th>}
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
                                    <Link href={`/dashboard/${type}/${item._id}`}>{item._id}</Link>
                                </td>
                                <td>{type === 'payments' ? item.transactionDate.substring(0, 10) : item.createdAt.substring(0, 10)}</td>
                                <td className="h-10 flex gap-2 justify-center items-center"><span className={`w-2 h-2 rounded-full ${((item.status || item.orderStatus) in checkObj) ? 'bg-red-500' : 'bg-green-600'}`}></span>{item.status || item.orderStatus}</td>
                                {type === 'payments' ?
                                    <td className="font-semibold text-[#1f5fae]">
                                        <Link href={`/dashboard/orders/${item.orderID}`}>{item.orderID}</Link>
                                    </td>
                                    :
                                    <td>{item.productName}</td>
                                }
                                <td>{(item.amount || item.price).toLocaleString('en-IN', {
                                    maximumFractionDigits: 2,
                                    style: 'currency',
                                    currency: 'INR'
                                })}</td>
                            </tr>
                        )
                    })
                    : null
                }
            </tbody>
        </table>
    )
}

export default Table
