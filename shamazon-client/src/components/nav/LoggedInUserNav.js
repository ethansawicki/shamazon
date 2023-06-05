import { Navbar,Nav, NavDropdown, Button, Container, OverlayTrigger, Popover } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { logout } from '../firebase/EmailFireBase';

export const LoggedInUserNav = ({displayName, setLoggedInUser, userInfo}) => {
    const handleLogout = () => {
       logout(setLoggedInUser)
    }
    return (
        <Navbar fixed='top' bg="dark" variant="dark" expand="xxl">
            <Container>
                <LinkContainer to='/'><Navbar.Brand>Shamazon</Navbar.Brand></LinkContainer>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <LinkContainer to={`/account/${userInfo.id}`}><Nav.Link>Account</Nav.Link></LinkContainer>                   
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
                            <Popover.Header as='h3'>Hello! { displayName }</Popover.Header>
                                <Popover.Body>
                                <p style={{textAlign: "center"}}>Sign Out?</p>
                                    <Button variant='danger' size='lg' onClick={() => { handleLogout() }}>Sign Out</Button>
                                </Popover.Body>
                            </Popover>
                        }>
                    <Navbar.Text>Signed in as: <a href='#'>{ displayName }</a></Navbar.Text>
                    </OverlayTrigger>
                </Navbar.Collapse>
            </Container>    
        </Navbar>
    )
}