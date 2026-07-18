import { v4 as uuidv4 } from "uuid";
import * as activityRepository from "../repositories/activityRepository";
import type { CreateActivityDTO } from "../types";
import { NotFoundError } from "../utils/errors";

async function getAllActivities(userId: string) {
  const activities = await activityRepository.getAllActivities(userId);

  return activities;
}

async function getActivity(userId: string, activityId: string) {
  const activity = await activityRepository.getActivity(userId, activityId);

  if (!activity) throw new NotFoundError("Activity not found");

  return activity;
}

async function createActivity(userId: string, data: CreateActivityDTO) {
  const activityId = uuidv4();

  await activityRepository.createActivity(
    userId,
    data.habit_id,
    activityId,
    data,
  );

  const activity = await activityRepository.getActivity(userId, activityId);

  if (!activity) throw new NotFoundError("Activity not found");

  return activity;
}

async function deleteActivity(userId: string, activityId: string) {
  await activityRepository.deleteActivity(userId, activityId);
}

export { getAllActivities, getActivity, createActivity, deleteActivity };
