import { Link } from "react-router-dom";
import { useState } from "react";
import { Avatar } from "./BlogCard";
import { usePost } from "../hooks";

export function AppBar({ here = 1 }: { here: number }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="border-b flex justify-between px-10 py-4 bg-white shadow-md">
      <Link
        to="/blogs"
        className="text-2xl font-serif font-semibold cursor-pointer text-gray-800 hover:text-gray-600"
      >
        Medium
      </Link>

      <div className="flex items-center gap-4">
        <Link to="/publish">
          <button
            type="button"
            className={`${
              here === 0 ? "block" : "hidden"
            } text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center`}
          >
            {here === 0 ? "New Post" : ""}
          </button>
        </Link>
      </div>

      <div className="relative">
        <div onClick={toggleDropdown} className="cursor-pointer">
          <Avatar size="big" name="Harkirat" />
        </div>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 rounded-lg bg-white shadow-lg border border-gray-200 z-10">
            <ul className="py-1 text-sm text-gray-700">
              <li>
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={() => alert("Logged out!")}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
