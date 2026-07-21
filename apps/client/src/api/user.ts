import type { AxiosError } from "axios";
import { apiClient } from "@/api/client";
import { ApiError } from "@/utils/errors";
import type { UserResponse } from "@/types/user";

export const userApi = {
  /**
   * Fetch authenticated user
   */
  async fetchUser(): Promise<UserResponse> {
    try {
      const response = await apiClient.get<UserResponse>("/users/me");

      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      const errorData = axiosError.response?.data as { error?: string };

      throw new ApiError(
        errorData?.error || "Failed to fetch user",
        axiosError.response?.status,
        axiosError.response?.data,
      );
    }
  },
};
