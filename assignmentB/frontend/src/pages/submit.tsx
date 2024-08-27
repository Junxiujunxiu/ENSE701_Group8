import React, { useState } from 'react';
import axios from 'axios';
import SubmitForm from '../components/SubmitForm';

const Submit: React.FC = () => {
  const [message, setMessage] = useState('');

  const handleSubmit = async (formData: any) => {
    try {
      await axios.post('/api/articles', formData);
      setMessage('Article submitted successfully!');
    } catch (error) {
      setMessage('Failed to submit article.');
    }
  };

  return (
    <div>
      <SubmitForm onSubmit={handleSubmit} />
      {message && <p>{message}</p>}
    </div>
  );
};

export default Submit;
