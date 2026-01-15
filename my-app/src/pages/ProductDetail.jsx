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
        <div className="min-h-screen bg-gray-100 py-8 px-4 mt-10 md:mt-1">
            <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-sm p-6">
                <div className="flex flex-col md:flex-row gap-8">

                    {/* LEFT: Image Section */}
                    <div className="w-full md:w-1/2">
                        {/* Main Image */}
                        <div className="border rounded-lg p-4 flex justify-center">
                            <img
                                src={previewImg || product.image[0]}
                                alt={product.title}
                                className="w-full max-w-md h-72 object-contain"
                            />
                        </div>

                        {/* Thumbnail Images */}
                        <div className="flex gap-3 mt-4 overflow-x-auto">
                            {product.image.map((img, index) => (
                                <div
                                    key={index}
                                    onClick={() => setPreviewImg(img)}
                                    className={`
                  cursor-pointer border rounded-md p-1
                  ${previewImg === img || (!previewImg && img === product.image[0])
                                            ? "border-2 border-blue-600"
                                            : "border-gray-300"}
                `}
                                >
                                    <img
                                        src={img}
                                        alt=""
                                        className="w-20 h-20 object-contain"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT: Product Details */}
                    <div className="w-full md:w-1/2 text-black flex flex-col justify-between">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-semibold text-blue-700 mb-3">
                                {product.title}
                            </h1>

                            <p className="text-sm md:text-base text-gray-700 mb-4">
                                {product.description}
                            </p>

                            <p className="text-xl font-medium mb-6">
                                Price: ${product.price}
                            </p>
                        </div>

                        <button
                            onClick={() => addToCart(product)}
                            className="
              w-full md:w-fit
              px-8 py-3
              rounded-lg
              bg-blue-500 text-white font-medium
              hover:bg-blue-600 transition
            "
                        >
                            Add to Cart
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}
export default ProductDetail




//pic to show = 1 = a
//current pic = 1 = b
//start (a - 1) * b
//end (start + 1 )