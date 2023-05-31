import { VisitorView } from "./VisitorView"


export const Authorized = ({children, loggedInUser}) => {
    if (loggedInUser === true) {
        return children
    } else {
        return <VisitorView />
    }
}