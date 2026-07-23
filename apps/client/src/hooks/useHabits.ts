import { useQuery } from "@tanstack/react-query";
import { habitsApi } from "@/api";

const QUERY_KEY = "habits";

/**
 * Hook to fetch all habits
 */
export function useHabits() {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: () => habitsApi.fetchHabits(),
  });
}
