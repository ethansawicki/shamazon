import { Navbar,Nav, NavDropdown, Button, Container, OverlayTrigger, Popover, ButtonGroup } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { CartBody } from '../cart/CartBody';
import { useContext } from 'react';
import { CartContext } from '../cart/Cart';

  
export const VisitorViewNav = ({ setModalOpen, setRegisterModalOpen, modalOpen, registerModalOpen }) => {
    const cart = useContext(CartContext);
    const handleLoginModalOpen = () => {
        if (registerModalOpen === true) {
            setRegisterModalOpen(false)
            setModalOpen(true)
        } else {
            setModalOpen(true)
        }
    }
    const handleRegisterModalOpen = () => {
        if (modalOpen === true) {
            setModalOpen(false)
            setRegisterModalOpen(true)
        } else {
            setRegisterModalOpen(true)
        }
    }

    return (
        <Navbar fixed='top' bg="dark" variant="dark" expand="xxl">
            <Container>
            <LinkContainer to='/'><Navbar.Brand>Shamazon</Navbar.Brand></LinkContainer>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                        <LinkContainer to='/search'><Nav.Link>Search</Nav.Link></LinkContainer>
                        <LinkContainer to='/products'><Nav.Link>Products</Nav.Link></LinkContainer>
                            <NavDropdown title="Categories" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Category 1</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">
                                    Category 2
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Category 3</NavDropdown.Item>
                            </NavDropdown>
                    </Nav>
                        <OverlayTrigger placement='bottom' trigger="click" rootClose overlay={
                            <Popover>
                                <Popover.Header style={{textAlign: "center"}} as='h3'>Hello!</Popover.Header>
                                <Popover.Body>
                                <p style={{textAlign: "center"}}>Sign in or register below</p>
                                <ButtonGroup>
                                    <Button onClick={() => {handleLoginModalOpen()}}>Sign In</Button>
                                    <Button onClick={() => { handleRegisterModalOpen() }}>Register</Button>
                                    <Button onClick={() => {}}>Google</Button>
                                    </ButtonGroup>
                                </Popover.Body>
                            </Popover>
                        }>
                            <Button variant="success" size='sm'>Log In or Sign Up</Button>
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
                                <Button variant='primary' size='sm'>You must sign in to checkout</Button>
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