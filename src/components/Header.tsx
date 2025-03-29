import { NavLink } from "react-router-dom";
import logo from "../assets/logo1.svg";

const Header = () => {
  return (
    <header className="w-full h-16 bg-white shadow-md px-6">
      <div className="h-full flex items-center justify-between gap-6">
        <img src={logo} alt="Replace" className="h-5" />
        <nav className="flex gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-black font-bold" : "text-gray-700"
            }
          >
            DASHBOARD
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
