const SuggestionCard = ({ items, onSelect }) => {
    if (!items.length) return null;

    return (
        <>
            <ul className="flex items-center justify-between border border-2 bg-gray-400">
                {
                    items && items.map((value, index) => (
                        <li key={index} onClick={() => { onSelect(value.title) }}>
                            <img src={value.image[0]} alt={value.title} width="200px" height="200px" />
                            <p>{value.title}</p>
                        </li>
                    ))
                }
            </ul>
        </>
    )
}
export default SuggestionCard