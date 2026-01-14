import { Link } from "react-router-dom";
import { useProducts } from "../Context/ProductData"
import ProductCard from "../components/ProductCard"

function Home() {
    const { productsData } = useProducts();

    const electronics = []
    const mensClothing = []
    const womensClothing = []
    const jewelery = []
    const splitProducts = productsData.forEach((value, index, element) => {
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
            {/* electronics hero section  */}
            <h1 className="text-center text-3xl md:text-5xl font-bold mt-20 capitalize">Electronics</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 m-3 lg:grid-cols-4">
                {
                    electronics && electronics.slice(0, 4).map((p, index) => (
                        <Link key={p.id} to={`/products/${p.id}`}>
                            <ProductCard key={index} product={p} type="hero" />
                        </Link>
                    ))
                }
            </div>

            {/* mens clothing hero section  */}
            <h1 className="text-center text-3xl md:text-5xl font-bold m-10 capitalize">Men's Clothing</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 m-3 lg:grid-cols-4">
                {
                    mensClothing && mensClothing.slice(0, 4).map((p, index) => (
                        <Link key={p.id} to={`/products/${p.id}`}>
                            <ProductCard key={index} product={p} type="hero" />
                        </Link>
                    ))
                }
            </div>

            {/* women clothing hero section  */}
            <h1 className="text-center text-3xl md:text-5xl font-bold m-10 capitalize">Women's clothing</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 m-3 lg:grid-cols-4">
                {
                    womensClothing && womensClothing.slice(0, 4).map((p, index) => (
                        <Link key={p.id} to={`/products/${p.id}`}>
                            <ProductCard key={index} product={p} type="hero" />
                        </Link>
                    ))
                }
            </div>

            {/* electronics hero section  */}
            <h1 className="text-center text-3xl md:text-5xl font-bold m-10 capitalize">Jewelery</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 m-3 lg:grid-cols-4">
                {
                    jewelery && jewelery.slice(0, 4).map((p, index) => (
                        <Link key={p.id} to={`/products/${p.id}`}>
                            <ProductCard key={index} product={p} type="hero" />
                        </Link>
                    ))
                }
            </div>
        </>
    )
}
export default Home