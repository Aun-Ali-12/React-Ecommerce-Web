import { useState } from "react"
import { useNavigate } from "react-router-dom";

function SearchBar() {
    const [userSearch, setUserSearch] = useState("");

    const navigate = useNavigate();

    //just sends user to result page
    const handleSubmit = () => {
        if (!userSearch.trim()) return;
        navigate(`/search?q=${userSearch}`)
    }

    return (
        <>
            <input className="border border-2" onChange={(e) => { setUserSearch(e.target.value) }} type="text" />
            <button onClick={handleSubmit}>Search</button>
        </>
    )
}
export default SearchBar