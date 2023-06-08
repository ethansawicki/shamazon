import { CardGroup, Container, Tab, Tabs } from "react-bootstrap"
import { getUserOrderHistory } from "../fetchcalls/fetchCalls";
import { useParams } from "react-router-dom"
import { useCallback, useEffect, useState } from "react"
import { EditProfile } from "./AccountEditProfile";
import { OrderHistory } from "./AccountOrderHistory";



export const AccountUserProfile = ({userInfo}) => {
    const [totalUserPurchases, setTotalUserPurchases] = useState([])
    const [purchases, setPurchases] = useState([])
    const [tab, setTab] = useState('AccountInfo')
    const [editMode, setEditMode] = useState(false)
    const { userId } = useParams();
    
    const fetchUserPurchases = useCallback(async (userId) => {
        const userPurchases = await getUserOrderHistory(userId);
        setTotalUserPurchases(userPurchases)
    },[])

    useEffect(() => {
        fetchUserPurchases(userId)
    },[fetchUserPurchases, userId])

    const tabSelect = (k) => {
        setTab(k)
        setEditMode(false)
    }

    useEffect(() => {
        const morePurchases = totalUserPurchases.map((purchase) => setPurchases(purchase.orderItem))
    },[fetchUserPurchases, totalUserPurchases])


    return (
        <Container>
            <h1>User Profile</h1>
            <Tabs
                id="fill-tab"
                className="mb-3"
                activeKey={tab}
                onSelect={(k) => tabSelect(k)}
                fill>
                <Tab eventKey="AccountInfo" title="Account Info">
                    <EditProfile editMode={editMode} setEditMode={setEditMode} userInfo={userInfo} />
                </Tab>
                <Tab eventKey="OrderHistory" title="Order History">
                    {
                        // purchases.map((purchase) => {
                        //     return (
                        //         <CardGroup key={purchase.orderItemId}>
                        //             <OrderHistory purchase={purchase} />
                        //         </CardGroup>
                        //     )
                        // })
                    }
                </Tab>
            </Tabs>
        </Container>
    )
}