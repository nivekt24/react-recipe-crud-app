import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Searchbar.module.css'; // Import CSS module

const Searchbar = ({ query, setQuery }) => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?q=${query}`);
  };

  return (
    <div className={styles.searchWrapper}>
      <form onSubmit={handleSubmit}>
        <input
          className={styles.search}
          id="search"
          type="text"
          placeholder="Search recipes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
        />
      </form>
    </div>
  );
};

export default Searchbar;
