import { IoMdArrowDropdown } from "react-icons/io";
import NavBar from "./nav/NavBar";
import NavDropdown from "./nav/NavDropdown";
import NavItem from "./nav/Navitem"; // Fix spelling: NavItem should have an uppercase "I"

const PopulatedNavBar = () => {
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
          <NavItem route="/moderation">Moderation</NavItem>
          <NavItem route="/analysis">Analysis</NavItem>
          <NavItem route="/admin">Admin Dashboard</NavItem>
          <NavItem route="/search">Search</NavItem>
        </NavDropdown>
      </NavItem>
    </NavBar>
  );
};

export default PopulatedNavBar;
