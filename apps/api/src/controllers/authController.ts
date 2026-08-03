import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import type { RegisterUserDTO, LoginUserDTO } from "../types";
import * as userRepository from "../repositories/userRepository";
import { requireEnv } from "../utils/env";

async function registerUser(data: RegisterUserDTO) {
  const userId = uuidv4();
  const password_hash = await bcrypt.hash(data.password, 10);

  await userRepository.createUser(userId, { ...data, password_hash });

  const user = await userRepository.findUserByEmail(data.email);

  if (!user) {
    throw new Error("Failed to create user");
  }

  const token = jwt.sign({ sub: user.id }, requireEnv("JWT_SECRET"), {
    expiresIn: "7d",
  });

  return token;
}

async function loginUser(data: LoginUserDTO) {
  const user = await userRepository.findUserByEmail(data.email);

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const password_matched = await bcrypt.compare(
    data.password,
    user.password_hash,
  );

  if (!password_matched) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign({ sub: user.id }, requireEnv("JWT_SECRET"), {
    expiresIn: "7d",
  });

  return token;
}

export { registerUser, loginUser };
