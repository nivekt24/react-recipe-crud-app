import { useParams, useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { useAuth } from '../context/FakeAuthContext';
import styles from './Recipe.module.css';
import AppNav from '../components/AppNav';
import User from '../components/User';
import ProfilePic from '../components/icons/ProfilePic';

const Recipe = ({ toggleBookmark, bookmarkedRecipes }) => {
  const { id } = useParams();
  const url = `http://localhost:3000/recipes/${id}`;
  const { error, isLoading, data: recipe, likes, updateLikes } = useFetch(url);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const toggleBookmarkHandler = () => {
    if (isAuthenticated) {
      toggleBookmark(recipe);
    } else {
      // Display a login prompt or redirect to the login page
      navigate('/login');
    }
  };

  return (
    <>
      <AppNav />
      <User />
      <div className={styles.recipe}>
        {error && <p className={styles.error}>{error}</p>}
        {isLoading && <p className={styles.loading}>Loading...</p>}
        {recipe && (
          <>
            <h2 className={styles.pageTitle}>{recipe.title}</h2>
            <div className={styles.recipeHeader}>
              <div className={styles.userContainer}>
                <ProfilePic />
                <div className={styles.userHandle}>
                  <span>{recipe.username}</span>
                  <span>Follow</span>
                </div>
              </div>
              <div className={styles.headerAction}>
                <button className={styles.icon} onClick={updateLikes}>
                  ❤️ {likes}
                </button>
                {/* Toggle bookmark button */}
                <button className={styles.icon} onClick={toggleBookmarkHandler}>
                  {bookmarkedRecipes.some((r) => r.id === recipe.id)
                    ? '★'
                    : '☆'}
                </button>
              </div>
            </div>
            <p>Cooking time: {recipe.cookingTime}</p>
            <ul>
              {recipe.ingredients.map((ing, index) => (
                <li key={index}>{ing}</li>
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
