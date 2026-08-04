import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import * as userController from "../controllers/userController";
import { authenticate } from "../middleware";

const usersRouter = express.Router();

usersRouter.get(
  "/",
  authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await userController.getAllUsers();

      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  },
);

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
  "/:id",
  authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.id;

      if (userId !== req.params.id) throw new Error("Not authorized");

      const data = req.body;

      await userController.updateUser(userId, data);

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },
);

export { usersRouter };
