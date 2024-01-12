import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import classes from "./home.module.css";
const Home: React.FC = () => {
  const navigate = useNavigate();

  const gotoAddBlog = () => {
    navigate("/AddBlog");
  };
  return (
    <div className={classes.display}>
      <Form>
        <Button
          className="btn-primary btn-md center-block"
          onClick={gotoAddBlog}
        >
          Add BLog Page
        </Button>
      </Form>
    </div>
  );
};
export default Home;
