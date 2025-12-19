import { useEffect, useState } from "react"
import { supabase } from "../../services/supabaseClient"

function Listing() {

    const [productImg, setProductImg] = useState([]) //use state which handles file(product_img) input

    const handleImg = (e) => {
        const file = Array.from(e.target.files)

        //checks if file length is greater then 1, if yes then set file
        if (file.length > 0) {
            setProductImg((prev) =>
                [...prev, ...file]
            )
        }
    }


    const onRemove = (index) => {
        setProductImg((prev) => prev.filter((_, i) => i !== index))
    }

    useEffect(() => {
        console.log(productImg);
    }, [productImg])
    return (
        <>
            <h1>Product Listing</h1>
            <div>
                <div>enter product title<input type="text" /></div>
                <div>enter product description<input type="text" /></div>
                <div>enter product price<input type="number" /></div>
                <div>enter product image <input type="file" multiple accept="image/*" onChange={handleImg} /> </div>
                <div>{
                    productImg.map((file, index) => (
                        <div key={index}>
                            <img src={URL.createObjectURL(file)} alt={`preview-${index}`} width="200px" height="200px" />
                            <button onClick={() => { onRemove(index) }}>remove</button>
                        </div>
                    ))
                }</div>
                <div>enter product category<input type="text" /></div>
            </div>
        </>
    )
}
export default Listing