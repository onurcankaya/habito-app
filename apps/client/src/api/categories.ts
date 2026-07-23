import type { AxiosError } from "axios";
import { apiClient } from "@/api";
import { ApiError } from "@/utils/errors";
import type { CategoriesResponse } from "@/types";

export const categoriesApi = {
  /**
   * Fetch all categories
   */
  async fetchCategories(): Promise<CategoriesResponse> {
    try {
      const response = await apiClient.get<CategoriesResponse>("/categories");

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
};
