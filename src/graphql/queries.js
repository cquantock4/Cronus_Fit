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
      _version
      _deleted
      _lastChangedAt
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
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncSavedWorkouts = /* GraphQL */ `
  query SyncSavedWorkouts(
    $filter: ModelSavedWorkoutsFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncSavedWorkouts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        userID
        workoutsID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
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
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
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
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
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
      _version
      _deleted
      _lastChangedAt
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
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncFoodentries = /* GraphQL */ `
  query SyncFoodentries(
    $filter: ModelFoodentryFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncFoodentries(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
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
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
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
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
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
      _version
      _deleted
      _lastChangedAt
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
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncCheckins = /* GraphQL */ `
  query SyncCheckins(
    $filter: ModelCheckinFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncCheckins(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
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
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
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
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
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
      _version
      _deleted
      _lastChangedAt
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
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncMessages = /* GraphQL */ `
  query SyncMessages(
    $filter: ModelMessagesFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncMessages(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        message
        sender_userid
        receiver_userid
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
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
          startedAt
        }
        Foodentries {
          nextToken
          startedAt
        }
        theme
        image
        image_uri
        WorkoutResults {
          nextToken
          startedAt
        }
        Comments {
          nextToken
          startedAt
        }
        SavedWorkouts {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
          _version
          _deleted
          _lastChangedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        userInfoUsersId
      }
      nextToken
      startedAt
    }
  }
`;
export const syncUserInfos = /* GraphQL */ `
  query SyncUserInfos(
    $filter: ModelUserInfoFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUserInfos(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
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
          _version
          _deleted
          _lastChangedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        userInfoUsersId
      }
      nextToken
      startedAt
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
      _version
      _deleted
      _lastChangedAt
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
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncArticles = /* GraphQL */ `
  query SyncArticles(
    $filter: ModelArticlesFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncArticles(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
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
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
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
      _version
      _deleted
      _lastChangedAt
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
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncPrograms = /* GraphQL */ `
  query SyncPrograms(
    $filter: ModelProgramsFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncPrograms(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        title
        desc
        free
        price
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
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
      _version
      _deleted
      _lastChangedAt
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
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncComments = /* GraphQL */ `
  query SyncComments(
    $filter: ModelCommentsFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncComments(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        comment
        workoutsID
        userID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
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
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
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
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
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
      _version
      _deleted
      _lastChangedAt
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
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncWorkoutResults = /* GraphQL */ `
  query SyncWorkoutResults(
    $filter: ModelWorkoutResultsFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncWorkoutResults(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        value
        subworkoutsID
        userID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
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
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
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
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
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
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      required
      timecap
      workoutsID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
          startedAt
        }
        required
        timecap
        workoutsID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncSubWorkouts = /* GraphQL */ `
  query SyncSubWorkouts(
    $filter: ModelSubWorkoutsFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncSubWorkouts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        group
        grouptitle
        desc
        resultcategory
        workoutresultss {
          nextToken
          startedAt
        }
        required
        timecap
        workoutsID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
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
          startedAt
        }
        required
        timecap
        workoutsID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
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
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      commentss {
        items {
          id
          comment
          workoutsID
          userID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      SavedWorkouts {
        items {
          id
          userID
          workoutsID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
          startedAt
        }
        commentss {
          nextToken
          startedAt
        }
        SavedWorkouts {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncWorkouts = /* GraphQL */ `
  query SyncWorkouts(
    $filter: ModelWorkoutsFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncWorkouts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        title
        desc
        date
        type
        SubWorkouts {
          nextToken
          startedAt
        }
        commentss {
          nextToken
          startedAt
        }
        SavedWorkouts {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
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
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
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
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
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
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Comments {
        items {
          id
          comment
          workoutsID
          userID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      SavedWorkouts {
        items {
          id
          userID
          workoutsID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
          startedAt
        }
        Foodentries {
          nextToken
          startedAt
        }
        theme
        image
        image_uri
        WorkoutResults {
          nextToken
          startedAt
        }
        Comments {
          nextToken
          startedAt
        }
        SavedWorkouts {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncUsers = /* GraphQL */ `
  query SyncUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUsers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
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
          startedAt
        }
        Foodentries {
          nextToken
          startedAt
        }
        theme
        image
        image_uri
        WorkoutResults {
          nextToken
          startedAt
        }
        Comments {
          nextToken
          startedAt
        }
        SavedWorkouts {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
