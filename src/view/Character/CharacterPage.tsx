import React, { useEffect, useState } from "react";
import { Character } from "../../model/Character";
import { RICK_AND_MORTY_API } from "../../shared/api";
import { Search } from "../components/Search";
import { CharacterCard } from "./CharacterCard";

export const CharacterPage = () => {
  const [requestStatus, setRequestStatus] = useState("loading");
  const [characters, setCharacters] = useState<Character[]>([]);
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchCharacters = async () => {
      setRequestStatus("loading");

      const result = await RICK_AND_MORTY_API.getCharacters(name);

      setRequestStatus("loaded");

      if (result.error) {
        setCharacters([]);
        return;
      }

      setCharacters(result.results);
    };

    fetchCharacters();
  }, [name]);

  return (
    <div className="px-2 sm:px-2 md:px-4 lg:px-10 xl:px-40">
      <Search setName={setName} />
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pb-20 place-items-center">
        {requestStatus === "loading" && "Loading characters..."}
        {characters.length === 0 && `No character with the name: ${name}`}
        {characters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
    </div>
  );
};
