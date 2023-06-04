import { LoginWithEmail } from "./EmailLogin"


export const LoginContainer = ({setLoggedInUser, modalOpen, setModalOpen, openError, setOpenError}) => {
    
    return (
            <LoginWithEmail
                openError={openError}
                setLoggedInUser={setLoggedInUser}
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                setOpenError={setOpenError}
            />           
    )
}