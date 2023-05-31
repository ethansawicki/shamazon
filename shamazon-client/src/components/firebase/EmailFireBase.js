import { browserSessionPersistence, createUserWithEmailAndPassword, getAuth, inMemoryPersistence, setPersistence, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { userCheck } from "../fetchcalls/fetchCalls";


export const logInWithEmail = async (email, password, navigate, setLoggedInUser) => {
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
            } else {
                signOut(auth)
                setLoggedInUser(false)
                navigate("/login")
            }
        })
    } catch (err) {
        console.error(err)
    }
}

export const logout = (setLoggedInUser) => {
    const auth = getAuth();
    signOut(auth).then(() => {
        setLoggedInUser(false)
    })
}

export const registerWtihEmail = async (name, email, password) => {
     try {
         const auth = getAuth();
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
    } catch (err) {
        console.error(err)
    }
}