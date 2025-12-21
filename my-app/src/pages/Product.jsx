import { useEffect, useState } from "react"
import { supabase } from "../services/supabaseClient"
import ProductCard from "../components/ProductCard"
import ClothApi from "../services/FakeApi"

function Product() {
    return (
        <>
            <ClothApi />
            <ProductCard />
        </>
    )
}
export default Product