import React, { useState } from "react";
import { uploadImageAndGetUrl } from "../firebase/utils/uploadImage";
import styles from "./ImageUploader.module.css";

const ImageUploader = () => {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (selected) setFile(selected);
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      const url = await uploadImageAndGetUrl(file);
      setImageUrl(url);
    } catch (error) {
      console.error("Upload failed", error);
    }
  };

  return (
    <div className={styles.container}>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className={styles.input}
      />
      <button onClick={handleUpload} className={styles.button}>
        Upload Image
      </button>

      {imageUrl && (
        <div className={styles.preview}>
          <p>Uploaded Image:</p>
          <img src={imageUrl} alt="Uploaded" className={styles.image} />
          <p className={styles.url}>{imageUrl}</p>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
