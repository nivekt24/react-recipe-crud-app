import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './RecipeList.module.css';
import Modal from './Modal';

const RecipeList = ({ recipes, onDelete, updateRecipe }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editRecipe, setEditRecipe] = useState(null);
  const [title, setTitle] = useState('');
  const [method, setMethod] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [newIngredient, setNewIngredient] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const ingredientInput = useRef(null);
  const [username, setUsername] = useState('');

  const handleEdit = (recipe) => {
    setEditRecipe(recipe);
    setIsEditing(true);
    setTitle(recipe.title);
    setMethod(recipe.method);
    setCookingTime(parseInt(recipe.cookingTime));
    setNewIngredient('');
    setUsername(recipe.username);
  };

  const closeModal = () => {
    setEditRecipe(null);
    setIsEditing(false);
    resetFormState();
  };

  const resetFormState = () => {
    setTitle('');
    setMethod('');
    setCookingTime('');
    setNewIngredient('');
    setIngredients([]);
    setUsername('');
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    // Prepare the updated recipe object
    const updatedRecipe = {
      title: title,
      ingredients: ingredients,
      method: method,
      cookingTime: `${cookingTime} minutes`,
      username,
    };

    try {
      // Call the updateRecipe function with the recipe ID and updated recipe object
      await updateRecipe(editRecipe.id, updatedRecipe);

      // Close the modal after successful update
      closeModal();
    } catch (error) {
      // Handle any errors that occur during the update process
      console.error('Error updating recipe:', error);
      // Display an error message to the user
      // You can set a state variable to display the error message in your UI
    }
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const ing = newIngredient.trim();

    if (ing && !ingredients.includes(ing)) {
      setIngredients((prevIngredients) => [...prevIngredients, ing]);
    }
    setNewIngredient('');
    ingredientInput.current.focus();
  };

  const handleDelete = (id) => {
    onDelete(id);
  };

  if (recipes.length === 0) {
    return <div className="error">No recipes to load...</div>;
  }

  return (
    <div className={styles.recipeList}>
      {recipes.map((recipe) => (
        <div key={recipe.id} className={styles.card}>
          <h3>{recipe.title}</h3>
          <p>{recipe.cookingTime} cooking time</p>
          <div>{recipe.method.substring(0, 100)}</div>
          <Link to={`/recipes/${recipe.id}`}>View Recipe</Link>
          <div className={styles.btnContainer}>
            <button
              onClick={() => handleDelete(recipe.id)}
              className={styles.deleteBtn}
            >
              Delete
            </button>
            <button
              onClick={() => handleEdit(recipe)}
              className={styles.editIcon}
            >
              Edit
            </button>
          </div>
        </div>
      ))}

      {isEditing && (
        <Modal
          closeModal={closeModal}
          handleUpdate={handleUpdate}
          setTitle={setTitle}
          title={title}
          setNewIngredient={setNewIngredient}
          newIngredient={newIngredient}
          ingredientInput={ingredientInput}
          handleAdd={handleAdd}
          ingredients={ingredients}
          setMethod={setMethod}
          method={method}
          setCookingTime={setCookingTime}
          cookingTime={cookingTime}
          setUsername={setUsername}
          username={username}
        />
      )}
    </div>
  );
};

export default RecipeList;
