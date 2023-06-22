import { LinkContainer } from "react-router-bootstrap"
import { AccountUserProfile } from "./AccountUserProfile"


export const AccountContainer = ({userInfo, setUserUpdate}) => {
 
    
    return (
        <LinkContainer to={`/account/${userInfo.id}`}>
            <AccountUserProfile userInfo={userInfo} setUserUpdate={setUserUpdate} />
        </LinkContainer>
    )
}