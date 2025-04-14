// src/components/SearchBar.jsx
import React, { useState } from 'react';
import './SearchBar.css'; // Create later

// React Concept: Props - Receiving 'onSearch' function from the parent (App).
function SearchBar({ onSearch }) {
  // React Concept: useState - Manage the input field's value.
  const [searchTerm, setSearchTerm] = useState('');

  // JavaScript Concept: Event Handling - Function to run when the form is submitted.
  const handleSubmit = (event) => {
    // Prevent the default form submission behavior (which causes a page reload).
    event.preventDefault();
    // Call the onSearch function passed down via props, sending the current searchTerm.
    onSearch(searchTerm.trim()); // Trim whitespace
  };

  // JavaScript Concept: Event Handling - Function to run when the input value changes.
  const handleChange = (event) => {
    // Update the 'searchTerm' state with the current value of the input field.
    setSearchTerm(event.target.value);
  };

  return (
    // React Concept: Controlled Component - Input field value is controlled by React state.
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        placeholder="Search for movies..."
        value={searchTerm} // Bind input value to state
        onChange={handleChange} // Update state on change
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;