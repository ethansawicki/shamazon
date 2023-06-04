import { Navbar,Nav, NavDropdown, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export const LoggedInUserNav = ({displayName}) => {
    
    return (
        <Navbar fixed='top' bg="dark" variant="dark" expand="xxl">
            <Container>
                <LinkContainer to='/'><Navbar.Brand>Shamazon</Navbar.Brand></LinkContainer>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <LinkContainer to='/account'><Nav.Link>Account</Nav.Link></LinkContainer>                   
                        <LinkContainer to='/search'><Nav.Link>Search</Nav.Link></LinkContainer>
                            <NavDropdown title="Categories" id="basic-nav-dropdown">
                                <NavDropdown.Item href="">Category 1</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Category 2</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Category 3</NavDropdown.Item>
                            </NavDropdown>
                    </Nav>
                    <Navbar.Text>Signed in as: <LinkContainer to={`/logout`}><Nav.Link>{ displayName }</Nav.Link></LinkContainer></Navbar.Text>
                </Navbar.Collapse>
            </Container>    
        </Navbar>
    )
}