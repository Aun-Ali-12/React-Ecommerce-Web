import { useProducts } from "../Context/ProductData"

function ProductCard() {
    const { productsData } = useProducts();
    console.log(productsData );

    return (
        <>
            <div>
                <ul className="flex gap-10 flex-wrap justify-around">
                    { 
                        productsData && productsData.map((d) => (
                            <li className="bg-gray-400 rounded flex items-center flex-col justify-center w-[22vw]" key={d.id}>
                                <img src={d.image[0]} alt="" width="200px" height="200px" />
                                <h2>{d.title}</h2>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </>
    )
}
export default ProductCard