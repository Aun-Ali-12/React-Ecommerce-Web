import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

function ClothApi() {
    const [apiData, setApiData] = useState([]) //here all apidata gets stored

    //fetches api:
    useEffect(() => {
        async function fetchApi() {
            const response = await fetch('https://fakestoreapi.com/products/')
            const products = await response.json()
            setApiData(products)
            console.log(apiData, "api data");
        }
        fetchApi()
        insertApiData()
    }, [])

    async function insertApiData() {
        //fetching existingproducts in DB
        const { data: existingProducts } = await supabase
            .from('product_table')
            .select('title')

        //filters those product which don't get matched with existing product in DB so they will be stored in DB
        const newProducts = apiData.filter(value => !existingProducts.some(e => e.title === value.title))

        //formatted shaped Data to store in DB
        const formattedData = newProducts.map((value) => ({
            title: value.title,
            description: value.description,
            price: value.price,
            image: [value.image],
            category: value.category,
            created_by: "fakeApi"
        }))

        try {
            //inserting api data into DB
            const { data, error } = await supabase
                .from('product_table')
                .insert(formattedData)

            if (error) {
                console.log(error.message);
                return
            }
            console.log(data, "api data inserted in db");

        }
        catch (err) {
            console.log("error while inserting api");
            console.log(err);
        }
    }
}
export default ClothApi