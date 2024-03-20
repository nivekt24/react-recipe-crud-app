import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './RecipeList.module.css';
import Button from './Button';

const RecipeList = ({ recipes, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editRecipe, setEditRecipe] = useState(null, { recipe: {} });
  const [title, setTitle] = useState('');
  const [method, setMethod] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [newIngredient, setNewIngredient] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const ingredientInput = useRef(null);

  const handleEdit = (recipe) => {
    setEditRecipe(recipe);
    setIsEditing(true);
  };

  const closeModal = () => {
    setIsEditing(false);
    setEditRecipe(null);
  };

  const handleUpdate = async (e) => {
    // e.preventDefault();
    // try {
    //   await putData(editRecipe.id, {
    //     setTitle(editRecipe.recipe.title,
    //     setingredients,
    //     method,
    //     cookingTime: cookingTime + ' minutes',
    //   });
    //   // Assuming you have a function to fetch recipes again after update,
    //   // or you can manage state locally if you're updating the state directly
    //   // setData(updatedData);
    //   closeModal();
    // } catch (error) {
    //   console.error('Error updating recipe:', error);
    //   // Handle error updating recipe
    // }
  };

  // useEffect(() => {
  //   console.log('Hello');
  // }, [handleEdit]);

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
              &times;
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
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div>
              {' '}
              <span onClick={closeModal} className={styles.close}>
                &times;
              </span>
            </div>

            <form onSubmit={handleUpdate}>
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
                  <Button className={styles.btn} onClick={handleAdd}>
                    add
                  </Button>
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
            {/* Example: <EditForm recipe={editRecipe} onClose={closeModal} /> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeList;
