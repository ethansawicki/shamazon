import { Alert } from "react-bootstrap"


export const ErrorAlert = ({ openError, setOpenError }) => {

    const handleClose = () => {
        setOpenError(false)
    }

    if (openError) {
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