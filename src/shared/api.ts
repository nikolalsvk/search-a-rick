import { CharacterApiResponse } from "../model/Character";
import { User, UserPayload, UserResponse } from "../model/User";
import { RICK_AND_MORTY_ROOT_URL, USERS_ROOT_URL } from "./constants";

export const RICK_AND_MORTY_API = {
  async getCharacters(searchTerm: string): Promise<CharacterApiResponse> {
    return BASIC_API.get<CharacterApiResponse>(
      RICK_AND_MORTY_ROOT_URL,
      `/character?name=${searchTerm}`
    );
  },
};

export const USERS_API = {
  async signUp(data: User) {
    return BASIC_API.post<UserResponse, UserPayload>(
      USERS_ROOT_URL,
      "/users/sign_up",
      {
        user: data,
      }
    );
  },
  async login(email: string, password: string) {
    return await fetch(USERS_ROOT_URL + "/users/sign_in", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
  },
};

const BASIC_API = {
  async get<T>(rootUrl: string, path: string): Promise<T> {
    const response = await fetch(rootUrl + path);

    const json = await response.json();

    return json;
  },
  async post<Response, Payload>(
    rootUrl: string,
    path: string,
    data: Payload
  ): Promise<Response> {
    const response = await fetch(rootUrl + path, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const json = await response.json();

    return json;
  },
};
