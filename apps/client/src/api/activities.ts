import type { AxiosError } from "axios";
import { apiClient } from "@/api";
import { ApiError } from "@/utils/errors";
import type {
  Activity,
  FetchActivitiesResponse,
  CreateActivityRequest,
  CreateActivityResponse,
} from "@/types";

export const activitiesApi = {
  /**
   * Fetch all activities
   */
  async fetchActivities(): Promise<FetchActivitiesResponse> {
    try {
      const response =
        await apiClient.get<FetchActivitiesResponse>("/activities");

      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      const errorData = axiosError.response?.data as { error?: string };

      throw new ApiError(
        errorData?.error || "Failed to fetch activities",
        axiosError.response?.status,
        axiosError.response?.data,
      );
    }
  },

  /**
   * Create new activity
   */
  async createActivity(
    data: CreateActivityRequest,
  ): Promise<CreateActivityResponse> {
    try {
      const response = await apiClient.post<CreateActivityResponse>(
        "/activities",
        data,
      );

      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      const errorData = axiosError.response?.data as { error?: string };
      throw new ApiError(
        errorData?.error || "Failed to create activity",
        axiosError.response?.status,
        axiosError.response?.data,
      );
    }
  },
};
