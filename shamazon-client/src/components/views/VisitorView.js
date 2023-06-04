import { Navigate, Route, Routes } from "react-router-dom"
import { VisitorHome } from "../home/VisitorHome"
import { SearchComponent } from "../search/Search"


export const VisitorView = () => {
    
    return (
        <Routes>
            <Route path="/" element={<Navigate replace to={`/visitorhome`}   /> } />
            <Route path="visitorhome" element={<VisitorHome />} />
            <Route path="search" element={<SearchComponent />} />
        </Routes>
    )
}