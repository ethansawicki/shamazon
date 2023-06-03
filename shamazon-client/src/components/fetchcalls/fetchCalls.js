

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
        const reqJSON = await request.json()
        const resp = reqJSON
        return resp
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

export const addNewUser = async () => {
    
}