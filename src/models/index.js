// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const WorkoutType = {
  "FUNCTIONALFITNESS": "FUNCTIONALFITNESS",
  "MILITARYPREP": "MILITARYPREP"
};

const Foodcategory = {
  "BREAKFAST": "BREAKFAST",
  "LUNCH": "LUNCH",
  "DINNER": "DINNER",
  "SNACKS": "SNACKS"
};

const Themes = {
  "LIGHT": "LIGHT",
  "DARK": "DARK"
};

const ResultCategory = {
  "TIME": "TIME",
  "SETSREPS": "SETSREPS",
  "WEIGHT": "WEIGHT"
};

const { SavedWorkouts, Checkin, FoodEntry, Messages, UserInfo, Articles, Programs, Comments, SubWorkouts, WorkoutResults, Workouts, User } = initSchema(schema);

export {
  SavedWorkouts,
  Checkin,
  FoodEntry,
  Messages,
  UserInfo,
  Articles,
  Programs,
  Comments,
  SubWorkouts,
  WorkoutResults,
  Workouts,
  User,
  WorkoutType,
  Foodcategory,
  Themes,
  ResultCategory
};