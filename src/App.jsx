import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Create from './pages/Create';
import Search from './pages/Search';
import Recipe from './pages/Recipe';
import AppLayout from './pages/AppLayout';
import PageNotFound from './pages/PageNotFound';
import About from './pages/About';
import Login from './pages/Login';
import { AuthProvider } from './context/FakeAuthContext';
import ProtectedRoute from './pages/ProtectedRoute';

export default function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route index={true} path="/" element={<Homepage />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create" element={<Create />} />
            <Route path="/search" element={<Search />} />
            <Route
              path="/recipes/:id"
              element={
                <ProtectedRoute>
                  <Recipe />
                </ProtectedRoute>
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
