import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/FakeAuthContext';
import styles from './User.module.css';

function User() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleClick() {
    logout();
    navigate('/');
  }

  // Check if user is authenticated
  if (!user) {
    // Redirect to login page or render alternative content
    return null; // or <Redirect to="/login" />
  }

  return (
    <div className={styles.user}>
      <img src={user.avatar} alt={user.name} />
      <span>Welcome, {user.name}</span>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}

export default User;
