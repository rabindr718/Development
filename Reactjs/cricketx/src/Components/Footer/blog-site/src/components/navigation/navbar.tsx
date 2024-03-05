import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const showBlogHandler = () => {
    navigate("/BlogDetails");
  };

  const showAddBlog = () => {
    navigate("/AddBlogs");
  };

  const LogoutHandler = () => {
    navigate("/");
    localStorage.removeItem("key");
  };
  const HomeHandler = () => {
    navigate("/HomeAfterLogin");
  };

  return (
    <div>
      <Button variant="primary" onClick={HomeHandler}>
        Home
      </Button>

      <Button onClick={showBlogHandler} variant="primary">
        Show Blog
      </Button>
      <Button onClick={showAddBlog} variant="primary">
        Add Blog
      </Button>
      <Button variant="primary" onClick={LogoutHandler}>
        Log-Out
      </Button>
    </div>
  );
};

export default Navigation;
