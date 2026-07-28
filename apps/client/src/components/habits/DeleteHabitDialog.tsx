import { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui";
import { ErrorMessage } from "@/components/shared";
import { useDeleteHabit } from "@/hooks";

type DeleteHabitDialogProps = {
  habitId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function DeleteHabitDialog({
  habitId,
  open,
  onOpenChange,
}: DeleteHabitDialogProps) {
  const [deleteHabitError, setDeleteHabitError] = useState<Error | null>();

  const { mutate: deleteHabit, isPending: isDeletingHabit } = useDeleteHabit();

  function handleDeleteHabit() {
    deleteHabit(habitId, {
      onSuccess: () => {
        onOpenChange(false);
      },
      onError: (error) => {
        console.error("Failed to delete habit: ", error);
        setDeleteHabitError(
          error instanceof Error ? error : new Error("Failed to delete habit"),
        );
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Habit</DialogTitle>
        </DialogHeader>

        {deleteHabitError && <ErrorMessage error={deleteHabitError} />}

        <p className="body-2">
          Are you sure you want to delete this habit? This action cannot be
          undone.
        </p>

        <DialogFooter className="flex justify-end gap-2">
          <Button
            size="sm"
            variant="destructive"
            onClick={handleDeleteHabit}
            disabled={isDeletingHabit}
          >
            Delete
          </Button>

          <DialogClose>
            <Button
              type="button"
              size="sm"
              variant="outline"
              disabled={isDeletingHabit}
            >
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
