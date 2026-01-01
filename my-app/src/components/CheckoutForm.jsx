import { useEffect, useState } from "react";
import { useCart } from "../Context/CartContext";
import { supabase } from "../services/supabaseClient";

function CheckoutForm() {
    const { cart } = useCart(); //useCart context
    const [userDetail, setUserDetail] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    })
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
        //order detail in object:

        // get login user
        const { data: { user } } = await supabase.auth.getUser()
        const userId = user.id

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
            const { error } = await supabase
                .from('orders')
                .insert([order])

            if (error) {
                alert("Error while adding placing order.", error.message)
                console.log(error.message);
                // console.log(user);
                console.log(order);

                return
            }
            alert("Order placed successfully")
        }
        catch (err) {
            alert("Error while placing order", err)
        }
    }

    useEffect(() => {
        console.log(userDetail);
    }, [userDetail])

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
                Enter your name: <input type="text" name="name" value={userDetail.name} onChange={handleChange} /> <br />
                Enter your email: <input type="email" name="email" value={userDetail.email} onChange={handleChange} /> <br />
                Enter your phone: <input type="number" name="phone" value={userDetail.phone} onChange={handleChange} /> <br />
                Enter your address: <input type="text" name="address" value={userDetail.address} onChange={handleChange} />
                <button onClick={() => { handleCheckout() }}>Checkout</button>
            </div>
        </>
    )
}
export default CheckoutForm