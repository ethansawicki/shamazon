import { useEffect } from "react";
import { Alert } from "react-bootstrap"
import { useNavigate } from "react-router-dom"


export const ErrorAlert = ({ open, setOpen }) => {
    const navigate = useNavigate();

    const handleClose = () => {
        setOpen(false)
        navigate("/login")
    }

    if (open) {
        return (
            <Alert variant="danger" onClose={() => handleClose()} dismissible>
                <Alert.Heading>Error: </Alert.Heading>
                <p>
                    Invalid email/password please use correct format "username@provider.com" and try again.
                </p>
            </Alert>
        )
    }
}