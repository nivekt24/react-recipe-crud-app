import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import AppNav from '../components/AppNav';
import RecipeForm from '../components/RecipeForm';
import styles from './Create.module.css';

const Create = () => {
  const [title, setTitle] = useState('');
  const [method, setMethod] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [newIngredient, setNewIngredient] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const ingredientInput = useRef(null);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const { postData, data } = useFetch('http://localhost:3000/recipes', 'POST');

  const handleSubmit = (e) => {
    e.preventDefault();
    postData({
      title,
      ingredients,
      method,
      cookingTime: cookingTime + ' minutes',
      username,
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
    <>
      <AppNav />
      <div className={styles.create}>
        <h2 className="page-title">Add a New Recipe</h2>

        <RecipeForm
          handleSubmit={handleSubmit}
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
      </div>
    </>
  );
};

export default Create;
