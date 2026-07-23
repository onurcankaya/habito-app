import { useMemo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { GreetingSection } from "@/components/dashboard";
import { Badge } from "@/components/shared";
import { useActivities, useCreateActivity, useHabits } from "@/hooks";
import { formatDate } from "@/utils/date";
import type { Activity, Habit } from "@/types";

export default function HomePage() {
  const {
    data: activities,
    isPending: isLoadingActivities,
    error: activitiesError,
    refetch: refetchActivities,
  } = useActivities();

  const {
    data: habits,
    isPending: isLoadingHabits,
    error: habitsError,
    refetch: refetchHabits,
  } = useHabits();

  const {
    mutate: createActivity,
    isPending: isLoadingCreateActivity,
    error: createActivityError,
  } = useCreateActivity();

  const todaysHabits = useMemo(() => {
    if (!habits) return [];

    const dailyHabits = habits.filter((habit) => habit.frequency === "daily");

    return dailyHabits.map((dh) => {
      const activityHabitIds = activities?.map((activity) => activity.habit_id);

      return {
        ...dh,
        is_completed: activityHabitIds?.includes(dh.id) ?? false,
      };
    });
  }, [habits]);

  const activitiesByDate = useMemo(() => {
    if (!activities) return [];

    const activitiesSorted = activities.sort((a, b) =>
      b.completed_at.localeCompare(a.completed_at),
    );

    const dailyActivities: Record<string, Activity[]> = {};

    activitiesSorted.map((activity) => {
      const completionDate = activity.completed_at;
      if (!dailyActivities[completionDate]) {
        dailyActivities[completionDate] = [activity];
      } else {
        dailyActivities[completionDate].push(activity);
      }
    });

    return dailyActivities;
  }, [activities]);

  function handleToggleHabitComplete(habit: Habit) {
    const now = new Date();
    const today = formatDate(now, "yyyy-MM-dd");

    if (habit.is_completed) return;

    createActivity({ habit_id: habit.id, completed_at: today });
  }

  return (
    <div className="space-y-12">
      <GreetingSection />

      <div>
        <div className="mb-4">
          <h5 className="text-left">Today's Habits</h5>
        </div>

        <div className="space-y-4">
          {todaysHabits.map((habit: Habit) => (
            <Card key={habit.id}>
              <CardContent className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <Checkbox
                    id={habit.id}
                    checked={habit.is_completed}
                    onCheckedChange={() => handleToggleHabitComplete(habit)}
                  />
                  <div className="flex flex-col items-start gap-1">
                    <p className="body-2 font-bold">{habit.title}</p>
                    <p className="body-3">{habit.description}</p>
                    <p className="body-3">{habit.is_completed || "fart"}</p>
                  </div>
                </div>
                <Badge label={habit.category_title} />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-6">
          <h5 className="text-left">Activity Log</h5>
        </div>

        <div className="space-y-8">
          {Object.entries(activitiesByDate).map(
            ([activityDate, activities]) => {
              return (
                <div key={activityDate}>
                  <div className="mb-3">
                    <h6 className="text-left">{activityDate}</h6>
                  </div>

                  <div className="space-y-4">
                    {activities.map((activity: Activity) => (
                      <Card key={activity.id}>
                        <CardContent className="flex justify-between items-center">
                          <div className="flex items-center gap-4">
                            <div className="flex flex-col items-start gap-1">
                              <p className="body-2 font-bold">
                                {activity.habit_title}
                              </p>
                              <p className="body-3">{activity.notes}</p>
                            </div>
                          </div>
                          <Badge label={activity.category_title} />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              );
            },
          )}
        </div>
      </div>
    </div>
  );
}
