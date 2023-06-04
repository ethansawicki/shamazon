import { useState } from "react"
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap"
import { ErrorAlert } from "./AlertPrompt"
import { useNavigate } from "react-router-dom"
import { registerWithEmail } from "../firebase/EmailFireBase"

export const Register = ({registerModalOpen, setRegisterModalOpen, setUserInfo, openError, setOpenError}) => {
    const [register, setRegister] = useState({})
    const navigate = useNavigate();

    const handleClose = () => {
        setRegisterModalOpen(false)
        navigate("/")
    }

    const handleChange = (e) => {
        const copy = { ...register }
        copy[e.target.id] = e.target.value
        setRegister(copy)
    }

    const handleRegister = async () => {
       await registerWithEmail(register, navigate, setUserInfo)
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
                            <Form.Control type="email" onChange={handleChange} placeholder="name@example.com" />
                        </FloatingLabel>
                        <FloatingLabel controlId="password" label="Password" className="mb-3">
                            <Form.Control type="password" onChange={handleChange} placeholder="Password" />
                        </FloatingLabel>
                        <FloatingLabel controlId="displayName" label="Display Name" className="mb-3">
                            <Form.Control type="input" onChange={handleChange} placeholder="Display Name" />
                        </FloatingLabel>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => {handleRegister()}}>Submit</Button>
                    <Button variant="danger" onClick={handleClose} >Cancel</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}