import { useProducts } from "../../Context/ProductData"
import { supabase } from "../../services/supabaseClient";

function ListedProduct() {
    const { productsData } = useProducts()
    console.log(productsData);

    const handleDel = async (productId) => {
        // console.log(id);

        try {
            const response = await supabase
                .from('product_table')
                .delete()
                .eq('id', productId)

            if (!response) {
                console.log("something is not okay while deleting");
                return
            }
            console.log("deleted");
        }
        catch (err) {
            console.log("error while deleting product", err);

        }
    }


    return (
        <>
            <h1>Your Listed Products</h1>
            {
                productsData && productsData.map((d) => (
                    <div key={d.id}>
                        <img src={d.image[0]} width="200px" />
                        <p>{d.title}</p>
                        <button onClick={() => { handleDel(d.id) }}>del</button>
                        <button>edit</button>
                    </div>
                ))

            }
        </>
    )
}
export default ListedProduct