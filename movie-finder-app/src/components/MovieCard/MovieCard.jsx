// src/components/MovieCard/MovieCard.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../../services/tmdbApi'; // Use the service function
import styles from './MovieCard.module.css';

const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/200x300?text=No+Image';

function MovieCard({ movie }) {
  // Best Practice: Use helper from service for consistency
  const imageUrl = getImageUrl(movie.poster_path, 'w200') || PLACEHOLDER_IMAGE;

  return (
    <Link to={`/movie/${movie.id}`} className={styles.cardLink}>
      <div className={styles.movieCard}>
        <img
          src={imageUrl}
          alt={`${movie.title || 'Movie'} poster`} // Best Practice: Meaningful alt text
          className={styles.poster}
          loading="lazy" // Best Practice: Lazy load images below the fold
        />
        <div className={styles.info}>
          <h3 className={styles.title}>{movie.title || 'Title Unavailable'}</h3>
          <p className={styles.releaseDate}>
            {movie.release_date ? movie.release_date.substring(0, 4) : 'N/A'}
          </p>
        </div>
      </div>
    </Link>
  );
}

MovieCard.propTypes = {
  // Best Practice: Define shape for complex object props
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    poster_path: PropTypes.string,
    release_date: PropTypes.string,
  }).isRequired,
};

export default MovieCard;