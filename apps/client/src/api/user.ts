import type { AxiosError } from "axios";
import { apiClient } from "@/api";
import { ApiError } from "@/utils/errors";
import type { UserResponse } from "@/types";
import type { UpdateUserRequest } from "@/lib/schemas/user";

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

  /**
   * Update authenticated user
   */
  async updateUser(data: UpdateUserRequest): Promise<void> {
    try {
      await apiClient.patch<UserResponse>("/users/me", data);
    } catch (error) {
      const axiosError = error as AxiosError;
      const errorData = axiosError.response?.data as { error?: string };

      throw new ApiError(
        errorData?.error || "Failed to update user",
        axiosError.response?.status,
        axiosError.response?.data,
      );
    }
  },
};
