import React from "react";
import { useSelector } from "react-redux";
import classes from "./selecteditem.module.css"
import image from "../Home/image1.avif"

const DetailsPage = ({ setSelectedItem, setOrderedItem }) => {
    // const selectedItem = useSelector((state) => state.users.selectedItem);
    console.log(setOrderedItem)
    // if (!selectedItem) return <p>No item selected</p>;

    return (
        <div className={classes.detailsPageContainer}>
            <div></div>
            <div className={classes.selectedItem}>{/* <h1>{selectedItem.name}</h1> */}
                <div className={classes.itemtitleX}>
                    <p className={classes.selectedItem}>Fast Food</p>
                    <p className={classes.selectedItemName}>Food Items: selectedItem.Fooditems</p>
                </div>
                <img src={image} />
                <div className={classes.itemtitleX}>
                    <p className={classes.distanceofSelectItem}>Distance: selectedItem.distance</p>
                    <p className={classes.priceSelected}>Price: $2</p></div>
            </div>
        </div>
    );
};

export default DetailsPage;
