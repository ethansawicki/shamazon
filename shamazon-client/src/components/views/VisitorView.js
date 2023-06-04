import { Outlet, Route, Routes } from "react-router-dom"
import { VisitorHome } from "../home/VisitorHome"
import { SearchComponent } from "../search/Search"
import { ProductsContainer } from "../products/ProductsContainer"


export const VisitorView = ({loggedInUser}) => {
    
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <ProductsContainer loggedInUser={loggedInUser} />
                    <Outlet />
                </>
             } />
            <Route path="visitorhome" element={ <VisitorHome /> } />
            <Route path="search" element={<SearchComponent />} />
        </Routes>
    )
}