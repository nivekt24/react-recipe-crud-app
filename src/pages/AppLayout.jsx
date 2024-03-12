import AppNav from '../components/AppNav';
import RecipeList from '../components/RecipeList';
import { useFetch } from '../hooks/useFetch';
import styles from './AppLayout.module.css';

const AppLayout = () => {
  const { data, isLoading, error } = useFetch('http://localhost:3000/recipes');
  return (
    <div className={styles.app}>
      <AppNav />
      {error && <p className="error">{error}</p>}
      {isLoading && <p className="loading">Loading...</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  );
};

export default AppLayout;
