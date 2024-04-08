import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useLocalStorageState } from './hooks/useLocalStorageState';
import Homepage from './pages/Homepage';
import Create from './pages/Create';
import Search from './pages/Search';
import Recipe from './pages/Recipe';
import Bookmark from './pages/Bookmark';
import AppLayout from './pages/AppLayout';
import PageNotFound from './pages/PageNotFound';
import About from './pages/About';
import Login from './pages/Login';
import { AuthProvider } from './context/FakeAuthContext';
import ProtectedRoute from './pages/ProtectedRoute';
import LoginRequired from './pages/LoginRquired';

export default function App() {
  // Retrieve bookmarked recipes from localStorage using the custom hook
  const [bookmarkedRecipes, setBookmarkedRecipes] = useLocalStorageState(
    [],
    'bookmarkedRecipes'
  );

  // Function to handle adding/removing bookmark
  const toggleBookmark = (recipe) => {
    const isBookmarked = bookmarkedRecipes.some((r) => r.id === recipe.id);
    if (isBookmarked) {
      const updatedBookmarks = bookmarkedRecipes.filter(
        (r) => r.id !== recipe.id
      );
      setBookmarkedRecipes(updatedBookmarks);
    } else {
      setBookmarkedRecipes([...bookmarkedRecipes, recipe]);
    }
  };

  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route index={true} path="/" element={<Homepage />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/create"
              element={
                <LoginRequired>
                  <Create />
                </LoginRequired>
              }
            />
            <Route path="/search" element={<Search />} />
            <Route
              path="/recipes/:id"
              element={
                <Recipe
                  toggleBookmark={toggleBookmark}
                  bookmarkedRecipes={bookmarkedRecipes}
                />
              }
            />
            <Route
              path="/bookmark"
              element={
                <LoginRequired>
                  <Bookmark
                    bookmarkedRecipes={bookmarkedRecipes}
                    toggleBookmark={toggleBookmark}
                  />
                </LoginRequired>
              }
            />
            <Route
              path="app"
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}
