/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
        Workouts {
          nextToken
        }
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
      userid
      Workouts {
        items {
          id
          commentsId
          workoutsId
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
        userid
        Workouts {
          nextToken
        }
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
      SubWorkouts {
        items {
          id
          workoutResultsId
          subWorkoutsId
          createdAt
          updatedAt
        }
        nextToken
      }
      userid
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
        SubWorkouts {
          nextToken
        }
        userid
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
      workoutss {
        items {
          id
          subWorkoutsId
          workoutsId
          createdAt
          updatedAt
        }
        nextToken
      }
      desc
      resultcategory
      workoutresultss {
        items {
          id
          workoutResultsId
          subWorkoutsId
          createdAt
          updatedAt
        }
        nextToken
      }
      required
      timecap
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
        workoutss {
          nextToken
        }
        desc
        resultcategory
        workoutresultss {
          nextToken
        }
        required
        timecap
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
      users {
        items {
          id
          workoutsId
          userId
          createdAt
          updatedAt
        }
        nextToken
      }
      type
      SubWorkouts {
        items {
          id
          subWorkoutsId
          workoutsId
          createdAt
          updatedAt
        }
        nextToken
      }
      commentss {
        items {
          id
          commentsId
          workoutsId
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
        users {
          nextToken
        }
        type
        SubWorkouts {
          nextToken
        }
        commentss {
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
      Workouts {
        items {
          id
          workoutsId
          userId
          createdAt
          updatedAt
        }
        nextToken
      }
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
        Workouts {
          nextToken
        }
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
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCommentsWorkouts = /* GraphQL */ `
  query GetCommentsWorkouts($id: ID!) {
    getCommentsWorkouts(id: $id) {
      id
      commentsId
      workoutsId
      comments {
        id
        comment
        userid
        Workouts {
          nextToken
        }
        createdAt
        updatedAt
      }
      workouts {
        id
        title
        desc
        date
        users {
          nextToken
        }
        type
        SubWorkouts {
          nextToken
        }
        commentss {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listCommentsWorkouts = /* GraphQL */ `
  query ListCommentsWorkouts(
    $filter: ModelCommentsWorkoutsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCommentsWorkouts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        commentsId
        workoutsId
        comments {
          id
          comment
          userid
          createdAt
          updatedAt
        }
        workouts {
          id
          title
          desc
          date
          type
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getWorkoutResultsSubWorkouts = /* GraphQL */ `
  query GetWorkoutResultsSubWorkouts($id: ID!) {
    getWorkoutResultsSubWorkouts(id: $id) {
      id
      workoutResultsId
      subWorkoutsId
      workoutResults {
        id
        value
        SubWorkouts {
          nextToken
        }
        userid
        createdAt
        updatedAt
      }
      subWorkouts {
        id
        group
        grouptitle
        workoutss {
          nextToken
        }
        desc
        resultcategory
        workoutresultss {
          nextToken
        }
        required
        timecap
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listWorkoutResultsSubWorkouts = /* GraphQL */ `
  query ListWorkoutResultsSubWorkouts(
    $filter: ModelWorkoutResultsSubWorkoutsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWorkoutResultsSubWorkouts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        workoutResultsId
        subWorkoutsId
        workoutResults {
          id
          value
          userid
          createdAt
          updatedAt
        }
        subWorkouts {
          id
          group
          grouptitle
          desc
          resultcategory
          required
          timecap
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getWorkoutsSubWorkouts = /* GraphQL */ `
  query GetWorkoutsSubWorkouts($id: ID!) {
    getWorkoutsSubWorkouts(id: $id) {
      id
      subWorkoutsId
      workoutsId
      subWorkouts {
        id
        group
        grouptitle
        workoutss {
          nextToken
        }
        desc
        resultcategory
        workoutresultss {
          nextToken
        }
        required
        timecap
        createdAt
        updatedAt
      }
      workouts {
        id
        title
        desc
        date
        users {
          nextToken
        }
        type
        SubWorkouts {
          nextToken
        }
        commentss {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listWorkoutsSubWorkouts = /* GraphQL */ `
  query ListWorkoutsSubWorkouts(
    $filter: ModelWorkoutsSubWorkoutsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWorkoutsSubWorkouts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        subWorkoutsId
        workoutsId
        subWorkouts {
          id
          group
          grouptitle
          desc
          resultcategory
          required
          timecap
          createdAt
          updatedAt
        }
        workouts {
          id
          title
          desc
          date
          type
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUserWorkouts = /* GraphQL */ `
  query GetUserWorkouts($id: ID!) {
    getUserWorkouts(id: $id) {
      id
      workoutsId
      userId
      workouts {
        id
        title
        desc
        date
        users {
          nextToken
        }
        type
        SubWorkouts {
          nextToken
        }
        commentss {
          nextToken
        }
        createdAt
        updatedAt
      }
      user {
        id
        name
        email
        sub
        Workouts {
          nextToken
        }
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
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listUserWorkouts = /* GraphQL */ `
  query ListUserWorkouts(
    $filter: ModelUserWorkoutsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserWorkouts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        workoutsId
        userId
        workouts {
          id
          title
          desc
          date
          type
          createdAt
          updatedAt
        }
        user {
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
export const commentsWorkoutsByCommentsId = /* GraphQL */ `
  query CommentsWorkoutsByCommentsId(
    $commentsId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCommentsWorkoutsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    commentsWorkoutsByCommentsId(
      commentsId: $commentsId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        commentsId
        workoutsId
        comments {
          id
          comment
          userid
          createdAt
          updatedAt
        }
        workouts {
          id
          title
          desc
          date
          type
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const commentsWorkoutsByWorkoutsId = /* GraphQL */ `
  query CommentsWorkoutsByWorkoutsId(
    $workoutsId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCommentsWorkoutsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    commentsWorkoutsByWorkoutsId(
      workoutsId: $workoutsId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        commentsId
        workoutsId
        comments {
          id
          comment
          userid
          createdAt
          updatedAt
        }
        workouts {
          id
          title
          desc
          date
          type
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const workoutResultsSubWorkoutsByWorkoutResultsId = /* GraphQL */ `
  query WorkoutResultsSubWorkoutsByWorkoutResultsId(
    $workoutResultsId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelWorkoutResultsSubWorkoutsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    workoutResultsSubWorkoutsByWorkoutResultsId(
      workoutResultsId: $workoutResultsId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        workoutResultsId
        subWorkoutsId
        workoutResults {
          id
          value
          userid
          createdAt
          updatedAt
        }
        subWorkouts {
          id
          group
          grouptitle
          desc
          resultcategory
          required
          timecap
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const workoutResultsSubWorkoutsBySubWorkoutsId = /* GraphQL */ `
  query WorkoutResultsSubWorkoutsBySubWorkoutsId(
    $subWorkoutsId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelWorkoutResultsSubWorkoutsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    workoutResultsSubWorkoutsBySubWorkoutsId(
      subWorkoutsId: $subWorkoutsId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        workoutResultsId
        subWorkoutsId
        workoutResults {
          id
          value
          userid
          createdAt
          updatedAt
        }
        subWorkouts {
          id
          group
          grouptitle
          desc
          resultcategory
          required
          timecap
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const workoutsSubWorkoutsBySubWorkoutsId = /* GraphQL */ `
  query WorkoutsSubWorkoutsBySubWorkoutsId(
    $subWorkoutsId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelWorkoutsSubWorkoutsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    workoutsSubWorkoutsBySubWorkoutsId(
      subWorkoutsId: $subWorkoutsId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        subWorkoutsId
        workoutsId
        subWorkouts {
          id
          group
          grouptitle
          desc
          resultcategory
          required
          timecap
          createdAt
          updatedAt
        }
        workouts {
          id
          title
          desc
          date
          type
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const workoutsSubWorkoutsByWorkoutsId = /* GraphQL */ `
  query WorkoutsSubWorkoutsByWorkoutsId(
    $workoutsId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelWorkoutsSubWorkoutsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    workoutsSubWorkoutsByWorkoutsId(
      workoutsId: $workoutsId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        subWorkoutsId
        workoutsId
        subWorkouts {
          id
          group
          grouptitle
          desc
          resultcategory
          required
          timecap
          createdAt
          updatedAt
        }
        workouts {
          id
          title
          desc
          date
          type
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const userWorkoutsByWorkoutsId = /* GraphQL */ `
  query UserWorkoutsByWorkoutsId(
    $workoutsId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelUserWorkoutsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userWorkoutsByWorkoutsId(
      workoutsId: $workoutsId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        workoutsId
        userId
        workouts {
          id
          title
          desc
          date
          type
          createdAt
          updatedAt
        }
        user {
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
      }
      nextToken
    }
  }
`;
export const userWorkoutsByUserId = /* GraphQL */ `
  query UserWorkoutsByUserId(
    $userId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelUserWorkoutsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userWorkoutsByUserId(
      userId: $userId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        workoutsId
        userId
        workouts {
          id
          title
          desc
          date
          type
          createdAt
          updatedAt
        }
        user {
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
      }
      nextToken
    }
  }
`;
