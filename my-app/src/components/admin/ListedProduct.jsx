import { useState } from "react";
import { useProducts } from "../../Context/ProductData"
import { supabase } from "../../services/supabaseClient";
import { useEditContext } from "../../Context/EditListing";
import Listing from "./Listing";

function ListedProduct() {
    const { setEditData } = useEditContext() //edit context setting data of product in it 
    const { productsData } = useProducts()
    const [editClicked, setEditClicked] = useState(false)

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
            <h1 className="text-2xl bg-red-600 w-fit p-2 rounded">Your Listed Products</h1>
            {
                productsData && productsData.map((d) => (
                    <div key={d.id}>
                        <img src={d.image[0]} width="200px" />
                        <p>{d.title}</p>
                        <button onClick={() => { handleDel(d.id) }}>del</button>
                        <button onClick={() => {
                            setEditData(d); console.log(d); setEditClicked(!editClicked)
                        }}>edit</button>
                    </div>
                ))
            }
            {
                setEditClicked && (
                    <Listing />
                )
            }
        </>
    )
}
export default ListedProduct