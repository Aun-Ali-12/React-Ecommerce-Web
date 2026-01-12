//Handles Card UI structure
const ProductCard = ({ product, type }) => {
    const { title, image, price } = product;

    return (
        <>
            <div
                className={`
    group
    ${type === "hero"
                        ? `
        bg-white rounded-2xl 
        p-4 sm:p-5 md:p-6
        shadow-lg hover:shadow-2xl 
        transition-all duration-300 
        hover:-translate-y-1
        flex flex-col items-center text-center
        border border-gray
      `
                        : ""
                    }
  `}
            >
                <div className="w-full flex justify-center mb-3 sm:mb-4">
                    <img
                        className={`
      ${type === "hero"
                                ? `
          w-[38vw] h-[22vh]
          sm:w-[30vw] sm:h-[24vh]
          md:w-[14vw] md:h-[26vh]
          object-contain
          transition-transform duration-300
          group-hover:scale-105
        `
                                : ""
                            }
    `}
                        src={Array.isArray(image) ? image[0] : image}
                        alt={title}
                    />
                </div>
                <h1 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 line-clamp-1 w-[20vw]">
                    {title}
                </h1>
                <p className="text-base sm:text-lg md:text-xl font-bold text-orange-500 mt-1 sm:mt-2">
                    ${price}
                </p>
                <button
                    className="
    mt-3 sm:mt-4
    bg-blue-600 text-white
    py-1.5 sm:py-1.5 px-3
    text-sm sm:text-base
    rounded-xl
    hover:bg-blue-700
    transition-all duration-300
    active:scale-95
  "
                >
                    View Product
                </button>

            </div>
        </>
    )
};

export default ProductCard;