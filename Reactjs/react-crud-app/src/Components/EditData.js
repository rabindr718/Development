import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditData({ data, setData }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '' });

  useEffect(() => {
    const existingData = data.find((item) => item.id === Number(id));
    if (existingData) {
      setFormData(existingData);
    }
  }, [id, data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = data.map((item) =>
      item.id === Number(id) ? formData : item
    );
    setData(updatedData);
    navigate('/view');
  };

  return (
    <div>
      <h2>Edit Data</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default EditData;
