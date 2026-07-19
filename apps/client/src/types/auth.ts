export type RegisterUserRequest = {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
};

export type LoginUserRequest = {
  email: string;
  password: string;
};

export type AuthResponse = {
  token: string;
};
