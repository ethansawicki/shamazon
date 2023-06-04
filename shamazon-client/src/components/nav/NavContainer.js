import { LoggedInUserNav } from "./LoggedInUserNav"
import { VisitorViewNav } from "./VisitorViewNav"


export const NavbarContainer = ({loggedInUser, displayName, setModalOpen, setRegisterModalOpen, registerModalOpen, modalOpen, setLoggedInUser}) => {
    
    if (loggedInUser === true) {
        return <LoggedInUserNav displayName={displayName} setLoggedInUser={setLoggedInUser} />
    } else {
        return <VisitorViewNav setRegisterModalOpen={setRegisterModalOpen} registerModalOpen={registerModalOpen} modalOpen={modalOpen} setModalOpen={setModalOpen} />
    }
}