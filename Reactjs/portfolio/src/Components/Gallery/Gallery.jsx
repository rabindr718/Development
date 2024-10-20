import React, { useEffect, useState } from "react";
import { imageDbStore, textDataStore } from "./firebase"; // Adjust the path as necessary
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import classes from "./gallery.module.css";
import { v4 } from "uuid";
import { collection, addDoc } from "firebase/firestore"; // For Text Data Storage

const Gallery = () => {
  const [givenDate, setGivenDate] = useState("21-10-2024");
  const [fileTitle, setTitleFile] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [imgURLs, setImgURLs] = useState([]);
  const [currentDateTime, setCurrentDateTime] = useState(() => {
    const date = new Date();
    const istDate = new Date(date.getTime() + (5.5 * 60 * 60 * 1000));
    // Format as YYYY-MM-DDTHH:mm for the input
    return istDate.toISOString().slice(0, 16);
  });

  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      const filesArray = Array.from(files);
      uploadImages(filesArray);
    }
  };

  const uploadImages = (filesArray) => {
    filesArray.forEach((file) => {
      const imageRef = ref(imageDbStore, `ImageList/${v4()}`);
      uploadBytes(imageRef, file)
        .then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            setImgURLs((prevURLs) => [...prevURLs, url]);
          });
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
        });
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const dataToUpload = collection(textDataStore, 'TextDetails');

    // Add the document with image URLs and other details
    await addDoc(dataToUpload, {
      TextRef: fileTitle,
      imageUrl: imgURLs,
      CurrentDate: currentDateTime,
      uploadDate: givenDate
    });


    // Clear form fields
    setGivenDate("");
    setTitleFile("");
    setImgURLs([]); // Clear image URLs
    setCurrentDateTime()
    alert("Successfully Submitted");

  };

  // **********************  DRAG DROP STARTED ***********************************
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const filesArray = Array.from(files);
      uploadImages(filesArray);
    }
  };

  return (
    <div className={classes.GalleryContainer}>
      <form className={classes.FormUpload} onSubmit={handleFormSubmit}>
        <div className={classes.uploadImage}>
          <div
            className={`${classes.dragDropArea} ${isDragging ? classes.dragDropAreaDragging : ""}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="file"
              onChange={handleImageChange}
              multiple
              id="file-upload"
              className={classes.hidden}
            />
            <label htmlFor="file-upload" className={classes.dragDropLabel}>
              <i className="fas fa-cloud-upload-alt"></i>
              <p>Drag & drop here or click to upload</p>
            </label>
          </div>
        </div>

        <div className={classes.FileNameXR}>
          <input
            type="text"
            id="fileName"
            placeholder="Enter image title"
            value={fileTitle}
            onChange={(e) => setTitleFile(e.target.value)}
            required
          />
        </div>

        <div className={classes.DateasUpload}>
          <input
            type="date"
            id="givenDate"
            value={givenDate}
            onChange={(e) => setGivenDate(e.target.value)}
            required
          />
        </div>

        <div className={classes.TimeandDate}>
          <input
            type="datetime-local"
            id="currentDateTime"
            value={currentDateTime}
            onChange={(e) => setCurrentDateTime(e.target.value)}
            readOnly
          />
        </div>

        <button className={classes.btnEnter} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Gallery;



