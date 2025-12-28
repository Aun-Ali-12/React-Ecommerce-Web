import { useParams } from "react-router-dom"
import ProductCard from "../components/ProductCard"
import { useProducts } from "../Context/ProductData"

function CategoryProducts() {
    const { productsData } = useProducts(); //product context
    const { slug } = useParams(); //has that unique identifier in url

    //filters category wise product to render that particular category products only
    const filterCategoryProducts = productsData.filter(d => d.category.toLowerCase().replace(/\s/g, "-") === slug
    )

    return (
        <>
            {
                filterCategoryProducts.map((p, index) => (
                    <ProductCard key={index} product={p} />
                ))
            }
        </>
    )
}
export default CategoryProducts