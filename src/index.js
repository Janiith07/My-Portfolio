import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Portfolio from './portfolio';  // correct relative import path
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Portfolio />  {/* Render your Portfolio component */}
  </React.StrictMode>
);

reportWebVitals();
