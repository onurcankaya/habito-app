import type { UseFormRegister } from "react-hook-form";
import { Select } from "@/components/ui";
import { QueryState } from "@/components/shared";
import { useCategories } from "@/hooks";
import type {
  CreateHabitRequest,
  UpdateHabitRequest,
} from "@/lib/schemas/habit";

type CategorySelectorProps = {
  register: UseFormRegister<CreateHabitRequest | UpdateHabitRequest>;
  errorMessage: string;
};

export default function CategorySelector({
  register,
  errorMessage,
}: CategorySelectorProps) {
  const {
    data: categories,
    isPending: isLoadingCategories,
    error: fetchCategoriesError,
  } = useCategories();

  return (
    <Select
      id="category_id"
      label="Category"
      {...register("category_id")}
      error={errorMessage}
    >
      <QueryState
        isLoading={isLoadingCategories}
        error={fetchCategoriesError}
        queryKeys={["categories"]}
      >
        {categories?.map((category) => (
          <option key={category.id} value={category.id}>
            {category.title}
          </option>
        ))}
      </QueryState>
    </Select>
  );
}
