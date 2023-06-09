import { Image, Container, ListGroup, Card, CardGroup,Row, Col } from "react-bootstrap"


export const OrderHistory = ({ product }) => {
    
    const formatPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    })
    
    return (
        <Container>
            <ListGroup>
                <ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col xs={{order: `first`}}>
                                Order Date: {product.orderDate}
                            </Col>
                            <Col>
                            Order Address: {product.orderAddress}
                            </Col>
                            <Col xxl={{ order: `last` }}>
                                Order Number: {product.orderId}
                            </Col>
                        </Row>
                    </ListGroup.Item>
                        {
                            product?.orderItem?.products?.map((products) => {
                                return (
                                    <ListGroup.Item key={`product--${products.id}`}>
                                        <Row> 
                                        <Col xs={{order: `1`}}>
                                            <Image width={"100rem"} src={products.productImg} />
                                        </Col>
                                        <Col xs={{order: `4`}}>
                                           Price: {formatPrice.format(products.productPrice)}
                                        </Col>
                                        <Col xs={{ order: `3` }}>
                                            Product Description: {products.productDescription}
                                            </Col>
                                            <Col xs={{ order: `2` }}>
                                                {products.productName}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                )
                            })
                        }    
                    <ListGroup.Item>
                        Order Total: {formatPrice.format(product.orderTotal)}
                    </ListGroup.Item>
                </ListGroup.Item>        
            </ListGroup>
        </Container>
    )
}