import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard"
import { useProducts } from "../Context/ProductData"

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
            <h1 className="text-center text-3xl text-[] m-10">Electronics</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
                {
                    electronics && electronics.slice(0, 4).map((p, index) => (
                        <Link key={p.id} to={`/products/${p.id}`}>
                            <ProductCard key={index} product={p} type="hero" />
                        </Link>
                    ))
                }
            </div>

            {/* mens clothing hero section  */}
            <h1 className="text-center text-3xl text-[] m-10">Mens Clothing</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
                {
                    mensClothing && mensClothing.slice(0, 4).map((p, index) => (
                        <ProductCard key={index} product={p} type="hero" />
                    ))
                }
            </div>

            {/* women clothing hero section  */}
            <h1 className="text-center text-3xl text-[] m-10">Women clothing</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
                {
                    womensClothing && womensClothing.slice(0, 4).map((p, index) => (
                        <ProductCard key={index} product={p} type="hero" />
                    ))
                }
            </div>

            {/* electronics hero section  */}
            <h1 className="text-center text-3xl text-[] m-10">Jewelery</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
                {
                    jewelery && jewelery.slice(0, 4).map((p, index) => (
                        <ProductCard key={index} product={p} type="hero" />
                    ))
                }
            </div>
        </>
    )
}
export default Home