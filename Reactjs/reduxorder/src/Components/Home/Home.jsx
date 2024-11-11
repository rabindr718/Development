import React, { useState, useEffect } from "react";
import classes from "./home.module.css";
import Mapimage from "./map1.png";
import { useSelector } from "react-redux";
import DetailsPage from "../OrderCart/SelectedItem";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [orderItem, setOrderedItem] = useState(true)

  const userdata = useSelector((state) => state.users);

  useEffect(() => {
    setFilteredData(userdata);
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
    console.log("Filtered Data:", filtered);
  };
  var data;
  const getId = (data) => {
    console.log(data)
  }
  const [selectedItem, setSelectedItem] = useState(data);

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
        {orderItem && <DetailsPage setSelectedItem={setSelectedItem} setOrderedItem={setOrderedItem} />}
        {filteredData.map((apiDataReceive) => (

          <ul key={apiDataReceive.id} onClick={() => getId(apiDataReceive)}>
            <img
              className={classes.itemImage}
              width="291px"
              height="272px"
              src={apiDataReceive.image}
              alt={apiDataReceive.name}
            />
            <div className={classes.textData}>
              <li>
                <span className={classes.shopname}>{apiDataReceive.name}</span>
                <span className={classes.ratings}>
                  3.2</span>
              </li>
              <li>
                <span>
                  <span className={classes.foodtype}>
                    {apiDataReceive.Fooditems.length > 28
                      ? `${apiDataReceive.Fooditems.slice(0, 28)}...`
                      : apiDataReceive.Fooditems}
                  </span>

                  <span className={classes.price}>
                    Price $2</span>
                </span>
              </li>
              <li>
                <img
                  className={classes.mapImage}
                  width="6%"
                  height="4.7%"
                  src={Mapimage}
                  alt="Map"
                />
                <span className={classes.distance}>
                  {apiDataReceive.distance}
                </span>
              </li>

            </div>
          </ul>
        ))}
      </div>
    </>
  );
};

export default Home;
