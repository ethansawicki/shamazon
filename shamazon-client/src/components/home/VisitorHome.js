import { useState, useEffect, useCallback } from "react";
import { Carousel, Container } from "react-bootstrap"
import { getProducts } from "../fetchcalls/fetchCalls";


export const VisitorHome = () => {
    const [products, setProducts] = useState([])
    const fetchProducts = useCallback(async () => {
        const productData = await getProducts();
        setProducts(productData)
    },[])
    
    useEffect(() => {
        fetchProducts()
    }, [fetchProducts])

    return (
        <Container>
            <h1 style={{ textAlign: "center" }}>Welcome to Shamazon!</h1>
            <h4 style={{ textAlign: "center", margin: "10px" }}>Please checkout some of our products below</h4>
            <Carousel variant="dark">
                {
                    products.map((product) => {
                        return (
                            <Carousel.Item  key={product.id}>
                                <img
                                    style={{height: "25vw", objectFit:"scale-down", marginLeft: "auto", marginRight: "auto", width: "100%"}}
                                    src={product.productImg}
                                    alt="First Slide"
                                />
                                <Carousel.Caption>
                                    <h3>{product.productName}</h3>
                                </Carousel.Caption>
                            </Carousel.Item>
                        )
                    })
                }
            </Carousel>
        </Container>
    )
}