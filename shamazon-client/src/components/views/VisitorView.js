import { Route, Routes } from "react-router-dom"
import { LoginWithEmail } from "../auth/EmailLogin"

export const VisitorView = ({auth, setLoggedInUser}) => {
    return (
        <Routes>
            <Route path="/visitor" />
            <Route path="/login" element={<LoginWithEmail auth={auth} setLoggedInUser={setLoggedInUser} />} />
        </Routes>
    )
}