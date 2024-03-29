import React from 'react';
import { Link } from 'react-router-dom';
import styles from './FeaturedList.module.css';
import ProfilePic from './icons/ProfilePic';

function FeaturedList({ recipes }) {
  // Slice the recipes array to limit to only 6 recipes
  const limitedRecipes = recipes.slice(0, 4);

  return (
    <div className={styles.featuredList}>
      {limitedRecipes.map((recipe) => (
        <Link
          key={recipe.id}
          className={styles.wrapper}
          to={`/recipes/${recipe.id}`}
        >
          <div key={recipe.id} className={styles.card}>
            <img
              className={styles.img}
              src="featured-cover.png"
              alt="recipes"
            />
            <div className={styles.btnContainer}></div>
            <footer className={styles.footer}>
              <ProfilePic />
              <div>
                <h3>{recipe.title}</h3>
                <span>{recipe.username}</span>
              </div>
            </footer>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default FeaturedList;
