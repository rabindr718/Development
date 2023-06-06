import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const Home: React.FC = () => {
  const navigate = useNavigate();
  const LoginHandler = () => {
    navigate("/Login");
  };
  const HomeHandler = () => {
    navigate("/");
  };
  return (
    <>
      <Navbar bg="primary" variant="bg">
        <Nav className="me-auto">
          <span>
            <Button variant="primary" onClick={HomeHandler}>
              Home
            </Button>
            <Button variant="primary" onClick={LoginHandler}>
              Login
            </Button>
          </span>
        </Nav>
      </Navbar>
    </>
  );
};
export default Home;
