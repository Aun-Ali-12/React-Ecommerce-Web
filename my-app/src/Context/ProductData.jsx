import { createContext, use, useContext, useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";

const ProductContext = createContext() //empty box created, it will store whole Product table data

// Provider which will act as a fridge/hub to provide data
export const ProductProvider = ({ children }) => {

    const [productsData, setProductData] = useState([]); //state which stores all data
    const [loading, setLoading] = useState(false)

    //fetching products data from product table
    const fetchProducts = async () => {
        setLoading(true)
        try {
            const { data, error } = await supabase
                .from('product_table')
                .select('*')
                .order('created_at', { ascending: false })
            if (error) {
                console.log(error.message);
                setLoading(false)
                return
            }
            setProductData(data)
            setLoading(false)
        }
        catch (err) {
            console.log("error while fetching product in context");
        }
    }
    useEffect(() => {
        fetchProducts()
    }, [])
    return (
        <>
            <ProductContext.Provider value={{ productsData, fetchProducts, loading }}>
                {children}
            </ProductContext.Provider>
        </>
    )


}

export const useProducts = () => useContext(ProductContext);
