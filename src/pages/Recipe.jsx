import { useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import styles from './Recipe.module.css';

const Recipe = () => {
  const { id } = useParams();
  const url = 'http://localhost:3000/recipes/' + id;
  const { error, isLoading, data: recipe } = useFetch(url);

  return (
    <div className={styles.recipe}>
      {error && <p className={styles.error}>{error}</p>}
      {isLoading && <p className={styles.loading}>Loading...</p>}
      {recipe && <h1>{recipe.title}</h1>}
    </div>
  );
};

export default Recipe;
