import { ModelInit, MutableModel } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncItem, AsyncCollection } from "@aws-amplify/datastore";

export enum Themes {
  LIGHT = "LIGHT",
  DARK = "DARK"
}

export enum Foodcategory {
  BREAKFAST = "BREAKFAST",
  LUNCH = "LUNCH",
  DINNER = "DINNER",
  SNACKS = "SNACKS"
}

export enum Units {
  KG = "KG",
  LBS = "LBS"
}

export enum ResultCategory {
  TIME = "TIME",
  SETSREPS = "SETSREPS",
  WEIGHT = "WEIGHT"
}

type FoodentryMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type CheckinMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}



type UserInfoMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ArticlesMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ProgramsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type CommentsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type WorkoutResultsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type SubWorkoutsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type WorkoutsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type CommentsWorkoutsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type WorkoutResultsSubWorkoutsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type WorkoutsSubWorkoutsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserWorkoutsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type EagerFoodentry = {
  readonly id: string;
  readonly date?: string | null;
  readonly category?: Foodcategory | keyof typeof Foodcategory | null;
  readonly userID: string;
  readonly desc?: string | null;
  readonly protein?: number | null;
  readonly carbs?: number | null;
  readonly fat?: number | null;
  readonly fiber?: number | null;
  readonly calories?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyFoodentry = {
  readonly id: string;
  readonly date?: string | null;
  readonly category?: Foodcategory | keyof typeof Foodcategory | null;
  readonly userID: string;
  readonly desc?: string | null;
  readonly protein?: number | null;
  readonly carbs?: number | null;
  readonly fat?: number | null;
  readonly fiber?: number | null;
  readonly calories?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Foodentry = LazyLoading extends LazyLoadingDisabled ? EagerFoodentry : LazyFoodentry

export declare const Foodentry: (new (init: ModelInit<Foodentry, FoodentryMetaData>) => Foodentry) & {
  copyOf(source: Foodentry, mutator: (draft: MutableModel<Foodentry, FoodentryMetaData>) => MutableModel<Foodentry, FoodentryMetaData> | void): Foodentry;
}

type EagerCheckin = {
  readonly id: string;
  readonly lowestweight?: number | null;
  readonly somewins?: string | null;
  readonly setbacks?: string | null;
  readonly barriers?: string | null;
  readonly sleepquality?: number | null;
  readonly appetite?: number | null;
  readonly energylevel?: number | null;
  readonly othernotes?: string | null;
  readonly waist?: string | null;
  readonly neck?: string | null;
  readonly userID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCheckin = {
  readonly id: string;
  readonly lowestweight?: number | null;
  readonly somewins?: string | null;
  readonly setbacks?: string | null;
  readonly barriers?: string | null;
  readonly sleepquality?: number | null;
  readonly appetite?: number | null;
  readonly energylevel?: number | null;
  readonly othernotes?: string | null;
  readonly waist?: string | null;
  readonly neck?: string | null;
  readonly userID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Checkin = LazyLoading extends LazyLoadingDisabled ? EagerCheckin : LazyCheckin

export declare const Checkin: (new (init: ModelInit<Checkin, CheckinMetaData>) => Checkin) & {
  copyOf(source: Checkin, mutator: (draft: MutableModel<Checkin, CheckinMetaData>) => MutableModel<Checkin, CheckinMetaData> | void): Checkin;
}

type EagerMessages = {
  readonly id: string;
  readonly message?: string | null;
  readonly sender_userid?: string | null;
  readonly receiver_userid?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyMessages = {
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
  readonly id: string;
  readonly type?: string | null;
  readonly i_gender?: string | null;
  readonly i_goals?: string | null;
  readonly i_trainingactivity?: string | null;
  readonly i_lifestyleactivity?: string | null;
  readonly i_height?: string | null;
  readonly i_height_units?: string | null;
  readonly i_weight?: string | null;
  readonly i_weight_units?: string | null;
  readonly i_neck?: string | null;
  readonly i_neck_units?: string | null;
  readonly i_waist?: string | null;
  readonly i_waist_units?: string | null;
  readonly i_hip?: string | null;
  readonly i_hip_units?: string | null;
  readonly i_body_fat_pct?: string | null;
  readonly Users?: User | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly userInfoUsersId?: string | null;
}

type LazyUserInfo = {
  readonly id: string;
  readonly type?: string | null;
  readonly i_gender?: string | null;
  readonly i_goals?: string | null;
  readonly i_trainingactivity?: string | null;
  readonly i_lifestyleactivity?: string | null;
  readonly i_height?: string | null;
  readonly i_height_units?: string | null;
  readonly i_weight?: string | null;
  readonly i_weight_units?: string | null;
  readonly i_neck?: string | null;
  readonly i_neck_units?: string | null;
  readonly i_waist?: string | null;
  readonly i_waist_units?: string | null;
  readonly i_hip?: string | null;
  readonly i_hip_units?: string | null;
  readonly i_body_fat_pct?: string | null;
  readonly Users: AsyncItem<User | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly userInfoUsersId?: string | null;
}

export declare type UserInfo = LazyLoading extends LazyLoadingDisabled ? EagerUserInfo : LazyUserInfo

export declare const UserInfo: (new (init: ModelInit<UserInfo, UserInfoMetaData>) => UserInfo) & {
  copyOf(source: UserInfo, mutator: (draft: MutableModel<UserInfo, UserInfoMetaData>) => MutableModel<UserInfo, UserInfoMetaData> | void): UserInfo;
}

type EagerArticles = {
  readonly id: string;
  readonly title?: string | null;
  readonly author?: string | null;
  readonly desc?: string | null;
  readonly date?: string | null;
  readonly video_YN?: boolean | null;
  readonly video_url?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyArticles = {
  readonly id: string;
  readonly title?: string | null;
  readonly author?: string | null;
  readonly desc?: string | null;
  readonly date?: string | null;
  readonly video_YN?: boolean | null;
  readonly video_url?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Articles = LazyLoading extends LazyLoadingDisabled ? EagerArticles : LazyArticles

export declare const Articles: (new (init: ModelInit<Articles, ArticlesMetaData>) => Articles) & {
  copyOf(source: Articles, mutator: (draft: MutableModel<Articles, ArticlesMetaData>) => MutableModel<Articles, ArticlesMetaData> | void): Articles;
}

type EagerPrograms = {
  readonly id: string;
  readonly title?: string | null;
  readonly desc?: string | null;
  readonly free?: boolean | null;
  readonly price?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPrograms = {
  readonly id: string;
  readonly title?: string | null;
  readonly desc?: string | null;
  readonly free?: boolean | null;
  readonly price?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Programs = LazyLoading extends LazyLoadingDisabled ? EagerPrograms : LazyPrograms

export declare const Programs: (new (init: ModelInit<Programs, ProgramsMetaData>) => Programs) & {
  copyOf(source: Programs, mutator: (draft: MutableModel<Programs, ProgramsMetaData>) => MutableModel<Programs, ProgramsMetaData> | void): Programs;
}

type EagerComments = {
  readonly id: string;
  readonly comment?: string | null;
  readonly userid?: string | null;
  readonly Workouts?: (CommentsWorkouts | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyComments = {
  readonly id: string;
  readonly comment?: string | null;
  readonly userid?: string | null;
  readonly Workouts: AsyncCollection<CommentsWorkouts>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Comments = LazyLoading extends LazyLoadingDisabled ? EagerComments : LazyComments

export declare const Comments: (new (init: ModelInit<Comments, CommentsMetaData>) => Comments) & {
  copyOf(source: Comments, mutator: (draft: MutableModel<Comments, CommentsMetaData>) => MutableModel<Comments, CommentsMetaData> | void): Comments;
}

type EagerWorkoutResults = {
  readonly id: string;
  readonly value?: string | null;
  readonly SubWorkouts?: (WorkoutResultsSubWorkouts | null)[] | null;
  readonly userid?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyWorkoutResults = {
  readonly id: string;
  readonly value?: string | null;
  readonly SubWorkouts: AsyncCollection<WorkoutResultsSubWorkouts>;
  readonly userid?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type WorkoutResults = LazyLoading extends LazyLoadingDisabled ? EagerWorkoutResults : LazyWorkoutResults

export declare const WorkoutResults: (new (init: ModelInit<WorkoutResults, WorkoutResultsMetaData>) => WorkoutResults) & {
  copyOf(source: WorkoutResults, mutator: (draft: MutableModel<WorkoutResults, WorkoutResultsMetaData>) => MutableModel<WorkoutResults, WorkoutResultsMetaData> | void): WorkoutResults;
}

type EagerSubWorkouts = {
  readonly id: string;
  readonly group?: string | null;
  readonly grouptitle?: string | null;
  readonly workoutss?: (WorkoutsSubWorkouts | null)[] | null;
  readonly desc?: string | null;
  readonly resultcategory?: ResultCategory | keyof typeof ResultCategory | null;
  readonly workoutresultss?: (WorkoutResultsSubWorkouts | null)[] | null;
  readonly required?: boolean | null;
  readonly timecap?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazySubWorkouts = {
  readonly id: string;
  readonly group?: string | null;
  readonly grouptitle?: string | null;
  readonly workoutss: AsyncCollection<WorkoutsSubWorkouts>;
  readonly desc?: string | null;
  readonly resultcategory?: ResultCategory | keyof typeof ResultCategory | null;
  readonly workoutresultss: AsyncCollection<WorkoutResultsSubWorkouts>;
  readonly required?: boolean | null;
  readonly timecap?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type SubWorkouts = LazyLoading extends LazyLoadingDisabled ? EagerSubWorkouts : LazySubWorkouts

export declare const SubWorkouts: (new (init: ModelInit<SubWorkouts, SubWorkoutsMetaData>) => SubWorkouts) & {
  copyOf(source: SubWorkouts, mutator: (draft: MutableModel<SubWorkouts, SubWorkoutsMetaData>) => MutableModel<SubWorkouts, SubWorkoutsMetaData> | void): SubWorkouts;
}

type EagerWorkouts = {
  readonly id: string;
  readonly title?: string | null;
  readonly desc?: string | null;
  readonly date?: string | null;
  readonly users?: (UserWorkouts | null)[] | null;
  readonly type?: string | null;
  readonly SubWorkouts?: (WorkoutsSubWorkouts | null)[] | null;
  readonly commentss?: (CommentsWorkouts | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyWorkouts = {
  readonly id: string;
  readonly title?: string | null;
  readonly desc?: string | null;
  readonly date?: string | null;
  readonly users: AsyncCollection<UserWorkouts>;
  readonly type?: string | null;
  readonly SubWorkouts: AsyncCollection<WorkoutsSubWorkouts>;
  readonly commentss: AsyncCollection<CommentsWorkouts>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Workouts = LazyLoading extends LazyLoadingDisabled ? EagerWorkouts : LazyWorkouts

export declare const Workouts: (new (init: ModelInit<Workouts, WorkoutsMetaData>) => Workouts) & {
  copyOf(source: Workouts, mutator: (draft: MutableModel<Workouts, WorkoutsMetaData>) => MutableModel<Workouts, WorkoutsMetaData> | void): Workouts;
}

type EagerUser = {
  readonly id: string;
  readonly name?: string | null;
  readonly email?: string | null;
  readonly sub?: string | null;
  readonly Workouts?: (UserWorkouts | null)[] | null;
  readonly units?: Units | keyof typeof Units | null;
  readonly nutrition_info?: boolean | null;
  readonly nutrition_coaching?: boolean | null;
  readonly q_experience?: string | null;
  readonly q_medical?: string | null;
  readonly q_calsmacros?: string | null;
  readonly coach_userid?: string | null;
  readonly Checkins?: (Checkin | null)[] | null;
  readonly Foodentries?: (Foodentry | null)[] | null;
  readonly theme?: Themes | keyof typeof Themes | null;
  readonly image?: string | null;
  readonly image_uri?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly id: string;
  readonly name?: string | null;
  readonly email?: string | null;
  readonly sub?: string | null;
  readonly Workouts: AsyncCollection<UserWorkouts>;
  readonly units?: Units | keyof typeof Units | null;
  readonly nutrition_info?: boolean | null;
  readonly nutrition_coaching?: boolean | null;
  readonly q_experience?: string | null;
  readonly q_medical?: string | null;
  readonly q_calsmacros?: string | null;
  readonly coach_userid?: string | null;
  readonly Checkins: AsyncCollection<Checkin>;
  readonly Foodentries: AsyncCollection<Foodentry>;
  readonly theme?: Themes | keyof typeof Themes | null;
  readonly image?: string | null;
  readonly image_uri?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User, UserMetaData>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}

type EagerCommentsWorkouts = {
  readonly id: string;
  readonly comments: Comments;
  readonly workouts: Workouts;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCommentsWorkouts = {
  readonly id: string;
  readonly comments: AsyncItem<Comments>;
  readonly workouts: AsyncItem<Workouts>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type CommentsWorkouts = LazyLoading extends LazyLoadingDisabled ? EagerCommentsWorkouts : LazyCommentsWorkouts

export declare const CommentsWorkouts: (new (init: ModelInit<CommentsWorkouts, CommentsWorkoutsMetaData>) => CommentsWorkouts) & {
  copyOf(source: CommentsWorkouts, mutator: (draft: MutableModel<CommentsWorkouts, CommentsWorkoutsMetaData>) => MutableModel<CommentsWorkouts, CommentsWorkoutsMetaData> | void): CommentsWorkouts;
}

type EagerWorkoutResultsSubWorkouts = {
  readonly id: string;
  readonly workoutResults: WorkoutResults;
  readonly subWorkouts: SubWorkouts;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyWorkoutResultsSubWorkouts = {
  readonly id: string;
  readonly workoutResults: AsyncItem<WorkoutResults>;
  readonly subWorkouts: AsyncItem<SubWorkouts>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type WorkoutResultsSubWorkouts = LazyLoading extends LazyLoadingDisabled ? EagerWorkoutResultsSubWorkouts : LazyWorkoutResultsSubWorkouts

export declare const WorkoutResultsSubWorkouts: (new (init: ModelInit<WorkoutResultsSubWorkouts, WorkoutResultsSubWorkoutsMetaData>) => WorkoutResultsSubWorkouts) & {
  copyOf(source: WorkoutResultsSubWorkouts, mutator: (draft: MutableModel<WorkoutResultsSubWorkouts, WorkoutResultsSubWorkoutsMetaData>) => MutableModel<WorkoutResultsSubWorkouts, WorkoutResultsSubWorkoutsMetaData> | void): WorkoutResultsSubWorkouts;
}

type EagerWorkoutsSubWorkouts = {
  readonly id: string;
  readonly subWorkouts: SubWorkouts;
  readonly workouts: Workouts;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyWorkoutsSubWorkouts = {
  readonly id: string;
  readonly subWorkouts: AsyncItem<SubWorkouts>;
  readonly workouts: AsyncItem<Workouts>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type WorkoutsSubWorkouts = LazyLoading extends LazyLoadingDisabled ? EagerWorkoutsSubWorkouts : LazyWorkoutsSubWorkouts

export declare const WorkoutsSubWorkouts: (new (init: ModelInit<WorkoutsSubWorkouts, WorkoutsSubWorkoutsMetaData>) => WorkoutsSubWorkouts) & {
  copyOf(source: WorkoutsSubWorkouts, mutator: (draft: MutableModel<WorkoutsSubWorkouts, WorkoutsSubWorkoutsMetaData>) => MutableModel<WorkoutsSubWorkouts, WorkoutsSubWorkoutsMetaData> | void): WorkoutsSubWorkouts;
}

type EagerUserWorkouts = {
  readonly id: string;
  readonly workouts: Workouts;
  readonly user: User;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUserWorkouts = {
  readonly id: string;
  readonly workouts: AsyncItem<Workouts>;
  readonly user: AsyncItem<User>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type UserWorkouts = LazyLoading extends LazyLoadingDisabled ? EagerUserWorkouts : LazyUserWorkouts

export declare const UserWorkouts: (new (init: ModelInit<UserWorkouts, UserWorkoutsMetaData>) => UserWorkouts) & {
  copyOf(source: UserWorkouts, mutator: (draft: MutableModel<UserWorkouts, UserWorkoutsMetaData>) => MutableModel<UserWorkouts, UserWorkoutsMetaData> | void): UserWorkouts;
}