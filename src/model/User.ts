export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface UserResponse {
  success: boolean;
}

export interface UserPayload {
  user: User;
}

export interface LoginResponse {
  success: boolean;
  token: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}
