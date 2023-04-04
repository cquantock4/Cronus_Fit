// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const Themes = {
  "LIGHT": "LIGHT",
  "DARK": "DARK"
};

const Foodcategory = {
  "BREAKFAST": "BREAKFAST",
  "LUNCH": "LUNCH",
  "DINNER": "DINNER",
  "SNACKS": "SNACKS"
};

const Units = {
  "KG": "KG",
  "LBS": "LBS"
};

const ResultCategory = {
  "TIME": "TIME",
  "SETSREPS": "SETSREPS",
  "WEIGHT": "WEIGHT"
};

const { SavedWorkouts, Foodentry, Checkin, Messages, UserInfo, Articles, Programs, Comments, WorkoutResults, SubWorkouts, Workouts, User } = initSchema(schema);

export {
  SavedWorkouts,
  Foodentry,
  Checkin,
  Messages,
  UserInfo,
  Articles,
  Programs,
  Comments,
  WorkoutResults,
  SubWorkouts,
  Workouts,
  User,
  Themes,
  Foodcategory,
  Units,
  ResultCategory
};