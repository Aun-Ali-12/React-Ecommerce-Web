import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Bar, BarChart, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { supabase } from "../../../services/supabaseClient";

function Analytics() {
    const [orders, setOrders] = useState([]) //stores orders  

    // fetching orders from DB
    async function Orders() {
        try {
            const { data, error } = await supabase
                .from('orders')
                .select()
            if (error) {
                return
            }
            setOrders(data)
        }
        catch (err) {
            console.log(err, "error while fetching order for chart");
        }
    }

    //Total price of order 
    let totalPrice = orders.reduce((acc, o) => {
        return acc + (o.total_price || 0);
    }, 0)

    //pending order filter
    let pendingOrders = orders.filter(o => o.status === "pending").length

    //fulfilled order filter
    let fulfilledOrders = orders.filter(o => o.status === "fulfilled").length

    //data to render in form of chart
    const data = [
        { name: "Pending", value: pendingOrders },
        { name: "Fulfilled", value: fulfilledOrders }
    ]

    //First 3 current dates wise order qty 
    let firstThreeDates = Object.values(orders.reduce((acc, o) => {
        const orderDate = o.created_at.split('T')[0]
        if (!acc[orderDate]) acc[orderDate] = { date: orderDate, ordersQty: 0 }
        acc[orderDate].ordersQty += 1
        return acc
    }, {}))
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(0, 3)

    useEffect(() => {
        Orders();
    }, [])
    return (
        <>
            <div className="sm:flex-col justify-between md:flex justify-between">
                <div className="w-full shadow-md rounded-xl px-5 py-2" >
                    <h1 className="font-bold text-2xl text-gray-600 capitalize">Order Status</h1>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart width="100%" height={300}>
                            <Pie data={data} dataKey="value" fill="#8884d8" outerRadius={100}>
                                {data.map((index) => (
                                    <Cell key={index} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="w-full shadow-md rounded-xl px-5 py-2">
                    <h2 className="font-bold text-2xl text-gray-600 capitalize">Orders Over Time (First 3 Dates)</h2>
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={firstThreeDates} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="ordersQty" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="ordersQty" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </>
    )
}
export default Analytics