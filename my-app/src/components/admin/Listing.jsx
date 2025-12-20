import { useEffect, useState } from "react"
import { supabase } from "../../services/supabaseClient"

function Listing() {

    const [flag, setFlag] = useState(false) //handles rendering of listing feature
    const [productImg, setProductImg] = useState([]) //use state which handles file(product_img) input
    const [productDetails, setProductDetails] = useState({
        title: '',
        description: '',
        price: "",
        category: ''
    })
    const [productId, setProductId] = useState("") //product id


    //input through which we get file object
    const handleImg = (e) => {
        const file = Array.from(e.target.files)
        //checks if file length is greater then 1, if yes then set file
        if (file.length > 0) {
            setProductImg((prev) =>
                [...prev, ...file]
            )
        }
    }

    //function use to remove picture on frontend
    const onRemove = (index) => {
        setProductImg((prev) => prev.filter((_, i) => i !== index))
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setProductDetails((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    //on button(add product) click
    const onAdd = async () => {

        //getting user session (to check is it admin)
        const { data: { user } } = await supabase.auth.getUser()
        let admin = user.id //user id

        // if (!productDetails.title || !productDetails.description || !productDetails.price || !productDetails.category) {
        //     alert("enter all fields")
        //     return
        // }
        //inserting product details in product table
        try {
            const { data, error } = await supabase
                .from('product_table')
                .insert({
                    title: productDetails.title,
                    description: productDetails.description,
                    price: productDetails.price,
                    category: productDetails.category,
                    created_by: admin,
                })
                .select()
                .single()
            if (error) {
                console.log("product not inserted", error.message);
                return
            }
            setProductId(data.id)

        }
        catch (err) {
            console.log("Error while inserting productdetails in product table");
        }

        //uploading file into storage:
        const url = []
        try {
            for (const file of productImg) {
                const safeFileName = file.name
                    .replace(/\s+/g, "_")       // spaces -> _
                    .replace(/[^\w.-]/g, "");  // remove special chars except . and -
                let filePath = `${productId}/${crypto.randomUUID()}-${safeFileName}`

                const { data: uploadFile, error } = await supabase
                    .storage
                    .from('product_image')
                    .upload(filePath, file)
                if (error) {
                    console.log(error.message);
                } else {
                    console.log(uploadFile);
                }

                //creating signed url
                try {
                    const { data, error } = await supabase
                        .storage
                        .from('product_image')
                        .createSignedUrl(filePath, 60 * 60)

                    if (error) {
                        console.log(error.message);
                        return
                    }
                    console.log(data.signedUrl);
                    url.push(data.signedUrl)
                }
                catch (err) {
                    console.log("error in creating url", err);

                }
            }
            //inserting url in product table:
            const { data, error } = await supabase
                .from('product_table')
                .update({image: url})
                .eq('id', productId)
            if (error) {
                console.log("error while updating", error.message);
                return
            }
            console.log(data);
        }
        catch (err) {
            console.log("error in uploading file", err);
        }
        console.log(url);
    }


    useEffect(() => {
        console.log(productImg);
        console.log(productDetails);
    }, [productDetails])
    return (
        <>
            <h1>Product Listing</h1>
            <div><button onClick={() => { setFlag(!flag) }}>{!flag ? "Add" : "cross"}</button></div>
            {flag && (
                <div>
                    <div>enter product title<input type="text" name="title" onChange={handleChange} className="border border-gray-500" /></div>
                    <div>enter product description<input type="text" name="description" onChange={handleChange} className="border border-gray-500" /></div>
                    <div>enter product price<input type="number" name="price" onChange={handleChange} className="border border-gray-500" /></div>
                    <div>enter product image <input type="file" multiple accept="image/*" className="border border-gray-500" onChange={handleImg} /> </div>
                    <div>{
                        productImg.map((file, index) => (
                            <div key={index}>
                                <img src={URL.createObjectURL(file)} alt={`preview-${index}`} width="200px" height="200px" />
                                <button onClick={() => { onRemove(index) }}>remove</button>
                            </div>
                        ))
                    }</div>
                    <div>enter product category<input type="text" name="category" onChange={handleChange} className="border border-gray-500" /></div>
                    <div><button className="bg-yellow-100" onClick={onAdd}>Add product</button></div>
                </div>)
            }

        </>
    )
}
export default Listing

//file input leleiya
//remove ka option on fe
//backend mn file upload 
