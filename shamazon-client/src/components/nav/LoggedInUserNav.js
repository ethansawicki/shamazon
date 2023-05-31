import { Navbar,Nav, NavDropdown, Container } from 'react-bootstrap';

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
                    <Navbar.Text>Signed in as:</Navbar.Text>
                </Navbar.Collapse>
            </Container>    
        </Navbar>
    )
}