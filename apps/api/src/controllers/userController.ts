import bcrypt from "bcrypt";
import * as userRepository from "../repositories/userRepository";
import { UpdateUserDTO, UpdateUserRepositoryDTO } from "../types";
import { NotFoundError } from "../utils/errors";

async function getUser(userId: string) {
  const user = await userRepository.findUserById(userId);

  if (!user) throw new NotFoundError("User not found");

  return user;
}

async function updateUser(userId: string, data: UpdateUserDTO) {
  const { password, ...rest } = data;

  const updateData: UpdateUserRepositoryDTO = { ...rest };

  if (password !== undefined) {
    updateData.password_hash = await bcrypt.hash(password, 10);
  }

  await userRepository.updateUser(userId, updateData);
}

export { getUser, updateUser };
