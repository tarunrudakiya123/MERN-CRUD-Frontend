import { useContext } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../utils/AuthContext";

const NavbarComponent = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          MERN App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {user && (
              <Nav.Link as={Link} to="/">
                Products
              </Nav.Link>
            )}
          </Nav>
          <Nav>
            {user ? (
              <>
                <Navbar.Text className="me-3">
                  Welcome, {user?.name}
                </Navbar.Text>
                <Button variant="outline-light" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
