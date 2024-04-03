import AppNav from '../components/AppNav';
import RecipeList from '../components/RecipeList';
import User from '../components/User';
import { useAuth } from '../context/FakeAuthContext';
import { useFetch } from '../hooks/useFetch';
import styles from './AppLayout.module.css';

const AppLayout = () => {
  const { isAuthenticated } = useAuth();

  const { data, isLoading, error, deleteData, updateRecipe } = useFetch(
    'http://localhost:3000/recipes'
  );

  return (
    <div className={styles.app}>
      <AppNav />
      <User />
      {error && <p className="error">{error}</p>}
      {isLoading && <p className="loading">Loading...</p>}
      {data && (
        <RecipeList
          recipes={data}
          isAuthenticated={isAuthenticated}
          onDelete={deleteData}
          updateRecipe={updateRecipe}
        />
      )}
    </div>
  );
};

export default AppLayout;
