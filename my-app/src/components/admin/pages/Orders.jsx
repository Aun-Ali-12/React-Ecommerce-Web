import { supabase } from "../../../services/supabaseClient";
import { useState } from "react";
import { OrderUI } from "../components/Order";
import { useOrderContext } from "../Context/OrderContext"
function Orders() {
    const { filter, setFilter, filteredOrders, setOrderStatus } = useOrderContext();
    const [selected, setSelected] = useState([]) // state used to handle checkbox check
    const [flag, setFlag] = useState(false)
    const [dFlag, setdFlag] = useState(false)

    //for pagination
    const [currentPage, setCurrentPage] = useState(1)
    const [ordersPerPage, setOrdersPerPage] = useState(10)


    const handleCheck = (e, id) => {
        if (e.target.checked) {
            setSelected((prev) =>
                [...prev, id]
            )
        } else {
            setSelected((prev) => prev.filter(x => x !== id))
        }
    }

    const handlefulFill = async () => {
        try {
            const { error } = await supabase
                .from('orders')
                .update({ status: 'fulfilled' })
                .in('id', selected)

            if (error) {
                console.log(error.message);
                return
            }
            alert("Orders fulfilled succesfully")
            setSelected([])
        } catch (err) {
            console.log(err);
        }
    }

    //Pagination Logic:
    let start = (currentPage - 1) * ordersPerPage
    let end = start + ordersPerPage
    const Pagination = filteredOrders.slice(start, end)

    return (
        <>
            <div>
                <h1 className="text-gray-700 text-2xl">Orders</h1>

                {/* Filters  */}
                <div className="flex justify-between items-center">

                    {/* date wise filters  */}
                    <div className="relative">
                        <button onClick={() => { setdFlag(!dFlag) }} className="capitalize">{dFlag ? "X" : "Select by date"}</button>
                        {dFlag && (
                            <div className=" absolute bg-white shadow-md rounded-xl p-3 w-56 border">
                                <div className="flex flex-col gap-1">

                                    <button
                                        onClick={() => setFilter("all")}
                                        className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition
      ${filter === "all"
                                                ? "bg-blue-600 text-white"
                                                : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                                            }`}
                                    >
                                        All Orders
                                    </button>

                                    <button
                                        onClick={() => setFilter("today")}
                                        className={`text-left px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition
      ${filter === "today"
                                                ? "bg-blue-600 text-white"
                                                : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                                            }`}
                                    >
                                        Today
                                    </button>

                                    <button
                                        onClick={() => setFilter("month")}
                                        className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition
      ${filter === "month"
                                                ? "bg-blue-600 text-white"
                                                : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                                            }`}
                                    >
                                        This Month
                                    </button>

                                    <button
                                        onClick={() => setFilter("last month")}
                                        className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition
      ${filter === "last month"
                                                ? "bg-blue-600 text-white"
                                                : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                                            }`}
                                    >
                                        Last Month
                                    </button>

                                </div>
                            </div>
                        )}

                    </div>


                    {/* pagination  */}
                    <div className="bg-white shadow-md rounded-xl px-3 py-2 border flex items-center gap-3 w-fit">

                        <span className="text-sm text-gray-500 font-medium">
                            Show
                        </span>

                        <select
                            value={ordersPerPage}
                            onChange={(e) => {
                                setOrdersPerPage(Number(e.target.value));
                                setCurrentPage(1);
                            }}
                            className="
      bg-gray-50 border border-gray-300 
      text-sm font-medium text-gray-700
      rounded-lg px-3 py-2
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
      hover:border-blue-400
      transition
      cursor-pointer
    "
                        >
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                            <option value={filteredOrders.length}>All</option>
                        </select>

                        <span className="text-sm text-gray-500">
                            per page
                        </span>
                    </div>
                </div>


                <div className="flex gap-5">

                    {/* status wise filters  */}
                    <div className="flex gap-5">
                        <button onClick={() => { setOrderStatus("all") }} className="bg-white shadow-md rounded-md px-5 py-1 capitalize">all</button>
                        <button onClick={() => { setOrderStatus("fulfilled") }} className="bg-white shadow-md rounded-md px-5 py-1 capitalize">fulfilled</button>
                        <button onClick={() => { setOrderStatus("pending") }} className="bg-white shadow-md rounded-md px-5 py-1 capitalize">Unfulfilled</button>
                    </div>

                    {/* fulfillment process initiates from this button  */}
                    <div className="relative">
                        <button onClick={() => {
                            if (selected.length == 0) {
                                alert("First select any order")
                                return
                            } else {
                                setFlag(!flag)
                            }
                        }} className="bg-white shadow-md rounded-md px-5 py-1 capitalize font-bold">{flag ? "X" : "..."}</button>
                        {
                            flag && (
                                <div><button className="absolute bg-white shadow-md rounded-md px-4 py-2 capitalize" onClick={handlefulFill}>fulfill</button></div>
                            )
                        }
                    </div>
                </div>
                <div className="w-full bg-white rounded-xl shadow p-4 overflow-x-auto">
                    <table className="min-w-[70vw]">
                        <thead>
                            <tr className="border-b bg-gray-50">
                                <td>
                                    <input type="checkbox" onChange={(e) => {
                                        if (e.target.checked) {
                                            setSelected(filteredOrders.map(o => o.id))
                                        } else {
                                            setSelected([])
                                        }
                                    }} />
                                </td>
                                <td className="border px-4 py-2 capitalize">Order#</td>
                                <td className="border px-4 py-2 capitalize">Name</td>
                                <td className="border px-4 py-2 capitalize">Email</td>
                                <td className="border px-4 py-2 capitalize">Phone</td>
                                <td className="border px-4 py-2 capitalize">Address</td>
                                <td className="border px-4 py-2 capitalize">items</td>
                                <td className="border px-4 py-2 capitalize">Amount</td>
                                <td className="border px-4 py-2 capitalize">Status</td>
                            </tr>
                        </thead>
                        <tbody>
                            {Pagination.length == 0 ? <p>No data matched</p> :
                                Pagination?.map((order) => (
                                    < OrderUI key={order.id} orders={order} selected={selected} handleCheck={handleCheck} />
                                )
                                )
                            }
                        </tbody>
                    </table>
                </div>

                {/* showing calculated length of orders using pagination data  */}
                <div className="flex justify-between items-center">
                    <div className="text-sm capitalize">Showing {Pagination.length} orders</div>
                    <div className="mr-3">
                        <button disabled={currentPage === 1} onClick={() => { setCurrentPage(prev => prev - 1) }} className="text-left px-3 py-1 rounded-lg text-md transition text-gray-700 hover:bg-blue-50 hover:text-blue-600">Prev</button>
                        <button disabled={end >= filteredOrders.length} onClick={() => { setCurrentPage(prev => prev + 1) }} className="text-left px-3 py-1 rounded-lg text-md transition text-gray-700 hover:bg-blue-50 hover:text-blue-600">Next</button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Orders