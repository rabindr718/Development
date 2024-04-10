import React from "react";
import classess from "./ProfileModal.module.css";
import { useNavigate } from "react-router-dom";
const ProfileModal = ({ isOpen, toggleModal }) => {
  const navigator = useNavigate();
  const RedirectHome = () => {
    navigator("/Login");
  };
  return (
    <div>
      {isOpen && (
        <div className={classess.modaloverlay} onClick={toggleModal}>
          <div className={classess.modal} onClick={(e) => e.stopPropagation()}>
            <div className={classess.modalheader}>
              <h2>Profile Modal</h2>
              <button onClick={RedirectHome}>&times;</button>
            </div>
            <div className={classess.modalbody}>
              <p>This is the content of the profile modal.</p>
            </div>
            <div className={classess.modalfooter}>
              <button onClick={RedirectHome}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileModal;
