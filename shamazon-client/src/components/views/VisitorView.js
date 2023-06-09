import { Route, Routes } from "react-router-dom"
import { SearchComponent } from "../search/Search"
import { ProductsContainer } from "../products/ProductsContainer"
import { VisitorHome } from "../home/VisitorHome"


export const VisitorView = () => {
    return (
        <Routes>
            <Route path="/" element={<VisitorHome />} />
            <Route path="search" element={<SearchComponent />} />
            <Route exact path="products" element={<ProductsContainer />} />
            <Route path="products/:productId" element={<ProductsContainer />} />
        </Routes>
    )
}