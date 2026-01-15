import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext"

function Cart() {
    const { cart, handleRemove, updateQty } = useCart();
    const navigate = useNavigate()
    // console.log(cart);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-6 sm:py-10">
            <h1 className="text-xl sm:text-2xl font-semibold text-blue-800 mb-4 sm:mb-6">
                Your Cart
            </h1>

            {/* Cart Items */}
            <div className="w-full max-w-3xl flex flex-col gap-4 sm:gap-6 px-3 sm:px-0">
                {cart && cart.map((p) => (
                    <div
                        key={p.id}
                        className="
            bg-white rounded-xl border shadow-sm p-4 sm:p-5
            flex flex-col sm:flex-row gap-4 sm:gap-5
          "
                    >
                        {/* Product Image */}
                        <img
                            src={p.image[0]}
                            alt={p.title}
                            className="
              w-full sm:w-40
              h-48 sm:h-40
              object-contain
              mx-auto sm:mx-0
            "
                        />

                        {/* Product Details */}
                        <div className="flex-1 flex flex-col justify-between text-black">
                            <div>
                                <h2 className="text-base sm:text-lg font-medium mb-1">
                                    {p.title}
                                </h2>
                                <p className="text-sm">Item Price: $ {p.price}</p>
                                <p className="text-sm mt-1">
                                    Total: $ {p.price * p.qty}
                                </p>
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-4 mt-4">
                                <button
                                    onClick={() => {
                                        if (p.qty === 1) {
                                            handleRemove(p.id);
                                        } else {
                                            updateQty(p.id, p.qty - 1, p.price);
                                        }
                                    }}
                                    className="
                  px-3 py-1 rounded-md
                  bg-orange-500 text-white
                  hover:bg-orange-600 transition
                "
                                >
                                    −
                                </button>

                                <span className="font-medium">{p.qty}</span>

                                <button
                                    onClick={() => updateQty(p.id, p.qty + 1, p.price)}
                                    className="
                  px-3 py-1 rounded-md
                  bg-blue-500 text-white
                  hover:bg-blue-600 transition
                "
                                >
                                    +
                                </button>

                                <button
                                    onClick={() => handleRemove(p.id)}
                                    className="
                  sm:ml-auto
                  text-sm text-red-500
                  hover:underline
                "
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Checkout Section */}
            {cart.length > 0 ? (
                <button
                    onClick={() => navigate("/checkout")}
                    className="
          mt-6 sm:mt-8
          sm:w-auto
          px-6 sm:px-8
          py-3
          rounded-lg
          bg-blue-600 text-white font-medium
          hover:bg-blue-700 transition
        "
                >
                    Checkout
                </button>
            ) : (
                <p className="mt-10 text-gray-600">
                    Cart is empty.
                </p>
            )}
        </div>
    );
}
export default Cart