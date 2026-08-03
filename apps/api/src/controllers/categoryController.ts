import { v4 as uuidv4 } from "uuid";
import * as categoryRepository from "../repositories/categoryRepository";
import type { CreateCategoryDTO, UpdateCategoryDTO } from "../types";
import { NotFoundError } from "../utils/errors";

async function getCategories() {
  const categories = await categoryRepository.getCategories();

  return categories;
}

async function getCategory(categoryId: string) {
  const category = await categoryRepository.getCategory(categoryId);

  if (!category) throw new NotFoundError("Category not found");

  return category;
}

async function createCategory(data: CreateCategoryDTO) {
  const categoryId = uuidv4();

  await categoryRepository.createCategory(categoryId, data);

  const category = await categoryRepository.getCategory(categoryId);

  if (!category) throw new NotFoundError("Category not found");

  return category;
}

async function updateCategory(categoryId: string, data: UpdateCategoryDTO) {
  await categoryRepository.updateCategory(categoryId, data);
}

async function deleteCategory(categoryId: string) {
  await categoryRepository.deleteCategory(categoryId);
}

export {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
