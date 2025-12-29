import { useParams } from "react-router-dom"
import { useProducts } from "../Context/ProductData";

function ProductDetail() {
    const { id } = useParams(); //gets id of clicked product
    console.log(id);
    const { productsData } = useProducts();

    const product = productsData.find(p => p.id === Number(id))
    console.log(product);

    if(!product){
        return `<p>Loading...</p>`
    }

    return (
        <>
        <div>
            <h1>{product.title}</h1>
            {product.image.map((img)=>(
                <img src={img} width="200px" height="200px" alt="" />
            ))
            }
            <p>{product.description}</p>
            <p>{product.price}</p>
        </div>
        </>
    )
}
export default ProductDetail