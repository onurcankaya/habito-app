import { QueryState } from "@/components/shared";
import { Card, CardContent } from "@/components/ui";
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
      <div className="flex items-center justify-between">
        <h2 className="text-left">Categories</h2>
        <CreateCategoryDialog />
      </div>

      <QueryState
        isLoading={isLoadingCategories}
        error={fetchCategoriesError}
        queryKeys={["categories"]}
      >
        {categories?.length === 0 ? (
          <Card>
            <CardContent>
              <p className="body-2">
                No categories to show. <br />
                Click <b>+ New Category</b> to create a new category.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {categories?.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        )}
      </QueryState>
    </div>
  );
}
