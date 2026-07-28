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
} from "@/components/ui";
import { useCreateCategory } from "@/hooks";
import {
  createCategorySchema,
  type CreateCategoryRequest,
} from "@/lib/schemas/category";

export default function CreateCategoryDialog() {
  const [open, setOpen] = useState(false);
  const [createCategoryError, setCreateCategoryError] =
    useState<Error | null>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateCategoryRequest>({
    resolver: zodResolver(createCategorySchema),
  });

  const { mutate: createCategory, isPending: isCreatingCategory } =
    useCreateCategory();

  function handleCreateCategory(createCategoryPayload: CreateCategoryRequest) {
    createCategory(createCategoryPayload, {
      onSuccess: () => {
        reset();
        setOpen(false);
      },
      onError: (error) => {
        console.error("Failed to create category: ", error);
        setCreateCategoryError(
          error instanceof Error
            ? error
            : new Error("Failed to create category"),
        );
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button size="sm" variant="primary" />}>
        + New category
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Category</DialogTitle>
        </DialogHeader>

        {createCategoryError && (
          <Alert variant="destructive">
            <AlertDescription>{createCategoryError.message}</AlertDescription>
          </Alert>
        )}

        <form
          onSubmit={handleSubmit(handleCreateCategory)}
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

          <DialogFooter className="flex justify-end gap-2">
            <Button type="submit" size="sm" disabled={isCreatingCategory}>
              Save category
            </Button>

            <DialogClose
              render={
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  disabled={isCreatingCategory}
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
