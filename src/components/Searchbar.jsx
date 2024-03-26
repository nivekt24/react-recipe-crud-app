import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Searchbar.module.css'; // Import CSS module

const Searchbar = ({ query, setQuery }) => {
  const navigate = useNavigate();
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleFocus = () => {
    setIsFullScreen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?q=${query}`);
    setIsFullScreen(false);
  };

  const handleExitFullScreen = () => {
    setIsFullScreen(false);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.keyCode === 27) {
        // ESC key
        setIsFullScreen(false);
      }
    };

    if (isFullScreen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFullScreen]);

  return (
    <div
      className={`${styles.searchWrapper} ${
        isFullScreen ? styles.fullScreen : ''
      }`}
    >
      <form onSubmit={handleSubmit}>
        <input
          className={styles.search}
          id="search"
          type="text"
          placeholder="Search recipes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={handleFocus}
          required
        />
        {isFullScreen && (
          <button className={styles.exitButton} onClick={handleExitFullScreen}>
            X
          </button>
        )}
      </form>
    </div>
  );
};

export default Searchbar;
