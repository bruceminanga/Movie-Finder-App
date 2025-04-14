// src/components/MovieList/MovieList.jsx
import React from 'react';
import PropTypes from 'prop-types';
import MovieCard from '../MovieCard/MovieCard';
import styles from './MovieList.module.css';

function MovieList({ movies }) {
  if (!movies || movies.length === 0) {
    // Best Practice: Provide informative message for empty state
    return <p className={styles.noMovies}>No movies found.</p>;
  }

  return (
    <div className={styles.movieList}>
      {movies.map((movie) => (
        // Best Practice: Always use a stable and unique key
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

MovieList.propTypes = {
  // Best Practice: Define prop as an array of specific shapes
  movies: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    // Add other required/optional props used by MovieCard if needed for validation
  })).isRequired,
};

export default MovieList;