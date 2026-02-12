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
        return Math.round(acc + (o.total_price || 0));
    }, 0)

    //pending order filter
    let pendingOrders = orders.filter(o => o.status.toLowerCase() === "pending").length

    //fulfilled order filter
    let fulfilledOrders = orders.filter(o => o.status.toLowerCase() === "fulfilled").length

    //data to render in form of chart
    const data = [
        { name: "Pending", value: pendingOrders },
        { name: "Fulfilled", value: fulfilledOrders }
    ]
    const COLORS = ["#F59E0B", "#10b981"]; // pending, fulfilled

    let totalOrders = orders.length

    const fulfilledPercent = totalOrders === 0 ? 0 : Math.round((fulfilledOrders / totalOrders) * 100)
    const pendingPercent = totalOrders === 0 ? 0 : Math.round((pendingOrders / totalOrders) * 100)

    //First 3 current dates wise order qty 
    let firstThreeDates = Object.values(orders.reduce((acc, o) => {
        const orderDate = o.created_at.split('T')[0]
        if (!acc[orderDate]) acc[orderDate] = { date: orderDate, ordersQty: 0 }
        acc[orderDate].ordersQty += 1
        return acc
    }, {}))
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(0, 7)

    useEffect(() => {
        Orders();
    }, [])
    return (
        <>
            {/* container div  */}
            <div className="sm:flex-col justify-between md:flex justify-between bg-slate-50">

                {/* container for pie chart and progress line  */}
                <div className="flex flex-col md:flex-row gap-12 bg-white shadow-md rounded-xl px-5 py-2 mb-5" >
                    {/* chart div  */}
                    <div className="w-full md:w-[420px]">
                        <h1 className="font-bold text-2xl text-gray-600 capitalize">Order Status</h1>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={data}
                                    dataKey="value"
                                    fill="#8884d8"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={120}
                                    paddingAngle={3}>
                                    {data.map((entry, index) => (
                                        <Cell key={index} fill={COLORS[index]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* first chart written info  */}
                    <div className="flex flex-wrap">
                        <div className="w-full max-w-md text-xl">
                            <h2 className="font-semibold text-gray-600 mb-2">
                                Total Orders
                            </h2>
                            {/* progress line  */}
                            <div className="w-full bg-gray-400 rounded-full h-5 overflow-hidden">
                                {/* progress percent line  */}
                                <div
                                    className="h-full bg-green-500 transition-all duration-700"
                                />
                            </div>
                            {/* progress percent  */}
                            <p className="mt-2 text-xl font-bold text-gray-700">
                                {totalOrders}
                            </p>
                        </div>

                        <div className="w-full max-w-md text-xl">
                            <h2 className="font-semibold text-gray-600 mb-2">
                                Fulfillment Rate
                            </h2>
                            {/* progress line  */}
                            <div className="w-full bg-gray-400 rounded-full h-5 overflow-hidden">
                                {/* progress percent line  */}
                                <div
                                    className="h-full bg-green-500 transition-all duration-700"
                                    style={{ width: `${fulfilledPercent}%` }}
                                />
                            </div>
                            {/* progress percent  */}
                            <p className="mt-2 text-xl font-bold text-gray-700">
                                {fulfilledPercent}%
                            </p>
                        </div>

                        <div className="w-full max-w-md text-xl">
                            <h2 className="font-semibold text-gray-600 mb-2">
                                Pending Orders
                            </h2>
                            {/* progress line  */}
                            <div className="w-full bg-gray-400 rounded-full h-5 overflow-hidden">
                                {/* progress percent line  */}
                                <div
                                    className="h-full bg-red-500 transition-all duration-700"
                                    style={{ width: `${pendingPercent}%` }}
                                />
                            </div>
                            {/* progress percent  */}
                            <p className="mt-2 text-xl font-bold text-gray-700">
                                {pendingPercent}%
                            </p>
                        </div>

                        {/* total value for all orders  */}
                        <div className="w-full max-w-md text-xl">
                            <h2 className="font-semibold text-gray-600 mb-2">
                                Orders Value
                            </h2>
                            {/* progress line  */}
                            <div className="w-full bg-blue-500 rounded-full h-5 overflow-hidden">
                                {/* progress percent line  */}
                                <div
                                    className="h-full bg-blue-500 transition-all duration-700"
                                    style={{ width: `${totalPrice}%` }}
                                />
                            </div>
                            {/* progress percent  */}
                            <p className="mt-2 text-xl font-bold text-gray-700">
                                {totalPrice}$
                            </p>
                        </div>
                    </div>
                </div>

                {/* container for bar chart  */}
                <div className="w-full bg-white shadow-md rounded-xl px-5 py-2">
                    <h1 className="font-bold text-2xl text-gray-600 capitalize">Orders Over Time (First 7 Dates)</h1>
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={firstThreeDates} margin={{ top: 20, right: 20, left: -40, bottom: 5 }}>
                            <CartesianGrid />
                            <XAxis dataKey="ordersQty" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="ordersQty" fill="#1E40AF" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </>
    )
}
export default Analytics