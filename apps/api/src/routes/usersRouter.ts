import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import * as userController from "../controllers/userController";
import { authenticate, validate } from "../middleware";
import { updateUserSchema } from "../lib/schemas/user";
import { UpdateUserDTO } from "../types";

const usersRouter = express.Router();

usersRouter.get(
  "/me",
  authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.id;
      const user = await userController.getUser(userId);

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  },
);

usersRouter.patch(
  "/me",
  authenticate,
  validate(updateUserSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.id;
      const data = req.body as UpdateUserDTO;

      await userController.updateUser(userId, data);

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },
);

export { usersRouter };
