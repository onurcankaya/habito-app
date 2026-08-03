import { useMemo } from "react";
import { useUser } from "@/hooks";
import { formatDate } from "@/utils/date";

export default function GreetingSection() {
  const { data: user } = useUser();

  const now = new Date();
  const hour = now.getHours();

  const name = useMemo(() => {
    return user?.first_name || "";
  }, [user]);

  const greeting = useMemo(() => {
    if (hour > 0 && hour < 12) {
      return `Good morning, ${name}`;
    } else if (hour >= 12 && hour < 19) {
      return `Good afternoon, ${name}`;
    } else {
      return `Good evening, ${name}`;
    }
  }, [hour, name]);

  const today = formatDate(now, "EEEE, MMMM dd, yyyy");

  return (
    <div className="flex flex-col items-start w-full">
      <h2>{greeting}</h2>
      <p className="body-3">{today}</p>
    </div>
  );
}
