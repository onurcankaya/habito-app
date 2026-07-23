import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "@/api";
import { saveToken } from "@/utils/token";
import type { RegisterUserRequest, LoginUserRequest } from "@/lib/schemas/auth";
import type { AuthResponse } from "@/types";

const QUERY_KEY = "auth";

/**
 * Hook to register a new user
 */
export function useRegisterUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RegisterUserRequest): Promise<AuthResponse> =>
      authApi.registerUser(data),
    onSuccess: (data: AuthResponse) => {
      saveToken(data.token);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
}

/**
 * Hook to login user
 */
export function useLoginUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginUserRequest): Promise<AuthResponse> =>
      authApi.loginUser(data),
    onSuccess: (data: AuthResponse) => {
      saveToken(data.token);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
}
