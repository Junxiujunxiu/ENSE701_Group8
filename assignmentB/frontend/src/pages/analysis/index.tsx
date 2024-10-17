import React from 'react';
import PrivateRoute from '../../components/PrivateRoute'; // Corrected path for PrivateRoute
import AnalysisPage from './AnalysisPage'; // Corrected path for AnalysisPage

const Analysis = () => {
  return (
    <PrivateRoute>
      <AnalysisPage />
    </PrivateRoute>
  );
};

export default Analysis;
