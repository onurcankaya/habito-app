import express, { Request, Response } from "express";
import { registerUser, loginUser } from "../controllers/authController";

const authRouter = express.Router();

authRouter.post("/register", async (req: Request, res: Response) => {
  try {
    const JWT = await registerUser({
      email: req.body.email,
      password: req.body.password,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
    });
    res.status(201).json({ token: JWT });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

authRouter.post("/login", async (req: Request, res: Response) => {
  try {
    const JWT = await loginUser({
      email: req.body.email,
      password: req.body.password,
    });

    res.status(200).json({ token: JWT });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

export { authRouter };
