import { getAuth } from "firebase/auth"


const api = "https://localhost:7145/api"

export const userCheck = async (firebaseId, token) => {
    try {
        const options = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const request = await fetch(`${api}/Users/userCheck/${firebaseId}`, options)
        if (request.status === 400) {
            throw new Error('User Exists.')
        } else {
            const reqJSON = await request.json()
            const resp = reqJSON
            return resp
        }
    } catch (err) {
        console.error(err)
    }
}

export const getProducts = async () => {
    try {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }
        const request = await fetch(`${api}/Products`, options)
        const requestJSON = await request.json()
        const response = requestJSON
        return response
    } catch (error) {
        console.error(error)
    }
}

export const getSpecificProduct = async (productId) => {
    try {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }
        const request = await fetch(`${api}/Products/specificproduct/${productId}`, options)
        const requestJSON = await request.json()
        const response = requestJSON
        return response
    } catch (error) {
        console.error(error)
    }
}

export const addNewUser = async (registerUser, token, setUserInfo) => {
    try {
        const options = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(registerUser)
        }
        const request = await fetch(`${api}/Users`, options)
        const requestJSON = await request.json()
        const response = requestJSON
        setUserInfo(response)
        return response
    } catch (error) {
        console.error(error)
    }
}

export const ifUserInSessionGetUser = async () => {
    const auth = getAuth();
    const token = await auth.currentUser.getIdToken();
    const user = auth.currentUser.uid
    try {
        const options = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }
        const request = await fetch(`${api}/Users/finduser/${user}`, options)
        const requestJSON = await request.json()
        const response = requestJSON
        return response
    } catch (error) {
        console.error(error)
    }
}

export const getUserProfileById = async () => {
    const auth = getAuth();
    const token = await auth.currentUser.getIdToken();
    const user = auth.currentUser.uid
    try {
        const options = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }
        const request = await fetch(`${api}/Users/fulluser/${user}`, options)
        const requestJSON = await request.json()
        const response = requestJSON
        return response
    } catch (error) {
        console.error(error)
    }
}

export const updateProfile = async (userObj) => {
    const auth = getAuth();
    const token = await auth.currentUser.getIdToken();
    try {
        const options = {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userObj)
        }
        const request = await fetch(`${api}/UserProfiles/${userObj.userId}`, options)
        const requestJSON = await request.json()
        const response = requestJSON
        return response
    } catch (err) {
        console.error(err)
    }
}