import React from 'react';
import classes from './styles/deletefile.module.css';
import { ICONS } from '../../../resources/icons/Icons';

interface propGet {
  setIsVisible: (visible: boolean) => void;
  onDelete: () => void;
}

const DeleteFileModal: React.FC<propGet> = ({ setIsVisible, onDelete }) => {
  const handleDelete = () => {
    onDelete();
    setIsVisible(false);
  }; 

  return (
    <div className={classes.transparent_lib}>
      <div className={classes.customer_wrapper_list}>
        <div className={classes.success_not}>
          <div className={classes.succicon}>
            <img src={ICONS.deleteFileLibrary} alt="" />
          </div>
          <div className={classes.heading}>
            <h2>Are You Sure? </h2>
            <p>Do you really want to delete this?</p>
          </div>
        </div>
        <div className={classes.survey_button}>
          <button className={classes.self} onClick={() => setIsVisible(false)}>
            Cancel
          </button>
          <button
            id="otherButtonId"
            className={classes.other}
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteFileModal;
