import { browserSessionPersistence, createUserWithEmailAndPassword, getAuth, setPersistence, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { addNewUser, userCheck } from "../fetchcalls/fetchCalls";


export const logInWithEmail = async (email, password, navigate, setLoggedInUser, setOpenError) => {
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

export const logout = (setLoggedInUser, navigate) => {
    const auth = getAuth();
    try { 
        signOut(auth)  
        setLoggedInUser(false)
        sessionStorage.removeItem("__SESSION")
        navigate("/")
    } catch (err) {
        console.error(err)
    } 
}

export const registerWithEmail = async (registerUser, setLoggedInUser) => {
    const auth = getAuth();
    const userAuth = {}
     try {
         await createUserWithEmailAndPassword(auth, registerUser.email, registerUser.password, registerUser.displayName).then(async (userCred) => {
             userAuth.email = userCred.user.email;
             userAuth.uid = userCred.user.uid;
             userAuth.displayName = userCred.user.displayName;
         }).then(async () => {
             const token = await auth.currentUser.getIdToken()
             await userCheck(auth.currentUser.uid, token)
             if (userCheck) {
                 console.log("user exists dont make new user")
                 signOut(auth)
             } else {
                 await addNewUser(userAuth)
             }
        })
        
    } catch (error) {
        console.error(error)
    }
}