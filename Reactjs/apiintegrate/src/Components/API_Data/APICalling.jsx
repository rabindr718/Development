import React, { useEffect } from "react";

function APICalling() {
  const API = "http://localhost:7180/courses";
  const fetchAPI = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("Fetching API...");
    fetchAPI(API);
  }, []);

  return <div>APICalling</div>;
}

export default APICalling;
