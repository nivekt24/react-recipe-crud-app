import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import AppNav from '../components/AppNav';
import User from '../components/User';
import styles from './Bookmark.module.css'; // Import your CSS module

const Bookmark = ({ bookmarkedRecipes, toggleBookmark }) => {
  const toggleBookmarkHandler = (recipe) => {
    // Pass 'recipe' to the function
    toggleBookmark(recipe);
  };

  return (
    <>
      <AppNav />
      <User />
      <div className={styles.bookmark}>
        <h1>Bookmarked Recipes</h1>
        <ul className={styles.bookmarkList}>
          {bookmarkedRecipes.map((recipe, index) => (
            <li key={index}>
              <Link to={`/recipes/${recipe.id}`}>
                <p>{recipe.title}</p>
              </Link>
              <button
                className={styles.icon}
                onClick={() => toggleBookmarkHandler(recipe)}
              >
                {bookmarkedRecipes.some((r) => r.id === recipe.id) ? '★' : '☆'}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Bookmark;
