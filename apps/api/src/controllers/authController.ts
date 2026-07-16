import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { RegisterUserDTO, LoginUserDTO } from "../types";
import { createUser, findUserByEmail } from "../repositories/userRepository";
import { requireEnv } from "../utils/env";

async function registerUser(data: RegisterUserDTO) {
  const password_hash = await bcrypt.hash(data.password, 10);

  await createUser({ ...data, password_hash });

  const user = await findUserByEmail(data.email);

  if (!user) {
    throw new Error("Failed to create user");
  }

  const JWT = jwt.sign({ sub: user.id }, requireEnv("JWT_SECRET"), {
    expiresIn: "7d",
  });

  return JWT;
}

async function loginUser(data: LoginUserDTO) {
  const user = await findUserByEmail(data.email);

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

  const JWT = jwt.sign({ sub: user.id }, requireEnv("JWT_SECRET"), {
    expiresIn: "7d",
  });

  return JWT;
}

export { registerUser, loginUser };
