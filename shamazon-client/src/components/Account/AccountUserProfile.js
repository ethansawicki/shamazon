import { Card, CardGroup, Container, ListGroup, Stack, Tab, Tabs } from "react-bootstrap"
import { getUserOrderHistory } from "../fetchcalls/fetchCalls";
import { useParams } from "react-router-dom"
import { useCallback, useEffect, useState } from "react"
import { EditProfile } from "./AccountEditProfile";
import { OrderHistory } from "./AccountOrderHistory";



export const AccountUserProfile = ({userInfo}) => {
    const [totalUserPurchases, setTotalUserPurchases] = useState([])
    const [userPurchases, setUserPurchases] = useState([])
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
        totalUserPurchases.map((purchase) => setUserPurchases(purchase.orderItem.products))
    },[totalUserPurchases])

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
                    <Container className="col-md-7 mx-auto">
                        {
                            totalUserPurchases.length >= 0 ?
                            totalUserPurchases.map((product, idx) => {
                                return (
                                    
                                    <ListGroup key={`order--${idx}`}>
                                            <OrderHistory key={`order--${product.orderId}`} product={product} />
                                    </ListGroup>
                                )
                            })
                                :
                                "No Previous Orders"
                        }
                    </Container>
                </Tab>
            </Tabs>
        </Container>
    )
}