import { useEffect, useState } from "react";
import { useCart } from "../Context/CartContext";
import { supabase } from "../services/supabaseClient";
import { toast } from "react-toastify";

function CheckoutForm() {
    const { cart, setCart } = useCart(); //useCart context
    const initialUserDetails = {
        name: '',
        email: '',
        phone: '',
        address: ''
    }
    const [userDetail, setUserDetail] = useState(initialUserDetails)
    const total = cart.reduce((sum, item) => sum + Number(item.price) * Number(item.qty), 0)

    const handleChange = (e) => {
        const { name, value } = e.target
        setUserDetail(prev => ({
            ...prev,
            [name]: value
        }))
    }

    //On click place order
    const handleCheckout = async () => {

        // get login user
        const { data: { user } } = await supabase.auth.getUser()
        const userId = user.id

        //order detail in object:
        const order = {
            user_id: userId,
            customer_name: userDetail.name,
            customer_email: userDetail.email,
            phone: userDetail.phone,
            address: userDetail.address,
            items: cart,
            total_price: total,
            status: "pending",
        }

        //insert order detail in supabase:
        try {
            console.log(user);
            const { error } = await supabase
                .from('orders')
                .insert([order])

            if (error) {
                alert("Error while adding placing order.", error.message)
                console.log(error.message);
                return
            }
            toast.success('Order has been successfully placed.')
            setCart([])
            setUserDetail(initialUserDetails)
        }
        catch (err) {
            alert("Error while placing order in catch", err)
        }
    }

    useEffect(() => {
        console.log(userDetail);
    }, [userDetail])

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-2xl font-semibold text-blue-800 mb-6">
                    Checkout
                </h1>

                <div className="flex flex-col md:flex-row gap-6">

                    {/* LEFT: Cart Summary */}
                    <div className="w-full md:w-1/2 bg-white rounded-xl border shadow-sm p-5">
                        <h2 className="text-lg font-medium text-black mb-4">
                            Order Summary
                        </h2>

                        <div className="flex flex-col gap-4">
                            {cart && cart.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-4 text-black"
                                >
                                    <img
                                        src={Array.isArray(item.image) ? item.image[0] : item.image}
                                        alt={item.title}
                                        className="w-16 h-16 object-contain border rounded-md"
                                    />

                                    <p className="text-sm flex-1">
                                        {item.title} <span className="font-medium">× {item.qty}</span><br />
                                        Per Item: ${item.price}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="border-t mt-4 pt-4">
                            <p className="text-base font-medium text-black">
                                Total: <span className="font-semibold">${total}</span>
                            </p>
                        </div>
                    </div>

                    {/* RIGHT: User Details Form */}
                    <div className="w-full md:w-1/2 bg-white rounded-xl border shadow-sm p-5">
                        <h2 className="text-lg font-medium text-black mb-4">
                            Customer Details
                        </h2>

                        <div className="flex flex-col gap-4 text-black">
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter your name"
                                value={userDetail.name}
                                onChange={handleChange}
                                className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />

                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={userDetail.email}
                                onChange={handleChange}
                                className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />

                            <input
                                type="number"
                                name="phone"
                                placeholder="Enter your phone"
                                value={userDetail.phone}
                                onChange={handleChange}
                                className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />

                            <input
                                type="text"
                                name="address"
                                placeholder="Enter your address"
                                value={userDetail.address}
                                onChange={handleChange}
                                className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />

                            <button
                                onClick={handleCheckout}
                                className="
                mt-2
                w-full
                px-6 py-3
                rounded-lg
                bg-blue-500 text-white font-medium
                hover:bg-blue-600 transition
              "
                            >
                                Place Order
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );

}
export default CheckoutForm