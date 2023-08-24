// import { useState } from "react";
// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
// import ReactPlayer from "react-player";
// import classes from "./app.module.css";
// import { isDisabled } from "@testing-library/user-event/dist/utils";
// function Example() {
//   const [show, setShow] = useState(false);
//   const [username, setUsername] = useState("");
//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   const handleUsernameChange = (event) => {
//     setUsername(event.target.value);
//   };
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     console.log("Username:", username);
//   };
//   return (
//     <>
//       <div className={classes.application}>
//         <ReactPlayer
//           id="username"
//           value={username}
//           onChange={handleUsernameChange}
//           url="https://youtu.be/miKW_q8P9D0"
//           onClick={handleSubmit}
//         />
//       </div>
//       <Button variant="primary" onClick={handleShow}>
//         Share Press{" "}
//       </Button>

//       <Modal
//         show={show}
//         onHide={handleClose}
//         backdrop="static"
//         keyboard={false}
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>Share Anywhere</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           I will not close if you click outside me. Don not even try to press
//           escape key.
//         </Modal.Body>
//         <Modal.Footer></Modal.Footer>
//       </Modal>
//     </>
//   );
// }

// export default Example;
