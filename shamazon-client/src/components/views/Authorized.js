import { VisitorView } from "./VisitorView"


export const Authorized = ({children, setLoggedInUser}) => {
    if (setLoggedInUser) {
        return children
    } else {
        return <VisitorView />
    }
}