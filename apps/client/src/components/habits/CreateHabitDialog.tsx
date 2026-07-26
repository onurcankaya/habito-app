import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Alert,
  AlertDescription,
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
  Input,
  Select,
} from "@/components/ui";
import { useCategories, useCreateHabit } from "@/hooks";
import {
  createHabitSchema,
  type CreateHabitRequest,
} from "@/lib/schemas/habit";

export default function CreateHabitDialog() {
  const [open, setOpen] = useState(false);
  const [createHabitError, setCreateHabitError] = useState<Error | null>();

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
    reset,
  } = useForm<CreateHabitRequest>({
    resolver: zodResolver(createHabitSchema),
  });

  const { mutate: createHabit, isPending: isCreatingHabit } = useCreateHabit();

  function handleCreateHabit(createHabitPayload: CreateHabitRequest) {
    createHabit(createHabitPayload, {
      onSuccess: () => {
        reset();
        setOpen(false);
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button size="sm" variant="primary">
          + New Habit
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Habit</DialogTitle>
        </DialogHeader>

        {createHabitError && (
          <Alert variant="destructive">
            <AlertDescription>{createHabitError.message}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit(handleCreateHabit)} className="space-y-4">
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

          <Input
            id="description"
            label="Description"
            placeholder="Optional notes about this habit"
            {...register("description")}
            error={errors.description?.message}
          />

          <DialogFooter className="flex justify-end gap-2">
            <Button type="submit" size="sm" disabled={isCreatingHabit}>
              Save habit
            </Button>

            <DialogClose>
              <Button
                type="button"
                size="sm"
                variant="outline"
                disabled={isCreatingHabit}
              >
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
