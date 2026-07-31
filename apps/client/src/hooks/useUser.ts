import { useQuery } from "@tanstack/react-query";
import { userApi } from "@/api";
import { QUERY_KEYS } from "@/constants";

/**
 * Hook to fetch authenticated user
 */
export function useUser() {
  return useQuery({
    queryKey: [QUERY_KEYS.user],
    queryFn: () => userApi.fetchUser(),
  });
}
