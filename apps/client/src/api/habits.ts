import type { AxiosError } from "axios";
import { apiClient } from "@/api";
import { ApiError } from "@/utils/errors";
import type {
  CreateHabitRequest,
  UpdateHabitRequest,
} from "@/lib/schemas/habit";
import type { FetchHabitsResponse, CreateHabitResponse } from "@/types";

export const habitsApi = {
  /**
   * Fetch all habits
   */
  async fetchHabits(): Promise<FetchHabitsResponse> {
    try {
      const response = await apiClient.get<FetchHabitsResponse>("/habits");

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

  /**
   * Create a new habit
   */
  async createHabit(data: CreateHabitRequest): Promise<CreateHabitResponse> {
    try {
      const response = await apiClient.post("/habits", data);

      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      const errorData = axiosError.response?.data as { error?: string };

      throw new ApiError(
        errorData?.error || "Failed to create habit",
        axiosError.response?.status,
        axiosError.response?.data,
      );
    }
  },

  /**
   * Update a habit
   */
  async updateHabit(habitId: string, data: UpdateHabitRequest): Promise<void> {
    try {
      await apiClient.patch(`/habits/${habitId}`, data);
    } catch (error) {
      const axiosError = error as AxiosError;
      const errorData = axiosError.response?.data as { error?: string };

      throw new ApiError(
        errorData?.error || "Failed to update habit",
        axiosError.response?.status,
        axiosError.response?.data,
      );
    }
  },

  /**
   * Delete a habit
   */
  async deleteHabit(habitId: string): Promise<void> {
    try {
      await apiClient.delete(`/habits/${habitId}`);
    } catch (error) {
      const axiosError = error as AxiosError;
      const errorData = axiosError.response?.data as { error?: string };

      throw new ApiError(
        errorData?.error || "Failed to delete habit",
        axiosError.response?.status,
        axiosError.response?.data,
      );
    }
  },
};
