// src/components/CreateItem/CreateItem.tsx

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../../redux/itemSlice";
import styles from "./create.module.css";

const CreateItem: React.FC = () => {
  const [itemName, setItemName] = useState<string>("");
  const dispatch = useDispatch();

  // src/components/CreateItem/CreateItem.tsx

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (itemName.trim()) {
      dispatch(addItem({ name: itemName }));
      setItemName(""); // Ensure input is cleared after adding an item
      console.log(itemName);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Create Item</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          placeholder="Item name"
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateItem;
