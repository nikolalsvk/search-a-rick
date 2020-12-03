import React from "react";
import { Character } from "../../model/Character";
import { FAVORITES_API } from "../../shared/api";
import { useFavorites } from "../../context/favorites";

interface Props {
  character: Character;
}
export const CharacterCard = (props: Props) => {
  const { id, name, image, gender, species, origin, status } = props.character;
  const { favorites, setFavorites } = useFavorites();

  const statusColor = (status: Character["status"]) => {
    switch (status) {
      case "Alive":
        return "green";
      case "Dead":
        return "red";
      case "unknown":
        return "gray";
      default:
        return "green";
    }
  };

  const handleFavorite = async (id: string) => {
    const result = await FAVORITES_API.favorite(id);

    setFavorites(result.favorites);
  };

  const isFavorite = (id: string) => {
    return (
      favorites.length > 0 && favorites.find((favorite) => favorite === id)
    );
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img className="max-w-sm" src={image} alt="Sunset in the mountains" />
      <div className="w-64 px-6 py-4">
        <div>
          <div className="font-bold text-xl mb-2">{name}</div>
          <button onClick={() => handleFavorite(id.toString())}>
            {isFavorite(id.toString()) ? "❌" : "🌟"}
          </button>
        </div>
        <p className="text-gray-700 text-base">
          <span className="flex items-center">
            <span
              className={`rounded-full bg-${statusColor(
                status
              )}-400 h-4 w-4 mr-1 flex`}
            ></span>
            {status} - {species}
          </span>
        </p>
        <p className="text-gray-700 text-base">Gender: {gender}</p>
        <p className="break-words text-gray-700 text-base">
          Last known location: {origin.name}
        </p>
      </div>
    </div>
  );
};
