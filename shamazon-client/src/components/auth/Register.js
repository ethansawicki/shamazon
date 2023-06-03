import { useState } from "react"
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap"
import { ErrorAlert } from "./AlertPrompt"
import { useNavigate } from "react-router-dom"

export const Register = ({registerModalOpen, setRegisterModalOpen, setLoggedInUser, openError, setOpenError}) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const handleClose = () => {
        setRegisterModalOpen(false)
        navigate("/")
    }

    const handleRegister = async () => {

    }

    return (
        <>
            <Modal show={registerModalOpen} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Register</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <ErrorAlert openError={openError} setOpenError={setOpenError} />
                    <Form>
                        <FloatingLabel controlId="email" label="Email Address" className="mb-3">
                            <Form.Control type="email" onChange={(e) => { setEmail(e.target.id = e.target.value) }} placeholder="name@example.com" />
                        </FloatingLabel>
                        <FloatingLabel controlId="password" label="Password" className="mb-3">
                            <Form.Control type="password" onChange={(e) => { setPassword(e.target.id = e.target.value) }} placeholder="Password" />
                        </FloatingLabel>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => {handleRegister()}}>Register</Button>
                    <Button variant="danger" onClick={handleClose} >Cancel</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}