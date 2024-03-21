import React from 'react';
import Button from './Button'; // Import your Button component here
import styles from './RecipeForm.module.css';

const RecipeForm = ({
  handleSubmit,
  setTitle,
  title,
  setNewIngredient,
  newIngredient,
  ingredientInput,
  handleAdd,
  ingredients,
  setMethod,
  method,
  setCookingTime,
  cookingTime,
}) => {
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label>
        <span>Recipe type:</span>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
        />
      </label>

      <label>
        <span>Recipe ingredients:</span>
        <div className={styles.ingredients}>
          <input
            type="text"
            onChange={(e) => setNewIngredient(e.target.value)}
            value={newIngredient}
            ref={ingredientInput}
          />
          <Button onClick={handleAdd}>add</Button>
        </div>
      </label>
      <p>
        Current ingredients:{' '}
        {ingredients.map((i) => (
          <em key={i}>{i}, </em>
        ))}
      </p>

      <label>
        <span>Recipe method:</span>
        <textarea
          onChange={(e) => setMethod(e.target.value)}
          value={method}
          required
        ></textarea>
      </label>

      <label>
        <span>Cooking time (minutes):</span>
        <input
          type="number"
          onChange={(e) => setCookingTime(e.target.value)}
          value={cookingTime}
          required
        />
      </label>

      <Button>submit</Button>
    </form>
  );
};

export default RecipeForm;
