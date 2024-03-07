import React, { Fragment } from "react";
import EmployeData from "./DataSource";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
function Home() {
  const History = useNavigate();

  const HandleEdit = (id, name, age) => {
    localStorage.setItem("Name", name);
    localStorage.setItem("Age", age);
    localStorage.setItem("Id", id);
  };
  const DeleteHandler = (id) => {
    var index = EmployeData.map((e) => e.id).indexOf(id);

    EmployeData.splice(index, 1);
    History("/");
  };

  return (
    <Fragment>
      <div style={{ margin: "10rem" }}>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>UserName</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {EmployeData && EmployeData.length > 0
              ? EmployeData.map((item) => {
                  return (
                    <tr>
                      <td>{item.name}</td>
                      <td>{item.age}</td>
                      <td>
                        <Link to={"./edit"}>
                          <Button
                            type="button"
                            class="btn btn-warning"
                            onClick={() =>
                              HandleEdit(item.id, item.name, item.age)
                            }
                          >
                            Edit
                          </Button>
                        </Link>
                        &nbsp;
                        <Button
                          type="button"
                          class="btn btn-danger"
                          onClick={DeleteHandler}
                        >
                          Delete{" "}
                        </Button>
                      </td>
                    </tr>
                  );
                })
              : "No Data Available"}
          </tbody>
        </Table>
        <br></br>
        <Link className="d-grid gap-2" to="/create">
          <Button size="lg">CREATE</Button>
        </Link>
      </div>
    </Fragment>
  );
}

export default Home;
