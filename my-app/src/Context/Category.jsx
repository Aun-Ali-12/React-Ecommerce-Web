import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";

const CategoryContext = createContext()
export const CategoryProvider = ({ children }) => {
    const [categories, setCategories] = useState([]) //stores unique category

    //fetch category from supabase:
    const fetchCategories = async () => {

        try {
            const { data, error } = await supabase
                .from('product_table')
                .select('category')
            if (error) {
                console.log(error.message);
                return
            }

            //extracts unique category
            const uniqueCategory = [...new Set(
                data
                    .map(items => items.category)
                    .filter(Boolean)
            )]

            const categoriesWithSlug = uniqueCategory.map((catName, index) => ({
                id: index + 1,
                category: catName,
                slug: catName.toLowerCase().replace(/\s+/g, "-")
            }))
            setCategories(categoriesWithSlug)
            console.log(categoriesWithSlug);
        }
        
        catch (err) {
            console.log("error while fetching product in category context", err);
        }
    }

    //calls category one time
    useEffect(() => {
        fetchCategories();
    }, [])

    return (
        <>
            <CategoryContext.Provider value={{ categories, fetchCategories }}>
                {children}
            </CategoryContext.Provider>
        </>
    )
}

//hook which will be used globally
export const useCategory = () => useContext(CategoryContext)