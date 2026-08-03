import { v4 as uuidv4 } from "uuid";
import * as habitRepository from "../repositories/habitRepository";
import type { CreateHabitDTO, UpdateHabitDTO } from "../types";
import { NotFoundError } from "../utils/errors";

async function getAllHabits(userId: string) {
  const habits = await habitRepository.getAllHabits(userId);

  return habits;
}

async function getHabit(userId: string, habitId: string) {
  const habit = await habitRepository.getHabit(userId, habitId);

  if (!habit) throw new NotFoundError("Habit not found");

  return habit;
}

async function createHabit(userId: string, data: CreateHabitDTO) {
  const habitId = uuidv4();

  await habitRepository.createHabit(userId, habitId, data);

  const habit = await habitRepository.getHabit(userId, habitId);

  if (!habit) throw new NotFoundError("Habit not found");

  return habit;
}

async function updateHabit(
  userId: string,
  habitId: string,
  data: UpdateHabitDTO,
) {
  await habitRepository.updateHabit(userId, habitId, data);
}

async function deleteHabit(userId: string, habitId: string) {
  await habitRepository.deleteHabit(userId, habitId);
}

export { getAllHabits, getHabit, createHabit, updateHabit, deleteHabit };
