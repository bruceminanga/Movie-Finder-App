// src/components/MovieDetail.jsx
import React, { useState, useEffect } from 'react';
// React Router Hook: useParams - Allows access to URL parameters (like :movieId)
import { useParams, Link } from 'react-router-dom';
import './MovieDetail.css'; // Create later

function MovieDetail() {
  // React Router Concept: Accessing URL Parameters
  // useParams() returns an object where keys are the parameter names defined in the Route path (e.g., { movieId: '123' })
  // JavaScript Concept: Object Destructuring
  const { movieId } = useParams();

  // --- State for this specific movie ---
  const [movie, setMovie] = useState(null); // Holds the detailed movie object
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- API Key and URL ---
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  // Use the movieId from the URL to build the specific movie detail URL
  const movieDetailUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`;
  const imageBaseUrl = 'https://image.tmdb.org/t/p/w400'; // Larger image for detail view

  // --- Fetch Movie Details ---
  // React Concept: useEffect - Fetch data when the component mounts OR when movieId changes.
  useEffect(() => {
    const fetchMovieDetails = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(movieDetailUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setMovie(data); // Set the detailed movie data
      } catch (err) {
        console.error("Failed to fetch movie details:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  // React Concept: Dependency Array - Include 'movieId' and 'movieDetailUrl'.
  // If the user navigates from one movie detail page directly to another,
  // the movieId changes, and this effect needs to re-run to fetch the new movie's data.
  }, [movieId, movieDetailUrl]);


  // --- Render Details ---
  if (isLoading) return <p>Loading details...</p>;
  if (error) return <p>Error loading details: {error}</p>;
  if (!movie) return <p>Movie details not found.</p>; // Should not happen if fetch is successful, but good practice

  const imageUrl = movie.poster_path
    ? `${imageBaseUrl}${movie.poster_path}`
    : 'https://via.placeholder.com/400x600?text=No+Image';

  return (
    <div className="movie-detail">
      {/* React Router Concept: Link Component - Used for navigation within the app */}
      {/* Prevents full page reloads, providing a Single Page Application (SPA) feel. */}
      <Link to="/" className="back-link">← Back to List</Link>

      <h2>{movie.title} ({movie.release_date ? movie.release_date.substring(0, 4) : 'N/A'})</h2>
      <div className="detail-content">
         <img src={imageUrl} alt={`${movie.title} poster`} />
         <div className="detail-text">
            <p><strong>Rating:</strong> {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'} / 10</p>
            <p><strong>Genres:</strong> {movie.genres?.map(g => g.name).join(', ') || 'N/A'}</p>
            <p><strong>Overview:</strong> {movie.overview || 'No overview available.'}</p>
            {/* Add more details like runtime, tagline etc. if desired */}
         </div>
      </div>

    </div>
  );
}

export default MovieDetail;