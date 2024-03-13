import { useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import styles from './Recipe.module.css';
import AppNav from '../components/AppNav';

const Recipe = () => {
  const { id } = useParams();
  const url = 'http://localhost:3000/recipes/' + id;
  const { error, isLoading, data: recipe } = useFetch(url);

  return (
    <>
      <AppNav />
      <div className={styles.recipe}>
        {error && <p className={styles.error}>{error}</p>}
        {isLoading && <p className={styles.loading}>Loading...</p>}
        {recipe && (
          <>
            <h2 className={styles.pageTitle}>{recipe.title}</h2>
            <p>Cooking time: {recipe.cookingTime}</p>
            <ul>
              {recipe.ingredients.map((ing) => (
                <li key={ing}>{ing}</li>
              ))}
            </ul>
            <p className={styles.method}>{recipe.method}</p>
          </>
        )}
      </div>
    </>
  );
};

export default Recipe;
