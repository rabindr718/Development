import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const showBlogHandler = () => {
    navigate("/BlogDetails");
  };
  const showAddHandler = () => {
    navigate("/AddBlogs");
  };
  return (
    <div>
      <Navbar bg="primary" variant="bg">
        <Nav className="me-auto">
          <Button variant="primary">Home</Button>
          <Button onClick={showBlogHandler} variant="primary">
            Show Blog
          </Button>
          <Button variant="primary" onClick={showAddHandler}>Add Blog</Button>
          <Button variant="primary">Log-Out</Button>
        </Nav>
      </Navbar>
    </div>
  );
};

export default Navigation;
