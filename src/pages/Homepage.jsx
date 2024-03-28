import { Link } from 'react-router-dom';
import PageNav from '../components/PageNav';
import styles from './Homepage.module.css';
import { useFetch } from '../hooks/useFetch';
import FeaturedList from '../components/FeaturedList';

const Homepage = () => {
  const { data, isLoading, error } = useFetch('http://localhost:3000/recipes');

  return (
    <main className={styles.homepage}>
      <PageNav />

      <section>
        <h1>My Recipe Plate</h1>
        <p>
          A recipe blog serves as a community hub for food bloggers worldwide to
          share recipes and cultural dishes, fostering connections and
          friendships. Users engage in collaborative interactions, exchanging
          culinary tips and exploring diverse recipes. The platform prioritizes
          inclusivity, offering recipes for various dietary preferences, while
          also promoting social impact through initiatives supporting
          sustainability and community engagement. Continuously evolving, the
          blog remains dedicated to inspiring, educating, and connecting food
          enthusiasts globally.
        </p>

        <Link to="/login" className="cta">
          Create Recipe
        </Link>
      </section>
      <div>
        <h2 className="page-title">Featured</h2>
        {error && <p className="error">{error}</p>}
        {isLoading && <p className="loading">Loading...</p>}
        {data && <FeaturedList recipes={data} />}
      </div>
    </main>
  );
};

export default Homepage;
