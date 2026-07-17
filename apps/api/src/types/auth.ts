export type CreateUserDTO = {
  email: string;
  password_hash: string;
  first_name: string;
  last_name: string;
};

export type RegisterUserDTO = {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
};

export type LoginUserDTO = {
  email: string;
  password: string;
};
