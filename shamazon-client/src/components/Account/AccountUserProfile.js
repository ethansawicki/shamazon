import { Button, Container, Form, Tab, Tabs } from "react-bootstrap"
import { getUserProfileById } from "../fetchcalls/fetchCalls";
import { useParams } from "react-router-dom"
import { useCallback, useEffect, useState } from "react"
import { EditProfile } from "./AccountEditProfile";
import { OrderHistory } from "./AccountOrderHistory";



export const AccountUserProfile = () => {
    const [userProfile, setUserProfile] = useState({})
    const [tab, setTab] = useState('AccountInfo')
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
            <Tabs
                id="fill-tab"
                className="mb-3"
                activeKey={tab}
                onSelect={(k) => setTab(k)}
                fill>
                <Tab eventKey="AccountInfo" title="Account Info">
                    <EditProfile userProfile={userProfile?.userProfile} />
                </Tab>
                <Tab eventKey="OrderHistory" title="Order History">
                    <OrderHistory />
                </Tab>
            </Tabs>
        </Container>
    )
}