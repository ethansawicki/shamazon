import { browserSessionPersistence, createUserWithEmailAndPassword, getAuth, setPersistence, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { addNewUser, ifUserInSessionGetUser, userCheck } from "../fetchcalls/fetchCalls";


export const logInWithEmail = async (email, password, navigate, setLoggedInUser, setOpenError) => {
    const auth = getAuth();
    try {
        await setPersistence(auth, browserSessionPersistence).then(async () => {
            return await signInWithEmailAndPassword(auth, email, password);    
        }).then(async () => {
            const token = await auth.currentUser.getIdToken()
            const user = await ifUserInSessionGetUser(auth.currentUser.uid, token)
            if (user) {
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

export const logout = (setLoggedInUser) => {
    const auth = getAuth();
    try { 
        signOut(auth)  
        setLoggedInUser(false)
        sessionStorage.removeItem("__SESSION")
    } catch (err) {
        console.error(err)
    } 
}

export const registerWithEmail = async (registerUser, setUserInfo, setOpenError , registerUserProfile) => {
    const auth = getAuth();
    const userAuth = {}
    let token = ""
     try {
        await createUserWithEmailAndPassword(auth, registerUser.email, registerUser.password).then(async (userCred) => {
            userAuth.email = userCred.user.email;
            userAuth.firebaseId = userCred.user.uid;
            token = await auth.currentUser.getIdToken()
            try {
                await addNewUser(userAuth, token, setUserInfo, registerUserProfile)
            } catch (error) {
                console.error(error)
            }
        })
    } catch (error) {
         console.error(error)
         setOpenError(true)
         signOut(auth)
         sessionStorage.removeItem("__SESSION")
    }
    
}