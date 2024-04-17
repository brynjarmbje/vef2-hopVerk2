import React from 'react';
import Spinner from '@/styles/spinner.svg'; 

export default function Loading() {
  return (
    <div className="loading-container">
      <img src={Spinner} alt="Loading..." />
    </div>
  );
}

