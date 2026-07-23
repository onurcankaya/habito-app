import { format } from "date-fns";

export function formatDate(dateStr: Date, dateFormat: string) {
  return format(dateStr, dateFormat);
}
