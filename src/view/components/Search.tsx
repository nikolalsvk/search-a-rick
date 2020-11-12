import React from "react";

interface Props {
  setName: (name: string) => void;
}

export const Search = (props: Props) => {
  const { setName } = props;

  return (
    <div className="py-3 lg:py-4 flex-1 lg:mt-2 sm:mt-1">
      <form className="w-full">
        <div className="flex items-center border-b border-teal-500 py-2">
          <label
            className="block text-gray-700 text-sm font-bold "
            htmlFor="term"
          >
            Character name
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
            aria-label="Rick and Morty characters"
            id="term"
            placeholder="Search for a Rick and Morty character"
            onChange={(event) => setName(event.target.value)}
            autoFocus
          />
        </div>
      </form>
    </div>
  );
};
