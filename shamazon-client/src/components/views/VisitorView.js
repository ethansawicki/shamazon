import { Route, Routes } from "react-router-dom"
import { SearchComponent } from "../search/Search"
import { ProductsContainer } from "../products/ProductsContainer"


export const VisitorView = () => {
    
    return (
        <Routes>
            <Route path="/" element={<ProductsContainer />} />
            <Route path="search" element={<SearchComponent />} />
            <Route path="products" element={<ProductsContainer />} />
            <Route path="products/:productId" element={<ProductsContainer />} />
        </Routes>
    )
}