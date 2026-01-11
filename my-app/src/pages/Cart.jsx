import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext"

function Cart() {
    const { cart, handleRemove, updateQty } = useCart();
    const navigate = useNavigate()
    // console.log(cart);

    return (
        <>
            <div><h1 className="text-blue-800">This is Cart</h1></div>
            {
                cart && cart.map((p) => (
                    <div key={p.id}>
                        <h1>{p.title}</h1>
                        <img src={p.image[0]} width="200px" />
                        <p>Item price: Rs{p.price}</p>
                        <p>quantity: {p.qty}</p>
                        <button onClick={() => { handleRemove(p.id) }}>remove</button><br />
                        <button onClick={() => { if (p.qty === 1) { handleRemove(p.id) }; updateQty(p.id, Number(p.qty) - 1, p.price) }}>-</button><br />
                        <button onClick={() => { updateQty(p.id, Number(p.qty) + 1, p.price) }}>+</button>
                        <p>Total Price:{p.price * p.qty}</p>
                    </div>
                ))
            }
            {cart.length > 0 ? (
                <button onClick={() => { if (cart.length > 0) { navigate('/checkout') } }}>Check out</button>
            ) :
                "Add something in your cart."
            } </>
    )
}
export default Cart