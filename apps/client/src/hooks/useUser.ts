import { useQuery } from "@tanstack/react-query";
import { userApi } from "@/api/user";

const QUERY_KEY = "user";

/**
 * Hook to fetch authenticated user
 */
export function useUser() {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: () => userApi.fetchUser(),
  });
}
