import { useEffect, useState } from "react";
import { supabase } from "../../../services/supabaseClient";
import { OrderUI } from "../components/Order";
function Orders() {

    const [orders, setOrders] = useState(null)
    const [selected, setSelected] = useState([])
    const [flag, setFlag] = useState(false)

    async function FetchOrders() {
        try {
            const { data, error } = await supabase
                .from('orders')
                .select('*')
                .eq("status", "pending") //only pending status orders will be fetched
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

    const handleCheck = (e, id) => {
        const value = Number(e.target.value)
        console.log(value);
        if (e.target.checked) {
            setSelected((prev) =>
                [...prev, value]
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
            FetchOrders();
        } catch (err) {
            console.log(err);
        }
    }


    useEffect(() => {
        console.log(selected);
    }, [selected])

    useEffect(() => {
        FetchOrders();
    }, [])


    return (
        <>
            <div>Orders</div>
            <div><button onClick={() => { setFlag(!flag) }}>click</button></div>
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
                                        setSelected(orders.map(o => o.id))
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
                        {orders?.map((order) => (
                            < OrderUI key={order.id} orders={order} selected={selected} handleCheck={handleCheck} />
                        )
                        )
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}
export default Orders