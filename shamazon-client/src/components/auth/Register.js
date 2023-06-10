import { useState } from "react"
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap"
import { ErrorAlert } from "./AlertPrompt"
import { registerWithEmail } from "../firebase/EmailFireBase"

export const Register = ({registerModalOpen, setRegisterModalOpen, setUserInfo, openError, setOpenError}) => {
    const [register, setRegister] = useState({
        email: "",
        password: "",
        displayName: "",
        firstName: "",
        lastName: "",
        address: "",
    })

    const handleClose = () => {
        setRegister({})
        setRegisterModalOpen(false)
    }

    const handleChange = (e) => {
        const copy = { ...register }
        copy[e.target.id] = e.target.value
        setRegister(copy)
    }

    const handleRegister = async () => {
        try {
            const user = {
                email: register.email,
                password: register.password
            }
            const userProfile = {
                userId: "",
                displayName: register.displayName,
                firstName: register.firstName,
                lastName: register.lastName,
                address: register.lastName
            }
            await registerWithEmail(user, setUserInfo, setOpenError, userProfile)
            setRegisterModalOpen(false)
        } catch (error) {
            console.error(error)
            setOpenError(true)
        }
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
                                        <Form.Control type="email" onChange={(e) => {handleChange(e)}} placeholder="name@example.com" />
                                    </FloatingLabel>
                                    <FloatingLabel controlId="password" label="Password" className="mb-3">
                                        <Form.Control type="password" onChange={(e) => {handleChange(e)}} placeholder="Password" />
                                    </FloatingLabel>
                                <FloatingLabel controlId="displayName" label="Display Name" className="mb-3">
                                    <Form.Control type="displayName" onChange={(e) => {handleChange(e)}} placeholder="CoolUserName" />
                                </FloatingLabel>
                                <FloatingLabel controlId="firstName" label="First Name" className="mb-3">
                                    <Form.Control type="firstName"  onChange={(e) => {handleChange(e)}} placeholder="Your First Name" />
                                </FloatingLabel>
                                <FloatingLabel controlId="lastName" label="Last Name" className="mb-3">
                                    <Form.Control type="lastName" onChange={(e) => {handleChange(e)}} placeholder="Your Last Name" />
                                </FloatingLabel>
                                <FloatingLabel controlId="address" label="Address" className="mb-3">
                                    <Form.Control type="address" onChange={(e) => {handleChange(e)}} placeholder="Your Address" />
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