import { LoginWithEmail } from "./EmailLogin"


export const LoginContainer = ({setLoggedInUser, modalOpen, setUserInfo, setModalOpen, openError, setOpenError}) => {
    
    return (
            <LoginWithEmail
                openError={openError}
                setLoggedInUser={setLoggedInUser}
                setUserInfo={setUserInfo}
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                setOpenError={setOpenError}
            />           
    )
}