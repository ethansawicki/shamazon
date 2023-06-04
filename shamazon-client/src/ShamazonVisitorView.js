import { Route, Routes } from "react-router-dom"
import { VisitorView } from "./components/views/VisitorView"
import { NavbarContainer } from "./components/nav/NavContainer"
import { useState } from "react"
import { LoginContainer } from "./components/auth/LoginContainer"
import { Register } from "./components/auth/Register"

export const ShamazonVisitorView = ({auth, setLoggedInUser, loggedInUser, setUserInfo}) => {
    const [modalOpen, setModalOpen] = useState(false)
    const [openError, setOpenError] = useState(false)
    const [registerModalOpen, setRegisterModalOpen] = useState(false)

    return (
        <Routes>
            <Route
                path="*"
                element={
                    <>    
                        <NavbarContainer
                            modalOpen={modalOpen}
                            setModalOpen={setModalOpen}
                            loggedInUser={loggedInUser}
                            registerModalOpen={registerModalOpen}
                            setRegisterModalOpen={setRegisterModalOpen}
                        />
                        <Register
                            setUserInfo={setUserInfo}
                            registerModalOpen={registerModalOpen}
                            setRegisterModalOpen={setRegisterModalOpen}
                            setLoggedInUser={setLoggedInUser}
                            openError={openError}
                            setOpenError={setOpenError}
                        />
                        <LoginContainer
                            auth={auth}
                            setUserInfo={setUserInfo}
                            modalOpen={modalOpen}
                            setModalOpen={setModalOpen}
                            setLoggedInUser={setLoggedInUser}
                            openError={openError}
                            setOpenError={setOpenError}
                        />
                        <VisitorView
                            
                        />
                    </>
                }
            />
        </Routes>
    )
}