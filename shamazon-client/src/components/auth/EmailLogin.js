import { useState } from "react"
import { Button, Form } from "react-bootstrap"
import { logInWithEmail } from "../firebase/EmailFireBase"
import { useNavigate } from "react-router-dom"


export const LoginWithEmail = ({setLoggedInUser}) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleLogin = async () => {
       logInWithEmail(email, password, navigate, setLoggedInUser)
    }

    return (
        <Form>
            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" onChange={(e) => { setEmail(e.target.id = e.target.value) }} placeholder="Enter Email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" onChange={(e) => { setPassword(e.target.id = e.target.value) }} placeholder="Password" />
            </Form.Group>
            {
                email === "" || password === "" ?
                    <Button variant="danger" disabled>Submit</Button>
                    :
                    <Button variant="primary" onClick={() => { handleLogin() }}>Submit</Button>
                    
            }
        </Form>
    )
}