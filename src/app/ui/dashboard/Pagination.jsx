import { MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

const Pagination = ({ size, pageNo, goToPrevPage, changePage, goToNextPage }) => {
    const arr = [...Array(size)];

    return (
        <div className="flex items-center justify-center">
            <button className="ring-1 ring-inset ring-gray-300 rounded-l-md font-bold py-2 px-4 hover:bg-gray-100" disabled={pageNo === 1} onClick={goToPrevPage}>
                <MdOutlineKeyboardDoubleArrowLeft size={20} />
            </button>
            {
                arr.map((_, index) => {
                    return (
                        <button key={index} className={`${index+1 === pageNo ? 'bg-indigo-600 text-white' : 'ring-1 ring-inset ring-gray-300 hover:bg-gray-100'}  font-bold py-2 px-4 `} data-pageno={index+1} onClick={changePage}>
                            {index + 1}
                        </button>
                    )
                })
            }
            <button className="ring-1 ring-inset ring-gray-300 rounded-r-md font-bold py-2 px-4 hover:bg-gray-100" disabled={pageNo >= size} onClick={goToNextPage}>
                <MdOutlineKeyboardDoubleArrowRight size={20} />
            </button>

        </div>
    )
}
export default Pagination
