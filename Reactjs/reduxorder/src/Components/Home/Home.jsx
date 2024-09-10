import React, { useState, useEffect } from "react";
import classes from "./home.module.css";
import Mapimage from "./map1.png";
import { useSelector } from "react-redux";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState(""); // SEARCHING TIME QUERY
  const [filteredData, setFilteredData] = useState([]);

  const userdata = useSelector((state) => state.users);

  useEffect(() => {
    setFilteredData(userdata); // Initialize filteredData with userdata
  }, [userdata]);

  const FindShops = (event) => {
    setSearchQuery(event.target.value);
  };

  const EnterButtonPress = (event) => {
    if (event.key === "Enter") {
      filterDataOnClick();
    }
  };

  const filterDataOnClick = () => {
    let filtered = [];

    if (searchQuery === "") {
      filtered = userdata;
    } else {
      filtered = userdata.filter(
        (item) =>
          (item.name &&
            item.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (item.Fooditems &&
            item.Fooditems.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    setFilteredData(filtered);
    console.log("RABINDRA");

    console.log("Filtered Data:", filtered);
  };

  return (
    <>
      <div className={classes.searching}>
        <input
          className={classes.searchbar}
          type="search"
          placeholder="Search"
          value={searchQuery}
          onChange={FindShops}
          onKeyDown={EnterButtonPress}
        />
        <button className={classes.searchbtn} onClick={filterDataOnClick}>
          Search
        </button>
      </div>

      <div className={classes.dispaydemo}>
        {filteredData.map((apiDataReceive) => (
          <ul key={apiDataReceive.id}>
            <img
              className={classes.itemImage}
              width="280px"
              height="270px"
              src={apiDataReceive.image}
              alt={apiDataReceive.name} // Adding alt attribute for accessibility
            />
            <li>
              <span className={classes.shopname}>{apiDataReceive.name}</span>
            </li>
            <li>
              <span className={classes.foodtype}>
                {apiDataReceive.Fooditems}
              </span>
            </li>
            <li>
              <img
                className={classes.mapImage}
                width="6%"
                height="4.7%"
                src={Mapimage}
                alt="Map" // Adding alt attribute for accessibility
              />
              <span className={classes.distance}>
                {apiDataReceive.distance}
              </span>
            </li>
          </ul>
        ))}
      </div>
    </>
  );
};

export default Home;
