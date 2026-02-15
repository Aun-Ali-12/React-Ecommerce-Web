import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../../../services/supabaseClient";

const OrderContext = createContext() //object which stores the data and we do export it
export const OrderProvider = ({ children }) => {
    const [orders, setOrders] = useState([]) //state handle orders fetching from DB
    const [filter, setFilter] = useState("")
    const [orderStatus, setOrderStatus] = useState("")

    
    //Fetch order function
    async function FetchOrders() {
        try {
            const { data, error } = await supabase
                .from('orders')
                .select('*')
            if (error) {
                return
            }
            console.log(data);
            setOrders(data || []) //if no orders than set this []
            console.log("Orders successfully fetched");

        }
        catch (err) {
            console.log("error while fetching the orders");
        }

    }

    const filteredOrders = orders.filter((o) => {
        if (filter === "all") return true //for default and as well as for "all" button behavior 
        let dateMatch = true
        const now = new Date(); // Date object
        const d = new Date(o.created_at) //orders created dates

        const previousMonth = now.getMonth() === 0 ? 11 : now.getMonth() - 1 //if month equal to jan, return 11 (For dec)
        const previousYear = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear()
        // console.log(d);
        // console.log(now);

        if (filter === "today") {
            dateMatch = d.toDateString() === now.toDateString()
        }

        if (filter === "month") {
            dateMatch = d.getMonth() === now.getMonth() &&
                d.getFullYear() === now.getFullYear() //both month and year have to be checked
        }

        if (filter === "last month") {
            dateMatch = d.getMonth() === previousMonth && d.getFullYear() === previousYear
        }

        let status = true
        if (orderStatus === "pending") {
            status = o.status !== "fulfilled" //updates every either false or true as we are using this logic in filter
        }

        if (orderStatus === "fulfilled") {
            status = o.status === "fulfilled"
        }
        return dateMatch && status
    })


    //every one time it will run just as it gets mount 
    useEffect(() => {
        FetchOrders();
    }, [])
    useEffect(() => {
        console.log(filter, "filter");
        console.log(filteredOrders);
        console.log(orders);


    }, [filter])
    return (
        <>
            <OrderContext.Provider value={{ orders, setOrders, filter, setFilter, filteredOrders, orderStatus, setOrderStatus }}>
                {children}
            </OrderContext.Provider>
        </>
    )
}
export const useOrderContext = () => useContext(OrderContext)
