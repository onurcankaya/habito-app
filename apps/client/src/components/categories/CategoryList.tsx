import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, CardContent, Input } from "@/components/ui";
import { CategoryCard } from "@/components/categories";
import { useCategories, useCreateCategory } from "@/hooks";
import {
  createCategorySchema,
  type CreateCategoryRequest,
} from "@/lib/schemas/category";

export default function CategoryList() {
  const [showCreateCategoryForm, setShowCreateCategoryForm] = useState(false);
  const [createCategoryError, setCreateCategoryError] =
    useState<Error | null>();

  const {
    data: categories,
    isPending: isLoadingCategories,
    error: fetchCategoriesError,
    refetch: refetchCategories,
  } = useCategories();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCategoryRequest>({
    resolver: zodResolver(createCategorySchema),
  });

  const { mutate: createCategory, isPending: isCreatingCategory } =
    useCreateCategory();

  function handleCreateCategory(createCategoryPayload: CreateCategoryRequest) {
    createCategory(createCategoryPayload, {
      onSuccess: () => {
        console.log("Category created");
      },
      onError: (error) => {
        console.error("Failed to create category: ", error);
        setCreateCategoryError(
          error instanceof Error
            ? error
            : new Error("Failed to create category"),
        );
      },
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-left">Categories</h1>

        {!showCreateCategoryForm && (
          <Button
            size="sm"
            variant="primary"
            onClick={() => setShowCreateCategoryForm(true)}
          >
            + New category
          </Button>
        )}
      </div>

      {showCreateCategoryForm && (
        <Card>
          <CardContent>
            <form
              onSubmit={handleSubmit(handleCreateCategory)}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-3">
                <Input
                  id="title"
                  label="Title"
                  placeholder="e.g. Health"
                  {...register("title")}
                  error={errors.title?.message}
                />
                <Input
                  id="description"
                  label="Description"
                  placeholder="Optional notes about this category"
                  {...register("description")}
                  error={errors.description?.message}
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button type="submit" size="sm" disabled={isCreatingCategory}>
                  Save category
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  disabled={isCreatingCategory}
                  onClick={() => setShowCreateCategoryForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        {categories?.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
