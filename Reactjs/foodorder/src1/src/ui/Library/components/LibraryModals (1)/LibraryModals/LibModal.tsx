import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './Styles/ModalStyle.module.css';
import ICONDragDrop from './Styles/ImageS/UploadFileIcon.svg';
import CrossICON from './Styles/ImageS/Vector.svg';
import CrossICONRed from './Styles/ImageS/VectorRed.svg';
import axios from 'axios';

const LibraryModel: React.FC = () => {
  const navigate = useNavigate();
  const [visibleDiv, setVisibleDiv] = useState(1);
  const [closeWindow, setCloseWindow] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);

    if (selectedFile) {
      const base64File = await convertFileToBase64(selectedFile);
      setUploadedImage(base64File);
      setVisibleDiv(2);
    }
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const selectedFile = e.dataTransfer.files[0];
      setFile(selectedFile);
      const base64File = await convertFileToBase64(selectedFile);
      setUploadedImage(base64File);
      setVisibleDiv(2);
    }
  };

  const closeModalWindow = () => {
    setCloseWindow(false);
  };

  const handleRemove = () => {
    setUploadedImage(null);
    setFile(null);
    setVisibleDiv(1);
  };

  // api code start

  const uploadFile = async () => {
    if (!file) return;

    const accessToken = '';
    const apiUrl = `https://graph.microsoft.com/v1.0/sites/e52a24ce-add5-45f6-aec8-fb2535aaa68e/drive/root:/${file.name}:/content`;

    try {
      const resp = await axios.put(apiUrl, file, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': file.type || 'application/octet-stream',
        },
      });

      console.log('File uploaded successfully', resp);
    } catch (error) {
      console.error('Error during file upload:', error);
    }
  };

  // api end

  return (
    <>
      {closeWindow && (
        <div className="transparent-model">
          <div className={classes.customer_wrapper_list}>
            <div>
              <div className={classes.CrossContainerICON}>
                <img
                  className={classes.CrossContainerICONImage}
                  src={CrossICON}
                  onClick={closeModalWindow}
                  alt="Close"
                />
              </div>

              {visibleDiv === 1 && (
                <div className={classes.centercontainerX}>
                  <div className={classes.InnerDiv4Input}>
                    <div className="fileuploadcontainer">
                      <div
                        className={`${classes.dragdroparea} ${dragActive ? classes.active : ''}`}
                        onDragEnter={handleDrag}
                        onDragOver={handleDrag}
                        onDragLeave={handleDrag}
                        onDrop={handleDrop}
                      >
                        <img
                          className={classes.DragDropImage}
                          src={ICONDragDrop}
                          alt="Drag and Drop"
                        />
                        <p className={classes.OrDesignDrag}>Drag and Drop</p>
                        <p className={classes.OrDesign}>Or</p>
                      </div>

                      <label
                        htmlFor="file-upload"
                        className={classes.customfileupload}
                      >
                        <i className={classes.fasfaclouduploadalt}></i> Browse
                      </label>
                      <input
                        id="file-upload"
                        type="file"
                        onChange={handleFileUpload}
                        className={classes.fileInput}
                      />
                    </div>
                  </div>
                  <p className={classes.OrDesign1}>
                    Allowed* .jpeg, *.jpg, *.png, *.pdf
                  </p>
                  <p className={classes.OrDesign1}>Max size of 3.1 MB</p>
                  <hr className={classes.hrline_LibModal} />

                  <div className={classes.survey_button}>
                    <button
                      className={classes.self}
                      style={{ color: '#fff', border: 'none' }}
                      onClick={uploadFile}
                    >
                      Upload
                    </button>
                  </div>
                </div>
              )}

              {visibleDiv === 2 && (
                <div className={classes.centercontainerY}>
                  {uploadedImage && (
                    <div className={classes.ImageContainerX}>
                      <div className={classes.ImageContainerXdivcontainer}>
                        <div className={classes.ImageContainerXdiv1}></div>
                        <div className={classes.ImageContainerXdiv2}></div>
                        <div className={classes.ImageContainerXdiv3}></div>
                        <div className={classes.ImageContainerXdiv4}></div>
                      </div>
                      <img
                        src={uploadedImage}
                        alt="Uploaded"
                        className={classes.UploadedImage}
                      />
                    </div>
                  )}
                  <div className={classes.survey_button}>
                    <button
                      style={{
                        color: '#FF0000',
                        border: '1.2px solid #FF0000',
                      }}
                      className={classes.other}
                      onClick={handleRemove}
                    >
                      <img
                        className={classes.CrossRedImage}
                        src={CrossICONRed}
                        alt="Remove"
                      />{' '}
                      Remove
                    </button>
                    <hr className={classes.hrline_LibModal2} />

                    <div className={classes.survey_button1}>
                      <button
                        className={classes.self2}
                        style={{ color: '#fff', border: 'none' }}
                        onClick={uploadFile}
                      >
                        Upload
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LibraryModel;
