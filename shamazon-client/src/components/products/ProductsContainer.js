import { useCallback, useEffect, useState } from "react"
import { getProducts } from "../fetchcalls/fetchCalls"
import { Container, Stack } from "react-bootstrap"
import { ProductCard } from "./ProductCard"
import { useLocation } from "react-router-dom"


export const ProductsContainer = () => {
    const [products, setProducts] = useState([])
    const [productModalShow, setProductModalShow] = useState(false);
    const location = useLocation();

    const fetchProducts = useCallback(async () => {
        const productData = await getProducts();
        setProducts(productData)
    },[])
    
    useEffect(() => {
        fetchProducts()
    }, [fetchProducts])
    
    useEffect(() => {
        if (location.pathname.includes(`${products.id}`)) {
            setProductModalShow(location.pathname.includes(`${products.id}`))
        }
    },[location.pathname])

    return (
        <Container>
            <h3>Product Page</h3>
            <Stack direction="horizontal" gap={5}>
                {
                    products.map((product) => {
                        return (
                            <ProductCard
                                key={`product--${product.id}`}
                                product={product}
                                productModalShow={productModalShow}
                                setProductModalShow={setProductModalShow}
                            /> 
                        )
                    })
                }   
            </Stack>
        </Container>
    )
}