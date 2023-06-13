import { createContext } from "react"
import { getProducts, getSpecificProduct } from "../fetchcalls/fetchCalls";
import { useState } from "react";

export const CartContext = createContext({
    items: [],
    getProductQuantity: () => { },
    addOneToCart: () => { },
    removeOneFromCart: () => { },
    deleteFromCart: () => { },
    getTotalCost: () => { },
    addObjToCart: () => {}
})

export const ShoppingCart = ({ children }) => {
    
    const [cartProducts, setCartProducts] = useState([]);

    // [ {  id: 1, quantity: 2 } ]= cart

    const getProductQuantity = (id) => {
       const quantity = cartProducts.find(product => product.id === id)?.quantity

       if(quantity === undefined) {
            return 0;
       }
       return quantity;
    }

    

    const addOneToCart = (id, product) => {
        const quantity = getProductQuantity(id);

        if(quantity === 0) {
            setCartProducts(
                [
                    ...cartProducts,
                    {
                        id: id,
                        quantity: 1,
                        product: product
                    }
                ]
            )
        } else {
            setCartProducts(
                cartProducts.map(
                    product =>
                    product.id === id
                    ?
                    { ...product, quantity: product.quantity + 1}
                    : product
                )
            )
        }
    }

    const removeOneFromCart = (id) => {
        const quantity = getProductQuantity(id);

        if(quantity === 1) {
            deleteFromCart(id);
        } else {
            setCartProducts(
                cartProducts.map(
                    product =>
                    product.id === id
                    ?
                    { ...product, quantity: product.quantity - 1}
                    : product
                )
            )
        }
    }

    const deleteFromCart = (id) => {
        setCartProducts(
            cartProducts => 
            cartProducts.filter(currentProduct => {
                return currentProduct.id !=id;
            })
        )
    }

    const getTotalCost = () => {
        let totalCost = 0;
        cartProducts.map((cartItem) => {
            const productData = getSpecificProduct(cartItem.id);
            totalCost += (productData.price * cartItem.quantity)
        });
        return totalCost;
    }

    const contextValue = {
        items: cartProducts,
        getProductQuantity,
        addOneToCart,
        removeOneFromCart,
        deleteFromCart,
        getTotalCost,
    }

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    )
}