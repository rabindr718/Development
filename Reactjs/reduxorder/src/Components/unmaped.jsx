import React, { useState, useEffect } from "react";

// Mock data to simulate data from server
const mockData = [
  { id: 1, title: "Hotel Empire", location: "North Indian, Kebabs, Biryani" },
  { id: 2, title: "Meghana Foods", location: "South Indian, Kebabs, Biryani" },
  { id: 3, title: "Kannur Food Point", location: "Kerala Chinese" },
  { id: 4, title: "Roti Wala", location: "Home Food, North India, Thali" },
  // Add more items as needed
];

const SearchComponent = () => {
  const [data, setData] = useState([]); // Data from server
  const [searchQuery, setSearchQuery] = useState(""); // User's search query
  const [filteredData, setFilteredData] = useState([]); // Filtered data based on search

  // Simulate data fetching
  useEffect(() => {
    // Simulate a server call to get data
    setData(mockData);
    setFilteredData(mockData); // Initially display all data
  }, []);

  // Function to handle search query input
  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    // Filter data based on title matching the query
    if (query === "") {
      setFilteredData(data); // If search query is empty, show all data
    } else {
      const filtered = data.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  return (
    <div>
      {/* Search input */}
      <input
        type="text"
        placeholder="Search by title"
        value={searchQuery}
        onChange={handleSearch}
      />

      {/* Display filtered data */}
      <ul>
        {filteredData.map((item) => (
          <li key={item.id}>
            <strong>{item.title}</strong> - {item.location}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchComponent;
