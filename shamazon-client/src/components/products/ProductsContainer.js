import { VisitorProducts } from "./VisitorProducts"
import { AccountProducts } from "./AccountProducts"


export const ProductsContainer = ({loggedInUser}) => {
    
    if (loggedInUser) {
        return <AccountProducts />
    } else {
        return <VisitorProducts />
    }
}