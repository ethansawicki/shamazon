import { useState } from "react"
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap"
import { logInWithEmail } from "../firebase/EmailFireBase"
import { useNavigate } from "react-router-dom"
import { ErrorAlert } from "./AlertPrompt"




export const LoginWithEmail = ({setLoggedInUser, modalOpen, setModalOpen, setUserInfo, openError, setOpenError}) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const handleClose = () => {
        setModalOpen(false)
        setOpenError(false)
    }
    const handleLogin = async () => {
      await logInWithEmail(email, password, navigate, setLoggedInUser, openError, setOpenError, setUserInfo)
    }

    return (
        <>
            <Modal show={modalOpen} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
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
                    <Button variant="primary" onClick={() => {handleLogin()}}>Submit</Button>
                    <Button variant="danger" onClick={handleClose} >Cancel</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}