import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import * as activityController from "../controllers/activityController";
import { authenticate } from "../middleware";

const activitiesRouter = express.Router();

activitiesRouter.get(
  "/",
  authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.id;
      const activities = await activityController.getAllActivities(userId);

      res.status(200).json(activities);
    } catch (error) {
      next(error);
    }
  },
);

activitiesRouter.get(
  "/:id",
  authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.id;
      const activityId = req.params.id as string;
      const activity = await activityController.getActivity(userId, activityId);

      res.status(200).json(activity);
    } catch (error) {
      next(error);
    }
  },
);

activitiesRouter.post(
  "/",
  authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.id;
      const data = req.body;
      const activity = await activityController.createActivity(userId, data);

      res.status(201).json(activity);
    } catch (error) {
      next(error);
    }
  },
);

activitiesRouter.delete(
  "/:id",
  authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.id;
      const activityId = req.params.id as string;

      await activityController.deleteActivity(userId, activityId);

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },
);

export { activitiesRouter };
