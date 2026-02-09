import { useEffect, useState } from "react";
import { supabase } from "../../../services/supabaseClient";
import { OrderUI } from "../components/Order";
function Orders() {

    const [orders, setOrders] = useState(null)
    const [selected, setSelected] = useState([])

    async function FetchOrders() {
        try {
            const { data, error } = await supabase
                .from('orders')
                .select()
            if (error) {
                return
            }
            console.log(data);
            setOrders(data)
            console.log("Orders successfully fetched");

        }
        catch (err) {
            console.log("error while fetching the orders");

        }
    }
    useEffect(() => {
        FetchOrders();
    }, [])

    useEffect(() => {
        console.log("fetched", orders);
    }, [orders])
    return (
        <>
            <div>Orders</div>
            <div className="w-full bg-white rounded-xl shadow p-4 overflow-x-auto">
                <table className="min-w-[70vw]">
                    <thead>
                        <tr className="border-b bg-gray-50">
                            <td className="p-3"><input type="checkbox" name="" id="" /></td>
                            <td className="border px-4 py-2">Order#</td>
                            <td className="border px-4 py-2">Name</td>
                            <td className="border px-4 py-2">Email</td>
                            <td className="border px-4 py-2">Phone</td>
                            <td className="border px-4 py-2">Address</td>
                            <td className="border px-4 py-2">items</td>
                            <td className="border px-4 py-2">Amount</td>
                            <td className="border px-4 py-2">Status</td>
                        </tr>
                    </thead>
                    {orders?.map((order) => (
                        <>
                            < OrderUI key={order.id} orders={order} />
                        </>
                    )
                    )

                    }
                </table>
            </div>
        </>
    )
}
export default Orders