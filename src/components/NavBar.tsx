// Importing necessary components
import { Navbar, NavbarBrand } from "@nextui-org/react";
import { MdApi } from "react-icons/md";

// Functional component for the Navbar
const NavBar = () => {
  // Rendering the Navbar
  return (
    <Navbar className="bg-slate-100 h-16">
      {/* Brand logo and text */}
      <NavbarBrand>
        <MdApi className="w-10 h-10 text-primary-background" />
        <p className="font-bold text-inherit">Air Quality Index API</p>
      </NavbarBrand>
    </Navbar>
  );
};

// Exporting the NavBar component
export default NavBar;
