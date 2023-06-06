import { useCallback, useEffect, useState } from "react"
import { getProducts, getSpecificProduct } from "../fetchcalls/fetchCalls"
import { Container, Stack } from "react-bootstrap"
import { ProductCard } from "./ProductCard"
import { Link, useLocation, useParams } from "react-router-dom"
import { SpecificProduct } from "./SpecificProduct"


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
        if (location.pathname.includes(`products/${products.id}`)) {
            setProductModalShow(location.pathname(`products/${products.id}`))
        }
    }, [location.pathname])

    
    console.log(location.pathname)
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
                                setProductModalShow={setProductModalShow}
                            /> 
                        )
                    })
                }
                <SpecificProduct productModalShow={productModalShow} setProductModalShow={setProductModalShow} />
            </Stack>
        </Container>
    )
}