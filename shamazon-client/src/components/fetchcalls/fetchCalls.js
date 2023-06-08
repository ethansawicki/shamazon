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
        } else if(request.status === 200) {
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

export const addNewUser = async (registerUser, token, setUserInfo, registerUserProfile) => {
    try {
        const newUserOptions = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(registerUser)
        }
        const newUserRequest = await fetch(`${api}/Users`, newUserOptions)
        const requestJSON = await newUserRequest.json()
        const response = await requestJSON
        registerUserProfile.userId = await response.id
        await addNewUserProfile(registerUserProfile, setUserInfo, token)
        return response
    } catch (error) {
        console.error(error)
    }
}

const addNewUserProfile = async (registerUserProfile, setUserInfo, token) => {
    try {
        const newUserProfileOptions = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(registerUserProfile)
        }
        const newUserProfileRequest = await fetch(`${api}/UserProfiles`, newUserProfileOptions)
        const newRequestJSON = await newUserProfileRequest.json()
        const newResponse = newRequestJSON
        const getUserInfo = await getUserProfileById()
        setUserInfo(getUserInfo)
        return newResponse
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

export const getUserProfileById = async (token, user) => {
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
    const uid = auth.currentUser.uid
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
        await getUserProfileById(token, uid)
    } catch (err) {
        console.error(err)
    }
}

export const getUserOrderHistory = async (userId) => {
    const auth = getAuth();
    const token = await auth.currentUser.getIdToken()
    try {
        const options = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        }
        const request = await fetch(`${api}/OrderHistory/${userId}`)
        const requestJSON = await request.json();
        const response = requestJSON
        return response
    } catch (error) {
        console.error(error)
    }
}