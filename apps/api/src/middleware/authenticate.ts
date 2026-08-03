import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import { requireEnv } from "../utils/env";

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, requireEnv("JWT_SECRET"));

    req.user = { id: payload.sub as string };

    next();
  } catch {
    return res.status(401).json({ error: "Unauthorized" });
  }
}
