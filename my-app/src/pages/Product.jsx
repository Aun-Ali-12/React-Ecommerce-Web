import ProductCard from "../components/ProductCard"
import ClothApi from "../services/FakeApi"
import { useProducts } from "../Context/ProductData"
import { Link } from "react-router-dom"
import {useCart} from "../Context/CartContext";

function Product() {
    const { productsData } = useProducts();
    // const {addToCart} = useCart();
    console.log(productsData);

    return (
        <>
            <ClothApi />
            <div className="grid">
                {productsData.map((p) => (
                    <Link key={p.id} to={`/products/${p.id}`}>
                        <ProductCard key={p.id} product={p} />
                        {/* <button onClick={()=>{addToCart(p)}}>Add to cart</button> */}
                    </Link>
                ))
                }
            </div>
        </>
    )
}
export default Product