import * as userRepository from "../repositories/userRepository";
import { NotFoundError } from "../utils/errors";

async function getUser(userId: string) {
  const user = await userRepository.findUserById(userId);

  if (!user) throw new NotFoundError("User not found");

  return user;
}

export { getUser };
