import { useQuery } from "@tanstack/react-query";
import { categoriesApi } from "@/api";

const QUERY_KEY = "categories";

/**
 * Hook to fetch all categories
 */
export function useCategories() {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: () => categoriesApi.fetchCategories(),
  });
}
