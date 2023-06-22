import { createContext, useContext } from "react"
import { useState } from "react";

export const CartContext = createContext({
    items: [],
    order: [],
    products: [],
    getProductQuantity: () => { },
    addOneToCart: () => { },
    removeOneFromCart: () => { },
    deleteFromCart: () => { },
    getTotalCost: () => { },
    removeAllFromCart: () => {}
})

export const ShoppingCart = ({ children, userInfo }) => {
    
    const [cartProducts, setCartProducts] = useState([]);
    const [cartOrder, setCartOrder] = useState({})
    const [products, setProducts] = useState([])

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
                    {
                        userId: userInfo?.id,
                        orderAddress: userInfo?.userProfile?.address,
                        orderTotal: 0
                    }
            )
            setProducts(
                [
                    ...products,
                    {
                        productId: id,
                        productQuantity: 1,
                        userId: userInfo?.id
                    }
                ]
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
            setProducts(
                products.map(
                    product =>
                        product.productId === id
                            ?
                            { ...product, productQuantity: product.productQuantity + 1 }
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
        setProducts(
            products =>
                products.filter(currentProduct => {
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
    
    const removeAllFromCart = () => {
        setCartProducts([])
        setProducts([])
    }

    const contextValue = {
        items: cartProducts,
        order: cartOrder,
        products: products,
        getProductQuantity,
        addOneToCart,
        removeOneFromCart,
        deleteFromCart,
        getTotalCost,
        removeAllFromCart
    }

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    )
}