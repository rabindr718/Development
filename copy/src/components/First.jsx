import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "../Style/design.module.css";
const CopyLink = () => {
  const navigate = useNavigate();
  const BackButtonHandler = () => {
    navigate("/");
  };
  const localStoreData = JSON.parse(localStorage.getItem("formData")) || [];

  // Copied the Link of URL
  const handleCopy = () => {
    const {
      name = "",
      email = "",
      phone = "",
      file = "",
      plainTex = "",
    } = localStoreData;

    const url = window.location.origin;
    const link = `${url}?name=${encodeURIComponent(
      name
    )}&email=${encodeURIComponent(email)}&phone=${encodeURIComponent(
      phone
    )}&image=${encodeURIComponent(file)}&description=${encodeURIComponent(
      plainTex
    )}&data=${encodeURIComponent(localStoreData)}`;

    navigator.clipboard
      .writeText(link)
      .then(() => {
        console.log("Share Link is copied successfully");
      })
      .catch((error) => {
        console.log("Error copying link to clipboard:", error);
      });
  };
  // This is Copy the Meta Data OG
  const copyMetaData = () => {
    const {
      name = "",
      email = "",
      phone = "",
      file = "",
      plainTex = "",
    } = localStoreData;
    const ogGraph = {
      title: name,
      description: plainTex,
      image: file,
      email: email,
      phone: phone,
    };

    const ogTags = Object.entries(ogGraph)
      .map(
        ([property, content]) =>
          `<meta property="og:${property}" content="${content}">`
      )
      .join("");

    console.log("OG Graph copied successfully");

    navigator.clipboard
      .writeText(ogTags)
      .then(() => {
        console.log("Share Link is copied successfully");
      })
      .catch((error) => {
        console.log("Error copying link to clipboard:", error);
      });
  };

  return (
    <div>
      <button className={classes.buttonFirst} onClick={BackButtonHandler}>
        Go Back
      </button>
      <button className={classes.buttonFirst} onClick={handleCopy}>
        Copy Link
      </button>
      <button className={classes.buttonFirst} onClick={copyMetaData}>
        Copy Meta Data
      </button>

      {localStoreData.length > 0 ? (
        localStoreData.map((dataItem) => (
          <div key={dataItem.id}>
            <p>Name: {dataItem.name}</p>
            <p>Email: {dataItem.email}</p>
            <p>Phone: {dataItem.phone}</p>
            <div>
              <img src={dataItem.file} alt="Image" height="80" width="100" />
            </div>
            <p>Description: {dataItem.plainTex}</p>
          </div>
        ))
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
};

export default CopyLink;
