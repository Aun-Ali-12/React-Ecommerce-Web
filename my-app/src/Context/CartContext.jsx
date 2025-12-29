import { createContext, useContext } from "react";

const CartContext = createContext()
export const CartProvider = ({ children }) => {

    const addToCart = (product) => {
        console.log(product);
    }

<CartContext.Provider value={{addToCart}}>
    {children}
</CartContext.Provider>
} 

export const useCart = () => useContext(CartContext)