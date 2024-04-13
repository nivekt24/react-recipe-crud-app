import { Link } from 'react-router-dom';
import PageNav from '../components/PageNav';
import styles from './Homepage.module.css';
import { useFetch } from '../hooks/useFetch';
import FeaturedList from '../components/FeaturedList';
import Spinner from '../components/Spinner';

const Homepage = () => {
  const { data, isLoading, error } = useFetch('http://localhost:3000/recipes');

  return (
    <main className={styles.homepage}>
      <PageNav />

      <div className={styles.homepageWrapper}>
        <section>
          <h1>Share recipes with friends and family</h1>
          <p>
            Login and create your own recipe and see what others are cooking.
          </p>

          <Link to="/login" className="cta">
            Create Recipe
          </Link>
        </section>
        <div>
          <h1>Featured</h1>
          {error && <p className="error">{error}</p>}
          {isLoading && <Spinner />}
          {data && <FeaturedList recipes={data} />}
        </div>
      </div>
    </main>
  );
};

export default Homepage;
