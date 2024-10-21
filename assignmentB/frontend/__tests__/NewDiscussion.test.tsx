// NewDiscussion.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import NewDiscussion from './new';


jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('NewDiscussion Component', () => {
  test('shows alert when form is successfully submitted', async () => {
    window.alert = jest.fn(); // Mock the alert function
    mockedAxios.post.mockResolvedValue({}); // Mock axios.post

    render(<NewDiscussion />);

    // Fill out form inputs
    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'Test Title' } });
    fireEvent.change(screen.getByLabelText(/authors/i), { target: { value: 'Author1, Author2' } });
    fireEvent.change(screen.getByLabelText(/source/i), { target: { value: 'Test Source' } });
    fireEvent.change(screen.getByLabelText(/publication year/i), { target: { value: '2023' } });
    fireEvent.change(screen.getByLabelText(/doi/i), { target: { value: '10.1234/test' } });
    fireEvent.change(screen.getByLabelText(/claim/i), { target: { value: 'Test Claim' } });
    fireEvent.change(screen.getByLabelText(/evidence/i), { target: { value: 'Test Evidence' } });

    // Submit the form
    fireEvent.click(screen.getByText(/submit/i));

    // Wait for the axios post request and check alert
    await waitFor(() => expect(window.alert).toHaveBeenCalledWith('Submitted successfully.'));
  });
});
