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
import { useDeleteCategory } from "@/hooks";

type DeleteCategoryDialogProps = {
  categoryId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function DeleteCategoryDialog({
  categoryId,
  open,
  onOpenChange,
}: DeleteCategoryDialogProps) {
  const [deleteCategoryError, setDeleteCategoryError] =
    useState<Error | null>();

  const { mutate: deleteCategory, isPending: isDeletingCategory } =
    useDeleteCategory();

  function handleDeleteCategory() {
    deleteCategory(categoryId, {
      onSuccess: () => {
        onOpenChange(false);
      },
      onError: (error) => {
        console.error("Failed to delete category: ", error);
        setDeleteCategoryError(
          error instanceof Error
            ? error
            : new Error("Failed to delete category"),
        );
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Category</DialogTitle>
        </DialogHeader>

        {deleteCategoryError && <ErrorMessage error={deleteCategoryError} />}

        <p className="body-2">
          Are you sure you want to delete this category? <br />
          This action cannot be undone.
        </p>

        <DialogFooter className="flex justify-end gap-2">
          <Button
            size="sm"
            variant="destructive"
            onClick={handleDeleteCategory}
            disabled={isDeletingCategory}
          >
            Delete
          </Button>

          <DialogClose
            render={
              <Button
                type="button"
                size="sm"
                variant="outline"
                disabled={isDeletingCategory}
              />
            }
          >
            Cancel
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
