import React from "react";

interface Props {
  setName: (name: string) => void;
}

export const Search = (props: Props) => {
  const { setName } = props;

  return (
    <div className="py-6 flex-1 mt-2">
      <form className="w-full">
        <div className="flex items-center border-b border-teal-500 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Search for Rick and Morty character"
            aria-label="Rick and Morty characters"
            onChange={(event) => setName(event.target.value)}
          />
        </div>
      </form>
    </div>
  );
};
