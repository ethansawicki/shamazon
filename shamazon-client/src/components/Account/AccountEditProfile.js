import { useEffect, useState } from "react"
import { Button, Container, Form, Modal, ModalBody, ModalTitle, Stack } from "react-bootstrap"
import { deleteDBUser, deleteUserProfile, updateProfile } from "../fetchcalls/fetchCalls"
import { deleteUser, getAuth, signOut } from "firebase/auth"


export const EditProfile = ({ userInfo, editMode, setEditMode }) => {
    const [userProfile, setUserProfile] = useState()
    const [openDeleteModal, setOpenDeleteModal] = useState(false) 

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

    const handleOpenModal = () => {
        setOpenDeleteModal(true)
    }

    const handleCloseModal = () => {
        setOpenDeleteModal(false)
    }

    const handleDeleteAccount = async () => {
        const auth = getAuth();
        const user = auth.currentUser
        await deleteUserProfile(userProfile.id)
        await deleteDBUser(userInfo.firebaseId)
        deleteUser(user).then(() => {
            console.log('user deleted')
            signOut(auth)
        }).catch((error) => {
            console.error(error)
        })
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
                <Button variant="danger" onClick={handleOpenModal}>Delete Account</Button>
            </Stack>
            <Modal
                show={openDeleteModal}
                onHide={handleCloseModal}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>ACCOUNT DELETE?</Modal.Title>
                </Modal.Header>
                <ModalBody>
                    ARE YOU SURE YOU WANT TO DELETE YOUR ACCOUNT?
                </ModalBody>
                <Modal.Footer>
                    <Button onClick={handleDeleteAccount} variant="danger">Yes Im Sure</Button>
                    <Button onClick={handleCloseModal} variant="primary">Actually Im Not Sure</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}