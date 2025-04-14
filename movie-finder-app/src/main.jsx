// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
// Import BrowserRouter
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx'
// Removed './index.css' import if you deleted the file

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* React Concept: Context Provider (BrowserRouter uses Context internally) */}
    {/* BrowserRouter enables routing capabilities for the entire App */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)