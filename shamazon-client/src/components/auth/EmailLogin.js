import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";

export const emailAuth = {
    register: function (userObj, navigate) {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, userObj.email, userObj.password)
            .then((userCredential) => {
                const auth = getAuth();
                updateProfile(auth.currentUser, {
                    displayName: userObj.firstName,
                }).then(
                    function () {
                        const userAuth = {
                            email: userCredential.user.email

                        }
                    }
                )
            })
    }
}