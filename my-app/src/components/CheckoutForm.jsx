import React, { useEffect, useState } from "react";
import { useCart } from "../Context/CartContext";
import { supabase } from "../services/supabaseClient";

function CheckoutForm() {
    const { cart } = useCart(); //useCart context
    const [user, setUser] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    })
    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0)

    const handleChange = (e) => {
        const { name, value } = e.target
        setUser(prev => ({
            ...prev,
            [name]: value
        }))
    }

    //On click place order
    const handleCheckout = async () => {
        //order detail in object:
        const order = {
            customer_name: user.name,
            customer_email: user.email,
            phone: user.phone,
            address: user.address,
            items: cart,
            total_price: total,
            status: "pending",
        }

        //insert order detail in supabase:
        try {
            const { error } = await supabase
                .from('orders')
                .insert([order])

            if (error) {
                alert("Error while adding placing order.", error.message)
                return
            }
            alert("Order placed successfully")
        }
        catch (err) {
            alert("Error while placing order",)
        }
    }

    useEffect(() => {
        console.log(user);
    }, [user])

    return (
        <>
            <div>Checkout Form</div>
            <div>{
                cart && cart.map((item, index) => (
                    <div key={index}>
                        <img src={Array.isArray(item.image) ? item.image[0] : item.image} alt={item.title} width="80px" />
                        <p>{item.title} x {item.qty}</p>
                    </div>
                ))
            }
            <p>Total: {total}rs</p>
            </div>
            {/* user details  */}
            <div>
                Enter your name: <input type="text" name="name" onChange={() => { handleChange }} /> <br />
                Enter your email: <input type="email" name="email" onChange={() => { handleChange }} /> <br />
                Enter your phone: <input type="number" name="phone" onChange={() => { handleChange }} /> <br />
                Enter your address: <input type="text" name="address" onChange={() => { handleChange }} />
                <button onClick={() => { handleCheckout() }}>Checkout</button>
            </div>
        </>
    )
}
export default CheckoutForm