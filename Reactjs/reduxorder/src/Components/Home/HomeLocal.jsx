import React from "react";
import classes from "./home.module.css";
import { dataArray } from "../Services/api";
import Mapimage from "./map1.png";
import { useState, useEffect } from "react";
// import image1 from "./image1.avif";

const Home = () => {
  const [data, setData] = useState([]); // DF...SERVER
  const [searchQuery, setSearchQuery] = useState(""); // SEARCHING TIME QUERY
  const [filteredData, setFilteredData] = useState([]);

  const FindShops = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      filterDataOnClick();
    }
  };

  const filterDataOnClick = () => {
    if (searchQuery === "") {
      setFilteredData(data);
    } else {
      const filtered = data.filter(
        (item) =>
          (item.name &&
            item.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (item.Fooditems &&
            item.Fooditems.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setFilteredData(filtered);
    }
  };

  useEffect(() => {
    setData(dataArray);
    setFilteredData(dataArray); // INITIALY DISPLAY ALL DATA
  }, []);

  console.log(dataArray);
  return (
    <>
      <div className={classes.searching}>
        <input
          className={classes.searchbar}
          type="search"
          placeholder="Search"
          value={searchQuery}
          onChange={FindShops}
          onKeyDown={handleKeyPress}
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
              width="100%"
              height="100%"
              src={apiDataReceive.image}
            ></img>
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
                width="6%%"
                height="4.7%%"
                src={Mapimage}
              ></img>
              <span className={classes.distance}>
                {apiDataReceive.distance}
              </span>
            </li>
          </ul>
        ))}
        {/* <ul>
          <img
            className={classes.itemImage}
            width="100%"
            height="100%"
            src={image1}
          ></img>
          <li>
            <span className={classes.shopname}>Hotel Empire</span>
          </li>

          <li>
            <span className={classes.foodtype}>
              North Indian, Kebabs, Biryani
            </span>
          </li>
          <li>
            <span className={classes.distance}>1.2 kms away</span>
          </li>
        </ul>
        <ul>
          <img
            className={classes.itemImage}
            width="100%"
            height="100%"
            src={image1}
          ></img>
          <li>
            <span className={classes.shopname}>Hotel Empire</span>
          </li>

          <li>
            <span className={classes.foodtype}>
              North Indian, Kebabs, Biryani
            </span>
          </li>
          <li>
            <span className={classes.distance}>1.2 kms away</span>
          </li>
        </ul>
        <ul>
          <img
            className={classes.itemImage}
            width="100%"
            height="100%"
            src={image1}
          ></img>
          <li>
            <span className={classes.shopname}>Hotel Empire</span>
          </li>

          <li>
            <span className={classes.foodtype}>
              North Indian, Kebabs, Biryani
            </span>
          </li>
          <li>
            <span className={classes.distance}>1.2 kms away</span>
          </li>
        </ul>
        <ul>
          <img
            className={classes.itemImage}
            width="100%"
            height="100%"
            src={image1}
          ></img>
          <li>
            <span className={classes.shopname}>Hotel Empire</span>
          </li>

          <li>
            <span className={classes.foodtype}>
              North Indian, Kebabs, Biryani
            </span>
          </li>
          <li>
            <span>1.2 kms away</span>
          </li>
        </ul>
        <ul>
          <img
            className={classes.itemImage}
            width="100%"
            height="100%"
            src={image1}
          ></img>
          <li>
            <span className={classes.shopname}>Hotel Empire</span>
          </li>

          <li>
            <span className={classes.foodtype}>
              North Indian, Kebabs, Biryani
            </span>
          </li>
          <li>
            <span className={classes.distance}>1.2 kms away</span>
          </li>
        </ul>
        <ul>
          <img
            className={classes.itemImage}
            width="100%"
            height="100%"
            src={image1}
          ></img>
          <li>
            <span className={classes.shopname}>Hotel Empire</span>
          </li>

          <li>
            <span className={classes.foodtype}>
              North Indian, Kebabs, Biryani
            </span>
          </li>
          <li>
            <span>1.2 kms away</span>
          </li>
        </ul>
        <ul>
          <img
            className={classes.itemImage}
            width="100%"
            height="100%"
            src={image1}
          ></img>
          <li>
            <span className={classes.shopname}>Hotel Empire</span>
          </li>

          <li>
            <span className={classes.foodtype}>
              North Indian, Kebabs, Biryani
            </span>
          </li>
          <li>
            <span>1.2 kms away</span>
          </li>
        </ul>
        <ul>
          <img
            className={classes.itemImage}
            width="100%"
            height="100%"
            src={image1}
          ></img>
          <li>
            <span className={classes.shopname}>Hotel Empire</span>
          </li>

          <li>
            <span className={classes.foodtype}>
              North Indian, Kebabs, Biryani
            </span>
          </li>
          <li>
            <span>1.2 kms away</span>
          </li>
        </ul> */}
      </div>
    </>
  );
};

export default Home;
// const FindShops = (searchItem) => {
//   const query = searchItem.target.value;
//   setSearchQuery(query);

//   if (query === "") {
//     setFilteredData(data);
//   } else {
//     const filtered = data.filter(
//       (item) =>
//         item.name && item.name.toLowerCase().includes(query.toLowerCase())
//     );
//     setFilteredData(filtered);
//   }

//   console.log("RABINDRA");
// };
