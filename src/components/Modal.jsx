import React from 'react';
import styles from './Modal.module.css'; // Import your CSS styles here
import RecipeForm from './RecipeForm';

const Modal = ({
  closeModal,
  handleUpdate,
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
  setUsername,
  username,
}) => {
  return (
    <>
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <div>
            <span onClick={closeModal} className={styles.close}>
              &times;
            </span>
          </div>

          <RecipeForm
            handleSubmit={handleUpdate}
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
      </div>
    </>
  );
};

export default Modal;
