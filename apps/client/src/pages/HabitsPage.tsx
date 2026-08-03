import { HabitList } from "@/components/habits";
import { CategoryList } from "@/components/categories";

export default function HabitsPage() {
  return (
    <div className="space-y-16">
      <HabitList />
      <CategoryList />
    </div>
  );
}
