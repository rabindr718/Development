import React, { useEffect, useState } from "react";
import { imageDb } from "./firebase"; // Adjust the path as necessary
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import classes from "./gallery.module.css";
import { v4 } from "uuid";

const Gallery = () => {
  const [keys, setKeys] = useState("");
  const [givenDate, setGivenDate] = useState("");
  const [fileName, setFileName] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [imgURLs, setImgURLs] = useState([]);
  const [uploadedData, setUploadedData] = useState(null);
  const [currentDateTime, setCurrentDateTime] = useState(
    new Date().toISOString().slice(0, 16)
  );

  const handleImageChange = (e) => {
    const filesArray = Array.from(e.target.files);
    uploadImages(filesArray);
  };

  const uploadImages = (filesArray) => {
    filesArray.forEach((file) => {
      const imageRef = ref(imageDb, `ImageList/${v4()}`);
      uploadBytes(imageRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setImgURLs((prevURLs) => [...prevURLs, url]);
        }).catch((error) => {
          console.error("Error getting download URL: ", error);
        });
      }).catch((error) => {
        console.error("Error uploading file: ", error);
      });
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const uniqueId = Math.floor(1000000 + Math.random() * 9000000).toString(); // Generate a 7-digit unique ID

    // Prepare data to upload
    const dataToUpload = {
      id: uniqueId,
      fileName: fileName,
      givenDate: givenDate,
      currentDateTime: currentDateTime,
      imgURLs: imgURLs,
    };
    console.log(dataToUpload, "***********")

    const detailsRef = ref(imageDb, `ImageList/Details/${uniqueId}`);

    const uploads = imgURLs.map((url) => {
      const imageRef = ref(imageDb, `ImageList/Details/${uniqueId}/images/${url.split('/').pop()}`);
      return uploadBytes(imageRef, url);
    });

    Promise.all(uploads)
      .then(() => {
        return uploadBytes(detailsRef, JSON.stringify(dataToUpload));
      })
      .then(() => {
        console.log('All images and data uploaded successfully:', dataToUpload);
        // Save uploaded data to state for displaying
        // setUploadedData(dataToUpload);
        // Optionally reset the form or clear state
        setGivenDate("");
        setFileName("");
        setCurrentDateTime(new Date().toISOString().slice(0, 16));
        setImgURLs([]); // Clear uploaded image URLs if desired
      })
      .catch((error) => {
        console.error("Error uploading data: ", error);
      });
    setKeys("");

  };

  ///HERE FOR PRINT
  useEffect(() => {
    listAll(ref(imageDb, 'ImageList')).then((img) => {
      img.items.forEach((val) => {
        getDownloadURL(val).then((url) => {
          setImgURLs((prevURLs) => [...prevURLs, url]);
        });
      });
    });
  }, []);
  ///HERE FOR PRINT

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
    const filesArray = Array.from(files);
    uploadImages(filesArray);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent the default form submission behavior
      handleFormSubmit(e); // Call the handleFormSubmit function
    }
  };

  return (
    <div className={classes.GalleryContainer}>
      <form className={classes.FormUpload} onSubmit={handleFormSubmit}>
        <div className={classes.uploadImage}>
          <div
            className={`${classes.dragDropArea} ${isDragging ? classes.dragDropAreaDragging : ''}`}
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
              {/* <i class="fas fa-paperclip"></i> */}
              <i className="fas fa-cloud-upload-alt"></i>

              <p>Drag & drop here or click to upload</p>
            </label>
          </div>
        </div>

        <div className={classes.FileNameXR}>
          <input
            type="text"
            id="fileName"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            required
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className={classes.TimeandDate}>
          <input
            type="datetime-local"
            id="currentDateTime"
            value={currentDateTime}
            onChange={(e) => setCurrentDateTime(e.target.value)}
            readOnly
            onKeyDown={handleKeyDown}
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

        <button onKeyDown={handleKeyDown}
          className={classes.btnEnter} type="submit">Submit</button>
      </form>

      <div className={classes.imagePreviewContainer}>
        {uploadedData && (
          <>
            <h3>Uploaded Details:</h3>
            <p><strong>File Name:</strong> {uploadedData.fileName}</p>
            <p><strong>Given Date:</strong> {uploadedData.givenDate}</p>
            <p><strong>Current Date Time:</strong> {uploadedData.currentDateTime}</p>
            <div className={classes.imageList}>
              {uploadedData.imgURLs.map((url, index) => (
                <img key={index} src={url} alt={`Uploaded image ${index + 1}`} className={classes.uploadedImage} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Gallery;
