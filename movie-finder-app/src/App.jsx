// src/App.jsx
import React, { useState, useEffect, useCallback } from 'react'; // Import useCallback
import { Routes, Route } from 'react-router-dom';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';
import SearchBar from './components/SearchBar'; // Import SearchBar
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Initially false, loading happens on search/mount
  const [error, setError] = useState(null);
  // React Concept: useState - Add state to hold the current search query.
  const [currentQuery, setCurrentQuery] = useState(''); // Track the active search term

  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  // --- Fetching Logic (Combined Popular & Search) ---
  // React Concept: useCallback - Memoizes the fetch function.
  // Useful when passing functions down as props (like handleSearch) or using them
  // in useEffect dependencies. Prevents unnecessary re-creation of the function
  // on every render unless its own dependencies (apiKey) change.
  const fetchMovies = useCallback(async (query) => {
    setIsLoading(true);
    setError(null);

    // Determine the URL based on whether a search query is provided
    let url = '';
    if (query) {
      // JavaScript Concept: encodeURIComponent - Ensures special characters in the query
      // are properly encoded for the URL.
      url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${encodeURIComponent(query)}&page=1&include_adult=false`;
    } else {
      // Default to popular movies if no query
      url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
    }

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // Handle cases where search might return empty results correctly
      setMovies(data.results || []); // Use empty array if results are undefined/null
    } catch (err) {
      console.error("Failed to fetch movies:", err);
      setError(err.message);
      setMovies([]); // Clear movies on error
    } finally {
      setIsLoading(false);
    }
  // React Concept: Dependency Array for useCallback - Re-create function only if apiKey changes.
  }, [apiKey]);


  // --- Initial Load (Popular Movies) ---
  // React Concept: useEffect - Runs once on mount to load initial popular movies.
  useEffect(() => {
    // Only fetch popular movies initially if no search has been performed yet
    if (!currentQuery) {
        fetchMovies(''); // Pass empty query to fetch popular movies
    }
  // React Concept: Dependency Array - Depends on fetchMovies and currentQuery.
  // Runs when component mounts OR if fetchMovies function instance changes (unlikely due to useCallback)
  // OR if currentQuery changes (but we only want initial load here). The 'if' handles the logic.
  // Empty array [] would also work here if we ONLY wanted initial popular load, but
  // tying it to fetchMovies is slightly more robust if fetchMovies could somehow change.
  // Let's stick with [] for simplicity of initial load.
  }, [fetchMovies]); // Simpler: }, []);


  // --- Handle Search Submission ---
  // This function will be passed down to SearchBar.
  const handleSearch = (query) => {
    setCurrentQuery(query); // Update the current search query state
    fetchMovies(query);   // Trigger a fetch with the new query
  };


  return (
    <div className="App">
      <h1>MovieFinder</h1>
      {/* Pass the handleSearch function as a prop to SearchBar */}
      {/* React Concept: Lifting State Up - The search term state could live in SearchBar, */}
      {/* but App needs it to trigger fetching. So, the state/logic related to the *effect* */}
      {/* of the search (fetching) lives in App, and App passes down a function (handleSearch) */}
      {/* to let SearchBar communicate the search term back up. */}
      <SearchBar onSearch={handleSearch} />

      <Routes>
        <Route
          path="/"
          element={
            <>
              {isLoading ? (
                <p>Loading movies...</p>
              ) : error ? (
                <p>Error: {error}</p>
              ) : // Pass the potentially filtered movies to MovieList
              (
                <MovieList movies={movies} />
              )}
            </>
          }
        />
        <Route path="/movie/:movieId" element={<MovieDetail />} />
      </Routes>
    </div>
  );
}

export default App;