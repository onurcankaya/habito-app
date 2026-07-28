import { QueryState } from "@/components/shared";
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
      <div className="flex justify-between mb-6">
        <h1 className="text-left">Habits</h1>
        <CreateHabitDialog />
      </div>

      <QueryState
        isLoading={isLoadingHabits}
        error={fetchHabitsError}
        queryKeys={["habits"]}
      >
        <div className="space-y-3">
          {habits?.map((habit) => (
            <HabitCard key={habit.id} mode="habits" habit={habit} />
          ))}
        </div>
      </QueryState>
    </div>
  );
}
