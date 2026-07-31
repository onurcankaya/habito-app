import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
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
} from "@/components/ui";
import { ColorPicker, ErrorMessage } from "@/components/shared";
import { useUpdateCategory } from "@/hooks";
import {
  updateCategorySchema,
  type UpdateCategoryRequest,
} from "@/lib/schemas/category";
import { CATEGORY_COLORS } from "@/constants";
import type { Category } from "@/types";

type EditCategoryDialogProps = {
  category: Category;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function EditCategoryDialog({
  category,
  open,
  onOpenChange,
}: EditCategoryDialogProps) {
  const [updateCategoryError, setUpdateCategoryError] =
    useState<Error | null>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<UpdateCategoryRequest>({
    resolver: zodResolver(updateCategorySchema),
    defaultValues: {
      title: category.title || "",
      description: category.description || "",
      color: category.color,
    },
  });

  const { mutate: updateCategory, isPending: isUpdatingCategory } =
    useUpdateCategory(category.id);

  function handleUpdateCategory(updateCategoryPayload: UpdateCategoryRequest) {
    updateCategory(updateCategoryPayload, {
      onSuccess: () => {
        onOpenChange(false);
      },
      onError: (error) => {
        console.error("Failed to update category: ", error);
        setUpdateCategoryError(
          error instanceof Error
            ? error
            : new Error("Failed to update category"),
        );
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
        </DialogHeader>

        {updateCategoryError && <ErrorMessage error={updateCategoryError} />}

        <form
          onSubmit={handleSubmit(handleUpdateCategory)}
          className="space-y-4"
        >
          <Input
            id="title"
            label="Title"
            placeholder="e.g. Health"
            {...register("title")}
            error={errors.title?.message}
          />
          <Input
            id="description"
            label="Description"
            placeholder="Optional notes about this category"
            {...register("description")}
            error={errors.description?.message}
          />
          <Controller
            name="color"
            control={control}
            render={({ field, fieldState }) => (
              <ColorPicker
                value={field.value ?? CATEGORY_COLORS[0]}
                onChange={field.onChange}
                error={fieldState.error?.message}
              />
            )}
          />

          <DialogFooter className="flex justify-end gap-2">
            <Button type="submit" size="sm" disabled={isUpdatingCategory}>
              Save changes
            </Button>

            <DialogClose
              render={
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  disabled={isUpdatingCategory}
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
