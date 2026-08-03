import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  Input,
  Select,
} from "@/components/ui";
import { CategorySelector, ErrorMessage } from "@/components/shared";
import { useUpdateHabit } from "@/hooks";
import {
  updateHabitSchema,
  type UpdateHabitRequest,
} from "@/lib/schemas/habit";
import type { Habit } from "@/types";

type EditHabitDialogProps = {
  habit: Habit;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function EditHabitDialog({
  habit,
  open,
  onOpenChange,
}: EditHabitDialogProps) {
  const [updateHabitError, setUpdateHabitError] = useState<Error | null>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateHabitRequest>({
    resolver: zodResolver(updateHabitSchema),
    defaultValues: {
      title: habit.title || "",
      frequency: habit.frequency,
      category_id: habit.category_id,
      description: habit.description || "",
    },
  });

  const { mutate: updateHabit, isPending: isUpdatingHabit } = useUpdateHabit(
    habit.id,
  );

  function handleUpdateHabit(updateHabitPayload: UpdateHabitRequest) {
    updateHabit(updateHabitPayload, {
      onSuccess: () => {
        onOpenChange(false);
      },
      onError: (error) => {
        console.error("Failed to update habit: ", error);
        setUpdateHabitError(
          error instanceof Error ? error : new Error("Failed to update habit"),
        );
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Habit</DialogTitle>
        </DialogHeader>

        {updateHabitError && <ErrorMessage error={updateHabitError} />}

        <form onSubmit={handleSubmit(handleUpdateHabit)} className="space-y-4">
          <Input
            id="title"
            label="Title"
            placeholder="e.g. Health"
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
          <CategorySelector
            register={register}
            errorMessage={errors.category_id?.message || ""}
          />
          <Input
            id="description"
            label="Description"
            placeholder="Optional notes about this habit"
            {...register("description")}
            error={errors.description?.message}
          />

          <DialogFooter className="flex justify-end gap-2">
            <Button type="submit" size="sm" disabled={isUpdatingHabit}>
              Save changes
            </Button>

            <DialogClose
              render={
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  disabled={isUpdatingHabit}
                />
              }
            >
              Cancel
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
