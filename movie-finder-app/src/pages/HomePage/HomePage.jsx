// src/pages/HomePage/HomePage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import MovieList from '../../components/MovieList/MovieList';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { getPopularMovies, searchMovies } from '../../services/tmdbApi'; // Import API functions
import styles from './HomePage.module.css';

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentQuery, setCurrentQuery] = useState('');

  // Best Practice: Use useCallback to memoize the fetch function,
  // preventing unnecessary re-renders if passed down or used in useEffect deps.
  const fetchMoviesData = useCallback(async (query) => {
    setIsLoading(true);
    setError(null);
    setMovies([]); // Clear previous results immediately

    try {
      let fetchedMovies;
      if (query) {
        fetchedMovies = await searchMovies(query);
      } else {
        fetchedMovies = await getPopularMovies();
      }
      setMovies(fetchedMovies);
    } catch (err) {
      // Best Practice: Set user-friendly error messages from caught errors
      setError(err.message || 'Failed to fetch movies.');
    } finally {
      setIsLoading(false);
    }
  }, []); // No dependencies needed as API functions are stable imports

  // Fetch popular movies on initial mount
  // Best Practice: useEffect for side effects like initial data load.
  useEffect(() => {
    fetchMoviesData(''); // Fetch popular movies initially
  }, [fetchMoviesData]); // Depend on the memoized fetch function

  // Handler for search submission
  const handleSearch = (query) => {
    setCurrentQuery(query); // Update the query state
    fetchMoviesData(query); // Trigger fetch with the new query
  };

  return (
    <main className={styles.homePage}> {/* Best Practice: Use semantic <main> */}
      <SearchBar onSearch={handleSearch} initialQuery={currentQuery} />

      {/* Best Practice: Clear conditional rendering */}
      {isLoading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      {!isLoading && !error && <MovieList movies={movies} />}
    </main>
  );
}

export default HomePage;