import React from "react";
import classes from "./home.module.css";
import { dataArray } from "../Services/api";
import image1 from "./image1.avif";
import Mapimage from "./map1.png";
const Home = () => {
  const Display = () => {};
  console.log(dataArray);
  return (
    <>
      <div className={classes.searching}>
        <input
          className={classes.searchbar}
          type="search"
          placeholder="Search"
        />
        <button className={classes.searchbtn}>Search</button>
      </div>

      <div className={classes.dispaydemo}>
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
            <img
              className={classes.mapImage}
              width="6%%"
              height="4.7%%"
              src={Mapimage}
            ></img>
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
        </ul>
      </div>
    </>
  );
};

export default Home;
