import { Button, Container, Form } from "react-bootstrap"
import { getUserProfileById } from "../fetchcalls/fetchCalls";
import { useParams } from "react-router-dom"
import { useCallback, useEffect, useState } from "react"



export const AccountUserProfile = () => {
    const [userProfile, setUserProfile] = useState({})
    const { userId } = useParams();

    const fetchUserProfile = useCallback(async () => {
        const userProfile = await getUserProfileById(userId);
        setUserProfile(await userProfile)
    },[])
    
    useEffect(() => {
        fetchUserProfile(userId)
    }, [fetchUserProfile, userId])

    return (
        <Container>
            <h1>User Profile</h1>
            <Form>
                <Form.Control type="text" placeholder={userProfile.firstName} />
                <Button></Button>
                <Button></Button>
                <Button></Button>
            </Form>
        </Container>
    )
}