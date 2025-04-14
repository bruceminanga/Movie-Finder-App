// src/components/SearchBar/SearchBar.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './SearchBar.module.css';

function SearchBar({ onSearch, initialQuery = '' }) {
  // Best Practice: Allow controlling initial state via props
  const [searchTerm, setSearchTerm] = useState(initialQuery);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Best Practice: Trim whitespace before searching
    onSearch(searchTerm.trim());
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.searchBar} role="search">
      <input
        type="search" // Best Practice: Use appropriate input type
        placeholder="Search for movies..."
        value={searchTerm}
        onChange={handleChange}
        className={styles.searchInput}
        aria-label="Search for movies" // Best Practice: Accessibility
      />
      <button type="submit" className={styles.searchButton}>
        Search
      </button>
    </form>
  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  initialQuery: PropTypes.string,
};

export default SearchBar;