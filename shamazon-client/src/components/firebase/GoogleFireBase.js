import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        
    } catch (err) {
        console.error(err)
    }
}