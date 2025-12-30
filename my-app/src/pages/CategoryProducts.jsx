import { Link, useParams } from "react-router-dom"
import ProductCard from "../components/ProductCard"
import { useProducts } from "../Context/ProductData"
import { useCart } from "../Context/CartContext";

function CategoryProducts() {
    const { addToCart } = useCart();
    const { productsData } = useProducts(); //product context
    const { slug } = useParams(); //has that unique identifier in url

    //filters category wise product to render that particular category products only
    const filterCategoryProducts = productsData.filter(d => d.category.toLowerCase().replace(/\s/g, "-") === slug
    )

    return (
        <>
            {
                filterCategoryProducts.map((p) => (
                    <div key={p.id}>
                        <Link key={p.id} to={`/category/${slug}/${p.id}`}>
                            <ProductCard key={p.id} product={p} />
                        </Link>
                        <button onClick={() => { addToCart(p) }}>Add to Cart</button>
                    </div>
                ))
            }
        </>
    )
}
export default CategoryProducts