import React, { useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [items, setItems] = useState([
    { id: 1, name: "Item 1", description: "This is Item 1" },
    { id: 2, name: "Item 2", description: "This is Item 2" },
  ]);

  const handleDelete = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div>
      <h1>Home Page</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <Link to={`/edit/${item.id}`}>Edit</Link> |{" "}
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
