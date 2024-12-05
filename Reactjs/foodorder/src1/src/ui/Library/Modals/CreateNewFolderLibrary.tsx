import React, { useEffect, useState } from 'react';
import classes from './styles/createfolderlibrary.module.css';
import { useNavigate } from 'react-router-dom';
import { ICONS } from '../../../resources/icons/Icons';
import axios, { AxiosError, isAxiosError } from 'axios';
import Cookies from 'js-cookie';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface propGets {
  setIsVisibleNewFolder: (visible: boolean) => void;
  uploadPath?: string;
  handleSuccess?: () => void
}

const CreateNewFolderLibrary: React.FC<propGets> = ({ setIsVisibleNewFolder, uploadPath, handleSuccess }) => {

  const [folderName, setFolderName] = useState('');
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState("")
  const handleDelete = () => {
    setIsVisibleNewFolder(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value // Remove trailing spaces
    setError('');
 
    
    const validCharacters = /^[a-zA-Z0-9. _-]*$/;
   
 
   
    if (!validCharacters.test(inputValue)) {
      return; 
    }
 
   
    if (/\s{2,}/.test(inputValue)) {
      return; 
    }
 
    setFolderName(inputValue);
  };


  const createFolder = async () => {
    if (!folderName.trim()) {
      setError("Folder name cannot be empty")
    }
    try {
      const token = Cookies.get("myToken");
      setIsPending(true)
      const url = uploadPath
        ? `https://graph.microsoft.com/v1.0/sites/e52a24ce-add5-45f6-aec8-fb2535aaa68e/drive/root:/${uploadPath}:/children`
        : `https://graph.microsoft.com/v1.0/sites/e52a24ce-add5-45f6-aec8-fb2535aaa68e/drive/root/children`;
      const response = await axios.post(url, {
        "name": folderName.trim(),
        "folder": {},
        "@microsoft.graph.conflictBehavior": "fail"
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      await handleSuccess?.()
      toast.success(`Folder created successfully!`);
      setIsPending(false)
      setIsVisibleNewFolder(false);
      // alert(`Folder Name: ${response}`);
    } catch (error) {
      setIsPending(false)
      if (isAxiosError(error) && error.response?.status === 409) {
        toast.error(error.response?.data?.error?.message);
      }

    }


  }




  return (
    <div>
      <div className="transparent-model">
        <div className={classes.customer_wrapper_list}>
          <>
            {' '}
            <div className={classes.success_not}>
              <div className={classes.success_header}>
                <h2 className={classes.success_heading}>Create a New Folder</h2>
                <img
                  src={ICONS.cross}
                  alt=""
                  className={classes.success_crossing}
                  onClick={handleDelete}
                />
              </div>
              <div className={classes.success_hrline}></div>
            <div  style={{ minHeight: 108 }} >
              <div className={classes.succicon}>
                <input
                  type="text"
                  className={classes.succicon_input_box}
                  placeholder="Add your folder Name"
                  value={folderName}
                  onChange={handleInputChange}
                  maxLength={25}
                ></input>
              </div>
              {error && <div className='mx-auto' style={{ maxWidth: 548, display: folderName.length >= 1? 'none' : 'block' }} >

                <span 
                 className={`${classes.error} error`}
                > {error} </span>
              </div>}
            </div>   
            </div>
            <div className={classes.survey_button}>
              <button disabled={isPending} id="otherButtonId" className={classes.other} onClick={createFolder}>
                Create
              </button>
            </div>
          </>
        </div>
      </div>
    </div>
  );
};

export default CreateNewFolderLibrary;
