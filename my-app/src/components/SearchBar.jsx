import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useProducts } from "../Context/ProductData"
import SuggestionCard from "./SuggestionCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


function SearchBar() {
    const { productsData } = useProducts();
    const [userSearch, setUserSearch] = useState("");
    const [suggestions, setSugesstions] = useState(false);
    const navigate = useNavigate();

    //just sends user to result page
    const handleSubmit = () => {
        if (!userSearch.trim()) return;
        navigate(`/search?q=${userSearch}`)
    }

    //filter suggestion 
    const filterSugesstions = userSearch ? productsData
        .filter(q =>
            q.title.toLowerCase().includes(userSearch.toLowerCase()) ||
            q.description.toLowerCase().includes(userSearch.toLowerCase())
        )
        .slice(0, 4)
        :
        []
    console.log(filterSugesstions);

    return (
        <>
            <div className="relative w-full max-w-3xl mx-auto">
                {/* Search Input + Button */}
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        placeholder="Search here"
                        value={userSearch}
                        onChange={(e) => {
                            setUserSearch(e.target.value);
                            setSugesstions(true);
                        }}
                        className="
            w-full
            px-4 py-2
            text-black
            bg-white
            border border-gray-300
            rounded-lg outline-none
            focus:ring-2 focus:ring-blue-500
            transition-all duration-[1s] ease-in-out
          "
                    />

                    <button
                        onClick={handleSubmit}
                        className="
            px-5 py-2
            bg-blue-600
            text-white
            font-medium
            rounded-lg
            hover:bg-blue-700
            transition
            whitespace-nowrap
          "
                    >
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </div>

                {/* Suggestions Dropdown */}
                {suggestions && filterSugesstions.length > 0 && (
                    <div
                        className="
            absolute
            top-full
            left-0
            w-full
            mt-2
            bg-white
            border border-gray-200
            rounded-lg
            shadow-lg
            z-50
          "
                    >
                        <SuggestionCard
                            items={filterSugesstions}
                            onSelect={(value) => {
                                setUserSearch(value);
                                setSugesstions(false);
                                navigate(`/search?q=${value}`);
                            }}
                        />
                    </div>
                )}
            </div>
        </>
    )
}
export default SearchBar