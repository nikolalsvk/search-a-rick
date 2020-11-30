import { USERS_API } from "../shared/api";

export const login = async (email: string, password: string) => {
  const response = await USERS_API.login(email, password);

  const accessToken = response.headers.get("Access-Token");

  if (accessToken) {
    setToken(accessToken);
  }

  const json = await response.json();

  return { ...json, token: accessToken };
};

const setToken = (accessToken: string) => {
  localStorage.setItem("token", accessToken);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const clearToken = () => {
  localStorage.removeItem("token");
};
