import { Navigate, Route, Routes, Outlet } from "react-router-dom"
import { SearchComponent } from "../search/Search"
import { ProductsContainer } from "../products/ProductsContainer"
import { UserHome } from "../home/UserHome"
import { AccountContainer } from "../Account/AccountContainer"

export const LoggedInView = ({ userInfo, userUpdate, setUserUpdate }) => {
    
    return (
        <Routes>
            <Route path="/" element={
                    <UserHome userInfo={userInfo} />
            } />
            <Route path="account" element={
                <AccountContainer userInfo={userInfo} />    
            } />
            <Route path="account/:userId" element={<AccountContainer userInfo={userInfo} setUserUpdate={setUserUpdate} />} />
            <Route path="search" element={<SearchComponent />} />
            <Route path="products" element={<ProductsContainer />} />
            <Route path="products/:productId" element={<ProductsContainer />} />
            <Route path="login" element={<Navigate to={`/userhome`} />} />
        </Routes>
    )
}