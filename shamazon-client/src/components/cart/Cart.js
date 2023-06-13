import { createContext } from "react"
import { useState } from "react";
import { addNewOrder } from "../fetchcalls/fetchCalls";

export const CartContext = createContext({
    items: [],
    orderItems: {},
    getProductQuantity: () => { },
    addOneToCart: () => { },
    removeOneFromCart: () => { },
    deleteFromCart: () => { },
    getTotalCost: () => { },
})

export const ShoppingCart = ({ children, userInfo }) => {
    
    const [cartProducts, setCartProducts] = useState([]);
    const [cartOrder, setCartOrder] = useState({})
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

        if (quantity === 0) {
        
            setCartOrder(
                
                    ...cartOrder,
                    {
                        quantity: 1,
                        userId: userInfo?.id,
                        orderAddress: userInfo?.userProfile?.address,
                        product: [product.id],
                        orderTotal: 0
                    }
                
            )
            setCartProducts(
                [
                    ...cartProducts,
                    {
                        id: id,
                        productId: id,
                        quantity: 1,
                        userId: userInfo.id,
                        product: product,
                    }
                ]
            )
        } else {
            setCartOrder(
                cartOrder.product.map(
                    product =>
                        product.productId === id
                            ?
                            { ...product, quantity: product.quantity + 1 }
                            : product
                )
            )
            setCartProducts(
                cartProducts.map(
                    product =>
                    id === product.id
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
                return currentProduct.id !== id;
            })
        )
        setCartOrder(
            cartOrder => 
                cartOrder.filter(currentProduct => {
                    return currentProduct.productId !== id;
                })
        )
    }

    const getTotalCost = () => {
        let totalCost = 0;
        cartProducts.map((cartItem) => {
            const productData = cartItem;
            totalCost += (productData?.product?.productPrice * cartItem.quantity)
        });
        return totalCost;
    }
    

    const contextValue = {
        items: cartProducts,
        orderItems: cartOrder,
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