import { useState } from "react";
import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";

const Appbar = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove JWT from localStorage
    window.location.href = "/"; // Redirect to home or login page
  };

  return (
    <div className="border-b flex justify-between px-10 py-4">
      {/* Left: Logo */}
      <div className="flex flex-col justify-center font-bold text-xl">
        <Link to={"/blogs"}>Medium</Link>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center space-x-4 relative">
        {/* New button */}
        <Link to={"/publish"}>
          <button
            type="button"
            className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 mr-8 mt-2"
          >
            New
          </button>
        </Link>

        {/* Avatar with dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownVisible(!dropdownVisible)}
            className="focus:outline-none"
          >
            <Avatar name="Geeten" size={10} />
          </button>

          {/* Dropdown menu */}
          {dropdownVisible && (
            <div
              className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
              onMouseLeave={() => setDropdownVisible(false)} // Close on hover out
            >
              <ul className="py-1">
                <li className="px-4 py-2 text-sm hover:bg-gray-100">
                  <Link to="/profile">Profile</Link>
                </li>
                <li
                  className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Appbar;
