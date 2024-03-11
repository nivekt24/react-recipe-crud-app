import { Link } from 'react-router-dom';
import styles from './Logo.module.css';

const Logo = () => {
  return (
    <Link to="/" className={styles.logo}>
      <h3>MyRecipePlate</h3>
    </Link>
  );
};

export default Logo;
