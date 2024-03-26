import { Link } from 'react-router-dom';
import styles from './Logo.module.css';

const Logo = ({ isAppLayout }) => {
  const linkTo = isAppLayout ? '/app' : '/';

  return (
    <Link to={linkTo} className={styles.logo}>
      <h3>MyRecipe</h3>
    </Link>
  );
};

export default Logo;
