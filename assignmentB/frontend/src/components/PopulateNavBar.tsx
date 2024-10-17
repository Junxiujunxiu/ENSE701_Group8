import { IoMdArrowDropdown } from "react-icons/io";
import NavBar from "./nav/NavBar";
import NavDropdown from "./nav/NavDropdown";
import NavItem from "./nav/Navitem"; // Fix spelling: NavItem should have an uppercase "I"
import NotificationBadge from "../components/notification/NotificationBadge"; // Import the new notification component
import { useEffect, useState } from "react";
import axios from "axios";
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase'; // Make sure you adjust this path to your firebase setup
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/router';

const PopulatedNavBar = () => {
  const [pendingCount, setPendingCount] = useState<number | null>(null); // null while loading
  const [moderatedCount, setModeratedCount] = useState<number | null>(null);
  const [moderatedAndRejectedCount, setModeratedAndRejectedCount] = useState<number | null>(null);
  const [user] = useAuthState(auth); // Get the current authenticated user
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pendingResponse, moderatedResponse, rejectedResponse] = await Promise.all([
          axios.get('http://localhost:3001/api/moderation/pending-count'),
          axios.get('http://localhost:3001/api/analysis'),
          axios.get('http://localhost:3001/api/submitter/moderated-rejected-count')
        ]);

        setPendingCount(pendingResponse.data);
        setModeratedCount(moderatedResponse.data.length); // Assuming it's an array
        setModeratedAndRejectedCount(rejectedResponse.data);

      } catch (err) {
        console.error("Error fetching notification data", err);
      }
    };

    fetchData();

    // Poll every 5 seconds to reduce the load
    const intervalId = setInterval(fetchData, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const handleLogout = async () => {
    await signOut(auth); // Sign out the user
    router.push('/login'); // Redirect to the login page after logout
  };

  return (
    <NavBar>
      <NavItem>SPEED</NavItem>

      <NavItem route="/" end>
        Home
      </NavItem>

      <NavItem dropdown route="/articles">
        Articles <IoMdArrowDropdown />
        <NavDropdown>
          <NavItem route="/articles">View Articles</NavItem>
          <NavItem route="/articles/new">Submit New</NavItem>
        </NavDropdown>
      </NavItem>

      {/* Conditional rendering for Admin-related links if user is authenticated */}
      {user ? (
        <>
          <NavItem dropdown route="/admin">
            Admin <IoMdArrowDropdown />
            <NavDropdown>
              <NavItem route="/moderation">
                Moderation
                {pendingCount !== null ? (
                  <NotificationBadge count={pendingCount} />
                ) : (
                  <span>Loading...</span>
                )}
              </NavItem>
              <NavItem route="/analysis">
                Analysis
                {moderatedCount !== null ? (
                  <NotificationBadge count={moderatedCount} />
                ) : (
                  <span>Loading...</span>
                )}
              </NavItem>
              <NavItem route="/submitter">
                Submitter Dashboard
                {moderatedAndRejectedCount !== null ? (
                  <NotificationBadge count={moderatedAndRejectedCount} />
                ) : (
                  <span>Loading...</span>
                )}
              </NavItem>
              <NavItem route="/admin">Admin Dashboard</NavItem>
              <NavItem route="/search">Search</NavItem>
            </NavDropdown>
          </NavItem>
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
            Logout
          </button>
        </>
      ) : (
        <NavItem route="/login">Login</NavItem>
      )}
    </NavBar>
  );
};

export default PopulatedNavBar;
