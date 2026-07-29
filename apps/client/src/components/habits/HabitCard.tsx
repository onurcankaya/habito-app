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
import { DeleteHabitDialog, EditHabitDialog } from "@/components/habits";
import type { Habit, HabitWithCompletion } from "@/types";

type HabitCardProps = {
  habit: Habit | HabitWithCompletion;
};

export default function HabitCard({ habit }: HabitCardProps) {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  return (
    <Card>
      <CardContent className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-start gap-1">
            <p className="body-2 font-bold">{habit.title}</p>
            {habit.description && <p className="body-3">{habit.description}</p>}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge label={habit.category_title} />

          <DropdownMenu>
            <DropdownMenuTrigger render={<Button size="sm" variant="ghost" />}>
              <MenuIcon className="h-4 w-4" />
            </DropdownMenuTrigger>

            <DropdownMenuContent>
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

          <EditHabitDialog
            habit={habit}
            open={editDialogOpen}
            onOpenChange={setEditDialogOpen}
          />
          <DeleteHabitDialog
            habitId={habit.id}
            open={deleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
          />
        </div>
      </CardContent>
    </Card>
  );
}
