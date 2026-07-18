import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import * as userController from "../controllers/userController";
import { authenticate } from "../middleware";

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

export { usersRouter };
