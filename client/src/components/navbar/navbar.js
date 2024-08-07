import Container from 'react-bootstrap/Container';
import { useContext,useEffect,useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import {NavDropdown,Image} from 'react-bootstrap';
import { useSelector,useDispatch } from 'react-redux';
import cookie from 'js-cookie'
import { setLogout } from '../../slices/login';


function AppNavBar() {

  const login=useSelector((state)=>state.loginInfo.isLogin)
  console.log(login,'login from navbar')
  const dispatch=useDispatch()

  const profileImage=useSelector((state)=>state.profileImageInfo.profileImage)

  const navigate=useNavigate()

  const handleLogout=()=>{
    cookie.remove('jwt_id')
    dispatch(setLogout())
    navigate("/login")
  }

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
            {login===true &&(
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
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/cart">Cart</Nav.Link>
            <Nav.Link href="/profile">Profile</Nav.Link>
            <Image
              src={`http://localhost:3001/uploads/${profileImage}`}
              style={{ backgroundColor: "black",borderRadius:"90px",width:"55px",height:"53px" }}
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