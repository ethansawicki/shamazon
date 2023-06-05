import { LinkContainer } from "react-router-bootstrap"
import { AccountUserProfile } from "./AccountUserProfile"


export const AccountContainer = ({userInfo}) => {
 
    
    return (
        <LinkContainer to={`/account/${userInfo.id}`}>
            <AccountUserProfile />
        </LinkContainer>
    )
}