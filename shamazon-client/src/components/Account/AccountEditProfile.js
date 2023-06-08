import { useEffect, useState } from "react"
import { Button, Container, Form, Stack } from "react-bootstrap"
import { updateProfile } from "../fetchcalls/fetchCalls"


export const EditProfile = ({ userInfo, editMode, setEditMode }) => {
    const [userProfile, setUserProfile] = useState()
    

    const handleClick = async () => {
        setEditMode(true)
    }

    useEffect(() => {
        setUserProfile(userInfo?.userProfile)
    }, [userInfo])

    const handleChange = (e) => {
        const copy = { ...userProfile }
        copy[e.target.id] = e.target.value
        setUserProfile(copy)
    }
    
    const handleUpdate = async () => {
        await updateProfile(userProfile)
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
                                <Form.Control  type="input" value={userProfile?.firstName || ""} disabled></Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="lastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="input" value={userProfile?.lastName || ""} disabled></Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="address">
                                <Form.Label>Address</Form.Label>
                                <Form.Control type="input" value={userProfile?.address || ""} disabled></Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="displayName">
                                <Form.Label>Display Name</Form.Label>
                                <Form.Control type="input" value={userProfile?.displayName || ""} disabled></Form.Control>
                            </Form.Group>
                        </Form>
                        :
                        <Form className="col-md-5 mx-auto" >
                            <Form.Group className="mb-3" controlId="firstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="input" value={userProfile?.firstName || ""} onChange={(e) => {handleChange(e)}} ></Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="lastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="input" value={userProfile?.lastName || ""} onChange={(e) => {handleChange(e)}} ></Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="address">
                                <Form.Label>Address</Form.Label>
                                <Form.Control type="input" value={userProfile?.address || ""} onChange={(e) => {handleChange(e)}} ></Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="displayName">
                                <Form.Label>Display Name</Form.Label>
                                <Form.Control type="input" value={userProfile?.displayName || ""} onChange={(e) => {handleChange(e)}} ></Form.Control>
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