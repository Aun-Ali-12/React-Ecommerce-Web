import { useState } from "react"
import { supabase } from "../../services/supabaseClient"
import { useEditContext } from "../../Context/EditListing"
import { useCategory } from "../../Context/Category"

function Listing() {
    const { editData, setEditData, isEditMode, resetEdit } = useEditContext() //importing from edit context
    const { categories } = useCategory()
    const [flag, setFlag] = useState(false) //handles rendering of listing feature
    const [productImg, setProductImg] = useState([]) //use state which handles file(product_img) input
    const [productDetails, setProductDetails] = useState(editData || {
        title: '',
        description: '',
        price: "",
        category: ''
    })

    //input through which we get file object
    const handleImg = (e) => {
        const file = Array.from(e.target.files)
        //checks if file length is greater then 1, if yes then set file
        if (file.length > 0) {
            setProductImg((prev) =>
                [...prev, ...file]
            )
        }
        else {
            setProductImg(file)
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
        let insertedProductId;
        // if (!productDetails.title || !productDetails.description || !productDetails.price || !productDetails.category) {
        //     alert("enter all fields")
        //     return
        // }
        //inserting product details in product table
        if (!isEditMode) {
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
                console.log(data.id);
                insertedProductId = data.id
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
                    let filePath = `${insertedProductId}/${crypto.randomUUID()}-${safeFileName}`

                    const { data: uploadFile, error } = await supabase
                        .storage
                        .from('product_image')
                        .upload(filePath, file)
                    if (error) {
                        console.log(error.message);
                    } else {
                        console.log(uploadFile);
                    }

                    //creating public url
                    try {
                        const { data } = supabase
                            .storage
                            .from('product_image')
                            .getPublicUrl(filePath)
                        url.push(data.publicUrl)
                    }
                    catch (err) {
                        console.log("error in creating url", err);
                    }
                }
                //inserting url in product table:
                const { error } = await supabase
                    .from('product_table')
                    .update({ image: url })
                    .eq('id', insertedProductId)
                if (error) {
                    console.log("error while updating", error.message);
                    return
                }
                console.log(insertedProductId);
            }
            catch (err) {
                console.log("error in uploading file", err);
            }
            console.log(url);
            setFlag(!flag)
            setProductImg([])
            alert("Product successfully listed.")

        }

        //on edit mode

        const newImgUrl = []
        if (isEditMode) {
            const existingImgs = editData.image || []
            try {
                for (const file of productImg) {
                    const newSafeFileName = file.name
                        .replace(/\s+/g, "_")       // spaces -> _
                        .replace(/[^\w.-]/g, "");  // remove special chars except . and -
                    const newFilePath = `${editData.id}${crypto.randomUUID()}-${newSafeFileName}`

                    const { data: uploadFile, error } = await supabase
                        .storage
                        .from('product_image')
                        .upload(newFilePath, file)
                    if (error) {
                        console.log(error.message);
                        return
                    } else {
                        console.log(uploadFile);
                    }
                    //generate url
                    const { data } = supabase
                        .storage
                        .from('product_image')
                        .getPublicUrl(newFilePath)
                    newImgUrl.push(data.publicUrl)
                }
            } catch (err) {
                console.log(err, "error while uploading and generating new file");
            }

            const mergeArray = [...existingImgs, ...newImgUrl]
            //update new url in db
            try {
                const { data, error } = await supabase
                    .from('product_table')
                    .update({ image: mergeArray })
                    .eq('id', editData.id)
                if (error) {
                    console.log("error while updating new image", error.message);
                    return
                }
                console.log("new image updated");

                //update all content in product table
                await supabase
                    .from("product_table")
                    .update({
                        title: productDetails.title,
                        description: productDetails.description,
                        price: productDetails.price,
                        category: productDetails.category
                    })
                    .eq("id", editData.id)
                resetEdit()
                setFlag(!flag)
                alert("Product updated successfully.")
            }
            catch (err) {
                console.log("error while updating info in product table");
            }
        }
    }

    const deletePictureFromStorage = async (index) => {
        const imageUrl = editData.image[index] //onclick remove that image url will be stored here
        const extractPath = imageUrl.split('/product_image/')[1] //extracting path from url to track deleted image path
        try {
            // delete from storage
            const { error } = await supabase
                .storage
                .from('product_image')
                .remove([extractPath])

            if (error) {
                console.log(error);
                return
            }
            console.log("image deleted in storage");

            //update state
            const updateImgs = editData.image.filter((_, path) => path !== index)
            setEditData({ ...editData, image: updateImgs })

            // DB update
            await supabase
                .from('product_table')
                .update({ image: updateImgs })
                .eq('id', editData.id)

            console.log("Image deleted successfully")
        }
        catch (err) {
            console.log("error while storing edit images");
        }
    }

    return (
        <>
            <h1 className="font-bold text-2xl">List product now</h1>
            <div><button onClick={() => { setFlag(!flag); if (flag) { resetEdit(); setProductImg([]) } }}>{!flag ? "Add" : "cross"}</button></div>
            {flag && (
                <div>
                    <div>enter product title<input type="text" name="title" onChange={handleChange} className="border border-gray-500" /></div>
                    <div>enter product description<input type="text" name="description" onChange={handleChange} className="border border-gray-500" /></div>
                    <div>enter product price<input type="number" name="price" onChange={handleChange} className="border border-gray-500" /></div>
                    <div>enter product image <input type="file" multiple accept="image/*" className="border border-gray-500" onChange={handleImg} /> </div>
                    {
                        isEditMode && editData?.image?.length > 0 && (
                            <div>
                                <h1>Existing Image</h1>
                                {
                                    editData.image.map((img, index) => (
                                        <div key={index}>
                                            <img src={img} width="200px" alt="" />
                                            <button onClick={() => deletePictureFromStorage(index)}>Remove</button>
                                        </div>
                                    ))

                                }
                            </div>
                        )
                    }
                    <div>{
                        productImg.map((file, index) => (
                            <div key={index}>
                                <img src={URL.createObjectURL(file)} alt={`preview-${index}`} width="200px" height="200px" />
                                <button onClick={() => { onRemove(index) }}>remove</button>
                            </div>
                        ))
                    }</div>
                    <div>
                        <select name="category" onChange={handleChange}>
                            <option disabled>select category</option>
                            {categories && categories.map((items, index) => (
                                <option key={index} value={items}>{items}</option>
                            ))}
                        </select>
                    </div>
                    {/* <div>enter product category<input type="text" name="category" onChange={handleChange} className="border border-gray-500" /></div> */}
                    <div><button className="bg-yellow-100" onClick={onAdd}>{isEditMode ? "Update product " : "Add product"}</button></div>
                </div >)
            }

        </>
    )
}
export default Listing