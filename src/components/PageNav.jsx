import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from './Logo';
import styles from './PageNav.module.css';
import Searchbar from './Searchbar';

function PageNav() {
  const [query, setQuery] = useState('');
  return (
    <nav className={styles.nav}>
      <Logo />

      <Searchbar query={query} setQuery={setQuery} />

      <ul>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        <li>
          <NavLink to="/login" className={styles.ctaLink}>
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
