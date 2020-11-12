import React, { useEffect, useState } from "react";
import { Character } from "../../model/Character";
import { API } from "../../shared/api";
import { Search } from "../components/Search";
import { CharacterCard } from "./CharacterCard";

interface CharacterResponse {
  results: Character[];
}

export const CharacterPage = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchCharacters = async () => {
      const result = await API.get<CharacterResponse>(
        `/character?name=${name}`
      );

      setCharacters(result.results);
    };

    fetchCharacters();
  }, [name]);

  console.log(characters);

  return (
    <>
      <div className="px-40">
        <Search setName={setName} />
        <div className="grid gap-4 grid-cols-3 pb-20">
          {characters.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
      </div>
    </>
  );
};
