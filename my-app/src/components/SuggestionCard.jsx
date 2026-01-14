const SuggestionCard = ({ items, onSelect }) => {
    if (!items.length) return null;

    return (
        <>
            <ul
                className="
    grid
    grid-cols-1
    gap-3
    p-2
    bg-white
    border border-gray-200
    rounded-lg
    sm:grid-cols-1
    md:grid-cols-1
    max-h-[320px]
    overflow-y-auto
  "
            >
                {items &&
                    items.map((value, index) => (
                        <li
                            key={index}
                            onClick={() => onSelect(value.title)}
                            className="
          flex items-center gap-3
          p-3
          bg-white
          rounded-md
          cursor-pointer
          hover:bg-gray-100
          transition
        "
                        >
                            {/* Image */}
                            <img
                                src={value.image[0]}
                                alt={value.title}
                                className="
            w-16 h-16
            object-cover
            rounded-md
            flex-shrink-0
          "
                            />

                            {/* Text */}
                            <p
                                className="
            text-black
            text-sm
            font-medium
            line-clamp-2
          "
                            >
                                {value.title}
                            </p>
                        </li>
                    ))}
            </ul>

        </>
    )
}
export default SuggestionCard