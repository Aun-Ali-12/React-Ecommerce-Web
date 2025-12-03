import { useEffect, useState } from "react"
import { supabase } from "../services/supabaseClient"

function Product() {
    const [apiData, setApiData] = useState([]) //here all apidata gets stored
    const [products, setProducts] = useState() //state which stores DB existing products

    //fetches api:
    useEffect(() => {
        async function fetchApi() {
            const response = await fetch('https://fakestoreapi.com/products/')
            // console.log(response);
            const products = await response.json()
            // console.log(products);
            setApiData(products)
            console.log(apiData);
        }
        fetchApi()
        insertApiData()
        fetchProduct()
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
            image: value.image,
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

    //fetching products from Database
    async function fetchProduct() {
        const { data, error } = await supabase
            .from('product_table')
            .select('*')
        if (error) {
            console.log(error.message);
            return
        }
        setProducts(data)
    }

    //runs when apiData changes
    useEffect(() => {
        console.log(apiData);
        console.log(products, "pro");
    }, [apiData])

    return (
        <>
            <div>
                <ul className="flex gap-10 flex-wrap justify-around">
                    {
                        products && products.map((d, index) => (
                            <li className="bg-gray-400 rounded flex items-center flex-col justify-center w-[22vw]" key={index}><img src={d.image} alt="" width="200px" height="200px" />
                                <h2>{d.title}</h2>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </>
    )
}
export default Product