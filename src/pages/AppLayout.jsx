import AppNav from '../components/AppNav';
import RecipeList from '../components/RecipeList';
import SpinnerFullPage from '../components/SpinnerFullPage';
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

      {error && <p className="error">{error}</p>}
      {isLoading && <SpinnerFullPage />}
      {data && (
        <RecipeList
          recipes={data}
          isAuthenticated={isAuthenticated}
          onDelete={deleteData}
          updateRecipe={updateRecipe}
        />
      )}
      <User />
    </div>
  );
};

export default AppLayout;
