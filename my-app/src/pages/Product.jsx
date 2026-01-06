import ProductCard from "../components/ProductCard"
import ClothApi from "../services/FakeApi"
import { useProducts } from "../Context/ProductData"
import { Link } from "react-router-dom"
import { useCart } from "../Context/CartContext";


function Product() {
    const { productsData } = useProducts();
    const { addToCart } = useCart();
    // console.log(productsData);

    return (
        <>
            {productsData.map((p) => (
                <div key={p.id}>
                    <>
                        <Link key={p.id} to={`/products/${p.id}`}>
                            <ProductCard key={p.id} product={p} />
                        </Link>
                        <button onClick={() => { addToCart(p) }}>Add to cart</button>
                    </>
                </div>
            ))
            }

        </>
    )
}
export default Product