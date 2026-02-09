import { Link } from "react-router-dom";
import { useProducts } from "../Context/ProductData"
import ProductCard from "../components/ProductCard"
import SearchBar from "../components/SearchBar"
import SkeletonLoader from "../components/Skeleton";
import { useAuthCheck } from "../Context/AuthCheck"
import { useEffect } from "react";

function Home() {
    const { productsData } = useProducts();
    const { CheckAuth } = useAuthCheck();

useEffect(()=>{
CheckAuth();
}, [])

    const electronics = []
    const mensClothing = []
    const womensClothing = []
    const jewelery = []
    const splitProducts = productsData.forEach((value) => {
        switch (value.category) {
            case "electronics":
                electronics.push(value)
                break;
            case "jewelery":
                jewelery.push(value)
                break;
            case "men's clothing":
                mensClothing.push(value)
                break;
            case "women's clothing":
                womensClothing.push(value)
                break;
            default:
                break;
        }
    })


    return (
        <>
                {/* search bar */}
                <div className="mt-20 w-[90vw] md:mt-10 ">
                    <SearchBar />
                </div>

                {/* electronics hero section  */}
                <h1 className="text-center text-blue-800 text-3xl md:text-5xl font-bold mt-10 md:mt-10 capitalize">Electronics</h1>
                {electronics.length === 0 ? (
                    <SkeletonLoader count={4} />
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 m-3 lg:grid-cols-4">
                        {
                            electronics && electronics.slice(0, 4).map((p, index) => (
                                <Link key={p.id} to={`/products/${p.id}`}>
                                    <ProductCard key={index} product={p} type="hero" />
                                </Link>
                            ))
                        }
                    </div>
                )
                }

                {/* mens clothing hero section  */}
                <h1 className="text-center text-blue-800 text-3xl md:text-5xl font-bold m-10 capitalize">Men's Clothing</h1>
                {electronics.length === 0 ? (
                    <SkeletonLoader count={4} />
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 m-3 lg:grid-cols-4">
                        {
                            mensClothing && mensClothing.slice(0, 4).map((p, index) => (
                                <Link key={p.id} to={`/products/${p.id}`}>
                                    <ProductCard key={index} product={p} type="hero" />
                                </Link>
                            ))
                        }
                    </div>
                )
                }

                {/* women clothing hero section  */}
                <h1 className="text-center text-blue-800 text-3xl md:text-5xl font-bold m-10 capitalize">Women's clothing</h1>
                {electronics.length === 0 ? (
                    <SkeletonLoader count={4} />
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 m-3 lg:grid-cols-4">
                        {
                            womensClothing && womensClothing.slice(0, 4).map((p, index) => (
                                <Link key={p.id} to={`/products/${p.id}`}>
                                    <ProductCard key={index} product={p} type="hero" />
                                </Link>
                            ))
                        }
                    </div>
                )}

                {/* jwelery hero section  */}
                <h1 className="text-center text-blue-800 text-3xl md:text-5xl font-bold m-10 capitalize">Jewelery</h1>
                {electronics.length === 0 ? (
                    <SkeletonLoader count={4} />
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 m-3 lg:grid-cols-4">
                        {
                            jewelery && jewelery.slice(0, 4).map((p, index) => (
                                <Link key={p.id} to={`/products/${p.id}`}>
                                    <ProductCard key={index} product={p} type="hero" />
                                </Link>
                            ))
                        }
                    </div>
                )
                }
        </>
    )
}
export default Home