import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, CardContent, Input, Select } from "@/components/ui";
import { HabitCard } from "@/components/habits";
import { useHabits, useCreateHabit, useCategories } from "@/hooks";
import {
  createHabitSchema,
  type CreateHabitRequest,
} from "@/lib/schemas/habit";

export default function HabitList() {
  const [showCreateHabitForm, setShowCreateHabitForm] = useState(false);
  const [createHabitError, setCreateHabitError] = useState<Error | null>();

  const {
    data: habits,
    isPending: isLoadingHabits,
    error: fetchHabitsError,
    refetch: refetchHabits,
  } = useHabits();

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
  } = useForm<CreateHabitRequest>({
    resolver: zodResolver(createHabitSchema),
  });

  const { mutate: createHabit, isPending: isCreatingHabit } = useCreateHabit();

  function handleCreateHabit(createHabitPayload: CreateHabitRequest) {
    createHabit(createHabitPayload, {
      onSuccess: () => {
        console.log("Habit created");
      },
      onError: (error) => {
        console.error("Failed to create habit: ", error);
        setCreateHabitError(
          error instanceof Error ? error : new Error("Failed to create habit"),
        );
      },
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-left">Habits</h1>

        {!showCreateHabitForm && (
          <Button
            size="sm"
            variant="primary"
            onClick={() => setShowCreateHabitForm(true)}
          >
            + New habit
          </Button>
        )}
      </div>

      {showCreateHabitForm && (
        <Card>
          <CardContent>
            <form
              onSubmit={handleSubmit(handleCreateHabit)}
              className="space-y-4"
            >
              <div className="grid grid-cols-3 gap-3">
                <Input
                  id="title"
                  label="Title"
                  placeholder="e.g. Stretch"
                  {...register("title")}
                  error={errors.title?.message}
                />
                <Select
                  id="frequency"
                  label="Frequency"
                  {...register("frequency")}
                  error={errors.frequency?.message}
                >
                  <option defaultValue={"daily"} value={"daily"}>
                    Daily
                  </option>
                  <option value={"weekly"}>Weekly</option>
                </Select>
                <Select
                  id="category_id"
                  label="Category"
                  {...register("category_id")}
                  error={errors.category_id?.message}
                >
                  {categories?.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.title}
                    </option>
                  ))}
                </Select>
              </div>

              <Input
                id="description"
                label="Description"
                placeholder="Optional notes about this habit"
                {...register("description")}
                error={errors.description?.message}
              />

              <div className="flex justify-end gap-2">
                <Button type="submit" size="sm" disabled={isCreatingHabit}>
                  Save habit
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  disabled={isCreatingHabit}
                  onClick={() => setShowCreateHabitForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        {habits?.map((habit) => (
          <HabitCard key={habit.id} mode="habits" habit={habit} />
        ))}
      </div>
    </div>
  );
}
