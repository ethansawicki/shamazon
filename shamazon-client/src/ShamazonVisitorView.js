import { Route, Routes } from "react-router-dom"
import { VisitorViewNav } from "./components/nav/VisitorViewNav"
import { VisitorView } from "./components/views/VisitorView"

export const ShamazonVisitorView = () => {
    return (
        <Routes>
            <Route
                path="*"
                element={
                    <>
                        <VisitorViewNav />
                        <VisitorView />
                    </>
                }
            />
        </Routes>
    )
}