import { LoggedInUserNav } from "./LoggedInUserNav"
import { VisitorViewNav } from "./VisitorViewNav"


export const NavbarContainer = ({ loggedInUser,
    displayName,
    setModalOpen,
    setRegisterModalOpen,
    registerModalOpen,
    modalOpen,
    userInfo,
    setLoggedInUser,
 }) => {
    
    if (loggedInUser === true) {
        return <LoggedInUserNav displayName={displayName} userInfo={userInfo} setLoggedInUser={setLoggedInUser} />
    } else {
        return <VisitorViewNav setRegisterModalOpen={setRegisterModalOpen} registerModalOpen={registerModalOpen} modalOpen={modalOpen} setModalOpen={setModalOpen} />
    }
}