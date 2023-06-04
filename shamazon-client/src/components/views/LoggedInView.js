import { Navigate, Route, Routes } from "react-router-dom"
import { LoggedInHome } from "../home/LoggedInHome"
import { SearchComponent } from "../search/Search"
import { AccountUserProfile } from "../Account/AccountUserProfile"
import { ProductsContainer } from "../products/ProductsContainer"

export const LoggedInView = ({ setLoggedInUser, loggedInUser, userInfo, setUserInfo }) => {
    
    return (
        <Routes>
            <Route path="/" element={<Navigate replace to={`/userhome`} />} />
            <Route path="userhome" element={<LoggedInHome />}
             />
            <Route path="account" element={
                <AccountUserProfile
                    setLoggedInUser={setLoggedInUser}
                    userInfo={userInfo}
                    setUserInfo={setUserInfo}
                    loggedInUser={loggedInUser} />} />
            <Route path="search" element={<SearchComponent />} />
            <Route path="accountproducts" element={<ProductsContainer />} />
            <Route path="login" element={<Navigate to={`/userhome`} />} />
        </Routes>
    )
}