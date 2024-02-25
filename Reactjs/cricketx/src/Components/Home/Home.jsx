import React from "react";
import HeaderMain from "../Header/HeaderMain";
import LiveMatch from "../LiveMatches/LiveMatch";
import News from "../News/News";
import Footer from "../Footer/Footer";

const Home = () => {
  return (
    <div>
      Rabindra Sharma
      <HeaderMain></HeaderMain>
      <LiveMatch></LiveMatch>
      <News></News>
      <Footer></Footer>
    </div>
  );
};

export default Home;
