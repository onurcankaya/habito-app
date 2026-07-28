import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { habitsApi } from "@/api";
import type { CreateHabitRequest } from "@/lib/schemas/habit";

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

/**
 * Hook to create a new habit
 */
export function useCreateHabit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateHabitRequest) => habitsApi.createHabit(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
}

/**
 * Hook to delete a habit
 */
export function useDeleteHabit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (habitId: string) => habitsApi.deleteHabit(habitId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
}
