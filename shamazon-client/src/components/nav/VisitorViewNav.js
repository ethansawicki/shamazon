import { Navbar,Nav, NavDropdown, Button, Container, OverlayTrigger, Popover, ButtonGroup } from 'react-bootstrap';
import GoogleButton from 'react-google-button';
import { LinkContainer } from 'react-router-bootstrap';

  
export const VisitorViewNav = ({ setModalOpen, setRegisterModalOpen }) => {
    const handleLoginModalOpen = () => {
        setModalOpen(true)
    }
    const handleRegisterModalOpen = () => {
        setRegisterModalOpen(true)
    }

    return (
        <Navbar fixed='top' bg="dark" variant="dark" expand="xxl">
            <Container>
            <LinkContainer to='/visitorhome'><Navbar.Brand>Shamazon</Navbar.Brand></LinkContainer>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                        <LinkContainer to='/search'><Nav.Link>Search</Nav.Link></LinkContainer>
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
                                <Popover.Header as='h3'>Hello!</Popover.Header>
                                <Popover.Body>
                                <p>Sign in or register below</p>
                                <ButtonGroup>
                                        <Button onClick={() => handleLoginModalOpen()}>Sign In</Button>
                                        <Button onClick={() => handleRegisterModalOpen()}>Register</Button>
                                    </ButtonGroup>
                                    <GoogleButton onClick={() => {}}></GoogleButton>
                                </Popover.Body>
                            </Popover>
                        }>
                            <Button variant="secondary">Log In</Button>
                            </OverlayTrigger>
                </Navbar.Collapse>
            </Container>    
        </Navbar>
    )
}