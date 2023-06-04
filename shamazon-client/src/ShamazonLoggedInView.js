import { Route, Routes } from "react-router-dom"
import { Authorized } from "./components/views/Authorized"
import { LoggedInView } from "./components/views/LoggedInView"
import { NavbarContainer } from "./components/nav/NavContainer"

export const ShamazonLoggedInView = ({setLoggedInUser, loggedInUser, displayName, setUserInfo, userInfo, navigate}) => {
    return (        
        <Routes>
                <Route
                    path="*"
                    element={
                        <Authorized loggedInUser={loggedInUser}>
                            <>
                                <NavbarContainer
                                    displayName={displayName}
                                    setLoggedInUser={setLoggedInUser}
                                    loggedInUser={loggedInUser}
                                    setUserInfo={setUserInfo}
                                    userInfo={userInfo}
                                    navigate={navigate}
                                />
                                <LoggedInView
                                    setLoggedInUser={setLoggedInUser}
                                    loggedInUser={loggedInUser}
                                    setUserInfo={setUserInfo}
                                    userInfo={userInfo}
                                />
                            </>
                        </Authorized>
                    }
                />
        </Routes>
    )
}