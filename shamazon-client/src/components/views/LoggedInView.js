import { Navigate, Route, Routes } from "react-router-dom"
import { LoggedInHome } from "../home/LoggedInHome"
import { AccountComponent } from "../Account/Account"
import { SearchComponent } from "../search/Search"

export const LoggedInView = ({ setLoggedInUser, loggedInUser, auth }) => {
    
    return (
        <Routes>
            <Route path="/" element={<Navigate replace to={`/userhome`} />} />
            <Route path="userhome" element={<LoggedInHome />}
             />
            <Route path="account" element={<AccountComponent setLoggedInUser={setLoggedInUser} loggedInUser={loggedInUser} auth={auth} />} />
            <Route path="search" element={<SearchComponent />} />
            <Route path="login" element={<Navigate to={`/userhome`} />} />
        </Routes>
    )
}