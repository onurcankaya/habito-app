import * as userRepository from "../repositories/userRepository";
import { UpdateUserDTO } from "../types";
import { NotFoundError } from "../utils/errors";

async function getUser(userId: string) {
  const user = await userRepository.findUserById(userId);

  if (!user) throw new NotFoundError("User not found");

  return user;
}

async function getAllUsers() {
  const users = await userRepository.getAllUsers();

  return users;
}

async function updateUser(userId: string, data: UpdateUserDTO) {
  await userRepository.updateUser(userId, data);
}

export { getAllUsers, getUser, updateUser };

async function updateUserEmail(userId: string, newEmail: string) {
  const user = await db.users.findOne({ id: userId });

  if (!user) throw new Error(`User with ${userId} not found`);

  const isEmailValid = validateEmail(newEmail);

  if (!isEmailValid) throw new Error("Invalid email");

  const isExistingEmail = db.users.findOne({ email: newEmail });

  const newUser = {
    ...user,
    email: newEmail,
  };

  const updatedUser = await db.users.save(newUser);

  return { success: true, useId: updatedUser.id };
}
