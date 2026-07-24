import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { activitiesApi } from "@/api";
import type { CreateActivityRequest, CreateActivityResponse } from "@/types";

const QUERY_KEY = "activities";

/**
 * Hook to fetch all activities
 */
export function useActivities() {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: () => activitiesApi.fetchActivities(),
  });
}

/**
 * Hook to fetch an activity by id
 */
export function useActivity(activityId: string) {
  return useQuery({
    queryKey: [QUERY_KEY, activityId],
    queryFn: () => activitiesApi.fetchActivity(activityId),
  });
}

/**
 * Hook to create an activity
 */
export function useCreateActivity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      data: CreateActivityRequest,
    ): Promise<CreateActivityResponse> => activitiesApi.createActivity(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  });
}

/**
 * Hook to delete an activity
 */
export function useDeleteActivity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (activityId: string) =>
      activitiesApi.deleteActivity(activityId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
}
