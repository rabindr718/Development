// import React from "react";
// import { useDispatch } from "react-redux";
// import { Form, Button } from "react-bootstrap";
// import addBlog from "../store/actions";
// import classes from "./addblog.module.css";

// const AddBlog: React.FC = () => {
//   const dispatch = useDispatch();

//   const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const formData = new FormData(e.currentTarget);
//     const fullname = formData.get("fullname") as string;
//     const textdata = formData.get("textdata") as string;

//     dispatch(
//       addBlog({
//         fullname,
//         textdata,
//       })
//     );
//     e.currentTarget.reset();
//   };

//   return (
//     <div>
//       <Form className={classes.displayform} onSubmit={formSubmitHandler}>
//         <div className="input-group">
//           <input
//             id="fullname"
//             type="text"
//             name="fullname"
//             className="form-control"
//             placeholder="Full Name"
//           />
//         </div>
//         <div className="input-group">
//           <textarea
//             id="email"
//             name="textdata"
//             className="form-control"
//             placeholder="textArea"
//           />
//         </div>
//         <Button type="submit" variant="success primary">
//           Send Text
//         </Button>
//       </Form>
//     </div>
//   );
// };

// export default AddBlog;

// AddBlog.tsx
import React from "react";
import { useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import addBlog from "../store/actions";
import classes from "./addblog.module.css";

const AddBlog: React.FC = () => {
  const dispatch = useDispatch();

  const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const fullname = formData.get("fullname") as string;
    const textdata = formData.get("textdata") as string;

    dispatch(
      addBlog({
        fullname,
        textdata,
      })
    );
    e.currentTarget.reset();
  };

  return (
    <div>
      <Form className={classes.displayform} onSubmit={formSubmitHandler}>
        <div className="input-group">
          <input
            id="fullname"
            type="text"
            name="fullname"
            className="form-control"
            placeholder="Full Name"
          />
        </div>
        <div className="input-group">
          <textarea
            id="email"
            name="textdata"
            className="form-control"
            placeholder="textArea"
          />
        </div>
        <Button type="submit" variant="success primary">
          Send Text
        </Button>
      </Form>
    </div>
  );
};

export default AddBlog;
