import { Route, Routes } from "react-router-dom"
import { LoggedInUserNav } from "./components/nav/LoggedInUserNav"
import { Authorized } from "./components/views/Authorized"
import { LoggedInView } from "./components/views/LoggedInView"

export const ShamazonLoggedInView = ({setLoggedInUser}) => {
    return (        
        <Routes>
                <Route
                    path="*"
                    element={
                        <Authorized setLoggedInUser={setLoggedInUser}>
                            <>
                                <LoggedInUserNav />
                                <LoggedInView />
                            </>
                        </Authorized>
                    }
                />
        </Routes>
    )
}