import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import styles from './Bookmark.module.css'; // Import your CSS module
import AppNav from '../components/AppNav';

const Bookmark = ({ bookmarkedRecipes }) => {
  return (
    <>
      <AppNav />

      <div className={styles.bookmark}>
        <h2>Bookmarked Recipes</h2>
        <ul className={styles.bookmarkList}>
          {bookmarkedRecipes.map((recipe, index) => (
            <li key={index}>
              <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Bookmark;
