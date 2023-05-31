import { useState } from "react"
import { Button, FloatingLabel, Form } from "react-bootstrap"
import { logInWithEmail } from "../firebase/EmailFireBase"
import { useNavigate } from "react-router-dom"
import { ErrorAlert } from "./AlertPrompt"



export const LoginWithEmail = ({setLoggedInUser, open, setOpen}) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleLogin = async () => {
       logInWithEmail(email, password, navigate, setLoggedInUser, open, setOpen)
    }

    return (
        <>
            <ErrorAlert open={open} setOpen={setOpen} />
            <Form>
                <FloatingLabel controlId="email" label="Email Address" className="mb-3">
                    <Form.Control type="email" onChange={(e) => { setEmail(e.target.id = e.target.value) }} placeholder="name@example.com" />
                </FloatingLabel>
                <FloatingLabel controlId="password" label="Password" className="mb-3">
                    <Form.Control type="password" onChange={(e) => { setPassword(e.target.id = e.target.value) }} placeholder="Password" />
                </FloatingLabel>
                {
                    email === "" || password === "" ?
                    <Button variant="danger" disabled>Submit</Button>
                    :
                    <Button variant="primary" onClick={() => { handleLogin() }}>Submit</Button>
                    
                }
            </Form>
            
        </>
    )
}