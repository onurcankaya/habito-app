import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import * as habitController from "../controllers/habitController";
import { authenticate } from "../middleware";

const habitsRouter = express.Router();

habitsRouter.get(
  "/",
  authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.id;
      const habits = await habitController.getAllHabits(userId);

      res.status(200).json(habits);
    } catch (error) {
      next(error);
    }
  },
);

habitsRouter.get(
  "/:id",
  authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.id;
      const habitId = req.params.id as string;
      const habit = await habitController.getHabit(userId, habitId);

      res.status(200).json(habit);
    } catch (error) {
      next(error);
    }
  },
);

habitsRouter.post(
  "/",
  authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.id;
      const data = req.body;
      const habit = await habitController.createHabit(userId, data);

      res.status(201).json(habit);
    } catch (error) {
      next(error);
    }
  },
);

habitsRouter.patch(
  "/:id",
  authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.id;
      const habitId = req.params.id as string;
      const data = req.body;

      await habitController.updateHabit(userId, habitId, data);

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },
);

habitsRouter.delete(
  "/:id",
  authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.id;
      const habitId = req.params.id as string;

      await habitController.deleteHabit(userId, habitId);

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },
);

export { habitsRouter };
