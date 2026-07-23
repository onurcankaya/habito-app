import type { RowDataPacket } from "mysql2";

export interface User extends RowDataPacket {
  id: string;
  email: string;
  password_hash: string;
  first_name: string;
  last_name: string;
  created_at: string;
}

export interface Category extends RowDataPacket {
  id: string;
  title: string;
  description: string | null;
  created_at: string;
}

export interface Habit extends RowDataPacket {
  id: string;
  title: string;
  description: string | null;
  frequency: "daily" | "weekly";
  created_at: string;
  updated_at: string;
  user_id: string;
  category_id: string;
  category_title: string;
}

export interface CompletedActivity extends RowDataPacket {
  id: string;
  notes: string | null;
  completed_at: string;
  user_id: string;
  habit_id: string;
  habit_title: string;
  category_title: string;
}
