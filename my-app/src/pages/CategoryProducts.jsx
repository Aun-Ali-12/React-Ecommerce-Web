import { Link, useParams } from "react-router-dom"
import ProductCard from "../components/ProductCard"
import { useProducts } from "../Context/ProductData"
import SearchBar from "../components/SearchBar";
import SkeletonLoader from "../components/Skeleton";

function CategoryProducts() {
    const { productsData, loading } = useProducts(); //product context
    const { slug } = useParams(); //has that unique identifier in url

    //filters category wise product to render that particular category products only
    const filterCategoryProducts = productsData.filter(d => d.category.toLowerCase().replace(/\s/g, "-") === slug
    )
    console.log(filterCategoryProducts);


    return (
        <>
            <div>
                {/* search bar */}
                <div className="mt-20 w-[90vw] md:mt-10 ">
                    <SearchBar />
                </div>

                <h1 className="text-center text-3xl md:text-4xl font-bold text-blue-800 capitalize mt-10 md:mt-10">{slug}</h1>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 m-3 lg:grid-cols-4">
                    {
                        loading ? (
                            <SkeletonLoader count={8} />
                        )
                            : filterCategoryProducts.length === 0 ? (
                                <p>No Products Found</p>
                            )
                                : (
                                    filterCategoryProducts.map((p) => (
                                        <div key={p.id}>
                                            <Link key={p.id} to={`/category/${slug}/${p.id}`}>
                                                <ProductCard key={p.id} product={p} />
                                            </Link>
                                        </div>
                                    ))
                                )
                    }
                </div>
            </div>
        </>
    )
}
export default CategoryProducts