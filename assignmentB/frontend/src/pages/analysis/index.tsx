// src/pages/analysis/index.tsx
import React from 'react';
import PrivateRoute from '../../components/PrivateRoute'; // Import the PrivateRoute component
import AnalysisPage from './AnalysisPage'; // Import your existing AnalysisPage component

const Analysis = () => {
  return (
    <PrivateRoute>
      <AnalysisPage />
    </PrivateRoute>
  );
};

export default Analysis;
