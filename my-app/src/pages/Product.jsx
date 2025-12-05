import { useEffect, useState } from "react"
import { supabase } from "../services/supabaseClient"
import ProductCard from "../components/ProductCard"
function Product() {
    return (
        <>
        <ProductCard />
        </>
    )
}
export default Product