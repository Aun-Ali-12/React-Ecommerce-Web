import { Link, useSearchParams } from "react-router-dom"
import { useProducts } from "../Context/ProductData"
import ProductCard from "../components/ProductCard";

function Result() {
    const { productsData } = useProducts();
    const [params] = useSearchParams();
    const userSearch = params.get("q")

    const filterProducts = productsData.filter(d => d.title.toLowerCase().includes(userSearch.toLowerCase()))

    return (
        <>
            {filterProducts.length ?
                filterProducts.map((p, index) => (
                    <Link key={index} to={`/products/${p.id}`}><ProductCard product={p} /></Link>
                ))
                :
                "No search found"
            }
        </>
    )
}
export default Result