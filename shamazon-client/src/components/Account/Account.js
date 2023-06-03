import { Button } from "react-bootstrap"
import { logout } from "../firebase/EmailFireBase"
import { useNavigate } from "react-router-dom"


export const AccountComponent = ({ setLoggedInUser, loggedInUser, auth }) => {
    const navigate = useNavigate();
    return (
        <>
            <h1>User Profile</h1>
            <Button variant="danger" onClick={() => {logout(setLoggedInUser, navigate, auth)}}>Sign Out</Button>
        </>
    )
}