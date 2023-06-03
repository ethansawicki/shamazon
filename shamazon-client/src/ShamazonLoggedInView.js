import { Route, Routes } from "react-router-dom"
import { Authorized } from "./components/views/Authorized"
import { LoggedInView } from "./components/views/LoggedInView"
import { NavbarContainer } from "./components/nav/NavContainer"

export const ShamazonLoggedInView = ({setLoggedInUser, loggedInUser, auth}) => {
    return (        
        <Routes>
                <Route
                    path="*"
                    element={
                        <Authorized loggedInUser={loggedInUser}>
                            <>
                                <NavbarContainer auth={auth} setLoggedInUser={setLoggedInUser} loggedInUser={loggedInUser} />
                                <LoggedInView setLoggedInUser={setLoggedInUser} loggedInUser={loggedInUser} auth={auth} />
                            </>
                        </Authorized>
                    }
                />
        </Routes>
    )
}