import { useContext } from "react"
import { Accordion, Button, Col, Container, Form, ListGroup, Row } from "react-bootstrap"
import { CartContext } from "../cart/Cart"


export const SearchProducts = ({ search, loggedInUser }) => {
    const cart = useContext(CartContext)
    const formatPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    })
    const addToCartContext = () => {
        cart.addOneToCart(search.id, search)
    }


    return (
        <Container >
            <Accordion>
                <Accordion.Item eventKey={`product--${search.id}`}>
                    <Accordion.Header>{search.productName}</Accordion.Header>
                    <Accordion.Body>
                        <Row>
                            <Col>
                                <img style={{height: "5vw", objectFit: "scale-down"}} src={ search.productImg } />
                            </Col>
                            <Col>
                                <p>Product Description:</p>
                                <p>{ search.productDescription }</p>
                            </Col>
                            <Col>
                                <p>Price:</p>
                                <p>{ formatPrice.format(search.productPrice) }</p>
                            </Col>
                            <Col>
                                <Form.Select>
                                    <option value={1}>1</option>
                                </Form.Select>
                            </Col>
                            {
                                loggedInUser ? 
                                    <Col>
                                        <Button variant="primary" onClick={() => {addToCartContext()}}>Add to cart</Button>
                                    </Col>
                                : ""         
                            }
                        </Row>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </Container>
    )
}