// src/pages/DetailPage/DetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMovieDetails, getImageUrl } from '../../services/tmdbApi';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import styles from './DetailPage.module.css';

const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/400x600?text=No+Image';

function DetailPage() {
  const { movieId } = useParams(); // Get movie ID from URL
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Best Practice: useEffect fetches data when movieId changes.
  useEffect(() => {
    const fetchDetails = async () => {
      setIsLoading(true);
      setError(null);
      setMovie(null); // Clear previous movie

      try {
        const fetchedMovie = await getMovieDetails(movieId);
        setMovie(fetchedMovie);
      } catch (err) {
        setError(err.message || 'Failed to fetch movie details.');
      } finally {
        setIsLoading(false);
      }
    };

    if (movieId) {
      fetchDetails();
    }
  // Best Practice: Dependency array includes only what the effect truly depends on.
  }, [movieId]);

  // --- Render Logic ---
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  // Best Practice: Handle the case where loading is finished but movie is still null
  if (!movie) return <p className={styles.notFound}>Movie details not found.</p>;

  const imageUrl = getImageUrl(movie.poster_path, 'w400') || PLACEHOLDER_IMAGE;
  const genres = movie.genres?.map(g => g.name).join(', ') || 'N/A';
  const rating = movie.vote_average ? `${movie.vote_average.toFixed(1)} / 10` : 'N/A';
  const releaseYear = movie.release_date ? `(${movie.release_date.substring(0, 4)})` : '';

  return (
    <main className={styles.detailPage}>
      <Link to="/" className={styles.backLink}>← Back to Search</Link>

      <div className={styles.detailContent}>
        <img
          src={imageUrl}
          alt={`${movie.title} poster`}
          className={styles.poster}
          loading="lazy"
        />
        <div className={styles.info}>
          <h1 className={styles.title}>{movie.title} {releaseYear}</h1>
          {movie.tagline && <p className={styles.tagline}>"{movie.tagline}"</p>}
          <p><strong>Rating:</strong> {rating}</p>
          <p><strong>Genres:</strong> {genres}</p>
          <p><strong>Overview:</strong></p>
          <p className={styles.overview}>{movie.overview || 'No overview available.'}</p>
          {/* Add more details: Runtime, Budget, Revenue etc. */}
        </div>
      </div>
    </main>
  );
}

export default DetailPage;