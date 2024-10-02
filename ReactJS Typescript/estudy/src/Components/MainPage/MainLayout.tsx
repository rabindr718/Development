import React from "react";
import Header from "../../Layout/Header/Header";
import Navbar from "../../Layout/Header/Navbar";
import LeftSidebar from "../../Layout/Sidebars/LeftSidebar";
import RightSidebar from "../../Layout/Sidebars/RightSiderbar";
import MainPage from "./MainPage";
import Footer from "../../Layout/Footer/Footer";

const MainLayout = () => {
  return (
    <div className="app-container">
      <Header />
      <Navbar />

      {/* DO NOT EDIT ABOVE */}
      <div className="content-container-Main">
        <LeftSidebar />
        <MainPage />
        <RightSidebar />
      </div>
      {/* DO NOT EDIT BELOW */}

      <Footer />
    </div>
  );
};

export default MainLayout;
