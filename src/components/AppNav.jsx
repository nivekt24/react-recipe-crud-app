import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from './Logo';
import Searchbar from './Searchbar';
import styles from './AppNav.module.css';

const AppNav = () => {
  const [query, setQuery] = useState('');
  const [showCreateButton, setShowCreateButton] = useState(true);

  // Function to toggle the display of create button based on viewport width
  const handleResize = () => {
    if (window.innerWidth <= 768) {
      setShowCreateButton(false);
    } else {
      setShowCreateButton(true);
    }
  };

  // Add event listener for window resize
  window.addEventListener('resize', handleResize);

  return (
    <nav className={styles.nav}>
      <Logo isAppLayout={true} />
      <Searchbar query={query} setQuery={setQuery} />
      <ul>
        <li>
          <NavLink to="/app">Home</NavLink>
        </li>
        {showCreateButton ? (
          <li>
            <NavLink to="/create" className={styles.ctaLink}>
              Create
            </NavLink>
          </li>
        ) : (
          <li>
            <NavLink to="/create" className={styles.ctaLink}>
              <span>+</span>
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default AppNav;
