import { LoggedInUserNav } from "./LoggedInUserNav"
import { VisitorViewNav } from "./VisitorViewNav"


export const NavbarContainer = ({loggedInUser, setModalOpen, auth, setRegisterModalOpen, registerModalOpen, modalOpen, setLoggedInUser}) => {
    
    if (loggedInUser === true) {
        return <LoggedInUserNav auth={auth} setLoggedInUser={setLoggedInUser} />
    } else {
        return <VisitorViewNav setRegisterModalOpen={setRegisterModalOpen} registerModalOpen={registerModalOpen} modalOpen={modalOpen} setModalOpen={setModalOpen} />
    }
}