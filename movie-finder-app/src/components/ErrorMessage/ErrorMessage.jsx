// src/components/ErrorMessage/ErrorMessage.jsx
import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import styles from './ErrorMessage.module.css';

function ErrorMessage({ message }) {
  if (!message) return null; // Don't render if no message

  return (
    <div className={styles.errorContainer}>
      <p className={styles.errorMessage}>⚠️ Error: {message}</p>
    </div>
  );
}

// Best Practice: Define prop types for validation and documentation.
ErrorMessage.propTypes = {
  message: PropTypes.string,
};

export default ErrorMessage;