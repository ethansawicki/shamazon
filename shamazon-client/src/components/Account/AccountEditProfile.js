import { useState } from "react"
import { Button, Container, Form, Row, Stack } from "react-bootstrap"


export const EditProfile = ({ userProfile }) => {
    const [editUser, setEditUser] = useState({})
    return (
        <Container>
            <h3 className="col-md-5 mx-auto">Edit Profile</h3>
            <Stack>
                <Form className="col-md-5 mx-auto" >
                    <Form.Group className="mb-3" controlId="firstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="input" placeholder={userProfile.userProfile.firstName} disabled></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="lastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="input" placeholder={userProfile.userProfile.lastName} disabled></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="address">
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="input" placeholder={userProfile.userProfile.address} disabled></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="displayName">
                        <Form.Label>Display Name</Form.Label>
                        <Form.Control type="input" placeholder={userProfile.userProfile.displayName} disabled></Form.Control>
                    </Form.Group>
                </Form>
            </Stack>
            <Stack gap={2} className="col-md-5 mx-auto">
                <Button variant="primary">Edit</Button>
                <Button variant="danger">Delete Account</Button>
            </Stack>
        </Container>
    )
}