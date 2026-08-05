import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userApi } from "@/api";
import { QUERY_KEYS } from "@/constants";
import type { UpdateUserRequest } from "@/lib/schemas/user";

/**
 * Hook to fetch authenticated user
 */
export function useUser() {
  return useQuery({
    queryKey: [QUERY_KEYS.user],
    queryFn: () => userApi.fetchUser(),
  });
}

/**
 * Hook to update authenticated user
 */
export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateUserRequest) => userApi.updateUser(data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.user] }),
  });
}
