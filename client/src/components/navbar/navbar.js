import Container from 'react-bootstrap/Container';
import { useContext } from 'react';
import { LoginContext } from '../context/context';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {NavDropdown,Image} from 'react-bootstrap';


function AppNavBar() {

  const {isLogged}=useContext(LoginContext);
  console.log(isLogged)
  

  return (
    <Navbar expand="lg" className="bg-body-tertiary shadow p-4">
      <Container>
        <Navbar.Brand href="/">Grab & Go</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/search">Search</Nav.Link>
            <Nav.Link href="/cart">Offers</Nav.Link>
            <Nav.Link href="/cart">Blogs</Nav.Link>
            {isLogged &&(
              <>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.2">
                Contact Us
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.3">Logout</NavDropdown.Item>
            </NavDropdown>
                <Nav.Link href="/profile">Profile</Nav.Link>
                <Image
                  src="/path/to/your/image.jpg" // Update with actual path or URL
                  style={{ backgroundColor: "black" }}
                  roundedCircle
                />
            </>
          ) }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavBar;