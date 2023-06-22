import { useCallback, useEffect, useState } from "react"
import { getProducts, getSpecificProduct } from "../fetchcalls/fetchCalls"
import { Col, Container, Row, Stack } from "react-bootstrap"
import { ProductCard } from "./ProductCard"
import { Link, useLocation, useParams } from "react-router-dom"
import { SpecificProduct } from "./SpecificProduct"


export const ProductsContainer = () => {
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState()
    const [productModalShow, setProductModalShow] = useState(false);
    const [pcComponents, setPcComponents] = useState([])
    const [networkEquipment, setNetworkEquipment] = useState([])
    const [homeImprovement, setHomeImprovement] = useState([])
    const [grocery, setGrocery] = useState([])
    const { productId } = useParams();
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

    useEffect(() => {
        const singleProduct = products.find((product) => {
            return product.id === Number(productId)
        })
        setFilteredProducts(singleProduct)
    }, [productId])

    useEffect(() => {
        const pcComponentsFilter = products.filter((product) => {
            return product.productsCategory?.productCategoryName === "PC Components"
        })
        setPcComponents(pcComponentsFilter)
        const networkEquipmentFilter = products.filter((product) => {
            return product.productsCategory?.productCategoryName === "Network Equipment"
        })
        setNetworkEquipment(networkEquipmentFilter)
        const groceryFilter = products.filter((product) => {
            return product.productsCategory?.productCategoryName === "Grocery"
        })
        setGrocery(groceryFilter)
        const homeImprovementFilter = products.filter((product) => {
            return product.productsCategory?.productCategoryName === "Home Improvement"
        })
        setHomeImprovement(homeImprovementFilter)
    }, [products])

    return (
        <Container>
            <h1 style={{textAlign: "center"}}>Products View</h1>
            <Row className="g-4">               
            <h3>PC Components</h3>
                {
                    pcComponents.map((product) => {
                        return (
                            <ProductCard
                                key={`product--${product.id}`}
                                product={product}
                                setProductModalShow={setProductModalShow}
                            /> 
                        )
                    })
                }
                <SpecificProduct filteredProducts={filteredProducts} productModalShow={productModalShow} setProductModalShow={setProductModalShow} />
            </Row>
            <Row className="g-4">               
            <h3>Network Equipment</h3>
                {
                    networkEquipment.map((product) => {
                        return (
                            <ProductCard
                                key={`product--${product.id}`}
                                product={product}
                                setProductModalShow={setProductModalShow}
                            /> 
                        )
                    })
                }
                <SpecificProduct filteredProducts={filteredProducts} productModalShow={productModalShow} setProductModalShow={setProductModalShow} />
            </Row>
            <Row className="g-4">               
            <h3>Home Improvement</h3>
                {
                    homeImprovement.map((product) => {
                        return (
                            <ProductCard
                                key={`product--${product.id}`}
                                product={product}
                                setProductModalShow={setProductModalShow}
                            /> 
                        )
                    })
                }
                <SpecificProduct filteredProducts={filteredProducts} productModalShow={productModalShow} setProductModalShow={setProductModalShow} />
            </Row>
            <Row className="g-4">               
            <h3>Grocery</h3>
                {
                    grocery.map((product) => {
                        return (
                            <ProductCard
                                key={`product--${product.id}`}
                                product={product}
                                setProductModalShow={setProductModalShow}
                            /> 
                        )
                    })
                }
                <SpecificProduct filteredProducts={filteredProducts} productModalShow={productModalShow} setProductModalShow={setProductModalShow} />
            </Row>
        </Container>
    )
}