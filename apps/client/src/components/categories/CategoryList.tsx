import { QueryState } from "@/components/shared";
import { CategoryCard, CreateCategoryDialog } from "@/components/categories";
import { useCategories } from "@/hooks";

export default function CategoryList() {
  const {
    data: categories,
    isPending: isLoadingCategories,
    error: fetchCategoriesError,
  } = useCategories();

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h1 className="text-left">Categories</h1>
        <CreateCategoryDialog />
      </div>

      <QueryState
        isLoading={isLoadingCategories}
        error={fetchCategoriesError}
        queryKeys={["categories"]}
      >
        <div className="space-y-3">
          {categories?.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </QueryState>
    </div>
  );
}
