// src/components/MovieList.jsx
import React from 'react';
import MovieCard from './MovieCard';
import './MovieList.css'; // Create later for styling the list

// React Concept: Functional Component - A JavaScript function that returns JSX.
// React Concept: Props - Receiving data from the parent component.
// JavaScript Concept: Object Destructuring - Extracting 'movies' directly from the props object ({ movies }).
function MovieList({ movies }) {

  // Handle the case where movies might not be an array or is empty
  if (!movies || movies.length === 0) {
    return <p>No movies found.</p>;
  }

  return (
    <div className="movie-list">
      {/* JavaScript Concept: Array.map() method - Iterates over an array and returns a new array */}
      {/* based on the return value of the function passed to it. */}
      {/* React Concept: Rendering Lists - map() is the standard way to render lists of elements. */}
      {movies.map((movie) => (
        // React Concept: Key Prop - A special *required* prop when rendering lists.
        // Helps React identify which items have changed, are added, or are removed.
        // Keys should be stable, unique among siblings, and ideally derived from your data (like movie.id).
        // JavaScript Concept: Passing data (the individual 'movie' object) as a prop to MovieCard.
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

export default MovieList;