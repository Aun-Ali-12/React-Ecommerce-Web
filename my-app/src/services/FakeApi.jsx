import { useState, useEffect, useRef } from "react";
import { supabase } from "./supabaseClient";

function ClothApi() {
    const [apiData, setApiData] = useState([]) //here all apidata gets stored

    const didFetch = useRef(false)
    //fetch api and set all data in state
    useEffect(() => {
        if (didFetch.current) return;
        didFetch.current = true;
        async function fetchApi() {
            const response = await fetch('https://fakestoreapi.com/products/')
            const products = await response.json()
            console.log(products);
            setApiData(products)

            //fetch product
            const { data: existingProducts } = await supabase
                .from('product_table')
                .select('title')

            //filter new product (and checks in both cond either db is empty or with data)
            const newProducts = await products.filter((i) => !((existingProducts || []).some(e => e.title.toLowerCase().trim() === i.title.toLowerCase().trim())))
            console.log(newProducts);

            //duplicate insertion avoid:
            if (newProducts.length === 0) {
                console.log("No new product found");
                return;
            }

            await Promise.all(
                newProducts.map(async (product) => {
                    let productId;
                    //stores image of every product one by one
                    const imgRes = await fetch(product.image) //fetch image url
                    console.log(imgRes);
                    //converts image into blob
                    const blob = await imgRes.blob()
                    console.log(blob, "blob");

                    //upload product data in product table:
                    const productDetails =
                    {
                        title: product.title,
                        description: product.description,
                        price: product.price,
                        category: product.category,
                        created_by: "fakeApi"
                    }
                    console.log(productDetails);

                    //inserting product data in product table
                    try {
                        const { data, error } = await supabase
                            .from('product_table')
                            .insert(productDetails)
                            .select()
                            .single()

                        if (error) {
                            console.log(error.message);
                            return
                        }
                        productId = data.id
                        console.log("product is inserted");
                    }
                    catch (err) {
                        console.log("Error while inserting product in Ptable");
                    }
                    //upload img in supabase:
                    const imagePath = `${productId}`
                    try {
                        const { data: UploadData, error: UploadErr } = await supabase
                            .storage
                            .from('product_image')
                            .upload(imagePath, blob)

                        if (UploadErr) {
                            console.log(UploadData.message);
                            return
                        }
                        console.log("Img uploaded");
                    }
                    catch (err) {
                        console.log("Error while uploading");
                    }

                    //get url
                    let url = [];
                    try {
                        const { data, error } = supabase
                            .storage
                            .from('product_image')
                            .getPublicUrl(imagePath)
                        if (error) {
                            console.log("error while getting url", error.message);
                            return
                        }
                        console.log("url got");
                        url.push(data.publicUrl)
                    }
                    catch (err) {
                        console.log("Error while getting url");
                    }

                    //updating data
                    try {
                        const { error } = await supabase
                            .from('product_table')
                            .update({ image: url })
                            .eq('id', Number(productId))

                        if (error) {
                            console.log(error.message);
                            return
                        }
                        console.log("Update successful");
                    }
                    catch (err) {
                        console.log("error while updating");
                    }
                })
            )
        }


        fetchApi()
    }, [])
}
export default ClothApi