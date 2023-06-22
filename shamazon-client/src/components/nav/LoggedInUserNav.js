import { Navbar,Nav, NavDropdown, Button, Container, OverlayTrigger, Popover, Stack } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { logout } from '../firebase/EmailFireBase';
import { CartBody } from '../cart/CartBody';
import { useContext, useEffect } from 'react';
import { CartContext } from '../cart/Cart';
import { addNewOrder, addNewOrderHistory, addNewOrderItem } from '../fetchcalls/fetchCalls';

export const LoggedInUserNav = ({ setLoggedInUser, userInfo }) => {
    const cart = useContext(CartContext);
    const handleLogout = () => {
       logout(setLoggedInUser)
    }
    

    const handleOrder = async () => {
        const total = cart.getTotalCost()
        cart.order.orderTotal = total
        const orderItem = cart.items
        const id = await addNewOrder(cart.order, orderItem)
        const orderHistory = {
            orderNumber: id.id,
            userId: userInfo.id
        }
        await addNewOrderHistory(orderHistory)
        for (const orders of cart.products) {
            orders.orderId = id.id
            await addNewOrderItem(orders)
        }
        cart.removeAllFromCart()
    }

    

    return (
        <Navbar fixed='top' bg="dark" variant="dark" expand="xxl">
            <Container>
                <LinkContainer to='/'><Navbar.Brand>Shamazon</Navbar.Brand></LinkContainer>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <LinkContainer to={`/account/${userInfo?.id}`}><Nav.Link>Account</Nav.Link></LinkContainer>                   
                        <LinkContainer to='search'><Nav.Link>Search</Nav.Link></LinkContainer>
                        <LinkContainer to='products'><Nav.Link>Products</Nav.Link></LinkContainer>
                            <NavDropdown title="Categories" id="basic-nav-dropdown">
                                <NavDropdown.Item href="">Category 1</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Category 2</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Category 3</NavDropdown.Item>
                            </NavDropdown>
                    </Nav>
                    <OverlayTrigger placement='bottom' trigger="click" rootClose overlay={
                            <Popover>
                            <Popover.Header as='h3'>Hello! { userInfo?.userProfile?.displayName }</Popover.Header>
                                <Popover.Body>
                                <p style={{textAlign: "center"}}>Sign Out?</p>
                                    <Button variant='danger' size='lg' onClick={() => { handleLogout() }}>Sign Out</Button>
                                </Popover.Body>
                            </Popover>
                        }>
                    <Navbar.Text className='col-xl-2'>Signed in as: <a href='#logout'>{ userInfo?.userProfile?.displayName }</a></Navbar.Text>
                    </OverlayTrigger>
                        <OverlayTrigger placement='bottom' trigger="click" rootClose overlay={
                            <Popover>
                                <Popover.Header style={{textAlign: "center"}} as='h3'>Cart</Popover.Header>
                                <Popover.Body>
                                {
                                    cart.items.length > 0 ?
                                    cart.items.map((currentProduct, idx) => {
                                        return (
                                            <CartBody key={idx} currentProduct={currentProduct} />
                                        )
                                    })
                                    : "You have no items in your cart"
                                }
                                
                            </Popover.Body>
                            <Popover.Body>
                                <Stack>
                                Total: ${ cart.getTotalCost().toFixed(2)}
                                <Button onClick={() => {handleOrder()}} variant='primary' size='sm'>Checkout</Button>
                                </Stack>
                            </Popover.Body>
                            </Popover>
                        }>
                            <Button style={{marginLeft: "10px"}} variant='primary' size='sm'>Cart</Button>
                    </OverlayTrigger>
                </Navbar.Collapse>
            </Container>    
        </Navbar>
    )
}