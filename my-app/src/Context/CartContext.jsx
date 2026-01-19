import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSession } from "./AuthContext";
import { useNavigate } from "react-router-dom";
const CartContext = createContext()
export const CartProvider = ({ children }) => {
    const { session } = useSession();
    const navigate = useNavigate();
    const user = session?.user;

    //state which will have empty array if there would nothing in local storage
    const [cart, setCart] = useState(() => { return JSON.parse(localStorage.getItem("cart")) || [] })

    //updates new cart addition in local storage as "cart" state changes:
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart))
    }, [cart])


    const addToCart = (product) => {
        if (!user) {
            toast.error("Session not found, First Login!", {
                position: "bottom-center",
                autoClose: 1000 //to autoclose notification
            })
            setTimeout(() => {
                navigate("/login")
            }, 2000);
            return;
        }

        toast.success('Added to cart')
        setCart((prev) => {
            // it will pass true only if it would have argument similar of the details cart has 
            const exists = prev.find(item => item.id === product.id)

            //if exists, check prev set card id and clicked card it if true then same item will be set and qty will + 1
            // for else part, item whose id didn't matched let it be remain same
            if (exists) {
                return prev.map((item) =>
                    item.id === product.id ? {
                        ...item, qty: item.qty + 1
                    } : item
                )
            }
            //if above condition is not true, then set prev values and clicked product with qty 1 
            return [...prev, { ...product, qty: 1 }]
        }
        )
    }

    //remove product 
    const handleRemove = (id) => {
        setCart(prev => prev.filter(item => item.id !== id))
    }

    //update qty  
    const updateQty = (id, qty) => {
        setCart(prev => prev.map(items =>
            items.id === id ? {
                ...items, qty
            } : items
        ))
    }

    return (
        <>
            <CartContext.Provider value={{ addToCart, cart, setCart, handleRemove, updateQty }}>
                {children}
            </CartContext.Provider>
        </>
    )
}

export const useCart = () => useContext(CartContext)