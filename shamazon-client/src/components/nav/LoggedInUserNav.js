import { Navbar,Nav, NavDropdown, Button, Container, OverlayTrigger, Popover, ButtonGroup } from 'react-bootstrap';

export const LoggedInUserNav = () => {
    return (
        <Navbar fixed='top' bg="dark" variant="dark" expand="xxl">
            <Container>
                <Navbar.Brand href="/">Shamazon</Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href='/'>Eventual Link</Nav.Link>
                            <NavDropdown title="Links" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Search</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">
                                    Categories
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            </NavDropdown>
                    </Nav>
                    <OverlayTrigger placement='bottom' trigger="click" rootClose overlay={
                        <Popover>
                            <Popover.Header as='h3'>Choose Option Below</Popover.Header>
                            <Popover.Body>
                                <ButtonGroup>
                                    <Button>Sign In</Button>
                                    <Button>Register</Button>
                                </ButtonGroup>
                            </Popover.Body>
                        </Popover>
                    }>
                        <Navbar.Text>Signed in as: <a href=''>Replace Me</a></Navbar.Text>
                    </OverlayTrigger>
                </Navbar.Collapse>
            </Container>    
        </Navbar>
    )
}