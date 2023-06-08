import { useState } from "react"
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap"
import { ErrorAlert } from "./AlertPrompt"
import { registerWithEmail } from "../firebase/EmailFireBase"

export const Register = ({registerModalOpen, setRegisterModalOpen, setUserInfo, openError, setOpenError}) => {
    const [register, setRegister] = useState({})
    const [profileRegister, setProfileRegister] = useState({})
    const [registerProfile, setRegisterProfile] = useState(false)

    const handleClose = () => {
        setRegister({})
        setProfileRegister({})
        setRegisterModalOpen(false)
        setRegisterProfile(false)
    }

    const handleChange = (e) => {
        const copy = { ...register }
        copy[e.target.id] = e.target.value
        setRegister(copy)
    }

    const handleRegister = async () => {
        await registerWithEmail(register, setUserInfo, setOpenError, profileRegister)
        setRegisterModalOpen(false)
    }

    const handleProfileAdd = (e) => {
        const copy = { ...profileRegister }
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
                                        <Form.Control type="email" value={register.email || ""} onChange={(e) => {handleChange(e)}} placeholder="name@example.com" />
                                    </FloatingLabel>
                                    <FloatingLabel controlId="password" label="Password" className="mb-3">
                                        <Form.Control type="password" value={register.password || ""} onChange={(e) => {handleChange(e)}} placeholder="Password" />
                                    </FloatingLabel>
                                </Form>
                            :
                            <Form>
                                <FloatingLabel controlId="displayName" label="Display Name" className="mb-3">
                                    <Form.Control type="input" value={profileRegister.displayName || ""} onChange={(e) => {handleProfileAdd(e)}} placeholder="CoolUserName" />
                                </FloatingLabel>
                                <FloatingLabel controlId="firstName" label="First Name" className="mb-3">
                                    <Form.Control type="input" value={profileRegister.firstName || ""} onChange={(e) => {handleProfileAdd(e)}} placeholder="Your First Name" />
                                </FloatingLabel>
                                <FloatingLabel controlId="lastName" label="Last Name" className="mb-3">
                                    <Form.Control type="input" value={profileRegister.lastName || ""} onChange={(e) => {handleProfileAdd(e)}} placeholder="Your Last Name" />
                                </FloatingLabel>
                                <FloatingLabel controlId="address" label="Address" className="mb-3">
                                    <Form.Control type="input" value={profileRegister.address || ""} onChange={(e) => {handleProfileAdd(e)}} placeholder="Your Address" />
                                </FloatingLabel>
                            </Form>
                        }
                </Modal.Body>
                <Modal.Footer>
                    {
                        !registerProfile ?
                            <Button variant="primary" onClick={() => {handleNext()}}>Next</Button>
                        :
                            <Button variant="primary" onClick={() => {handleRegister()}}>Submit</Button>
                    }
                    <Button variant="danger" onClick={handleClose} >Cancel</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}