import ProductCard from "../components/ProductCard"
import { useProducts } from "../Context/ProductData"
import { Link } from "react-router-dom"
import { useEffect, useMemo, useState } from "react";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import SkeletonLoader from "../components/Skeleton";


function Product() {
    const { productsData } = useProducts();
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

            <div className="mt-10">
                <SearchBar />
                <div className="flex items-center gap-2">
                    {/* Filter Icon */}
                    <div className="flex items-center justify-center text-xl w-10 h-10 text-blue-500 mt-5 cursor-pointer">
                        <FontAwesomeIcon icon={faFilter} />
                    </div>

                    {/* Select Dropdown */}
                    <select
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="border border-blue-400 onfocus:outline-none rounded-md px-3 py-2 w-[20vw] md:w-[8vw] bg-white text-black cursor-pointer mt-5"
                    >
                        <option value="">All</option>
                        <option value="low-high">Low to high</option>
                        <option value="high-low">High to low</option>
                    </select>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 m-3 lg:grid-cols-4">
                    {sortedProducts.length === 0 ? (
                        <SkeletonLoader count={Items_per_page} />
                    ) : (
                        PaginationProducts.map((p) => (
                            <div key={p.id}>
                                <>
                                    <Link key={p.id} to={`/products/${p.id}`}>
                                        <ProductCard product={p} />
                                    </Link>
                                </>
                            </div>
                        )))
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
            </div>
        </>
    )
}
export default Product