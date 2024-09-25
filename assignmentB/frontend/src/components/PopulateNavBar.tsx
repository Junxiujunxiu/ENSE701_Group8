import { IoMdArrowDropdown } from "react-icons/io";
import NavBar from "./nav/NavBar";
import NavDropdown from "./nav/NavDropdown";
import NavItem from "./nav/Navitem"; // Fix spelling: NavItem should have an uppercase "I"
import NotificationBadge from "../components/notification/NotificationBadge"; // Import the new notification component
import { useEffect, useState } from "react";
import axios from "axios";

const PopulatedNavBar = () => {
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    // Fetch the number of pending moderation articles
    const fetchPendingCount = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/moderation/pending-count');
        setPendingCount(response.data.pendingCount); // Adjust based on the API response
      } catch (err) {
        console.error("Error fetching pending moderation count", err);
      }
    };

    fetchPendingCount();
  }, []);

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

      {/* New dropdown for admin/moderation related pages */}
      <NavItem dropdown route="/admin">
        Admin <IoMdArrowDropdown />
        <NavDropdown>
          <NavItem route="/moderation">
            Moderation
            {/* Notification badge displayed after the text */}
            {pendingCount > 0 && <NotificationBadge count={pendingCount} />}
            </NavItem>
          <NavItem route="/analysis">Analysis</NavItem>
          <NavItem route="/admin">Admin Dashboard</NavItem>
          <NavItem route="/search">Search</NavItem>
        </NavDropdown>
      </NavItem>
    </NavBar>
  );
};

export default PopulatedNavBar;
