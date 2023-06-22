import { Button, Card, Col } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"

export const ProductCard = ({ product, setProductModalShow }) => {
    
    const handleOpen = () => {
        setProductModalShow(true)
        
    }

    return (
        <>
            <Col md={3}>
            <Card border="dark" style={{ width: '18rem' }}>
                <Card.Img variant="top" style={{ height: '15vw', objectFit: "scale-down"}} src={product.productImg} /> 
                    <Card.Body className="text-center">
                        <Card.Title>
                            {product.productName}
                        </Card.Title>
                        <Card.Subtitle key={`ProductCategory--${product?.productsCategory?.productCategoryId}`} className="mb-2 text-muted">
                            {product.productsCategory.productCategoryName}
                        </Card.Subtitle>
                        <Card.Text style={{textOverflow: "inherit"}}>
                            { product.productDescription }
                        </Card.Text>
                        <LinkContainer to={`/products/${product.id}`}>
                            <Button size="md" onClick={() => { handleOpen() }} variant="link">View Product</Button>
                        </LinkContainer>
                    </Card.Body>
                </Card>
            </Col>
        </>
    )
}