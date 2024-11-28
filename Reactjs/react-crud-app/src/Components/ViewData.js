import React from 'react';
import { Link } from 'react-router-dom';

function ViewData({ data, setData }) {
  const handleDelete = (id) => {
    const updatedData = data.filter(item => item.id !== id);
    setData(updatedData);
  };

  return (
    <div>
      <h2>View Data</h2>
      {data.length === 0 ? (
        <p>No data available.</p>
      ) : (
        <ul>
          {data.map((item) => (
            <li key={item.id}>
              {item.name} - {item.email}
              <Link to={`/edit/${item.id}`}> Edit</Link>
              <button onClick={() => handleDelete(item.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ViewData;
