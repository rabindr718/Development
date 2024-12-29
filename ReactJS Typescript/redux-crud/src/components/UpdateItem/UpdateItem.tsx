// src/components/UpdateItem/UpdateItem.tsx

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateItem } from "../../redux/itemSlice";
import styles from "./update.module.css";

interface UpdateItemProps {
  item: { id: number; name: string };
}

const UpdateItem: React.FC<UpdateItemProps> = ({ item }) => {
  const [newName, setNewName] = useState<string>(item.name);
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateItem({ id: item.id, name: newName }));
  };

  return (
    <div className={styles.container}>
      <h2>Update Item</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateItem;
