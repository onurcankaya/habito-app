import { useState } from "react";
import { MoreVertical as MenuIcon, Trash2 as DeleteIcon } from "lucide-react";
import {
  Button,
  Card,
  CardContent,
  Checkbox,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui";
import { Badge } from "@/components/shared";
import { DeleteHabitDialog } from "@/components/habits";
import type { Habit, HabitWithCompletion } from "@/types";

type HabitCardProps = {
  mode: "dashboard" | "habits";
  habit: Habit | HabitWithCompletion;
  toggleHabitComplete?: (habit: HabitWithCompletion) => void;
};

export default function HabitCard({
  mode,
  habit,
  toggleHabitComplete,
}: HabitCardProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  return (
    <Card>
      <CardContent className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          {mode === "dashboard" && toggleHabitComplete && (
            <Checkbox
              id={habit.id}
              checked={habit.is_completed}
              onCheckedChange={() => toggleHabitComplete(habit)}
            />
          )}

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
