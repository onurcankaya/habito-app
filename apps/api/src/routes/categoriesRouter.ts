import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import * as categoryController from "../controllers/categoryController";
import { authenticate } from "../middleware";

const categoriesRouter = express.Router();

categoriesRouter.get(
  "/",
  authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categories = await categoryController.getCategories();

      res.status(200).json(categories);
    } catch (error) {
      next(error);
    }
  },
);

categoriesRouter.get(
  "/:id",
  authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categoryId = req.params.id as string;
      const category = await categoryController.getCategory(categoryId);

      res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  },
);

categoriesRouter.post(
  "/",
  authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const category = await categoryController.createCategory(data);

      res.status(201).json(category);
    } catch (error) {
      next(error);
    }
  },
);

categoriesRouter.patch(
  "/:id",
  authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categoryId = req.params.id as string;
      const data = req.body;

      await categoryController.updateCategory(categoryId, data);

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },
);

categoriesRouter.delete(
  "/:id",
  authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categoryId = req.params.id as string;

      await categoryController.deleteCategory(categoryId);

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },
);

export { categoriesRouter };
