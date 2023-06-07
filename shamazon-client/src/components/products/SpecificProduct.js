import { Button, Modal } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import "./modal.css"



export const SpecificProduct = ({ productModalShow, setProductModalShow, filteredProducts  }) => {
    const navigate = useNavigate();
    const handleClose = () => {
        setProductModalShow(false)
        navigate("/products")    
    }

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
                
            </Modal.Body>
            <Modal.Footer>
                <Button>Add to cart</Button>
            </Modal.Footer>
        </Modal>
    )
}