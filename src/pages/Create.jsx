import { useState, useRef, useEffect } from 'react';
import { useFetch } from '../hooks/useFetch';
import Button from '../components/Button';
import styles from './Create.module.css';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const [title, setTitle] = useState('');
  const [method, setMethod] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [newIngredient, setNewIngredient] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const ingredientInput = useRef(null);
  const navigate = useNavigate();

  const { postData, data } = useFetch('http://localhost:3000/recipes', 'POST');

  const handleSubmit = (e) => {
    e.preventDefault();
    postData({
      title,
      ingredients,
      method,
      cookingTime: cookingTime + ' minutes',
    });
    // console.log(title, method, cookingTime, ingredients);
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

  //   redirect user after we get data response
  useEffect(() => {
    if (data) {
      navigate('/app');
    }
  }, [data, navigate]);

  return (
    <div className={styles.create}>
      <h2 className="page-title">Add a New Recipe</h2>

      <form onSubmit={handleSubmit}>
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
    </div>
  );
};

export default Create;
