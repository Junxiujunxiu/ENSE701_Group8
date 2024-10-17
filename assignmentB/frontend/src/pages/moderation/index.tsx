// src/pages/moderation/index.tsx
import React from 'react';
import PrivateRoute from '../../components/PrivateRoute'; // Import the PrivateRoute component
import ModerationPage from './ModerationPage'; // Import your existing ModerationPage component

const Moderation = () => {
  return (
    <PrivateRoute>
      <ModerationPage />
    </PrivateRoute>
  );
};

export default Moderation;
