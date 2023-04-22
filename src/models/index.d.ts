import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
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



type EagerFoodentry = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Foodentry, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
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
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Foodentry, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
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

export declare const Foodentry: (new (init: ModelInit<Foodentry>) => Foodentry) & {
  copyOf(source: Foodentry, mutator: (draft: MutableModel<Foodentry>) => MutableModel<Foodentry> | void): Foodentry;
}

type EagerCheckin = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Checkin, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
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
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Checkin, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
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

export declare const Checkin: (new (init: ModelInit<Checkin>) => Checkin) & {
  copyOf(source: Checkin, mutator: (draft: MutableModel<Checkin>) => MutableModel<Checkin> | void): Checkin;
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
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
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
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserInfo, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
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
  readonly author?: string | null;
  readonly desc?: string | null;
  readonly date?: string | null;
  readonly video_YN?: boolean | null;
  readonly video_url?: string | null;
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
  readonly author?: string | null;
  readonly desc?: string | null;
  readonly date?: string | null;
  readonly video_YN?: boolean | null;
  readonly video_url?: string | null;
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
  readonly price?: number | null;
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
  readonly price?: number | null;
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
  readonly userid?: string | null;
  readonly Workouts?: (CommentsWorkouts | null)[] | null;
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
  readonly userid?: string | null;
  readonly Workouts: AsyncCollection<CommentsWorkouts>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Comments = LazyLoading extends LazyLoadingDisabled ? EagerComments : LazyComments

export declare const Comments: (new (init: ModelInit<Comments>) => Comments) & {
  copyOf(source: Comments, mutator: (draft: MutableModel<Comments>) => MutableModel<Comments> | void): Comments;
}

type EagerWorkoutResults = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<WorkoutResults, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly value?: string | null;
  readonly SubWorkouts?: (WorkoutResultsSubWorkouts | null)[] | null;
  readonly userid?: string | null;
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
  readonly SubWorkouts: AsyncCollection<WorkoutResultsSubWorkouts>;
  readonly userid?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type WorkoutResults = LazyLoading extends LazyLoadingDisabled ? EagerWorkoutResults : LazyWorkoutResults

export declare const WorkoutResults: (new (init: ModelInit<WorkoutResults>) => WorkoutResults) & {
  copyOf(source: WorkoutResults, mutator: (draft: MutableModel<WorkoutResults>) => MutableModel<WorkoutResults> | void): WorkoutResults;
}

type EagerSubWorkouts = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SubWorkouts, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
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
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SubWorkouts, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
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

export declare const SubWorkouts: (new (init: ModelInit<SubWorkouts>) => SubWorkouts) & {
  copyOf(source: SubWorkouts, mutator: (draft: MutableModel<SubWorkouts>) => MutableModel<SubWorkouts> | void): SubWorkouts;
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
  readonly users?: (UserWorkouts | null)[] | null;
  readonly type?: string | null;
  readonly SubWorkouts?: (WorkoutsSubWorkouts | null)[] | null;
  readonly commentss?: (CommentsWorkouts | null)[] | null;
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
  readonly users: AsyncCollection<UserWorkouts>;
  readonly type?: string | null;
  readonly SubWorkouts: AsyncCollection<WorkoutsSubWorkouts>;
  readonly commentss: AsyncCollection<CommentsWorkouts>;
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
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
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
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
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

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

type EagerCommentsWorkouts = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<CommentsWorkouts, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly commentsId?: string | null;
  readonly workoutsId?: string | null;
  readonly comments: Comments;
  readonly workouts: Workouts;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCommentsWorkouts = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<CommentsWorkouts, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly commentsId?: string | null;
  readonly workoutsId?: string | null;
  readonly comments: AsyncItem<Comments>;
  readonly workouts: AsyncItem<Workouts>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type CommentsWorkouts = LazyLoading extends LazyLoadingDisabled ? EagerCommentsWorkouts : LazyCommentsWorkouts

export declare const CommentsWorkouts: (new (init: ModelInit<CommentsWorkouts>) => CommentsWorkouts) & {
  copyOf(source: CommentsWorkouts, mutator: (draft: MutableModel<CommentsWorkouts>) => MutableModel<CommentsWorkouts> | void): CommentsWorkouts;
}

type EagerWorkoutResultsSubWorkouts = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<WorkoutResultsSubWorkouts, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly workoutResultsId?: string | null;
  readonly subWorkoutsId?: string | null;
  readonly workoutResults: WorkoutResults;
  readonly subWorkouts: SubWorkouts;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyWorkoutResultsSubWorkouts = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<WorkoutResultsSubWorkouts, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly workoutResultsId?: string | null;
  readonly subWorkoutsId?: string | null;
  readonly workoutResults: AsyncItem<WorkoutResults>;
  readonly subWorkouts: AsyncItem<SubWorkouts>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type WorkoutResultsSubWorkouts = LazyLoading extends LazyLoadingDisabled ? EagerWorkoutResultsSubWorkouts : LazyWorkoutResultsSubWorkouts

export declare const WorkoutResultsSubWorkouts: (new (init: ModelInit<WorkoutResultsSubWorkouts>) => WorkoutResultsSubWorkouts) & {
  copyOf(source: WorkoutResultsSubWorkouts, mutator: (draft: MutableModel<WorkoutResultsSubWorkouts>) => MutableModel<WorkoutResultsSubWorkouts> | void): WorkoutResultsSubWorkouts;
}

type EagerWorkoutsSubWorkouts = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<WorkoutsSubWorkouts, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly subWorkoutsId?: string | null;
  readonly workoutsId?: string | null;
  readonly subWorkouts: SubWorkouts;
  readonly workouts: Workouts;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyWorkoutsSubWorkouts = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<WorkoutsSubWorkouts, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly subWorkoutsId?: string | null;
  readonly workoutsId?: string | null;
  readonly subWorkouts: AsyncItem<SubWorkouts>;
  readonly workouts: AsyncItem<Workouts>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type WorkoutsSubWorkouts = LazyLoading extends LazyLoadingDisabled ? EagerWorkoutsSubWorkouts : LazyWorkoutsSubWorkouts

export declare const WorkoutsSubWorkouts: (new (init: ModelInit<WorkoutsSubWorkouts>) => WorkoutsSubWorkouts) & {
  copyOf(source: WorkoutsSubWorkouts, mutator: (draft: MutableModel<WorkoutsSubWorkouts>) => MutableModel<WorkoutsSubWorkouts> | void): WorkoutsSubWorkouts;
}

type EagerUserWorkouts = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserWorkouts, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly workoutsId?: string | null;
  readonly userId?: string | null;
  readonly workouts: Workouts;
  readonly user: User;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUserWorkouts = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserWorkouts, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly workoutsId?: string | null;
  readonly userId?: string | null;
  readonly workouts: AsyncItem<Workouts>;
  readonly user: AsyncItem<User>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type UserWorkouts = LazyLoading extends LazyLoadingDisabled ? EagerUserWorkouts : LazyUserWorkouts

export declare const UserWorkouts: (new (init: ModelInit<UserWorkouts>) => UserWorkouts) & {
  copyOf(source: UserWorkouts, mutator: (draft: MutableModel<UserWorkouts>) => MutableModel<UserWorkouts> | void): UserWorkouts;
}