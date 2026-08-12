import { QueryState } from "@/components/shared";
import { Card, CardContent } from "@/components/ui";
import { CreateHabitDialog, HabitCard } from "@/components/habits";
import { useHabits } from "@/hooks";

export default function HabitList() {
  const {
    data: habits,
    isPending: isLoadingHabits,
    error: fetchHabitsError,
  } = useHabits();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-left">Habits</h2>
        <CreateHabitDialog />
      </div>

      <QueryState
        isLoading={isLoadingHabits}
        error={fetchHabitsError}
        queryKeys={["habits"]}
      >
        {habits?.length === 0 ? (
          <Card>
            <CardContent>
              <p className="body-2">
                No habits to show. <br />
                Click <b>+ New habit</b> to create a new habit.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {habits?.map((habit) => (
              <HabitCard key={habit.id} habit={habit} />
            ))}
          </div>
        )}
      </QueryState>
    </div>
  );
}
