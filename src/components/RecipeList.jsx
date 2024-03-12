import { Link } from 'react-router-dom';
import styles from './RecipeList.module.css';

const RecipeList = ({ recipes }) => {
  return (
    <div className={styles.recipeList}>
      {recipes.map((recipe) => (
        <div key={recipe.id} className={styles.card}>
          <h3>{recipe.title}</h3>
          <p>{recipe.cookingTime} cooking time</p>
          <div>{recipe.method.substring(0, 100)}</div>
          <Link to={`/recipes/${recipe.id}`}>View Recipe</Link>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
