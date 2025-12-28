import { useEffect, useState } from "react"
import { supabase } from "../services/supabaseClient"
import ProductCard from "../components/ProductCard"
import ClothApi from "../services/FakeApi"
import {useProducts} from "../Context/ProductData"

function Product() {
    const {productsData} = useProducts()
    console.log(productsData);
    
    return (
        <>
            <ClothApi />
            <div className="grid">
                {productsData.map((p)=>(
                    <ProductCard key={p.id} product={p} />
                ))
                }
            </div>
        </>
    )
}
export default Product