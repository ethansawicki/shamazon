import { Route, Routes } from "react-router-dom"
import { LoggedInHome } from "../home/LoggedInHome"

export const LoggedInView = () => {
    return (
        <Routes>
            <Route path="/" element={<LoggedInHome />} />
        </Routes>
    )
}