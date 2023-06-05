import { Button, Card } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import { SpecificProduct } from "./SpecificProduct"

export const ProductCard = ({ product, productModalShow, setProductModalShow }) => {
    
    const handleOpen = () => setProductModalShow(true)

    return (
        <>
            <Card border="dark" style={{ width: '18rem' }}>
                <Card.Img variant="top" src={product.productImg} /> 
                    <Card.Body className="text-center">
                        <Card.Title>
                            {product.productName}
                        </Card.Title>
                        <Card.Subtitle key={`ProductCategory--${product?.productsCategory?.productCategoryId}`} className="mb-2 text-muted">
                            {product.productsCategory.productCategoryName}
                        </Card.Subtitle>
                        <Card.Text>
                            { product.productDescription }
                    </Card.Text>
                    <LinkContainer to={`/products/${product.id}`}>
                        <Button size="md" onClick={handleOpen} variant="primary">View Product</Button>
                    </LinkContainer>
                    </Card.Body>
            </Card>
            <SpecificProduct product={product} productModalShow={productModalShow} setProductModalShow={setProductModalShow} />
        </>
    )
}