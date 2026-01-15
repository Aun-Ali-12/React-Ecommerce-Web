import { Link, useParams } from "react-router-dom"
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
            <h1 className="text-center text-3xl md:text-4xl font-bold text-blue-800 capitalize mt-20 md:mt-10">{slug}</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 m-3 lg:grid-cols-4">
                {
                    filterCategoryProducts.map((p) => (
                        <div>
                            <Link key={p.id} to={`/category/${slug}/${p.id}`}>
                                <ProductCard key={p.id} product={p} />
                            </Link>
                            {/* <button onClick={() => { addToCart(p) }}>Add to Cart</button> */}
                        </div>
                    ))
                }
            </div>
        </>
    )
}
export default CategoryProducts