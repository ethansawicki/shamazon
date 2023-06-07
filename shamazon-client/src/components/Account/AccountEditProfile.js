import { useEffect, useState } from "react"
import { Button, Container, Form, Row, Stack } from "react-bootstrap"
import { updateProfile } from "../fetchcalls/fetchCalls"


export const EditProfile = ({ userProfile }) => {
    const [editUser, setEditUser] = useState()
    const [editMode, setEditMode] = useState(false)

    const handleClick = async () => {
        setEditMode(true)
    }

    useEffect(() => {
        setEditUser(userProfile.userProfile)
    }, [userProfile])

    const handleChange = (e) => {
        const copy = { ...editUser }
        copy[e.target.id] = e.target.value
        setEditUser(copy)
    }
    
    const handleUpdate = async () => {
        await updateProfile(editUser)
        setEditMode(false)
    }

    return (
        <Container>
            <h3 className="col-md-5 mx-auto">Edit Profile</h3>
            <Stack>
                {
                    !editMode ?
                        <Form className="col-md-5 mx-auto" >
                            <Form.Group className="mb-3" controlId="firstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control  type="input" value={editUser?.firstName || ""} disabled></Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="lastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="input" value={editUser?.lastName || ""} disabled></Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="address">
                                <Form.Label>Address</Form.Label>
                                <Form.Control type="input" value={editUser?.address || ""} disabled></Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="displayName">
                                <Form.Label>Display Name</Form.Label>
                                <Form.Control type="input" value={editUser?.displayName || ""} disabled></Form.Control>
                            </Form.Group>
                        </Form>
                        :
                        <Form className="col-md-5 mx-auto" >
                            <Form.Group className="mb-3" controlId="firstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="input" value={editUser?.firstName || ""} onChange={(e) => {handleChange(e)}} ></Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="lastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="input" value={editUser?.lastName || ""} onChange={(e) => {handleChange(e)}} ></Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="address">
                                <Form.Label>Address</Form.Label>
                                <Form.Control type="input" value={editUser?.address || ""} onChange={(e) => {handleChange(e)}} ></Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="displayName">
                                <Form.Label>Display Name</Form.Label>
                                <Form.Control type="input" value={editUser?.displayName || ""} onChange={(e) => {handleChange(e)}} ></Form.Control>
                            </Form.Group>
                        </Form>
                }
            </Stack>
            <Stack gap={2} className="col-md-5 mx-auto">
                {
                    !editMode ?
                    <Button variant="primary" onClick={handleClick}>Edit</Button>
                        :
                    <Button variant="primary" onClick={handleUpdate}>Save</Button>
                }
                <Button variant="danger">Delete Account</Button>
            </Stack>
        </Container>
    )
}