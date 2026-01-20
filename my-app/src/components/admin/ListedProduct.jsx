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
            <div className="flex flex-col space-y-6">
                {productsData && productsData.map((d) => (
                    <div
                        key={d.id}
                        className="flex flex-col md:flex-row items-start bg-white p-4 rounded shadow hover:shadow-lg transition-shadow duration-200"
                    >
                        {/* Product Image */}
                        <img
                            src={d.image[0]}
                            alt={d.title}
                            className="w-full md:w-48 h-48 object-cover rounded mb-4 md:mb-0 md:mr-6"
                        />

                        {/* Product Info */}
                        <div className="flex-1 flex flex-col justify-between w-full">
                            <p className="text-black font-semibold text-lg mb-4">{d.title}</p>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-4">
                                <button
                                    onClick={() => handleDel(d.id)}
                                    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition-colors duration-200"
                                >
                                    Delete
                                </button>

                                <button
                                    onClick={() => {
                                        setEditData(d);
                                        console.log(d);
                                        setEditClicked(!editClicked);
                                    }}
                                    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition-colors duration-200"
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Edit Component */}
                {editClicked && <Listing />}
            </div>

        </>
    )
}
export default ListedProduct