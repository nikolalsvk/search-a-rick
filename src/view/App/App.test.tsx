import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Rick and Morty title", () => {
  render(<App />);
  const titleElement = screen.getByText(/rick and morty search/i);
  expect(titleElement).toBeInTheDocument();
});
