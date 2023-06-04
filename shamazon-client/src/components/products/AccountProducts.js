import { useCallback, useEffect, useState } from "react"
import { getProducts } from "../fetchcalls/fetchCalls"
import { Container } from "react-bootstrap"

export const AccountProducts = () => {
    const [products, setProducts] = useState([])

    const fetchProducts = useCallback(async () => {
        const productData = await getProducts();
        setProducts(productData)
    },[])
    
    useEffect(() => {
        fetchProducts()
    },[fetchProducts])

    return (
        <Container>
            <h3>Account View Products</h3>
        </Container>
    )
}