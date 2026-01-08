import { useParams } from "react-router-dom"
import { useProducts } from "../Context/ProductData";
import { useCart } from "../Context/CartContext";
import { useState } from "react";


function ProductDetail() {
    const { id } = useParams(); //gets id of clicked product
    console.log(id);
    const { productsData } = useProducts();
    const { addToCart } = useCart();
     const [previewImg, setPreviewImg] = useState(null) //manages img preview

    const product = productsData.find(p => p.id === Number(id))
    // console.log(product);

    if (!product) {
        return `<p>${"Loading..."}</p>`
    }


    return (
        <>
            <div>
                <div>
                    <img src={previewImg || product.image[0]} alt={previewImg || product.image[0]} width="200px" height="200px" />
                </div>

                <h1>{product.title}</h1>
                {product.image.map((img, index) => (
                    <div key={index}>
                        <img src={img} onClick={() => { setPreviewImg(img) }} width="200px" height="200px" alt="" />
                    </div>
                ))
                }
                <p>{product.description}</p>
                <p>{product.price}</p>
                <button onClick={() => { addToCart(product) }}>Add to cart</button>
            </div>
        </>
    )
}
export default ProductDetail




//pic to show = 1 = a
//current pic = 1 = b
//start (a - 1) * b
//end (start + 1 )