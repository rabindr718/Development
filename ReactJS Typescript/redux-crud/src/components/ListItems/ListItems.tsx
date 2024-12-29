// src/components/ListItems/ListItems.tsx

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteItem } from "../../redux/itemSlice";
import styles from "./list.module.css";
import UpdateItem from "../UpdateItem/UpdateItem";

interface RootState {
  items: { items: { id: number; name: string }[] }; // Update the type to match the store structure
}

const ListItems: React.FC = () => {
  const items = useSelector((state: RootState) => state.items.items); // Access the `items` array properly
  const dispatch = useDispatch();

  console.log("Items from Redux: Result", items);

  return (
    <div className={styles.container}>
      <h2>Items List</h2>
      {items.length > 0 ? (
        <ul>
          {items.map((item) => (
            <li key={item.id} className={styles.item}>
              <span>{item.name}</span>
              <UpdateItem item={item} />
              <button
                className={styles.deleteButton}
                onClick={() => dispatch(deleteItem(item.id))}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No items available</p>
      )}
    </div>
  );
};

export default ListItems;
