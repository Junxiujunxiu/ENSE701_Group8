// src/components/PrivateRoute.js
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase'; // Import your Firebase auth
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const PrivateRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login'); // Redirect to login if not authenticated
    }
  }, [user, loading, router]);

  if (loading) return <div>Loading...</div>; // Show loading spinner or message

  return user ? children : null;
};

export default PrivateRoute;
