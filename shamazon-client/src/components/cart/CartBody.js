import { useContext } from "react"
import { CartContext } from "./Cart"
import { useState } from "react";
import { useEffect } from "react";
import { Button, Card } from "react-bootstrap";


export const CartBody = ({ currentProduct }) => {
    const [product, setProduct] = useState([])
    const cart = useContext(CartContext);
    const id = currentProduct?.id;
    const quantity = currentProduct?.quantity

    useEffect(() => {
        setProduct(currentProduct)
    }, [currentProduct])
    


    return (
        <>
            {
                product?
                    <Card>
                        <Card.Body>
                            <Card.Title>{product?.product?.productName}</Card.Title>
                            <Button variant="danger" size="sm" onClick={() => { cart.deleteFromCart(id) }}>Remove</Button>
                            <Card.Text>Quantity: { quantity }</Card.Text>
                        </Card.Body>
                    </Card>
                    :
                ""    
            }
        </>
        
    )
} 