import { LoginWithEmail } from "./EmailLogin"
import { useState } from "react";


export const LoginContainer = ({setLoggedInUser}) => {
    const [open, setOpen] = useState(false)

    return (
        <LoginWithEmail open={open} setLoggedInUser={setLoggedInUser} setOpen={setOpen} />
    )
}