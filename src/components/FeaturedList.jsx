import React from 'react';
import { Link } from 'react-router-dom';
import styles from './FeaturedList.module.css';
import ProfilePic from './icons/ProfilePic';

function FeaturedList({ recipes }) {
  return (
    <div className={styles.featuredList}>
      {recipes.map((recipe) => (
        <Link className={styles.wrapper} to={`/recipes/${recipe.id}`}>
          <div key={recipe.id} className={styles.card}>
            <img
              className={styles.img}
              src="default-featured.png"
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
