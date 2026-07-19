import type { AxiosError } from "axios";
import { apiClient } from "./client";
import { ApiError } from "../utils/errors";
import type {
  RegisterUserRequest,
  LoginUserRequest,
  AuthResponse,
} from "../types/auth";

export const authApi = {
  /**
   * Register new user
   */
  async registerUser(data: RegisterUserRequest): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>(
        "/auth/register",
        data,
      );

      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      const errorData = axiosError.response?.data as { error?: string };

      throw new ApiError(
        errorData?.error || "Failed to create user",
        axiosError.response?.status,
        axiosError.response?.data,
      );
    }
  },

  /**
   * Login user
   */
  async loginUser(data: LoginUserRequest): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>("/auth/login", data);

      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      const errorData = axiosError.response?.data as { error?: string };

      throw new ApiError(
        errorData?.error || "Failed to log in user",
        axiosError.response?.status,
        axiosError.response?.data,
      );
    }
  },
};
