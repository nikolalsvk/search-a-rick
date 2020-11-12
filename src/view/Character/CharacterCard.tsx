import React from "react";
import { Character } from "../../model/Character";

interface Props {
  character: Character;
}
export const CharacterCard = (props: Props) => {
  const { name, image, gender, species, origin, status } = props.character;

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

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img className="w-full" src={image} alt="Sunset in the mountains" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{name}</div>
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
        <p className="text-gray-700 text-base">
          Last known location: {origin.name}
        </p>
      </div>
    </div>
  );
};
