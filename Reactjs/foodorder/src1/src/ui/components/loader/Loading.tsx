import React from 'react';
import './loading.css';
const Loading = () => {
  return (
    <div className="transparent-model-loading">
      {/* <iframe src="https://lottie.host/embed/fbbfa1c0-7ff5-401f-b3ba-065ee5950148/W22Gr3Ldj3.json" width="100px"  style={{border:"none"}} title="loading"></iframe> */}
      <object
        data="https://lottie.host/embed/fbbfa1c0-7ff5-401f-b3ba-065ee5950148/W22Gr3Ldj3.json"
        width="100px"
        style={{ border: 'none' }}
        title="loading"
        aria-label="loader"
      ></object>
    </div>
  );
};

export default Loading;
