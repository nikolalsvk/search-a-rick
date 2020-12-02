import React, { createContext, useContext, useState, useEffect } from "react";
import { FAVORITES_API } from "../shared/api";

interface State {
  favorites: string[];
  setFavorites: (favorites: string[]) => void;
  getFavorites: () => void;
}

const FavoritesContext = createContext<State | undefined>(undefined);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);

  if (context === undefined) {
    throw new Error(
      "The component using the the context must be a descendant of the context provider"
    );
  }

  return context;
};

export const FavoritesProvider: React.FunctionComponent = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  const getFavorites = async () => {
    const result = await FAVORITES_API.getFavorites();

    setFavorites(result);
  };

  useEffect(() => {
    getFavorites();
  }, []);

  return (
    <FavoritesContext.Provider
      value={{ favorites, setFavorites, getFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
