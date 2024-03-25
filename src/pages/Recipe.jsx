import { useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import styles from './Recipe.module.css';
import AppNav from '../components/AppNav';
import User from '../components/User';
import ProfilePic from '../components/icons/ProfilePic';

const Recipe = () => {
  const { id } = useParams();
  const url = 'http://localhost:3000/recipes/' + id;
  const { error, isLoading, data: recipe } = useFetch(url);

  return (
    <>
      <AppNav />
      <User />
      <div className={styles.recipe}>
        {error && <p className={styles.error}>{error}</p>}
        {isLoading && <p className={styles.loading}>Loading...</p>}
        {recipe && (
          <>
            <div className={styles.recipeHeader}>
              <div className={styles.userContainer}>
                <ProfilePic />
                <div className={styles.userHandle}>
                  <span>{recipe.username}</span>
                  <span>Follow</span>
                </div>
              </div>
              <div className={styles.headerAction}>
                <button className={styles.icon}>❤️</button>
                <button className={styles.icon}>📑</button>
              </div>
            </div>
            <h2>{recipe.title}</h2>

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
