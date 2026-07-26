import { CategoryCard, CreateCategoryDialog } from "@/components/categories";
import { useCategories } from "@/hooks";

export default function CategoryList() {
  const {
    data: categories,
    isPending: isLoadingCategories,
    error: fetchCategoriesError,
    refetch: refetchCategories,
  } = useCategories();

  return (
    <div className="space-y-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-left">Categories</h1>
        <CreateCategoryDialog />
      </div>

      <div className="space-y-3">
        {categories?.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
