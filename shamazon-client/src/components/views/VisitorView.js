import { Route, Routes } from "react-router-dom"
import { VisitorHome } from "../home/VisitorHome"
import { LoginContainer } from "../auth/LoginContainer"

export const VisitorView = ({auth, setLoggedInUser}) => {
    return (
        <Routes>
            <Route path="/" element={<VisitorHome />} />
            <Route path="/login" element={<LoginContainer auth={auth} setLoggedInUser={setLoggedInUser} />} />
        </Routes>
    )
}