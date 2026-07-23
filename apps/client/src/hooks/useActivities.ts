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
 * Hook to create new activity
 */
export function useCreateActivity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      data: CreateActivityRequest,
    ): Promise<CreateActivityResponse> => activitiesApi.createActivity(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
}
