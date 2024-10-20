import React, { useEffect, useState } from "react";
import classes from "./DisplayImage.module.css";
import { collection, getDocs } from "firebase/firestore";
import { textDataStore } from "./firebase";

const Display = () => {
  const [populatedArray, setPopulatedArray] = useState([]);
  const getDATAfromFirebase = async () => {
    const dataToUpload = collection(textDataStore, "TextDetails");
    const dataXR = await getDocs(dataToUpload);
    const AllData = dataXR.docs.map((val) => ({ ...val.data(), id: val.id }));
    console.log(AllData);
    setPopulatedArray(AllData);
  };
  useEffect(() => {
    getDATAfromFirebase();
  }, []);

  useEffect(() => {
    console.log(populatedArray, "UPDATED populatedArray");
  }, [populatedArray]);
  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  };

  const formatCurrentDate = (dateString) => {
    const date = new Date(dateString);
    const options = { hour: "numeric", minute: "numeric", hour12: true };
    const formattedTime = date.toLocaleString("en-US", options);

    return `${formatDate(date.toISOString().split("T")[0])} ${formattedTime}`;
  };
  return (
    <div className={classes.DisplayContainer}>
      <div className={classes.diplayImage}>
        {populatedArray.slice(0, 15).map((value, index) => (
          <div key={value.id} className={classes.diplayImagediv}>
            <img src={value.imageUrl} width="130px" height="160px" />
            <p className={classes.titleText}>{value.TextRef}</p>
            <p className={classes.UploadDate}>{formatDate(value.uploadDate)}</p>
            <p className={classes.CurrentDateTime}>{formatCurrentDate(value.CurrentDate)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Display;
