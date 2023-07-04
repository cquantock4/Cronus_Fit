/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getWorkoutNotes = /* GraphQL */ `
  query GetWorkoutNotes($id: ID!) {
    getWorkoutNotes(id: $id) {
      id
      note
      workoutsID
      userID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listWorkoutNotes = /* GraphQL */ `
  query ListWorkoutNotes(
    $filter: ModelWorkoutNotesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWorkoutNotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        note
        workoutsID
        userID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncWorkoutNotes = /* GraphQL */ `
  query SyncWorkoutNotes(
    $filter: ModelWorkoutNotesFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncWorkoutNotes(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        note
        workoutsID
        userID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const workoutNotesByWorkoutsID = /* GraphQL */ `
  query WorkoutNotesByWorkoutsID(
    $workoutsID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelWorkoutNotesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    workoutNotesByWorkoutsID(
      workoutsID: $workoutsID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        note
        workoutsID
        userID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const workoutNotesByUserID = /* GraphQL */ `
  query WorkoutNotesByUserID(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelWorkoutNotesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    workoutNotesByUserID(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        note
        workoutsID
        userID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getCheckListItems = /* GraphQL */ `
  query GetCheckListItems($id: ID!) {
    getCheckListItems(id: $id) {
      id
      key
      value
      frequency
      users {
        items {
          id
          checkListItemsId
          userId
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listCheckListItems = /* GraphQL */ `
  query ListCheckListItems(
    $filter: ModelCheckListItemsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCheckListItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        key
        value
        frequency
        users {
          nextToken
          startedAt
          __typename
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncCheckListItems = /* GraphQL */ `
  query SyncCheckListItems(
    $filter: ModelCheckListItemsFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncCheckListItems(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        key
        value
        frequency
        users {
          nextToken
          startedAt
          __typename
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
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
      __typename
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
        __typename
      }
      nextToken
      startedAt
      __typename
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
        __typename
      }
      nextToken
      startedAt
      __typename
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
        __typename
      }
      nextToken
      startedAt
      __typename
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
        __typename
      }
      nextToken
      startedAt
      __typename
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
      generalnotes
      photo_1
      photo_2
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
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
        generalnotes
        photo_1
        photo_2
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
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
        generalnotes
        photo_1
        photo_2
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
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
        generalnotes
        photo_1
        photo_2
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getFoodEntry = /* GraphQL */ `
  query GetFoodEntry($id: ID!) {
    getFoodEntry(id: $id) {
      id
      date
      category
      desc
      protein
      carbs
      fat
      fiber
      calories
      userID
      servingsize
      quantity
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listFoodEntries = /* GraphQL */ `
  query ListFoodEntries(
    $filter: ModelFoodEntryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFoodEntries(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        date
        category
        desc
        protein
        carbs
        fat
        fiber
        calories
        userID
        servingsize
        quantity
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncFoodEntries = /* GraphQL */ `
  query SyncFoodEntries(
    $filter: ModelFoodEntryFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncFoodEntries(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        date
        category
        desc
        protein
        carbs
        fat
        fiber
        calories
        userID
        servingsize
        quantity
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const foodEntriesByUserID = /* GraphQL */ `
  query FoodEntriesByUserID(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelFoodEntryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    foodEntriesByUserID(
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
        desc
        protein
        carbs
        fat
        fiber
        calories
        userID
        servingsize
        quantity
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
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
      __typename
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
        __typename
      }
      nextToken
      startedAt
      __typename
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
        __typename
      }
      nextToken
      startedAt
      __typename
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
      i_weight
      i_neck
      i_waist
      i_hip
      i_hip_units
      i_body_fat_pct
      User {
        id
        name
        email
        sub
        nutrition_info
        nutrition_coaching
        q_experience
        q_medical
        q_calcmacros
        coach_userid
        theme
        image
        image_uri
        Checkins {
          nextToken
          startedAt
          __typename
        }
        Foodentries {
          nextToken
          startedAt
          __typename
        }
        WorkoutResults {
          nextToken
          startedAt
          __typename
        }
        Comments {
          nextToken
          startedAt
          __typename
        }
        SavedWorkouts {
          nextToken
          startedAt
          __typename
        }
        coach_yn
        updatedAt
        default_workout_type
        CheckListItems {
          nextToken
          startedAt
          __typename
        }
        workout_logs
        WorkoutNotes {
          nextToken
          startedAt
          __typename
        }
        createdAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      goal_protein
      goal_carb
      goal_fat
      goal_fiber
      updatedAt
      createdAt
      _version
      _deleted
      _lastChangedAt
      userInfoUserId
      __typename
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
        i_weight
        i_neck
        i_waist
        i_hip
        i_hip_units
        i_body_fat_pct
        User {
          id
          name
          email
          sub
          nutrition_info
          nutrition_coaching
          q_experience
          q_medical
          q_calcmacros
          coach_userid
          theme
          image
          image_uri
          coach_yn
          updatedAt
          default_workout_type
          workout_logs
          createdAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        goal_protein
        goal_carb
        goal_fat
        goal_fiber
        updatedAt
        createdAt
        _version
        _deleted
        _lastChangedAt
        userInfoUserId
        __typename
      }
      nextToken
      startedAt
      __typename
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
        i_weight
        i_neck
        i_waist
        i_hip
        i_hip_units
        i_body_fat_pct
        User {
          id
          name
          email
          sub
          nutrition_info
          nutrition_coaching
          q_experience
          q_medical
          q_calcmacros
          coach_userid
          theme
          image
          image_uri
          coach_yn
          updatedAt
          default_workout_type
          workout_logs
          createdAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        goal_protein
        goal_carb
        goal_fat
        goal_fiber
        updatedAt
        createdAt
        _version
        _deleted
        _lastChangedAt
        userInfoUserId
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getArticles = /* GraphQL */ `
  query GetArticles($id: ID!) {
    getArticles(id: $id) {
      id
      title
      desc
      storage_path
      date
      data_type
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
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
        desc
        storage_path
        date
        data_type
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
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
        desc
        storage_path
        date
        data_type
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
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
      downloadurl
      data_type
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
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
        downloadurl
        data_type
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
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
        downloadurl
        data_type
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getComments = /* GraphQL */ `
  query GetComments($id: ID!) {
    getComments(id: $id) {
      id
      comment
      userID
      workoutsID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
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
        userID
        workoutsID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
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
        userID
        workoutsID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
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
        userID
        workoutsID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
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
        userID
        workoutsID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
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
      required
      timecap
      workoutsID
      WorkoutResults {
        items {
          id
          value
          userID
          subworkoutsID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      numitems
      order
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
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
        required
        timecap
        workoutsID
        WorkoutResults {
          nextToken
          startedAt
          __typename
        }
        numitems
        order
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
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
        required
        timecap
        workoutsID
        WorkoutResults {
          nextToken
          startedAt
          __typename
        }
        numitems
        order
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
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
        required
        timecap
        workoutsID
        WorkoutResults {
          nextToken
          startedAt
          __typename
        }
        numitems
        order
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getWorkoutResults = /* GraphQL */ `
  query GetWorkoutResults($id: ID!) {
    getWorkoutResults(id: $id) {
      id
      value
      userID
      subworkoutsID
      User {
        id
        name
        email
        sub
        nutrition_info
        nutrition_coaching
        q_experience
        q_medical
        q_calcmacros
        coach_userid
        theme
        image
        image_uri
        Checkins {
          nextToken
          startedAt
          __typename
        }
        Foodentries {
          nextToken
          startedAt
          __typename
        }
        WorkoutResults {
          nextToken
          startedAt
          __typename
        }
        Comments {
          nextToken
          startedAt
          __typename
        }
        SavedWorkouts {
          nextToken
          startedAt
          __typename
        }
        coach_yn
        updatedAt
        default_workout_type
        CheckListItems {
          nextToken
          startedAt
          __typename
        }
        workout_logs
        WorkoutNotes {
          nextToken
          startedAt
          __typename
        }
        createdAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
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
        userID
        subworkoutsID
        User {
          id
          name
          email
          sub
          nutrition_info
          nutrition_coaching
          q_experience
          q_medical
          q_calcmacros
          coach_userid
          theme
          image
          image_uri
          coach_yn
          updatedAt
          default_workout_type
          workout_logs
          createdAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
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
        userID
        subworkoutsID
        User {
          id
          name
          email
          sub
          nutrition_info
          nutrition_coaching
          q_experience
          q_medical
          q_calcmacros
          coach_userid
          theme
          image
          image_uri
          coach_yn
          updatedAt
          default_workout_type
          workout_logs
          createdAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
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
        userID
        subworkoutsID
        User {
          id
          name
          email
          sub
          nutrition_info
          nutrition_coaching
          q_experience
          q_medical
          q_calcmacros
          coach_userid
          theme
          image
          image_uri
          coach_yn
          updatedAt
          default_workout_type
          workout_logs
          createdAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
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
        userID
        subworkoutsID
        User {
          id
          name
          email
          sub
          nutrition_info
          nutrition_coaching
          q_experience
          q_medical
          q_calcmacros
          coach_userid
          theme
          image
          image_uri
          coach_yn
          updatedAt
          default_workout_type
          workout_logs
          createdAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
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
          numitems
          order
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      Comments {
        items {
          id
          comment
          userID
          workoutsID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
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
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      workout_type
      WorkoutNotes {
        items {
          id
          note
          workoutsID
          userID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
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
        SubWorkouts {
          nextToken
          startedAt
          __typename
        }
        Comments {
          nextToken
          startedAt
          __typename
        }
        SavedWorkouts {
          nextToken
          startedAt
          __typename
        }
        workout_type
        WorkoutNotes {
          nextToken
          startedAt
          __typename
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
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
        SubWorkouts {
          nextToken
          startedAt
          __typename
        }
        Comments {
          nextToken
          startedAt
          __typename
        }
        SavedWorkouts {
          nextToken
          startedAt
          __typename
        }
        workout_type
        WorkoutNotes {
          nextToken
          startedAt
          __typename
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
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
      nutrition_info
      nutrition_coaching
      q_experience
      q_medical
      q_calcmacros
      coach_userid
      theme
      image
      image_uri
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
          generalnotes
          photo_1
          photo_2
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      Foodentries {
        items {
          id
          date
          category
          desc
          protein
          carbs
          fat
          fiber
          calories
          userID
          servingsize
          quantity
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      WorkoutResults {
        items {
          id
          value
          userID
          subworkoutsID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      Comments {
        items {
          id
          comment
          userID
          workoutsID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
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
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      coach_yn
      updatedAt
      default_workout_type
      CheckListItems {
        items {
          id
          checkListItemsId
          userId
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      workout_logs
      WorkoutNotes {
        items {
          id
          note
          workoutsID
          userID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      createdAt
      _version
      _deleted
      _lastChangedAt
      __typename
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
        nutrition_info
        nutrition_coaching
        q_experience
        q_medical
        q_calcmacros
        coach_userid
        theme
        image
        image_uri
        Checkins {
          nextToken
          startedAt
          __typename
        }
        Foodentries {
          nextToken
          startedAt
          __typename
        }
        WorkoutResults {
          nextToken
          startedAt
          __typename
        }
        Comments {
          nextToken
          startedAt
          __typename
        }
        SavedWorkouts {
          nextToken
          startedAt
          __typename
        }
        coach_yn
        updatedAt
        default_workout_type
        CheckListItems {
          nextToken
          startedAt
          __typename
        }
        workout_logs
        WorkoutNotes {
          nextToken
          startedAt
          __typename
        }
        createdAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
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
        nutrition_info
        nutrition_coaching
        q_experience
        q_medical
        q_calcmacros
        coach_userid
        theme
        image
        image_uri
        Checkins {
          nextToken
          startedAt
          __typename
        }
        Foodentries {
          nextToken
          startedAt
          __typename
        }
        WorkoutResults {
          nextToken
          startedAt
          __typename
        }
        Comments {
          nextToken
          startedAt
          __typename
        }
        SavedWorkouts {
          nextToken
          startedAt
          __typename
        }
        coach_yn
        updatedAt
        default_workout_type
        CheckListItems {
          nextToken
          startedAt
          __typename
        }
        workout_logs
        WorkoutNotes {
          nextToken
          startedAt
          __typename
        }
        createdAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getUserCheckListItems = /* GraphQL */ `
  query GetUserCheckListItems($id: ID!) {
    getUserCheckListItems(id: $id) {
      id
      checkListItemsId
      userId
      checkListItems {
        id
        key
        value
        frequency
        users {
          nextToken
          startedAt
          __typename
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      user {
        id
        name
        email
        sub
        nutrition_info
        nutrition_coaching
        q_experience
        q_medical
        q_calcmacros
        coach_userid
        theme
        image
        image_uri
        Checkins {
          nextToken
          startedAt
          __typename
        }
        Foodentries {
          nextToken
          startedAt
          __typename
        }
        WorkoutResults {
          nextToken
          startedAt
          __typename
        }
        Comments {
          nextToken
          startedAt
          __typename
        }
        SavedWorkouts {
          nextToken
          startedAt
          __typename
        }
        coach_yn
        updatedAt
        default_workout_type
        CheckListItems {
          nextToken
          startedAt
          __typename
        }
        workout_logs
        WorkoutNotes {
          nextToken
          startedAt
          __typename
        }
        createdAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listUserCheckListItems = /* GraphQL */ `
  query ListUserCheckListItems(
    $filter: ModelUserCheckListItemsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserCheckListItems(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        checkListItemsId
        userId
        checkListItems {
          id
          key
          value
          frequency
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        user {
          id
          name
          email
          sub
          nutrition_info
          nutrition_coaching
          q_experience
          q_medical
          q_calcmacros
          coach_userid
          theme
          image
          image_uri
          coach_yn
          updatedAt
          default_workout_type
          workout_logs
          createdAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncUserCheckListItems = /* GraphQL */ `
  query SyncUserCheckListItems(
    $filter: ModelUserCheckListItemsFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUserCheckListItems(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        checkListItemsId
        userId
        checkListItems {
          id
          key
          value
          frequency
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        user {
          id
          name
          email
          sub
          nutrition_info
          nutrition_coaching
          q_experience
          q_medical
          q_calcmacros
          coach_userid
          theme
          image
          image_uri
          coach_yn
          updatedAt
          default_workout_type
          workout_logs
          createdAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const userCheckListItemsByCheckListItemsId = /* GraphQL */ `
  query UserCheckListItemsByCheckListItemsId(
    $checkListItemsId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelUserCheckListItemsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userCheckListItemsByCheckListItemsId(
      checkListItemsId: $checkListItemsId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        checkListItemsId
        userId
        checkListItems {
          id
          key
          value
          frequency
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        user {
          id
          name
          email
          sub
          nutrition_info
          nutrition_coaching
          q_experience
          q_medical
          q_calcmacros
          coach_userid
          theme
          image
          image_uri
          coach_yn
          updatedAt
          default_workout_type
          workout_logs
          createdAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const userCheckListItemsByUserId = /* GraphQL */ `
  query UserCheckListItemsByUserId(
    $userId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelUserCheckListItemsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userCheckListItemsByUserId(
      userId: $userId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        checkListItemsId
        userId
        checkListItems {
          id
          key
          value
          frequency
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        user {
          id
          name
          email
          sub
          nutrition_info
          nutrition_coaching
          q_experience
          q_medical
          q_calcmacros
          coach_userid
          theme
          image
          image_uri
          coach_yn
          updatedAt
          default_workout_type
          workout_logs
          createdAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
