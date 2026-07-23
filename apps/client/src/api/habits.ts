import type { AxiosError } from "axios";
import { apiClient } from "@/api";
import { ApiError } from "@/utils/errors";
import type { HabitsResponse } from "@/types";

export const habitsApi = {
  /**
   * Fetch all habits
   */
  async fetchHabits(): Promise<HabitsResponse> {
    try {
      const response = await apiClient.get<HabitsResponse>("/habits");

      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      const errorData = axiosError.response?.data as { error?: string };

      throw new ApiError(
        errorData?.error || "Failed to fetch habits",
        axiosError.response?.status,
        axiosError.response?.data,
      );
    }
  },
};
