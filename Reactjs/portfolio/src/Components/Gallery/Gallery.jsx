import React, { useEffect, useState } from "react";
import { imageDb } from "./firebase"; // Adjust the path as necessary
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
const Gallery = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [imageURL, setImgURL] = useState([]);
  const [fileName, setFileName] = useState("");
  const [currentDateTime, setCurrentDateTime] = useState(
    new Date().toISOString().slice(0, 16)
  );
  const [givenDate, setGivenDate] = useState("");

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    console.log({
      fileName,
      currentDateTime,
      givenDate,
    });

    if (image !== null) {
      const imageRef = ref(imageDb, `ImageList/${v4()}`);
      uploadBytes(imageRef, image).then((value) => {
        console.log(value);
        getDownloadURL(value.ref).then((url) => {
          setImgURL((data) => [...data, url]);
        });
      });
    }
  };

  useEffect(() => {
    listAll(ref(imageDb, "ImageList")).then((img) => {
      console.log(img);
      img.items.forEach((val) => {
        getDownloadURL(val).then((url) => {
          setImgURL((data) => [...data, url]);
        });
      });
    });
  }, []);
  console.log(imageURL);
  return (
    <div style={{ marginTop: "90px" }}>
      <h1>Gallery</h1>
      <form>
        <div>
          <label htmlFor="fileName">File Name:</label>
          <input
            type="text"
            id="fileName"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="currentDateTime">Current Date and Time:</label>
          <input
            type="datetime-local"
            id="currentDateTime"
            value={currentDateTime}
            onChange={(e) => setCurrentDateTime(e.target.value)}
            readOnly
          />
        </div>
        <div>
          <label htmlFor="givenDate">Given Date:</label>
          <input
            type="date"
            id="givenDate"
            value={givenDate}
            onChange={(e) => setGivenDate(e.target.value)}
            required
          />
        </div>
        <input type="file" onChange={handleImageChange} />
        <button onClick={handleFormSubmit}>Submit</button>
      </form>
    </div>
  );
};

export default Gallery;
{
  /* {imageURL.map((dataVal) => (
          <div>
            <img src={dataVal} height="200px" width="200px"></img>
          </div>
        ))} */
}
{
  /* <button onClick={handleUpload}>Upload</button> */
}

//   const handleUpload = () => {
//     if (image !== null) {
//       console.log({
//         fileName,
//         currentDateTime,
//         givenDate,
//       });
//       const imageRef = ref(imageDb, `ImageList/${v4()}`);
//       uploadBytes(imageRef, image).then((value) => {
//         console.log(value);
//         getDownloadURL(value.ref).then((url) => {
//           setImgURL((data) => [...data, url]);
//         });
//       });
//     }
//   };
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log({
//       fileName,
//       currentDateTime,
//       givenDate,
//     });
//   };
