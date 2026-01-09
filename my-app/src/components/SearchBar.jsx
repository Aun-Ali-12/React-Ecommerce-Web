import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useProducts } from "../Context/ProductData"
import SuggestionCard from "./SuggestionCard";


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
            <input className="border border-2" onChange={(e) => { setUserSearch(e.target.value); setSugesstions(true) }} type="text" placeholder="Search here" />
            <button onClick={handleSubmit}>Search</button>
            <SuggestionCard
                items={filterSugesstions}
                onSelect={(value) => {
                    setUserSearch(value)
                    console.log(value);
                    navigate(`/search?q=${value}`)
                }}
            />
        </>
    )
}
export default SearchBar