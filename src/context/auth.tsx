import React, { createContext, useContext, useState, useEffect } from "react";
import { getToken } from "../service/auth";

interface State {
  token: string | null;
  setToken: (token: string | null) => void;
}

const AuthContext = createContext<State | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error(
      "The component using the the context must be a descendant of the context provider"
    );
  }

  return context;
};

export const AuthProvider: React.FunctionComponent = ({ children }) => {
  const [token, setToken] = useState<null | string>(null);

  useEffect(() => {
    const token = getToken();

    setToken(token);
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
