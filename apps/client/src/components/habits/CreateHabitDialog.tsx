import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
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
import { CategorySelector, ErrorMessage } from "@/components/shared";
import { useCreateHabit } from "@/hooks";
import {
  createHabitSchema,
  type CreateHabitRequest,
} from "@/lib/schemas/habit";

export default function CreateHabitDialog() {
  const [open, setOpen] = useState(false);
  const [createHabitError, setCreateHabitError] = useState<Error | null>();

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
        setOpen(false);
        reset();
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
      <DialogTrigger render={<Button size="sm" variant="primary" />}>
        + New habit
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Habit</DialogTitle>
        </DialogHeader>

        {createHabitError && <ErrorMessage error={createHabitError} />}

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
            <Button type="submit" size="sm" disabled={isCreatingHabit}>
              Save habit
            </Button>

            <DialogClose
              render={
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  disabled={isCreatingHabit}
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
