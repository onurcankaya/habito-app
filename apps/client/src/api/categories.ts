import type { AxiosError } from "axios";
import { apiClient } from "@/api";
import { ApiError } from "@/utils/errors";
import type { CreateCategoryRequest } from "@/lib/schemas/category";
import type { FetchCategoriesResponse, CreateCategoryResponse } from "@/types";

export const categoriesApi = {
  /**
   * Fetch all categories
   */
  async fetchCategories(): Promise<FetchCategoriesResponse> {
    try {
      const response =
        await apiClient.get<FetchCategoriesResponse>("/categories");

      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      const errorData = axiosError.response?.data as { error?: string };

      throw new ApiError(
        errorData?.error || "Failed to fetch categories",
        axiosError.response?.status,
        axiosError.response?.data,
      );
    }
  },

  /**
   * Create a new category
   */
  async createCategory(
    data: CreateCategoryRequest,
  ): Promise<CreateCategoryResponse> {
    try {
      const response = await apiClient.post("/categories", data);

      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      const errorData = axiosError.response?.data as { error?: string };

      throw new ApiError(
        errorData?.error || "Failed to create category",
        axiosError.response?.status,
        axiosError.response?.data,
      );
    }
  },

  /**
   * Delete a category
   */
  async deleteCategory(categoryId: string): Promise<void> {
    try {
      await apiClient.delete(`/categories/${categoryId}`);
    } catch (error) {
      const axiosError = error as AxiosError;
      const errorData = axiosError.response?.data as { error?: string };

      throw new ApiError(
        errorData?.error || "Failed to delete category",
        axiosError.response?.status,
        axiosError.response?.data,
      );
    }
  },
};
