import React, { useState, useEffect } from 'react';
import './styles.css';
const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [pastSearches, setPastSearches] = useState(
    JSON.parse(localStorage.getItem('pastSearches')) || []
  );
  const [sortedUsers, setSortedUsers] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  useEffect(() => {
    const filteredUsers = users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSortedUsers(filteredUsers);
  }, [users, searchTerm]);

  const handleSearch = () => {
    const newSearchTerm = searchTerm.trim();
    if (newSearchTerm) {
      setPastSearches((prevSearches) => [...prevSearches, newSearchTerm]);
      localStorage.setItem(
        'pastSearches',
        JSON.stringify([...pastSearches, newSearchTerm])
      );
    }
  };

  const handleSort = () => {
    const sortedByName = [...sortedUsers].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setSortedUsers(sortedByName);
  };

  return (
    <div className='main'>
      <div>
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch} id='s1'>Search</button>
      </div>
      <button onClick={handleSort} id='b1'>Sort by Name</button>
      <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
        {sortedUsers.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      <div>
        <p id='ps'>Past Searches:</p>
        <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
          {pastSearches.map((search, index) => (
            <li key={index}>{search}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserList;
