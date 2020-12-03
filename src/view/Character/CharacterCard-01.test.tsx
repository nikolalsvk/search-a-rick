import React from "react";
import ReactDOM from "react-dom";
import { CharacterCard } from "./CharacterCard";
import { render, screen } from "@testing-library/react";

test("it renders properly", () => {
  const div = document.createElement("div");

  const character = { image: "/random_url", origin: { name: "Earth" } };

  ReactDOM.render(<CharacterCard character={character} />, div);

  const imageElement = div.querySelector("img");

  expect(imageElement?.src).toMatch("/random_url");
});

test("it renders properly with react-testing-library", () => {
  const character = {
    image: "/random_url",
    status: "Alive",
    origin: { name: "Earth" },
  };

  render(<CharacterCard character={character} />);

  const imageElement = screen.getByAltText("Sunset in the mountains");

  expect(imageElement?.src).toMatch("/random_url");
});
