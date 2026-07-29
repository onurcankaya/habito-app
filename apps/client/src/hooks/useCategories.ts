import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { categoriesApi } from "@/api";
import type {
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from "@/lib/schemas/category";

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

/**
 * Hook to create a new category
 */
export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCategoryRequest) =>
      categoriesApi.createCategory(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  });
}

/**
 * Hook to update a category
 */
export function useUpdateCategory(categoryId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateCategoryRequest) =>
      categoriesApi.updateCategory(categoryId, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  });
}

/**
 * Hook to delete a category
 */
export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (categoryId: string) =>
      categoriesApi.deleteCategory(categoryId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  });
}
