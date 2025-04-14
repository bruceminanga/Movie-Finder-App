// src/components/MovieCard.jsx
import React from 'react';
// Import Link from react-router-dom
import { Link } from 'react-router-dom';
import './MovieCard.css';

function MovieCard({ movie }) {
  const imageBaseUrl = 'https://image.tmdb.org/t/p/w200';
  const imageUrl = movie.poster_path
    ? `${imageBaseUrl}${movie.poster_path}`
    : 'https://via.placeholder.com/200x300?text=No+Image';
  const title = movie.title || 'Title Unavailable';
  const releaseDate = movie.release_date || 'N/A';

  return (
    // React Router Concept: Link component - Wrap the card content
    // 'to' prop specifies the destination URL.
    // JavaScript Concept: Template Literal used to construct the dynamic URL.
    <Link to={`/movie/${movie.id}`} className="movie-card-link">
      <div className="movie-card">
        <img src={imageUrl} alt={`${title} poster`} />
        <h3>{title}</h3>
        <p>Released: {releaseDate}</p>
      </div>
    </Link>
  );
}

export default MovieCard;