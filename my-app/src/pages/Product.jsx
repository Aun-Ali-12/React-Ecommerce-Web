import ProductCard from "../components/ProductCard"
import { useProducts } from "../Context/ProductData"
import { Link } from "react-router-dom"
import { useCart } from "../Context/CartContext";
import { useEffect, useMemo, useState } from "react";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";


function Product() {
    const { productsData } = useProducts();
    const { addToCart } = useCart();
    const [sortOrder, setSortOrder] = useState("") //stores the clicked value for low to hight and high to low option
    const [currentPage, setCurrentPage] = useState(1) //shows current product page
    const Items_per_page = 8 //max length of page to show 


    useEffect(() => {
        setCurrentPage(1)
    }, [sortOrder])

    const sortedProducts = useMemo(() => {
        if (!sortOrder) return productsData;

        return [...productsData].sort((a, b) => {
            if (sortOrder === "low-high") return a.price - b.price
            if (sortOrder === "high-low") return b.price - a.price
            return 0
        })
    }, [productsData, sortOrder])


    const PaginationProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * Items_per_page
        const endIndex = startIndex + Items_per_page
        return sortedProducts.slice(startIndex, endIndex)
    }, [sortedProducts, currentPage])

    return (
        <>

            <SearchBar />
            <div>
                Filter
                <select onChange={(e) => { setSortOrder(e.target.value) }}>
                    <option value="">All</option>
                    <option value="low-high">Low to high</option>
                    <option value="high-low">high to low</option>
                </select>

            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 m-3 lg:grid-cols-4">
                {PaginationProducts.map((p) => (
                    <div key={p.id}>
                        <>
                            <Link key={p.id} to={`/products/${p.id}`}>
                                <ProductCard product={p} />
                                <button onClick={() => { addToCart(p) }}>Add to cart</button>
                            </Link>
                        </>
                    </div>
                ))
                }
            </div>
            <div>
                <Pagination
                    currentPage={currentPage}
                    itemsPerPage={Items_per_page}
                    totalItems={sortedProducts.length}
                    onPageChange={setCurrentPage}
                />
            </div>

        </>
    )
}
export default Product