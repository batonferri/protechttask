import React from "react";
import { Link, useLocation } from "react-router-dom";

const NavBarLinks = ({ links }) => {
  const location = useLocation();
  return (
    <ul className="flex flex-row space-x-8 mt-0 text-sm font-medium border-0 bg-white dark:bg-gray-800 dark:bg-gray-900 dark:border-gray-700">
      {links.map((link, i) => (
        <li key={i}>
          <Link
            to={link.path}
            className={`sm:pl-3 sm:pr-4 text-center bg-transparent ${
              location.pathname === link.path ? "text-blue-500" : "text-white"
            } p-0`}
          >
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavBarLinks;
