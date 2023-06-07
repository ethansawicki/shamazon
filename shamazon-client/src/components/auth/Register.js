import { useState } from "react"
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap"
import { ErrorAlert } from "./AlertPrompt"
import { useNavigate } from "react-router-dom"
import { registerWithEmail } from "../firebase/EmailFireBase"

export const Register = ({registerModalOpen, setRegisterModalOpen, setUserInfo, openError, setOpenError}) => {
    const [register, setRegister] = useState({})
    const [profileRegister, setProfileRegister] = useState({})
    const [registerProfile, setRegisterProfile] = useState(false)
    const navigate = useNavigate();

    const handleClose = () => {
        setRegisterModalOpen(false)
        setRegisterProfile(false)
    }

    const handleChange = (e) => {
        const copy = { ...register }
        copy[e.target.id] = e.target.value
        setRegister(copy)
    }

    const handleRegister = async () => {
        await registerWithEmail(register, navigate, setUserInfo, setOpenError)
        setRegisterProfile(true)
    }

    const handleProfileAdd = (e) => {
        const copy = { ...register }
        copy[e.target.id] = e.target.value
        setProfileRegister(copy)
    }

    const handleNext = () => {
        setRegisterProfile(true)
    }

    return (
        <>
            <Modal show={registerModalOpen} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Register</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ErrorAlert openError={openError} setOpenError={setOpenError} />
                    {
                        !registerProfile ?
                    <Form>
                        <FloatingLabel controlId="email" label="Email Address" className="mb-3">
                            <Form.Control type="email" onChange={handleChange} placeholder="name@example.com" />
                        </FloatingLabel>
                        <FloatingLabel controlId="password" label="Password" className="mb-3">
                            <Form.Control type="password" onChange={handleChange} placeholder="Password" />
                        </FloatingLabel>
                    </Form>
                            :
                    <Form>
                        <FloatingLabel controlId="displayName" label="Display Name" className="mb-3">
                            <Form.Control type="input" onChange={handleProfileAdd} placeholder="CoolUserName" />
                        </FloatingLabel>
                        <FloatingLabel controlId="firstName" label="First Name" className="mb-3">
                            <Form.Control type="input" onChange={handleProfileAdd} placeholder="Your First Name" />
                        </FloatingLabel>
                        <FloatingLabel controlId="lastName" label="Last Name" className="mb-3">
                            <Form.Control type="input" onChange={handleProfileAdd} placeholder="Your Last Name" />
                        </FloatingLabel>
                        <FloatingLabel controlId="address" label="Address" className="mb-3">
                            <Form.Control type="input" onChange={handleProfileAdd} placeholder="Your Address" />
                        </FloatingLabel>
                    </Form>
                    }
                </Modal.Body>
                <Modal.Footer>
                    {
                        !registerProfile ?  
                            <Button variant="primary" onClick={() => {handleNext()}}>Next</Button>
                            :
                            <Button variant="primary" onClick={() => {handleClose()}}>Submit</Button>
                            
                    }
                    <Button variant="danger" onClick={handleClose} >Cancel</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}