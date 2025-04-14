// src/services/tmdbApi.jsx

/**
 * TMDB API Service
 * Handles all API communication with The Movie Database
 */

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';

/**
 * Helper function for fetching data from TMDB API
 * @param {string} endpoint - API endpoint to fetch from
 * @param {Object} params - Query parameters to include in the request
 * @returns {Promise<Object>} - API response data
 */
const fetchFromTMDB = async (endpoint, params = {}) => {
  // Construct query parameters
  const queryParams = new URLSearchParams({
    api_key: API_KEY,
    language: 'en-US',
    ...params
  }).toString();
  
  const url = `${BASE_URL}/${endpoint}?${queryParams}`;
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      // Throw specific errors based on HTTP status
      throw new Error(`HTTP error! status: ${response.status} fetching ${endpoint}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("TMDB API fetch error:", error);
    // Re-throw the error so calling components can handle it
    throw error;
  }
};

/**
 * Get popular movies from TMDB
 * @param {number} page - Page number for pagination
 * @returns {Promise<Array>} - Array of movie objects
 */
export const getPopularMovies = async (page = 1) => {
  try {
    const data = await fetchFromTMDB('movie/popular', { page });
    return data.results || [];
  } catch (error) {
    console.error("Failed to fetch popular movies:", error);
    return [];
  }
};

/**
 * Search movies by query string
 * @param {string} query - Search query
 * @param {number} page - Page number for pagination
 * @returns {Promise<Array>} - Array of movie objects matching the query
 */
export const searchMovies = async (query, page = 1) => {
  if (!query || query.trim() === '') return []; // Don't search if query is empty or just whitespace
  
  try {
    const data = await fetchFromTMDB('search/movie', {
      query: query.trim(),
      page,
      include_adult: false
    });
    
    return data.results || [];
  } catch (error) {
    console.error(`Failed to search movies for "${query}":`, error);
    return [];
  }
};

/**
 * Get detailed information about a specific movie
 * @param {number|string} movieId - TMDB movie ID
 * @returns {Promise<Object>} - Movie details
 */
export const getMovieDetails = async (movieId) => {
  if (!movieId) throw new Error("Movie ID is required");
  
  try {
    return await fetchFromTMDB(`movie/${movieId}`);
  } catch (error) {
    console.error(`Failed to fetch details for movie ID ${movieId}:`, error);
    throw error;
  }
};

/**
 * Construct an image URL from a path and desired size
 * @param {string|null} path - Image path from API
 * @param {string} size - Image size (w92, w154, w185, w342, w500, w780, original)
 * @returns {string|null} - Complete image URL or null if no path provided
 */
export const getImageUrl = (path, size = 'w500') => {
  // Valid sizes according to TMDB API
  const validSizes = ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original'];
  
  // Default to w500 if invalid size is provided
  const imageSize = validSizes.includes(size) ? size : 'w500';
  
  return path ? `${IMAGE_BASE_URL}${imageSize}${path}` : null;
};

// Export all constants for potential reuse
export const constants = {
  BASE_URL,
  IMAGE_BASE_URL
};