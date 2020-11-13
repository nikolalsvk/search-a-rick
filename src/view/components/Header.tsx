import React, { useState } from "react";

export const Header = () => {
  const [hide, setHide] = useState(true);

  return (
    <nav className="flex items-center justify-between flex-wrap bg-pink-700 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-xl tracking-tight">
          🎞 Rick and Morty search 🍿
        </span>
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
      </div>
    </nav>
  );
};