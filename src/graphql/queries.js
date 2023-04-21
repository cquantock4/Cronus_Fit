/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSavedWorkouts = /* GraphQL */ `
  query GetSavedWorkouts($id: ID!) {
    getSavedWorkouts(id: $id) {
      id
      userID
      workoutsID
      createdAt
      updatedAt
    }
  }
`;
export const listSavedWorkouts = /* GraphQL */ `
  query ListSavedWorkouts(
    $filter: ModelSavedWorkoutsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSavedWorkouts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userID
        workoutsID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getFoodentry = /* GraphQL */ `
  query GetFoodentry($id: ID!) {
    getFoodentry(id: $id) {
      id
      date
      category
      userID
      desc
      protein
      carbs
      fat
      fiber
      calories
      createdAt
      updatedAt
    }
  }
`;
export const listFoodentries = /* GraphQL */ `
  query ListFoodentries(
    $filter: ModelFoodentryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFoodentries(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        date
        category
        userID
        desc
        protein
        carbs
        fat
        fiber
        calories
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCheckin = /* GraphQL */ `
  query GetCheckin($id: ID!) {
    getCheckin(id: $id) {
      id
      lowestweight
      somewins
      setbacks
      barriers
      sleepquality
      appetite
      energylevel
      othernotes
      waist
      neck
      userID
      createdAt
      updatedAt
    }
  }
`;
export const listCheckins = /* GraphQL */ `
  query ListCheckins(
    $filter: ModelCheckinFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCheckins(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        lowestweight
        somewins
        setbacks
        barriers
        sleepquality
        appetite
        energylevel
        othernotes
        waist
        neck
        userID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getMessages = /* GraphQL */ `
  query GetMessages($id: ID!) {
    getMessages(id: $id) {
      id
      message
      sender_userid
      receiver_userid
      createdAt
      updatedAt
    }
  }
`;
export const listMessages = /* GraphQL */ `
  query ListMessages(
    $filter: ModelMessagesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        message
        sender_userid
        receiver_userid
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUserInfo = /* GraphQL */ `
  query GetUserInfo($id: ID!) {
    getUserInfo(id: $id) {
      id
      type
      i_gender
      i_goals
      i_trainingactivity
      i_lifestyleactivity
      i_height
      i_height_units
      i_weight
      i_weight_units
      i_neck
      i_neck_units
      i_waist
      i_waist_units
      i_hip
      i_hip_units
      i_body_fat_pct
      Users {
        id
        name
        email
        sub
        units
        nutrition_info
        nutrition_coaching
        q_experience
        q_medical
        q_calsmacros
        coach_userid
        Checkins {
          nextToken
        }
        Foodentries {
          nextToken
        }
        theme
        image
        image_uri
        WorkoutResults {
          nextToken
        }
        Comments {
          nextToken
        }
        SavedWorkouts {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      userInfoUsersId
    }
  }
`;
export const listUserInfos = /* GraphQL */ `
  query ListUserInfos(
    $filter: ModelUserInfoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserInfos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        type
        i_gender
        i_goals
        i_trainingactivity
        i_lifestyleactivity
        i_height
        i_height_units
        i_weight
        i_weight_units
        i_neck
        i_neck_units
        i_waist
        i_waist_units
        i_hip
        i_hip_units
        i_body_fat_pct
        Users {
          id
          name
          email
          sub
          units
          nutrition_info
          nutrition_coaching
          q_experience
          q_medical
          q_calsmacros
          coach_userid
          theme
          image
          image_uri
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
        userInfoUsersId
      }
      nextToken
    }
  }
`;
export const getArticles = /* GraphQL */ `
  query GetArticles($id: ID!) {
    getArticles(id: $id) {
      id
      title
      author
      desc
      date
      video_YN
      video_url
      createdAt
      updatedAt
    }
  }
`;
export const listArticles = /* GraphQL */ `
  query ListArticles(
    $filter: ModelArticlesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listArticles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        author
        desc
        date
        video_YN
        video_url
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPrograms = /* GraphQL */ `
  query GetPrograms($id: ID!) {
    getPrograms(id: $id) {
      id
      title
      desc
      free
      price
      createdAt
      updatedAt
    }
  }
`;
export const listPrograms = /* GraphQL */ `
  query ListPrograms(
    $filter: ModelProgramsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPrograms(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        desc
        free
        price
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getComments = /* GraphQL */ `
  query GetComments($id: ID!) {
    getComments(id: $id) {
      id
      comment
      workoutsID
      userID
      createdAt
      updatedAt
    }
  }
`;
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        comment
        workoutsID
        userID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getWorkoutResults = /* GraphQL */ `
  query GetWorkoutResults($id: ID!) {
    getWorkoutResults(id: $id) {
      id
      value
      subworkoutsID
      userID
      createdAt
      updatedAt
    }
  }
`;
export const listWorkoutResults = /* GraphQL */ `
  query ListWorkoutResults(
    $filter: ModelWorkoutResultsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWorkoutResults(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        value
        subworkoutsID
        userID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getSubWorkouts = /* GraphQL */ `
  query GetSubWorkouts($id: ID!) {
    getSubWorkouts(id: $id) {
      id
      group
      grouptitle
      desc
      resultcategory
      workoutresultss {
        items {
          id
          value
          subworkoutsID
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
      required
      timecap
      workoutsID
      createdAt
      updatedAt
    }
  }
`;
export const listSubWorkouts = /* GraphQL */ `
  query ListSubWorkouts(
    $filter: ModelSubWorkoutsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSubWorkouts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        group
        grouptitle
        desc
        resultcategory
        workoutresultss {
          nextToken
        }
        required
        timecap
        workoutsID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getWorkouts = /* GraphQL */ `
  query GetWorkouts($id: ID!) {
    getWorkouts(id: $id) {
      id
      title
      desc
      date
      type
      SubWorkouts {
        items {
          id
          group
          grouptitle
          desc
          resultcategory
          required
          timecap
          workoutsID
          createdAt
          updatedAt
        }
        nextToken
      }
      commentss {
        items {
          id
          comment
          workoutsID
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
      SavedWorkouts {
        items {
          id
          userID
          workoutsID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listWorkouts = /* GraphQL */ `
  query ListWorkouts(
    $filter: ModelWorkoutsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWorkouts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        desc
        date
        type
        SubWorkouts {
          nextToken
        }
        commentss {
          nextToken
        }
        SavedWorkouts {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      email
      sub
      units
      nutrition_info
      nutrition_coaching
      q_experience
      q_medical
      q_calsmacros
      coach_userid
      Checkins {
        items {
          id
          lowestweight
          somewins
          setbacks
          barriers
          sleepquality
          appetite
          energylevel
          othernotes
          waist
          neck
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
      Foodentries {
        items {
          id
          date
          category
          userID
          desc
          protein
          carbs
          fat
          fiber
          calories
          createdAt
          updatedAt
        }
        nextToken
      }
      theme
      image
      image_uri
      WorkoutResults {
        items {
          id
          value
          subworkoutsID
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
      Comments {
        items {
          id
          comment
          workoutsID
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
      SavedWorkouts {
        items {
          id
          userID
          workoutsID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        email
        sub
        units
        nutrition_info
        nutrition_coaching
        q_experience
        q_medical
        q_calsmacros
        coach_userid
        Checkins {
          nextToken
        }
        Foodentries {
          nextToken
        }
        theme
        image
        image_uri
        WorkoutResults {
          nextToken
        }
        Comments {
          nextToken
        }
        SavedWorkouts {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const savedWorkoutsByUserID = /* GraphQL */ `
  query SavedWorkoutsByUserID(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelSavedWorkoutsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    savedWorkoutsByUserID(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userID
        workoutsID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const savedWorkoutsByWorkoutsID = /* GraphQL */ `
  query SavedWorkoutsByWorkoutsID(
    $workoutsID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelSavedWorkoutsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    savedWorkoutsByWorkoutsID(
      workoutsID: $workoutsID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userID
        workoutsID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const foodentriesByUserID = /* GraphQL */ `
  query FoodentriesByUserID(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelFoodentryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    foodentriesByUserID(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        date
        category
        userID
        desc
        protein
        carbs
        fat
        fiber
        calories
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const checkinsByUserID = /* GraphQL */ `
  query CheckinsByUserID(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCheckinFilterInput
    $limit: Int
    $nextToken: String
  ) {
    checkinsByUserID(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        lowestweight
        somewins
        setbacks
        barriers
        sleepquality
        appetite
        energylevel
        othernotes
        waist
        neck
        userID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const commentsByWorkoutsID = /* GraphQL */ `
  query CommentsByWorkoutsID(
    $workoutsID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCommentsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    commentsByWorkoutsID(
      workoutsID: $workoutsID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        comment
        workoutsID
        userID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const commentsByUserID = /* GraphQL */ `
  query CommentsByUserID(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCommentsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    commentsByUserID(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        comment
        workoutsID
        userID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const workoutResultsBySubworkoutsID = /* GraphQL */ `
  query WorkoutResultsBySubworkoutsID(
    $subworkoutsID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelWorkoutResultsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    workoutResultsBySubworkoutsID(
      subworkoutsID: $subworkoutsID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        value
        subworkoutsID
        userID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const workoutResultsByUserID = /* GraphQL */ `
  query WorkoutResultsByUserID(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelWorkoutResultsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    workoutResultsByUserID(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        value
        subworkoutsID
        userID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const subWorkoutsByWorkoutsID = /* GraphQL */ `
  query SubWorkoutsByWorkoutsID(
    $workoutsID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelSubWorkoutsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    subWorkoutsByWorkoutsID(
      workoutsID: $workoutsID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        group
        grouptitle
        desc
        resultcategory
        workoutresultss {
          nextToken
        }
        required
        timecap
        workoutsID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
