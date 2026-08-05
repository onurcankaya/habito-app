export type PublicUser = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
};

export type UpdateUserDTO = {
  email?: string;
  password?: string;
  first_name?: string;
  last_name?: string;
};

export type UpdateUserRepositoryDTO = {
  email?: string;
  password_hash?: string;
  first_name?: string;
  last_name?: string;
};
