// import Modal from "react-bootstrap/Modal";
// import React, { useState } from "react";
// import Button from "react-bootstrap/Button";
// import Navbar from "react-bootstrap/Navbar";
// import Nav from "react-bootstrap/Nav";
// import classes from "./blogDetails.module.css";
// import Navigation from "../navigation/navbar";
// import { useNavigate } from "react-router-dom";

// const BlogDetails: React.FC = () => {
//   const navigate = useNavigate();
//   const [blogAvailable, setBlogAvailable] = useState(true);
//   const [delet, setBlogList] = useState(" ");
//   const [updat, setUpdateBlog] = useState("");

//   const data = localStorage.getItem("BlogData");
//   const localStoreData = JSON.parse(data as any);

//   const DeleteBlogHandler = () => {
//     const idsr = localStoreData[0].id;
//     console.log(idsr);
//   };
//   // const id = Object.entries(localStoreData);
//   // console.log(id);
//   //
//   //
//   //
//   //
//   ///
//   //
//   //
//   //
//   //
//   //
//   const UpdateBlogHandler = (id: any) => {
//     // console.log(id.target.id);
//     // const data = localStorage.getItem("BlogData");
//     // const localStoreData = JSON.parse(data as string);
//     // const { plainText } = localStoreData[0];
//     // console.log(plainText, localStoreData);
//     // console.log(id.target.id);
//     // localStoreData.forEach((x: any) => {
//     //   console.log(x.id);
//     // });
//     // const j = localStoreData.find((x: any) => x.id === 50);
//     // console.log(j);
//   };

//   //
//   ///
//   //
//   //
//   //
//   //
//   //
//   ///
//   ///
//   ///
//   ///
//   ///
//   ///
//   //

//   const paginationNext = () => {
//     navigate("/");
//   };
//   const paginationPrevious = () => {
//     navigate("/");
//   };

//   return (
//     <div>
//       <Navbar bg="primary" variant="bg">
//         <Nav className="me-auto">
//           <Navigation />
//         </Nav>
//       </Navbar>

//       {blogAvailable && (
//         <div className={classes.showPage}>
//           {localStoreData.map((e: any, id: any) => (
//             <div key={id}>
//               <Modal.Title>
//                 <h5>Show Blog</h5>
//                 <h1>{e.title}</h1>
//               </Modal.Title>
//               <p className={classes.date}>Published Date : {" " + e.date}</p>
//               <div className={classes.image}>
//                 <img src={e.file} height="300" width="770"></img>
//               </div>
//               <p>{e.plainText}</p>
//               <p className={classes.author}>
//                 <strong>
//                   <i>Author ~ {e.authorUser}</i>
//                 </strong>
//               </p>
//               <div className="deleteUpdate justify-content-center">
//                 <Button variant="danger secondary" onClick={DeleteBlogHandler}>
//                   Delete
//                 </Button>{" "}
//                 <Button variant="success primary" onClick={UpdateBlogHandler}>
//                   Edit
//                 </Button>
//               </div>
//               <footer>
//                 <div className={classes.pagination}>
//                   <Button onClick={paginationPrevious} variant="info primary">
//                     Previous
//                   </Button>{" "}
//                   <Button onClick={paginationNext} variant="info primary">
//                     Next
//                   </Button>
//                 </div>
//               </footer>
//               <hr className={classes.blogSpace}></hr>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default BlogDetails;

// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import Form from "react-bootstrap/Form";
// import classes from "../blogs/addpage.module.css";
// import Button from "react-bootstrap/Button";
// import React, { useState, useRef } from "react";
// import JoditEditor from "jodit-react";
// import Navigation from "../navigation/navbar";
// import { useNavigate } from "react-router-dom";

// const blogs: any = [];

// const AddBlogs: React.FC = () => {
//   const [updateBlog, setUpdateBlog] = useState(null);

//   let new_Date: Date = new Date();
//   const date: string = `${new_Date.getDate()}/${
//     new_Date.getMonth() + 1
//   }/${new_Date.getFullYear()}`;
//   // }/${new_Date.getFullYear().toLocaleString()}`;

//   const [title, setTitle] = useState(" ");
//   const [selected, setSelectValue] = useState("");
//   const [file, setFile] = useState("");
//   const [author, setAuthor] = useState("");
//   const [errorMsg, setErrorMsg] = useState("");
//   const editor = useRef(null);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [isPublished, setIsPublished] = useState(false);

//   const handleEditClick = () => {
//     setIsEditMode(true);
//   };

//   const handleDeleteClick = () => {
//     // Perform action when Delete button is clicked
//     // ...
//   };

//   const handlePublishClick = () => {
//     setIsPublished(true);
//   };

//   const handleCancelClick = () => {
//     setIsEditMode(false);
//     setIsPublished(false);
//   };

//   const [description, setdescription] = useState("");
//   const navigate = useNavigate();

//   const localStorageData = JSON.parse(
//     localStorage.getItem("LoginData") as string
//   );
//   console.log("Execute ", localStorageData);
//   const authorUser =
//     localStorageData.username.charAt(0).toUpperCase() +
//     localStorageData.username.substring(1);

//   console.log(localStorageData.username);
//   //  Here Logic for Update Data
//   // console.log(username);
//   // const updatenewData = (
//   //   ids: string | number,
//   //   title: any,
//   //   discription: any,
//   //   file: any,
//   //   author: any,
//   //   publishDate: any,
//   //   tags: any
//   // ) => {
//   //   setBloggingList(
//   //     blog.map((d: any) =>
//   //       +d.id === +ids
//   //         ? {
//   //             id: ids,
//   //             Title: title,
//   //             Description: discription,
//   //             Images: file,
//   //             Author: authorUser,
//   //             PublishDate: publishDate,
//   //             Tags: tags,
//   //           }
//   //         : d
//   //     )
//   //   );
//   //   setUpdateBlog("");
//   // };
// //   const fileInput = (event: any) => setFile(event.target.value);

// //   const fileHandler = (e: any) => {
// //     console.log(e.target.files);
// //     setFile(URL.createObjectURL(e.target.files[0]));
// //   };

// //   const fileFetchHandler = function (e: any) {
// //     fileInput(e);
// //     fileHandler(e);
// //   };

// //   const parser = new DOMParser();
// //   const htmlDocument = parser.parseFromString(description, "text/html");
// //   const plainText = htmlDocument.body.textContent;
// //   // Handle Add Blog Here
// //   const AddBlogsHandler = (e: any) => {
// //     e.preventDefault();
// //     const parser = new DOMParser();
// //     const htmlDocument = parser.parseFromString(description, "text/html");
// //     const plainText = htmlDocument.body.textContent;

// //     // console.log(description);

// //     //Here Print in Console

// //     // console.log(plainText);
// //     // console.log(title);
// //     // console.log(authorUser);
// //     // console.log(file);
// //     // console.log(selected);
// //     // console.log(date);

// //     // if (
// //     //   title.trim().length === 0 ||
// //     //   description.trim().length === 0 ||
// //     //   file === "" ||
// //     //   setSelectValue.length === 0
// //     // ) {
// //     //   setErrorMsg("Hi, ");
// //     // } else if (!validator.isAlpha(title)) {
// //     //   setErrorMsg("Not valid");
// //     // } else {
// //     // if (!UpdateBlog) {
// //     // setBloggingList([
// //     //   // ...blog,
// //     //   {
// //     //     // id: blog.length,
// //     //     Title: title,
// //     //     Description: description,
// //     //     Images: file,
// //     //     // Author: username,
// //     //     PublishDate: date,
// //     //     Tags: setSelectValue,
// //     //   },
// //     // ]);
// //     alert("Blog is Publish");
// //     // }
// //     // else {
// //     //   updatenewData(
// //     //     +UpdateBlog.id,
// //     //     title,
// //     //     description,
// //     //     file,
// //     //     date,
// //     //     selected
// //     //   );
// //     //   navigate("/HomeAfterLogin");
// //     // }
// //     //     setTitle("");
// //     //     setdescription("");
// //     //     setSelectValue("");
// //     //     setErrorMsg("");
// //     //     // console.log(blog);
// //     //   }

// //     const BlogData = {
// //       id: Math.floor(Math.random() * 100 + 1),
// //       date,
// //       plainText,
// //       title,
// //       authorUser,
// //       file,
// //       selected,
// //     };
// //     console.log(BlogData.id);

// //     let blogsString = localStorage.getItem("BlogData");
// //     if (!blogsString) {
// //       blogsString = "[]";
// //     }
// //     const blogs = JSON.parse(blogsString as string);
// //     blogs.push(BlogData);
// //     localStorage.setItem("BlogData", JSON.stringify(blogs));
// //     navigate("/HomeAfterLogin");
// //   };

// //   const closePageHandler = () => {
// //     navigate("/");
// //   };

// //   return (
// //     <>
// //       <Navbar bg="primary" variant="bg">
// //         <Nav className="me-auto">
// //           <Navigation />
// //         </Nav>
// //       </Navbar>
// //       <form className={classes.showPage}>
//         <div className="mb-3">
//           <label htmlFor="exampleFormControlInput1" className="form-label">
//             <h2> Title</h2>
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="exampleFormControlInput1"
//             placeholder="Write Title"
//             onChange={(event) => setTitle(event.target.value)}
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="exampleFormControlTextarea1" className="form-label">
//             <strong> Write Here Descrition</strong>
//           </label>
//           <div className="text-editor">
//             <JoditEditor
//               ref={editor}
//               value={description}
//               onChange={(content) => {
//                 setdescription(content);
//               }}
//             />
//           </div>
//         </div>
//         <div>
//           <div className="mb-3">
//             <label htmlFor="formFileMultiple" className="form-label">
//               Multiple files input example
//             </label>
//             <input
//               className="form-control"
//               type="file"
//               id="formFileMultiple"
//               onChange={fileFetchHandler}
//             />
//           </div>
//           <Form.Group className="input-group">
//             <Form.Select
//               className="form-control"
//               value={selected}
//               onChange={(e) => setSelectValue(e.target.value)}
//             >
//               <option value="Version">Version</option>
//               <option value="Update 2">Update 2</option>
//               <option value="Update 3">Update 3</option>
//               <option value="Update 4">Update 4</option>
//             </Form.Select>
//           </Form.Group>
//           <br></br>
//           <div className="mb-3">
//             <label htmlFor="formFileMultiple" className="form-label">
//               Author{" "}
//             </label>
//             <input
//               className="form-control"
//               id="formFileMultiple"
//               onChange={(event) => setAuthor(event.target.value)}
//               disabled={true}
//               value={authorUser}
//               placeholder={authorUser}
//             />
//           </div>
//         </div>
//         <footer>
//           <div className="deleteUpdate justify-content-center">
//             {!isEditMode && (
//               <div>
//                 {/* <button onClick={handleEditClick}>Edit</button> */}
//                 <button onClick={handleCancelClick}>Cancel</button>
//                 {/* <button onClick={handleDeleteClick}>Delete</button> */}
//                 <button onClick={AddBlogsHandler}>Publish</button>
//               </div>
//             )}

//             {isEditMode && (
//               <div>
//                 <button onClick={handleCancelClick}>Cancel</button>
//                 <button>Update</button>
//               </div>
//             )}

//             {!isPublished && (
//               <div>
//                 {/* <button onClick={handlePublishClick}>Publish</button> */}
//               </div>
//             )}

//             {isPublished && (
//               <div>
//                 <button onClick={handleCancelClick}>Cancel Publish</button>
//               </div>
//             )}
//             {/* <Button variant="danger secondary " onClick={closePageHandler}>
//               Exit
//             </Button>{" "}
//             <Button variant="primary" onClick={AddBlogsHandler}>
//               {updateBlog ? "Update" : "Publish"}
//             </Button> */}
//           </div>
//         </footer>
//       </form>
//     </>
//   );
// };

// export default AddBlogs;
