import { useState } from "react";
import { PieChart, Pie, Cell, Bar, BarChart, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { useOrderContext } from "../Context/OrderContext";

function Analytics() {
    const { filter, setFilter, filteredOrders } = useOrderContext();
    const [dFlag, setdFlag] = useState(false)

    //Total price of order 
    let totalPrice = filteredOrders.reduce((acc, order) => {
        return Math.round(acc + (order.total_price || 0))
    }, 0)
    console.log(totalPrice);

    //total orders
    let totalOrders = filteredOrders.length

    //pending order filter
    let pendingOrders = filteredOrders.filter(o => o.status.toLowerCase() === "pending").length
    console.log(pendingOrders);

    //fulfilled order filter
    let fulfilledOrders = filteredOrders.filter(o => o.status.toLowerCase() === "fulfilled").length
    console.log(fulfilledOrders);

    //data to render in form of chart
    const pieData = [
        { name: "Pending", value: pendingOrders },
        { name: "Fulfilled", value: fulfilledOrders }
    ]
    const pieColors = ["#F59E0B", "#10b981"]; // pending, fulfilled


    const fulfilledPercent = totalOrders === 0 ? 0 : Math.round((fulfilledOrders / totalOrders) * 100)
    const pendingPercent = totalOrders === 0 ? 0 : Math.round((pendingOrders / totalOrders) * 100)

    //First 3 current dates wise order qty 
    let firstWeekDates = Object.values(filteredOrders.reduce((acc, o) => {
        const orderDate = o.created_at.split('T')[0]
        if (!acc[orderDate]) acc[orderDate] = { date: orderDate, ordersQty: 0 }
        acc[orderDate].ordersQty += 1
        return acc
    }, {}))
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(0, 7)

    return (
        <>
            <div>
                {/* Parent div controlling 3 parent div  */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-5 md:gap-10 bg-white shadow-md rounded-xl px-5 py-2 mb-5" >

                    {/* First Parent div heading filter and pie chart parent  */}
                    <div className="w-full min-w-0">
                        {/* heading and filter  */}
                        <div className="flex justify-between items-center">
                            {/* heading  */}
                            <h1 className="font-bold text-xl md:text-2xl text-gray-600 capitalize">Order Status</h1>

                            {/* date wise filters  */}
                            <div className="relative z-50">
                                <button onClick={() => { setdFlag(!dFlag) }} className="capitalize">{filter || "select date"}</button>
                                {dFlag && (
                                    <div className=" absolute right-0 bg-white shadow-md rounded-xl p-3 w-56 border">
                                        <div className="flex flex-col gap-1">

                                            <button
                                                onClick={() => { setFilter("all"); setdFlag(!dFlag) }}
                                                className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition
      ${filter === "all"
                                                        ? "bg-blue-600 text-white"
                                                        : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                                                    }`}
                                            >
                                                All Orders
                                            </button>

                                            <button
                                                onClick={() => { setFilter("today"); setdFlag(!dFlag) }}
                                                className={`text-left px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition
      ${filter === "today"
                                                        ? "bg-blue-600 text-white"
                                                        : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                                                    }`}
                                            >
                                                Today
                                            </button>

                                            <button
                                                onClick={() => { setFilter("this month"); setdFlag(!dFlag) }}
                                                className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition
      ${filter === "month"
                                                        ? "bg-blue-600 text-white"
                                                        : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                                                    }`}
                                            >
                                                This Month
                                            </button>

                                            <button
                                                onClick={() => { setFilter("last month"); setdFlag(!dFlag) }}
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
                        </div>

                        {/* pie chart div  */}
                        <div className="w-full h-[320px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        dataKey="value"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius="80%"
                                        paddingAngle={3}
                                    >
                                        {pieData.map((_, index) => (
                                            <Cell key={index} fill={pieColors[index]}></Cell>
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>


                    {/* sec parent div */}
                    <div className="flex flex-wrap">

                        {/* progress bar */}
                        <div className="w-full max-w-md text-xl">
                            <h2 className="font-semibold text-gray-600 mb-2">
                                Fulfillment Rate
                            </h2>
                            {/* progress line */}
                            <div className="w-full bg-gray-400 rounded-full h-4 md:h-5 overflow-hidden">
                                {/* progress percent line */}
                                <div
                                    className="h-full bg-green-500 transition-all duration-700"
                                    style={{ width: `${fulfilledPercent}%` }}
                                />
                            </div>
                            {/* progress percent */}
                            <p className="mt-2 text-xl font-bold text-gray-700">
                                {fulfilledPercent}%
                            </p>
                        </div>

                        <div className="w-full max-w-md text-xl">
                            <h2 className="font-semibold text-gray-600 mb-2">
                                Pending Orders
                            </h2>
                            {/* progress line */}
                            <div className="w-full bg-gray-400 rounded-full h-4 md:h-5 overflow-hidden">
                                {/* progress percent line */}
                                <div
                                    className="h-full bg-red-500 transition-all duration-700"
                                    style={{ width: `${pendingPercent}%` }}
                                />
                            </div>
                            {/* progress percent */}
                            <p className="mt-2 text-xl font-bold text-gray-700">
                                {pendingPercent}%
                            </p>
                        </div>

                        {/* total value for all orders */}
                        <div className="w-full max-w-md text-xl">
                            <h2 className="font-semibold text-gray-600 mb-2">
                                Orders Value
                            </h2>
                            {/* progress line */}
                            <div className="w-full bg-blue-500 rounded-full h-4 md:h-5 overflow-hidden">
                                {/* progress percent line */}
                                <div
                                    className="h-full bg-blue-500 transition-all duration-700"
                                    style={{ width: `${totalPrice}%` }}
                                />
                            </div>
                            {/* progress percent */}
                            <p className="mt-2 text-xl font-bold text-gray-700">
                                {totalPrice}$
                            </p>
                        </div>
                    </div>

                    {/* third parent div  */}
                    <div className="flex flex-col items-center gap-6">

                        {/* Stats panel */}
                        <div className="flex flex-col gap-4 bg-white rounded-xl shadow border p-5 w-[180px]">

                            {/* Fulfilled */}
                            <div className="flex flex-col">
                                <span className="text-sm text-gray-500 font-medium">
                                    Fulfilled Orders
                                </span>
                                <span className="text-2xl font-bold text-green-600">
                                    {fulfilledOrders}
                                </span>
                            </div>

                            {/* Pending */}
                            <div className="flex flex-col">
                                <span className="text-sm text-gray-500 font-medium">
                                    Pending Orders
                                </span>
                                <span className="text-2xl font-bold text-amber-500">
                                    {pendingOrders}
                                </span>
                            </div>

                            {/* Total */}
                            <div className="flex flex-col">
                                <span className="text-sm text-gray-500 font-medium">
                                    Total Orders
                                </span>
                                <span className="text-2xl font-bold text-blue-600">
                                    {totalOrders}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* second section first div  */}
            <div className="flex flex-col md:flex-row justify-between bg-white shadow-md rounded-xl px-5 py-2 mb-5">
                {/* container for bar chart  */}
                <div className="w-full bg-white shadow-md rounded-xl px-5 py-2">
                    <h1 className="font-bold text-2xl text-gray-600 capitalize">Orders Over Time (First 7 Dates)</h1>
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={firstWeekDates} margin={{ top: 20, right: 20, left: -40, bottom: 5 }}>
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