import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa6";
import "./DropdownMenu.css";

const DropdownMenuInfo = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Hàm xử lý hover vào
  const handleMouseEnter = () => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    const timeout = setTimeout(() => {
      setIsHovered(true);
    }, 200);
    setHoverTimeout(timeout);
  };

  // Hàm xử lý hover ra
  const handleMouseLeave = () => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    const timeout = setTimeout(() => {
      setIsHovered(false);
    }, 200);
    setHoverTimeout(timeout);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    const handleStorageChange = () => {
      const updatedToken = localStorage.getItem("token");
      setIsLoggedIn(!!updatedToken);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");

    setIsLoggedIn(false);

    navigate("/loginSignUp");
    window.location.reload();
  };

  return (
    <div
      className="relative inline-block text-left"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link to="/user-profile">
        <FaRegUser size={22} />
      </Link>

      {/* Menu Dropdown */}
      {isHovered && (
        <div className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 bg-white rounded-lg shadow-lg z-10 overflow-hidden w-40 text-lg opacity-100 transition-opacity duration-300">
          <div className="py-3 px-2 flex flex-col items-center gap-4">
            <div className="font-semibold py-1 text-sm text-gray-700 hover:bg-blue-100 hover:text-green-600 rounded-md w-full text-center">
              <Link
                to="/user-profile"
                className="custom-border block py-1.5 pl-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-green-600 rounded-md transition duration-200 text-center"
              >
                Thông tin
              </Link>
            </div>

            <div className="font-semibold py-1 text-sm text-gray-700 hover:bg-blue-100 hover:text-green-600 rounded-md w-full text-center">
              <Link className="custom-border block py-1.5 pl-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-green-600 rounded-md transition duration-200">
                <button onClick={handleLogout} className="w-full">
                  Đăng xuất
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenuInfo;
