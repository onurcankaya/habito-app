import { useMemo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { GreetingSection } from "@/components/dashboard";
import { Badge } from "@/components/shared";
import {
  useActivities,
  useCreateActivity,
  useDeleteActivity,
  useHabits,
} from "@/hooks";
import { formatDate } from "@/utils/date";
import type { Activity, HabitWithCompletion } from "@/types";

export default function HomePage() {
  const {
    data: habits,
    isPending: isLoadingHabits,
    error: habitsError,
    refetch: refetchHabits,
  } = useHabits();

  const {
    data: activities,
    isPending: isLoadingActivities,
    error: activitiesError,
    refetch: refetchActivities,
  } = useActivities();

  const {
    mutate: createActivity,
    isPending: isLoadingCreateActivity,
    error: createActivityError,
  } = useCreateActivity();

  const { mutate: deleteActivity } = useDeleteActivity();

  const todaysHabits = useMemo(() => {
    if (!habits) return [];

    const dailyHabits = habits.filter((habit) => habit.frequency === "daily");

    const now = new Date();
    const today = formatDate(now, "yyyy-MM-dd");

    return dailyHabits.map((dh) => {
      const completedActivity = activities?.find(
        (activity) =>
          activity.habit_id === dh.id && activity.completed_at === today,
      );

      return {
        ...dh,
        is_completed: !!completedActivity,
        activity_id: completedActivity?.id ?? null,
      } as HabitWithCompletion;
    });
  }, [habits, activities]);

  const activitiesByDate = useMemo(() => {
    if (!activities) return {} as Record<string, Activity[]>;

    const activitiesSorted = activities.sort((a, b) =>
      b.completed_at.localeCompare(a.completed_at),
    );

    const dailyActivities: Record<string, Activity[]> = {};

    activitiesSorted.forEach((activity) => {
      const completionDate = new Date(activity.completed_at);
      const completionDateFormatted = formatDate(
        completionDate,
        "EEEE · MMM dd, yyyy",
      );

      if (!dailyActivities[completionDateFormatted]) {
        dailyActivities[completionDateFormatted] = [activity];
      } else {
        dailyActivities[completionDateFormatted].push(activity);
      }
    });

    return dailyActivities;
  }, [activities]);

  function handleToggleHabitComplete(habit: HabitWithCompletion) {
    const now = new Date();
    const today = formatDate(now, "yyyy-MM-dd");

    if (habit.is_completed && habit.activity_id) {
      deleteActivity(habit.activity_id);
    } else {
      createActivity({ habit_id: habit.id, completed_at: today });
    }
  }

  return (
    <div className="space-y-12">
      <GreetingSection />

      <div>
        <div className="mb-4">
          <h5 className="text-left">Today's Habits</h5>
        </div>

        {isLoadingHabits ? (
          <Card>
            <p className="body-3">Loading....</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {todaysHabits.map((habit: HabitWithCompletion) => (
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
                    </div>
                  </div>
                  <Badge label={habit.category_title} />
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <div>
        <div className="mb-6">
          <h5 className="text-left">Activity Log</h5>
        </div>

        {isLoadingActivities ? (
          <Card>
            <p className="body-3">Loading....</p>
          </Card>
        ) : (
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
        )}
      </div>
    </div>
  );
}
