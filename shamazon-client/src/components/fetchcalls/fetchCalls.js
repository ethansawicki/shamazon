

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