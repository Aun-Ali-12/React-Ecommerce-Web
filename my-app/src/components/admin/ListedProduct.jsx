import { useProducts } from "../../Context/ProductData"

function ListedProduct() {
    const { productsData } = useProducts()
console.log(productsData);

    return (
        <>
            <h1>Your Listed Products</h1>
            {
                productsData&&productsData.map((d)=>(
                    <div key={d.id}>
                    <img src={d.image[0]} width="200px" />
                    <p>{d.title}</p>
                    </div>
                ))

            }

        </>
    )
}
export default ListedProduct