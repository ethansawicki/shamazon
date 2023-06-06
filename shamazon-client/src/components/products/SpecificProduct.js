import { Button, Modal } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import "./modal.css"
import { useCallback, useEffect, useState } from "react"
import { getSpecificProduct } from "../fetchcalls/fetchCalls"



export const SpecificProduct = ({ productModalShow, setProductModalShow }) => {
    const [specificProduct, setSpecificProduct] = useState({});
    const navigate = useNavigate();
    const { productId } = useParams();
    const handleClose = () => {
        setProductModalShow(false)
        navigate("/products")    
    }

    const fetchSpecificProduct = useCallback(async () => {
        const product = await getSpecificProduct(productId)
        setSpecificProduct(product)
    },[productId])

    useEffect(() => {
        fetchSpecificProduct(productId)
    },[fetchSpecificProduct, productModalShow])

    return (
        <Modal
            show={productModalShow}
            onHide={() => handleClose()}
            dialogClassName="modal-90width"
        >
            <Modal.Header closeButton>
                <Modal.Title>{ specificProduct.productName }</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                
            </Modal.Body>
            <Modal.Footer>
                <Button>Add to cart</Button>
            </Modal.Footer>
        </Modal>
    )
}