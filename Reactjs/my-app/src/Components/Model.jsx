import React, { useState } from "react";
import classes from "./Navbar.module.css";

function Model() {
  const [openModalIndex, setOpenModalIndex] = useState(null);

  const toggleModal = (index) => {
    setOpenModalIndex(openModalIndex === index ? null : index);
  };

  return (
    <div className={classes.backgroundModel}>
      <div className={classes.verticalContainer}>
        <div className={classes.left}>
          <center>
            <h1>Use Just Wedding for</h1>
          </center>
          {/* Buttons to open modals */}
          {[
            "Professional Services",
            "Fast Scheduling",
            "Powerful Annotations",
            "Manage & Track Events",
            "Guest Feedback",
          ].map((label, index) => (
            <button
              key={index}
              className={classes.vertical1}
              onClick={() => toggleModal(index)}
            >
              <span className={classes.Namebutton}>{label}</span>
              <br></br>
              <span className={classes.subbutton}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
                consectetur adipiscing elit
              </span>
            </button>
          ))}
        </div>
        {/* Modals */}
        {openModalIndex !== null && (
          <div className={classes.modal}>
            <div className={classes.modalContent}>
              <span
                className={classes.closeButton}
                onClick={() => toggleModal(openModalIndex)}
              >
                &times;
              </span>
              <div className={classes.containerdesign}>
                <center>
                  <h2>START</h2>
                </center>
                <div className={classes.containerdesign1}>
                  <div>Send Smart file via email</div>

                  <div>
                    <div></div>
                  </div>
                </div>
                <div className={classes.containerdesign2}>
                  <div>Create Task</div>

                  <div>
                    <div></div>
                  </div>
                </div>
                <div className={classes.containerdesign3}>
                  <div>Send Smart file via email</div>

                  <div></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Model;
