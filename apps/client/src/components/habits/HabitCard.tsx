import { Card, CardContent, Checkbox } from "@/components/ui";
import { Badge } from "@/components/shared";
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
            <p className="body-3">{habit.description}</p>
          </div>
        </div>

        <Badge label={habit.category_title} />
      </CardContent>
    </Card>
  );
}
