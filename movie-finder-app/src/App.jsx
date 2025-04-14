// src/App.jsx
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import DetailPage from './pages/DetailPage/DetailPage';
// Optional: Import a Header/Footer component if you add one
// import Header from './components/Layout/Header';

function App() {
  return (
    <> {/* Use Fragment if no wrapper div needed */}
      {/* Optional: <Header /> */}
      <h1>Movie Finder</h1> 
      <Routes>
        {/* Best Practice: Define routes mapping paths to page components */}
        <Route path="/" element={<HomePage />} />
        <Route path="/movie/:movieId" element={<DetailPage />} />
        {/* Optional: Add a 404 Not Found Route */}
        <Route path="*" element={
          <main style={{ padding: "40px", textAlign: "center" }}>
            <h1>404 - Page Not Found</h1>
            <Link to="/">Go Home</Link>
          </main>
        } />
      </Routes>
      {/* Optional: <Footer /> */}
    </>
  );
}

export default App;