import { API_ROOT_URL } from "./constants";

export const API = {
  async get<T>(path: string): Promise<T> {
    const response = await fetch(API_ROOT_URL + path);

    const json = await response.json();

    return json;
  },
};
