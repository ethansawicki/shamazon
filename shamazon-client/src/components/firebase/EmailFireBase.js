import { browserSessionPersistence, createUserWithEmailAndPassword, getAuth, setPersistence, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { addNewUser, userCheck } from "../fetchcalls/fetchCalls";


export const logInWithEmail = async (email, password, navigate, setLoggedInUser, openError, setOpenError) => {
    const auth = getAuth();
    try {
        await setPersistence(auth, browserSessionPersistence).then(async () => {
            return await signInWithEmailAndPassword(auth, email, password);    
        }).then(async () => {
            const token = await auth.currentUser.getIdToken()
            await userCheck(auth.currentUser.uid, token)
            if (userCheck) {
                setLoggedInUser(true)
                navigate("/")
            }
        })
    } catch (err) {
        console.error(err)
        setOpenError(true)
        signOut(auth)
    }
}

export const logout = (setLoggedInUser, auth, navigate) => {
    signOut(auth)
    setLoggedInUser(false)
    sessionStorage.removeItem("__SESSION")
    navigate("/")
}

export const registerWithEmail = async (name, email, password) => {
    const auth = getAuth();
     try {
         await createUserWithEmailAndPassword(auth, email, password).then(async (userCred) => {
             const userAuth = {}
             userAuth.email = userCred.user.email;
             userAuth.uid = userCred.user.uid;
             await addNewUser()
        })
        
    } catch (err) {
        console.error(err)
    }
}