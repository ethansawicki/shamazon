import { Button, Col, Container, Form, Image, Modal, Row, Stack } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import "./modal.css"
import { useContext } from "react";
import { CartContext } from "../cart/Cart";




export const SpecificProduct = ({ productModalShow, setProductModalShow, filteredProducts }) => {
    const product = filteredProducts;
    const cart = useContext(CartContext)
    const navigate = useNavigate();
    const handleClose = () => {
        setProductModalShow(false)
        navigate("/products")    
    }

    const formatPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    })

    return (
        <Modal
            show={productModalShow}
            onHide={() => handleClose()}
            dialogClassName="modal-90width"
        >
            <Modal.Header closeButton>
                <Modal.Title>{ filteredProducts?.productName }</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Stack direction="horizontal" gap={5}>
                    <Image width="190" src={filteredProducts?.productImg} />
                    <Stack gap={1}>
                        <b>Product Description:</b>
                        <p> {filteredProducts?.productDescription}</p>
                        <b>Price:</b>
                        <p>{ formatPrice.format(filteredProducts?.productPrice) }</p>    
                    </Stack>
                </Stack>     
            </Modal.Body>
            <Modal.Footer>
                <Row>
                    <Col>
                        <Button onClick={() => cart.addOneToCart(product.id, product)}>Add to cart</Button>
                    </Col>
                </Row>
            </Modal.Footer>
        </Modal>
    )
}