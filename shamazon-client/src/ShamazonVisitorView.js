import { Route, Routes } from "react-router-dom"
import { VisitorView } from "./components/views/VisitorView"
import { NavbarContainer } from "./components/nav/NavContainer"
import { useState } from "react"
import { LoginContainer } from "./components/auth/LoginContainer"
import { Register } from "./components/auth/Register"
import { ShoppingCart } from "./components/cart/Cart"

export const ShamazonVisitorView = ({auth, setLoggedInUser, userInfo, loggedInUser, setUserInfo}) => {
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
                            userInfo={userInfo}
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
                            loggedInUser={loggedInUser}
                        />
                    </>
                }
            />
            </Routes>
       
    )
}