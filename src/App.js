import React from 'react';
import './App.css';
import { Toaster } from 'react-hot-toast';
import Portfolio from './portfolio'; // Make sure this path is correct

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} /> {/* Moved above */}
      <Portfolio />
    </>
  );
}

export default App;
