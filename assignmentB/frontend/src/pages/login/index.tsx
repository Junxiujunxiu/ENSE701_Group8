import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase'; // Adjust the path if necessary
import { useRouter } from 'next/router';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false); // Toggle between login and registration
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // Store success message after registration
  const router = useRouter();

  // Validate the email format
  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email); // Basic email validation (must contain @ and .)
  };

  // Handle login submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Invalid email format.');
      return;
    }
    if (password.length < 6) {
      setError('Password should be at least 6 characters.');
      return;
    }
    try {
      // Login with Firebase
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/admin'); // Redirect after login
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  // Handle registration submission
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    // Validate email and password
    if (!validateEmail(email)) {
      setError('Invalid email format.');
      return;
    }
    if (password.length < 6) {
      setError('Password should be at least 6 characters.');
      return;
    }

    try {
      // Register a new user with Firebase
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccessMessage('Registration successful! Please log in.');
      setEmail('');  // Clear email
      setPassword('');  // Clear password
      setIsRegistering(false);  // Switch back to login mode

      // Delay the redirect slightly so the user can see the message
      setTimeout(() => {
        router.push('/login'); // Redirect to login after registration
      }, 2000); // 2-second delay for user to see success message
    } catch (err) {
      setError('Registration failed. Please check your details.');
    }
  };

  return (
    <div className="login-container">
      <h2>{isRegistering ? 'Register' : 'Login'}</h2>
      {error && <p className="text-red-500">{error}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      <form onSubmit={isRegistering ? handleRegister : handleLogin} className="space-y-4">
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {isRegistering ? 'Register' : 'Log In'}
        </button>
      </form>
      <p className="mt-4">
        {isRegistering ? 'Already have an account?' : "Don't have an account?"}{' '}
        <button onClick={() => setIsRegistering(!isRegistering)} className="text-blue-500 underline">
          {isRegistering ? 'Log In' : 'Register'}
        </button>
      </p>
    </div>
  );
};

export default LoginPage;
