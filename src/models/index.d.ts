import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";

export enum WorkoutType {
  FUNCTIONALFITNESS = "FUNCTIONALFITNESS",
  MILITARYPREP = "MILITARYPREP"
}

export enum Foodcategory {
  BREAKFAST = "BREAKFAST",
  LUNCH = "LUNCH",
  DINNER = "DINNER",
  SNACKS = "SNACKS"
}

export enum Themes {
  LIGHT = "LIGHT",
  DARK = "DARK"
}

export enum ResultCategory {
  TIME = "TIME",
  SETSREPS = "SETSREPS",
  WEIGHT = "WEIGHT"
}



type EagerWorkoutNotes = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<WorkoutNotes, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly note?: string | null;
  readonly workoutsID: string;
  readonly userID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyWorkoutNotes = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<WorkoutNotes, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly note?: string | null;
  readonly workoutsID: string;
  readonly userID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type WorkoutNotes = LazyLoading extends LazyLoadingDisabled ? EagerWorkoutNotes : LazyWorkoutNotes

export declare const WorkoutNotes: (new (init: ModelInit<WorkoutNotes>) => WorkoutNotes) & {
  copyOf(source: WorkoutNotes, mutator: (draft: MutableModel<WorkoutNotes>) => MutableModel<WorkoutNotes> | void): WorkoutNotes;
}

type EagerCheckListItems = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<CheckListItems, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly key?: string | null;
  readonly value?: string | null;
  readonly frequency?: string | null;
  readonly users?: (UserCheckListItems | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCheckListItems = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<CheckListItems, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly key?: string | null;
  readonly value?: string | null;
  readonly frequency?: string | null;
  readonly users: AsyncCollection<UserCheckListItems>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type CheckListItems = LazyLoading extends LazyLoadingDisabled ? EagerCheckListItems : LazyCheckListItems

export declare const CheckListItems: (new (init: ModelInit<CheckListItems>) => CheckListItems) & {
  copyOf(source: CheckListItems, mutator: (draft: MutableModel<CheckListItems>) => MutableModel<CheckListItems> | void): CheckListItems;
}

type EagerSavedWorkouts = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SavedWorkouts, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userID: string;
  readonly workoutsID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazySavedWorkouts = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SavedWorkouts, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userID: string;
  readonly workoutsID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type SavedWorkouts = LazyLoading extends LazyLoadingDisabled ? EagerSavedWorkouts : LazySavedWorkouts

export declare const SavedWorkouts: (new (init: ModelInit<SavedWorkouts>) => SavedWorkouts) & {
  copyOf(source: SavedWorkouts, mutator: (draft: MutableModel<SavedWorkouts>) => MutableModel<SavedWorkouts> | void): SavedWorkouts;
}

type EagerCheckin = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Checkin, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly lowestweight?: string | null;
  readonly somewins?: string | null;
  readonly setbacks?: string | null;
  readonly barriers?: string | null;
  readonly sleepquality?: string | null;
  readonly appetite?: string | null;
  readonly energylevel?: string | null;
  readonly othernotes?: string | null;
  readonly waist?: string | null;
  readonly neck?: string | null;
  readonly userID: string;
  readonly generalnotes?: string | null;
  readonly photo_1?: string | null;
  readonly photo_2?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCheckin = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Checkin, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly lowestweight?: string | null;
  readonly somewins?: string | null;
  readonly setbacks?: string | null;
  readonly barriers?: string | null;
  readonly sleepquality?: string | null;
  readonly appetite?: string | null;
  readonly energylevel?: string | null;
  readonly othernotes?: string | null;
  readonly waist?: string | null;
  readonly neck?: string | null;
  readonly userID: string;
  readonly generalnotes?: string | null;
  readonly photo_1?: string | null;
  readonly photo_2?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Checkin = LazyLoading extends LazyLoadingDisabled ? EagerCheckin : LazyCheckin

export declare const Checkin: (new (init: ModelInit<Checkin>) => Checkin) & {
  copyOf(source: Checkin, mutator: (draft: MutableModel<Checkin>) => MutableModel<Checkin> | void): Checkin;
}

type EagerFoodEntry = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<FoodEntry, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly date?: string | null;
  readonly category?: Foodcategory | keyof typeof Foodcategory | null;
  readonly desc?: string | null;
  readonly protein?: number | null;
  readonly carbs?: number | null;
  readonly fat?: number | null;
  readonly fiber?: number | null;
  readonly calories?: number | null;
  readonly userID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyFoodEntry = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<FoodEntry, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly date?: string | null;
  readonly category?: Foodcategory | keyof typeof Foodcategory | null;
  readonly desc?: string | null;
  readonly protein?: number | null;
  readonly carbs?: number | null;
  readonly fat?: number | null;
  readonly fiber?: number | null;
  readonly calories?: number | null;
  readonly userID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type FoodEntry = LazyLoading extends LazyLoadingDisabled ? EagerFoodEntry : LazyFoodEntry

export declare const FoodEntry: (new (init: ModelInit<FoodEntry>) => FoodEntry) & {
  copyOf(source: FoodEntry, mutator: (draft: MutableModel<FoodEntry>) => MutableModel<FoodEntry> | void): FoodEntry;
}

type EagerMessages = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Messages, 'id'>;
  };
  readonly id: string;
  readonly message?: string | null;
  readonly sender_userid?: string | null;
  readonly receiver_userid?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyMessages = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Messages, 'id'>;
  };
  readonly id: string;
  readonly message?: string | null;
  readonly sender_userid?: string | null;
  readonly receiver_userid?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Messages = LazyLoading extends LazyLoadingDisabled ? EagerMessages : LazyMessages

export declare const Messages: (new (init: ModelInit<Messages>) => Messages) & {
  copyOf(source: Messages, mutator: (draft: MutableModel<Messages>) => MutableModel<Messages> | void): Messages;
}

type EagerUserInfo = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserInfo, 'id'>;
    readOnlyFields: 'createdAt';
  };
  readonly id: string;
  readonly type?: string | null;
  readonly i_gender?: string | null;
  readonly i_goals?: string | null;
  readonly i_trainingactivity?: string | null;
  readonly i_lifestyleactivity?: string | null;
  readonly i_height?: string | null;
  readonly i_weight?: string | null;
  readonly i_neck?: string | null;
  readonly i_waist?: string | null;
  readonly i_hip?: string | null;
  readonly i_hip_units?: string | null;
  readonly i_body_fat_pct?: string | null;
  readonly User?: User | null;
  readonly goal_protein?: string | null;
  readonly goal_carb?: string | null;
  readonly goal_fat?: string | null;
  readonly goal_fiber?: string | null;
  readonly updatedAt?: string | null;
  readonly createdAt?: string | null;
  readonly userInfoUserId?: string | null;
}

type LazyUserInfo = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserInfo, 'id'>;
    readOnlyFields: 'createdAt';
  };
  readonly id: string;
  readonly type?: string | null;
  readonly i_gender?: string | null;
  readonly i_goals?: string | null;
  readonly i_trainingactivity?: string | null;
  readonly i_lifestyleactivity?: string | null;
  readonly i_height?: string | null;
  readonly i_weight?: string | null;
  readonly i_neck?: string | null;
  readonly i_waist?: string | null;
  readonly i_hip?: string | null;
  readonly i_hip_units?: string | null;
  readonly i_body_fat_pct?: string | null;
  readonly User: AsyncItem<User | undefined>;
  readonly goal_protein?: string | null;
  readonly goal_carb?: string | null;
  readonly goal_fat?: string | null;
  readonly goal_fiber?: string | null;
  readonly updatedAt?: string | null;
  readonly createdAt?: string | null;
  readonly userInfoUserId?: string | null;
}

export declare type UserInfo = LazyLoading extends LazyLoadingDisabled ? EagerUserInfo : LazyUserInfo

export declare const UserInfo: (new (init: ModelInit<UserInfo>) => UserInfo) & {
  copyOf(source: UserInfo, mutator: (draft: MutableModel<UserInfo>) => MutableModel<UserInfo> | void): UserInfo;
}

type EagerArticles = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Articles, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title?: string | null;
  readonly desc?: string | null;
  readonly storage_path?: string | null;
  readonly date?: string | null;
  readonly data_type?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyArticles = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Articles, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title?: string | null;
  readonly desc?: string | null;
  readonly storage_path?: string | null;
  readonly date?: string | null;
  readonly data_type?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Articles = LazyLoading extends LazyLoadingDisabled ? EagerArticles : LazyArticles

export declare const Articles: (new (init: ModelInit<Articles>) => Articles) & {
  copyOf(source: Articles, mutator: (draft: MutableModel<Articles>) => MutableModel<Articles> | void): Articles;
}

type EagerPrograms = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Programs, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title?: string | null;
  readonly desc?: string | null;
  readonly free?: boolean | null;
  readonly price?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPrograms = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Programs, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title?: string | null;
  readonly desc?: string | null;
  readonly free?: boolean | null;
  readonly price?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Programs = LazyLoading extends LazyLoadingDisabled ? EagerPrograms : LazyPrograms

export declare const Programs: (new (init: ModelInit<Programs>) => Programs) & {
  copyOf(source: Programs, mutator: (draft: MutableModel<Programs>) => MutableModel<Programs> | void): Programs;
}

type EagerComments = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Comments, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly comment?: string | null;
  readonly userID: string;
  readonly workoutsID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyComments = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Comments, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly comment?: string | null;
  readonly userID: string;
  readonly workoutsID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Comments = LazyLoading extends LazyLoadingDisabled ? EagerComments : LazyComments

export declare const Comments: (new (init: ModelInit<Comments>) => Comments) & {
  copyOf(source: Comments, mutator: (draft: MutableModel<Comments>) => MutableModel<Comments> | void): Comments;
}

type EagerSubWorkouts = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SubWorkouts, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly group?: string | null;
  readonly grouptitle?: string | null;
  readonly desc?: string | null;
  readonly resultcategory?: ResultCategory | keyof typeof ResultCategory | null;
  readonly required?: boolean | null;
  readonly timecap?: string | null;
  readonly workoutsID: string;
  readonly WorkoutResults?: (WorkoutResults | null)[] | null;
  readonly numitems?: number | null;
  readonly order?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazySubWorkouts = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SubWorkouts, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly group?: string | null;
  readonly grouptitle?: string | null;
  readonly desc?: string | null;
  readonly resultcategory?: ResultCategory | keyof typeof ResultCategory | null;
  readonly required?: boolean | null;
  readonly timecap?: string | null;
  readonly workoutsID: string;
  readonly WorkoutResults: AsyncCollection<WorkoutResults>;
  readonly numitems?: number | null;
  readonly order?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type SubWorkouts = LazyLoading extends LazyLoadingDisabled ? EagerSubWorkouts : LazySubWorkouts

export declare const SubWorkouts: (new (init: ModelInit<SubWorkouts>) => SubWorkouts) & {
  copyOf(source: SubWorkouts, mutator: (draft: MutableModel<SubWorkouts>) => MutableModel<SubWorkouts> | void): SubWorkouts;
}

type EagerWorkoutResults = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<WorkoutResults, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly value?: string | null;
  readonly userID: string;
  readonly subworkoutsID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyWorkoutResults = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<WorkoutResults, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly value?: string | null;
  readonly userID: string;
  readonly subworkoutsID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type WorkoutResults = LazyLoading extends LazyLoadingDisabled ? EagerWorkoutResults : LazyWorkoutResults

export declare const WorkoutResults: (new (init: ModelInit<WorkoutResults>) => WorkoutResults) & {
  copyOf(source: WorkoutResults, mutator: (draft: MutableModel<WorkoutResults>) => MutableModel<WorkoutResults> | void): WorkoutResults;
}

type EagerWorkouts = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Workouts, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title?: string | null;
  readonly desc?: string | null;
  readonly date?: string | null;
  readonly SubWorkouts?: (SubWorkouts | null)[] | null;
  readonly Comments?: (Comments | null)[] | null;
  readonly SavedWorkouts?: (SavedWorkouts | null)[] | null;
  readonly workout_type?: WorkoutType | keyof typeof WorkoutType | null;
  readonly WorkoutNotes?: (WorkoutNotes | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyWorkouts = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Workouts, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title?: string | null;
  readonly desc?: string | null;
  readonly date?: string | null;
  readonly SubWorkouts: AsyncCollection<SubWorkouts>;
  readonly Comments: AsyncCollection<Comments>;
  readonly SavedWorkouts: AsyncCollection<SavedWorkouts>;
  readonly workout_type?: WorkoutType | keyof typeof WorkoutType | null;
  readonly WorkoutNotes: AsyncCollection<WorkoutNotes>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Workouts = LazyLoading extends LazyLoadingDisabled ? EagerWorkouts : LazyWorkouts

export declare const Workouts: (new (init: ModelInit<Workouts>) => Workouts) & {
  copyOf(source: Workouts, mutator: (draft: MutableModel<Workouts>) => MutableModel<Workouts> | void): Workouts;
}

type EagerUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly email?: string | null;
  readonly sub?: string | null;
  readonly nutrition_info?: boolean | null;
  readonly nutrition_coaching?: boolean | null;
  readonly q_experience?: string | null;
  readonly q_medical?: string | null;
  readonly q_calcmacros?: string | null;
  readonly coach_userid?: string | null;
  readonly theme?: Themes | keyof typeof Themes | null;
  readonly image?: string | null;
  readonly image_uri?: string | null;
  readonly Checkins?: (Checkin | null)[] | null;
  readonly Foodentries?: (FoodEntry | null)[] | null;
  readonly WorkoutResults?: (WorkoutResults | null)[] | null;
  readonly Comments?: (Comments | null)[] | null;
  readonly SavedWorkouts?: (SavedWorkouts | null)[] | null;
  readonly coach_yn?: boolean | null;
  readonly updatedAt?: string | null;
  readonly default_workout_type?: WorkoutType | keyof typeof WorkoutType | null;
  readonly CheckListItems?: (UserCheckListItems | null)[] | null;
  readonly workout_logs?: boolean | null;
  readonly WorkoutNotes?: (WorkoutNotes | null)[] | null;
  readonly createdAt?: string | null;
}

type LazyUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly email?: string | null;
  readonly sub?: string | null;
  readonly nutrition_info?: boolean | null;
  readonly nutrition_coaching?: boolean | null;
  readonly q_experience?: string | null;
  readonly q_medical?: string | null;
  readonly q_calcmacros?: string | null;
  readonly coach_userid?: string | null;
  readonly theme?: Themes | keyof typeof Themes | null;
  readonly image?: string | null;
  readonly image_uri?: string | null;
  readonly Checkins: AsyncCollection<Checkin>;
  readonly Foodentries: AsyncCollection<FoodEntry>;
  readonly WorkoutResults: AsyncCollection<WorkoutResults>;
  readonly Comments: AsyncCollection<Comments>;
  readonly SavedWorkouts: AsyncCollection<SavedWorkouts>;
  readonly coach_yn?: boolean | null;
  readonly updatedAt?: string | null;
  readonly default_workout_type?: WorkoutType | keyof typeof WorkoutType | null;
  readonly CheckListItems: AsyncCollection<UserCheckListItems>;
  readonly workout_logs?: boolean | null;
  readonly WorkoutNotes: AsyncCollection<WorkoutNotes>;
  readonly createdAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

type EagerUserCheckListItems = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserCheckListItems, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly checkListItemsId?: string | null;
  readonly userId?: string | null;
  readonly checkListItems: CheckListItems;
  readonly user: User;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUserCheckListItems = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserCheckListItems, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly checkListItemsId?: string | null;
  readonly userId?: string | null;
  readonly checkListItems: AsyncItem<CheckListItems>;
  readonly user: AsyncItem<User>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type UserCheckListItems = LazyLoading extends LazyLoadingDisabled ? EagerUserCheckListItems : LazyUserCheckListItems

export declare const UserCheckListItems: (new (init: ModelInit<UserCheckListItems>) => UserCheckListItems) & {
  copyOf(source: UserCheckListItems, mutator: (draft: MutableModel<UserCheckListItems>) => MutableModel<UserCheckListItems> | void): UserCheckListItems;
}