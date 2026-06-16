import React from 'react';
import './PageLoader.css';

const PageLoader = () => {
  return (
    <div className="page-loader-container">
      <div className="loader-spinner">
        <div className="spinner-circle spinner-orange"></div>
        <div className="spinner-circle spinner-green"></div>
      </div>
    </div>
  );
};

export default PageLoader;
