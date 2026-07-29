import { useState } from "react";
import {
  MoreVertical as MenuIcon,
  Pencil as EditIcon,
  Trash2 as DeleteIcon,
} from "lucide-react";
import {
  Button,
  Card,
  CardContent,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui";
import { Badge } from "@/components/shared";
import {
  EditCategoryDialog,
  DeleteCategoryDialog,
} from "@/components/categories";
import type { Category } from "@/types";

type CategoryCardProps = {
  category: Category;
};

export default function CategoryCard({ category }: CategoryCardProps) {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  return (
    <Card>
      <CardContent className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-start gap-1">
            <p className="body-2 font-bold">{category.title}</p>
            {category.description && (
              <p className="body-3">{category.description}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge label={category.title} />

          <DropdownMenu>
            <DropdownMenuTrigger render={<Button size="sm" variant="ghost" />}>
              <MenuIcon className="h-4 w-4" />
            </DropdownMenuTrigger>

            <DropdownMenuContent className="space-y-2">
              <DropdownMenuItem
                onClick={(e) => {
                  e.preventDefault();
                  setEditDialogOpen(true);
                }}
              >
                <EditIcon className="h-4 w-4" />
                Edit
              </DropdownMenuItem>

              <DropdownMenuItem
                variant="destructive"
                onClick={(e) => {
                  e.preventDefault();
                  setDeleteDialogOpen(true);
                }}
              >
                <DeleteIcon className="h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <EditCategoryDialog
            category={category}
            open={editDialogOpen}
            onOpenChange={setEditDialogOpen}
          />

          <DeleteCategoryDialog
            categoryId={category.id}
            open={deleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
          />
        </div>
      </CardContent>
    </Card>
  );
}
