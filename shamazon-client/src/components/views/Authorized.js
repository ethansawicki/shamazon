import { Navigate, useLocation } from "react-router-dom"


export const Authorized = ({ children, loggedInUser }) => {
    const location = useLocation();

    if (loggedInUser === true) {
        return children
    } else {
        return <Navigate to={`/${location.pathname.includes("home")}`} replace state={{ location }} />
    }
}