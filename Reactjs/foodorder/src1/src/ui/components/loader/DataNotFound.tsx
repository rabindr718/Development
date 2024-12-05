import React, { useEffect, useState } from 'react';
import './NoRecordFound.css';
interface Params {
  title?: string;
}
const DataNotFound = ({ title = 'No Record Found' }: Params) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000); // 3 seconds delay

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, []);

  return (
    <>
      {isVisible && (
        <div className="data-not-found">
          <iframe
            src="https://lottie.host/embed/9dea7242-6297-49e3-a5cc-05794806e22b/ZOnDIpjPzg.json"
            style={{ border: 'none' }}
            title="data"
          ></iframe>
          <h2 className="no-record-text">{title}</h2>
        </div>
      )}
    </>
  );
};

export default DataNotFound;
