import { Button, Container } from "react-bootstrap"
import { logout } from "../firebase/EmailFireBase"

export const AccountUserProfile = ({setLoggedInUser, navigate}) => {
    return (
        <Container>
            <h1>User Profile</h1>
            <Button variant="danger" onClick={() => {logout(setLoggedInUser, navigate)}}>Sign Out</Button>
        </Container>
    )
}