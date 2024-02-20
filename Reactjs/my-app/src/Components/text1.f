// import React from "react";
// import { useState } from "react";
// import classes from "./Navbar.module.css";

// function Model() {
//   const [isModalOpen, setIsModalOpen] = useState(true);
//   const [isModalOpen2, setIsModalOpen2] = useState(false);
//   const [isModalOpen3, setIsModalOpen3] = useState(false);
//   const [isModalOpen4, setIsModalOpen4] = useState(false);
//   const [isModalOpen5, setIsModalOpen5] = useState(false);

//   const toggleModal = () => {
//     setIsModalOpen(!isModalOpen);
//   };

//   const toggleModal2 = () => {
//     setIsModalOpen2(!isModalOpen2);
//   };
//   const toggleModal3 = () => {
//     setIsModalOpen3(!isModalOpen3);
//   };
//   const toggleModal4 = () => {
//     setIsModalOpen4(!isModalOpen4);
//   };
//   const toggleModal5 = () => {
//     setIsModalOpen5(!isModalOpen5);
//   };

//   return (
//     <div className={classes.backgroundModel}>
//       Model
//       <div className={classes.verticalContainer}>
//         <div className={classes.left}>
//           <center>
//             <h1>Use Just Wedding for</h1>
//           </center>
//           {/* //Here the First Button */}
//           <button className={classes.vertical1} onClick={toggleModal}>
//             <span className={classes.Namebutton}>Professional Services</span>
//             <br></br>
//             <span className={classes.subbutton}>
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit
//               consectetur adipiscing elit
//             </span>
//           </button>
//           {/* //Here the First Button */}

//           <button className={classes.vertical1} onClick={toggleModal2}>
//             <span className={classes.Namebutton}>Fast Scheduling</span>
//             <br></br>
//             <span className={classes.subbutton}>
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit
//               consectetur adipiscing elit
//             </span>
//           </button>
//           <button className={classes.vertical1} onClick={toggleModal3}>
//             <span className={classes.Namebutton}>Powerful Annotations</span>
//             <br></br>
//             <span className={classes.subbutton}>
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit
//               consectetur adipiscing elit
//             </span>
//           </button>
//           <button className={classes.vertical1} onClick={toggleModal4}>
//             <span className={classes.Namebutton}>Manage & Track Events</span>
//             <br></br>
//             <span className={classes.subbutton}>
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit
//               consectetur adipiscing elit
//             </span>
//           </button>
//           <button className={classes.vertical1} onClick={toggleModal5}>
//             <span className={classes.Namebutton}>Guest Feedback</span>
//             <br></br>
//             <span className={classes.subbutton}>
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit
//               consectetur adipiscing elit
//             </span>
//           </button>
//         </div>
//         {isModalOpen && (
//           <div className={classes.modal}>
//             <div className={classes.modalContent}>
//               <span className={classes.closeButton} onClick={toggleModal}>
//                 &times;
//               </span>
//               <div className={classes.containerdesign}>
//                 <center>
//                   <h2>START</h2>
//                 </center>
//                 <form>
//                   <div className="amount">
//                     <p>Enter Amount</p>
//                     <input value="1" type="text" />
//                   </div>
//                   <div className="dropdown">
//                     <div className="from">
//                       <p>From</p>
//                       <div className="select-container">
//                         <img
//                           src="https://flagsapi.com/US/flat/64.png"
//                           alt="US flag"
//                         />
//                         <select name="from"></select>
//                       </div>
//                     </div>
//                     <i className="fa-solid fa-arrow-right-arrow-left"></i>
//                     <div className="to">
//                       <p>To</p>
//                       <div className="select-container">
//                         <img
//                           src="https://flagsapi.com/IN/flat/64.png"
//                           alt="IN flag"
//                         />
//                         <select name="to"></select>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="msg">1USD = 80INR</div>
//                   <button>Get Exchange Rate</button>
//                 </form>
//               </div>
//             </div>
//           </div>
//         )}
//         {isModalOpen2 && (
//           <div className={classes.modal}>
//             <div className={classes.modalContent}>
//               <span className={classes.closeButton} onClick={toggleModal2}>
//                 &times;
//               </span>
//               <div className={classes.containerdesign}>
//                 <center>
//                   <h2>START</h2>
//                 </center>
//                 <form>
//                   <div className="amount">
//                     <p>Enter Amount</p>
//                     <input value="1" type="text" />
//                   </div>
//                   <div className="dropdown">
//                     <div className="from">
//                       <p>From</p>
//                       <div className="select-container">
//                         <img
//                           src="https://flagsapi.com/US/flat/64.png"
//                           alt="US flag"
//                         />
//                         <select name="from"></select>
//                       </div>
//                     </div>
//                     <i className="fa-solid fa-arrow-right-arrow-left"></i>
//                     <div className="to">
//                       <p>To</p>
//                       <div className="select-container">
//                         <img
//                           src="https://flagsapi.com/IN/flat/64.png"
//                           alt="IN flag"
//                         />
//                         <select name="to"></select>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="msg">1USD = 80INR</div>
//                   <button>Get Exchange Rate</button>
//                 </form>
//               </div>
//             </div>
//           </div>
//         )}
//         {isModalOpen3 && (
//           <div className={classes.modal}>
//             <div className={classes.modalContent}>
//               <span className={classes.closeButton} onClick={toggleModal3}>
//                 &times;
//               </span>
//               <div className={classes.containerdesign}>
//                 <center>
//                   <h2>START</h2>
//                 </center>
//                 <form>
//                   <div className="amount">
//                     <p>Enter Amount</p>
//                     <input value="1" type="text" />
//                   </div>
//                   <div className="dropdown">
//                     <div className="from">
//                       <p>From</p>
//                       <div className="select-container">
//                         <img
//                           src="https://flagsapi.com/US/flat/64.png"
//                           alt="US flag"
//                         />
//                         <select name="from"></select>
//                       </div>
//                     </div>
//                     <i className="fa-solid fa-arrow-right-arrow-left"></i>
//                     <div className="to">
//                       <p>To</p>
//                       <div className="select-container">
//                         <img
//                           src="https://flagsapi.com/IN/flat/64.png"
//                           alt="IN flag"
//                         />
//                         <select name="to"></select>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="msg">1USD = 80INR</div>
//                   <button>Get Exchange Rate</button>
//                 </form>
//               </div>
//             </div>
//           </div>
//         )}
//         {isModalOpen4 && (
//           <div className={classes.modal}>
//             <div className={classes.modalContent}>
//               <span className={classes.closeButton} onClick={toggleModal4}>
//                 &times;
//               </span>
//               <div className={classes.containerdesign}>
//                 <center>
//                   <h2>START</h2>
//                 </center>
//                 <form>
//                   <div className="amount">
//                     <p>Enter Amount</p>
//                     <input value="1" type="text" />
//                   </div>
//                   <div className="dropdown">
//                     <div className="from">
//                       <p>From</p>
//                       <div className="select-container">
//                         <img
//                           src="https://flagsapi.com/US/flat/64.png"
//                           alt="US flag"
//                         />
//                         <select name="from"></select>
//                       </div>
//                     </div>
//                     <i className="fa-solid fa-arrow-right-arrow-left"></i>
//                     <div className="to">
//                       <p>To</p>
//                       <div className="select-container">
//                         <img
//                           src="https://flagsapi.com/IN/flat/64.png"
//                           alt="IN flag"
//                         />
//                         <select name="to"></select>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="msg">1USD = 80INR</div>
//                   <button>Get Exchange Rate</button>
//                 </form>
//               </div>
//             </div>
//           </div>
//         )}
//         {isModalOpen5 && (
//           <div className={classes.modal}>
//             <div className={classes.modalContent}>
//               <span className={classes.closeButton} onClick={toggleModal5}>
//                 &times;
//               </span>
//               <div className={classes.containerdesign}>
//                 <center>
//                   <h2>START</h2>
//                 </center>
//                 <form>
//                   <div className="amount">
//                     <p>Enter Amount</p>
//                     <input value="1" type="text" />
//                   </div>
//                   <div className="dropdown">
//                     <div className="from">
//                       <p>From</p>
//                       <div className="select-container">
//                         <img
//                           src="https://flagsapi.com/US/flat/64.png"
//                           alt="US flag"
//                         />
//                         <select name="from"></select>
//                       </div>
//                     </div>
//                     <i className="fa-solid fa-arrow-right-arrow-left"></i>
//                     <div className="to">
//                       <p>To</p>
//                       <div className="select-container">
//                         <img
//                           src="https://flagsapi.com/IN/flat/64.png"
//                           alt="IN flag"
//                         />
//                         <select name="to"></select>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="msg">1USD = 80INR</div>
//                   <button>Get Exchange Rate</button>
//                 </form>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
// export default Model;