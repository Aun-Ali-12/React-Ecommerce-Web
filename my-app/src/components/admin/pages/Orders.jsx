import { supabase } from "../../../services/supabaseClient";
import { useState } from "react";
import { OrderUI } from "../components/Order";
import { useOrderContext } from "../Context/OrderContext"
function Orders() {
    const { setFilter, filteredOrders, setOrderStatus } = useOrderContext();
    const [selected, setSelected] = useState([]) // state used to handle checkbox check
    const [flag, setFlag] = useState(false)
    
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
            <div>Orders</div>
            {/* Filters  */}
            <div>

                {/* date wise filters  */}
                <div>
                    <button onClick={() => { setFilter("all") }}>all</button>
                    <button onClick={() => { setFilter("today") }}>today</button>
                    <button onClick={() => { setFilter("month") }}>this month</button>
                    <button onClick={() => { setFilter("last month") }}>last month</button>
                </div>

                {/* status wise filters  */}
                <div>
                    <button onClick={() => { setOrderStatus("all") }}>all</button>
                    <button onClick={() => { setOrderStatus("fulfilled") }}>fulfilled</button>
                    <button onClick={() => { setOrderStatus("pending") }}>Unfulfilled</button>
                </div>

                {/* pagination  */}
                <div>
                    <select value={ordersPerPage}
                        onChange={(e) => {
                            setOrdersPerPage(Number(e.target.value))
                            setCurrentPage(1)
                        }}
                    >
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                        <option value={filteredOrders.length}>all</option>
                    </select>
                </div>
            </div>

            {/* fulfillment process initiates from this button  */}
            <div>
                <button onClick={() => {
                    if (selected.length == 0) {
                        alert("First select any order")
                        return
                    } else {
                        setFlag(!flag)
                    }
                }}>click</button></div>
            {
                flag && (
                    <div><button onClick={handlefulFill}>fulfill</button></div>
                )
            }
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
            <div>Showing {Pagination.length}orders</div>
            <button disabled={currentPage === 1} onClick={() => { setCurrentPage(prev => prev - 1) }}>Prev</button>
            <button disabled={end >= filteredOrders.length} onClick={() => { setCurrentPage(prev => prev + 1) }}>Next</button>
        </>
    )
}
export default Orders