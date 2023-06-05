import { browserSessionPersistence, createUserWithEmailAndPassword, getAuth, setPersistence, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { addNewUser, ifUserInSessionGetUser, userCheck } from "../fetchcalls/fetchCalls";


export const logInWithEmail = async (email, password, navigate, setLoggedInUser, setOpenError) => {
    const auth = getAuth();
    try {
        await setPersistence(auth, browserSessionPersistence).then(async () => {
            return await signInWithEmailAndPassword(auth, email, password);    
        }).then(async () => {
            const token = await auth.currentUser.getIdToken()
            await ifUserInSessionGetUser(auth.currentUser.uid, token)
            if (ifUserInSessionGetUser) {
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

export const registerWithEmail = async (registerUser, setLoggedInUser, setUserInfo, setOpenError) => {
    const auth = getAuth();
    const userAuth = {}
     try {
        await createUserWithEmailAndPassword(auth, registerUser.email, registerUser.password).then(async (userCred) => {
            userAuth.email = userCred.user.email;
            userAuth.firebaseId = userCred.user.uid;
            userAuth.displayName = registerUser.displayName
            const token = await auth.currentUser.getIdToken()
            try {
                await userCheck(auth.currentUser.uid, token)
                await addNewUser(userAuth, token, setUserInfo)
                setLoggedInUser(true)
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