import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from './Logo';
import Search from './Search';
import styles from './AppNav.module.css';

const AppNav = () => {
  const [query, setQuery] = useState('');

  return (
    <nav className={styles.nav}>
      <Logo />

      <Search query={query} setQuery={setQuery} />

      <NavLink to="/create" className={styles.ctaLink}>
        Create Recipe
      </NavLink>
    </nav>
  );
};

export default AppNav;
