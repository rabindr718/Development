import React from "react";

const CopyButton = ({ data }) => {
  const handleCopy = () => {
    navigator.clipboard
      .writeText(data)
      .then(() => {
        console.log("Data copied to clipboard successfully");
      })
      .catch((error) => {
        console.log("Error copying data to clipboard:", error);
      });
  };

  return <button onClick={handleCopy}>Copy</button>;
};

export default CopyButton;
