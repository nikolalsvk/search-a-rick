import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { clearToken } from "../../service/auth";

export const Header = () => {
  const { token, setToken } = useAuth();
  const [hide, setHide] = useState(true);

  const logout = () => {
    clearToken();
    setToken(null);
  };

  return (
    <nav className="flex items-center justify-between flex-wrap bg-pink-700 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Link to="/">
          <span className="font-semibold text-xl tracking-tight">
            🎞 Rick and Morty search 🍿
          </span>
        </Link>
      </div>
      <div className="block lg:hidden">
        <button
          onClick={() => setHide(!hide)}
          className="flex items-center px-3 py-2 border rounded text-white border-white hover:text-white hover:border-white"
        >
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div
        className={`w-full ${
          hide ? "hidden" : "block"
        } flex-grow lg:flex lg:items-center lg:w-auto`}
      >
        <div className="text-sm lg:flex-grow">
          <a
            href="https://rickandmortyapi.com/documentation"
            className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-blue-200 mr-4"
          >
            API Docs
          </a>
        </div>
        {token ? <LoggedInLinks logout={logout} /> : <LoggedOutLinks />}
      </div>
    </nav>
  );
};

const LoggedOutLinks = () => (
  <>
    <div className="text-sm">
      <Link
        to="/login"
        className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-blue-200 mr-4"
      >
        Log In
      </Link>
    </div>
    <div className="text-sm">
      <Link
        to="/sign_up"
        className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-blue-200 mr-4"
      >
        Sign Up
      </Link>
    </div>
  </>
);

interface LoggedInLinksProps {
  logout: () => void;
}

const LoggedInLinks = (props: LoggedInLinksProps) => (
  <>
    <div className="text-sm">
      <button
        onClick={props.logout}
        className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-blue-200 mr-4"
      >
        Sign Out
      </button>
    </div>
    <div className="text-sm">
      <Link
        to="/favorites"
        className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-blue-200 mr-4"
      >
        Favorites
      </Link>
    </div>
  </>
);
