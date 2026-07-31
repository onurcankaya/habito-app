import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { habitsApi } from "@/api";
import { QUERY_KEYS } from "@/constants";
import type {
  CreateHabitRequest,
  UpdateHabitRequest,
} from "@/lib/schemas/habit";

/**
 * Hook to fetch all habits
 */
export function useHabits() {
  return useQuery({
    queryKey: [QUERY_KEYS.habits],
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
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.habits] });
    },
  });
}

/**
 * Hook to update a habit
 */

export function useUpdateHabit(habitId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateHabitRequest) =>
      habitsApi.updateHabit(habitId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.habits] });
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
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.habits] });
    },
  });
}
