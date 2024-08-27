import React, { useState } from 'react';

interface SubmitFormProps {
  onSubmit: (formData: any) => void;
}

const SubmitForm: React.FC<SubmitFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    authors: '',
    journal: '',
    year: '',
    seMethod: '',
    claim: '',
    evidence: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit({ ...formData, authors: formData.authors.split(',') });
  };

  return (
    <div className="border p-4">
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        className="border p-2 mb-2 w-full"
        placeholder="Title"
      />
      <input
        type="text"
        name="authors"
        value={formData.authors}
        onChange={handleChange}
        className="border p-2 mb-2 w-full"
        placeholder="Authors (comma-separated)"
      />
      <input
        type="text"
        name="journal"
        value={formData.journal}
        onChange={handleChange}
        className="border p-2 mb-2 w-full"
        placeholder="Journal"
      />
      <input
        type="text"
        name="year"
        value={formData.year}
        onChange={handleChange}
        className="border p-2 mb-2 w-full"
        placeholder="Year"
      />
      <input
        type="text"
        name="seMethod"
        value={formData.seMethod}
        onChange={handleChange}
        className="border p-2 mb-2 w-full"
        placeholder="SE Method"
      />
      <input
        type="text"
        name="claim"
        value={formData.claim}
        onChange={handleChange}
        className="border p-2 mb-2 w-full"
        placeholder="Claim"
      />
      <input
        type="text"
        name="evidence"
        value={formData.evidence}
        onChange={handleChange}
        className="border p-2 mb-2 w-full"
        placeholder="Evidence"
      />
      <button onClick={handleSubmit} className="bg-blue-600 text-white p-2 mt-2">
        Submit
      </button>
    </div>
  );
};

export default SubmitForm;
