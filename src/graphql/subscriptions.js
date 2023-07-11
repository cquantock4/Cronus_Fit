/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateWorkoutNotes = /* GraphQL */ `
  subscription OnCreateWorkoutNotes(
    $filter: ModelSubscriptionWorkoutNotesFilterInput
  ) {
    onCreateWorkoutNotes(filter: $filter) {
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
export const onUpdateWorkoutNotes = /* GraphQL */ `
  subscription OnUpdateWorkoutNotes(
    $filter: ModelSubscriptionWorkoutNotesFilterInput
  ) {
    onUpdateWorkoutNotes(filter: $filter) {
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
export const onDeleteWorkoutNotes = /* GraphQL */ `
  subscription OnDeleteWorkoutNotes(
    $filter: ModelSubscriptionWorkoutNotesFilterInput
  ) {
    onDeleteWorkoutNotes(filter: $filter) {
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
export const onCreateCheckListItems = /* GraphQL */ `
  subscription OnCreateCheckListItems(
    $filter: ModelSubscriptionCheckListItemsFilterInput
  ) {
    onCreateCheckListItems(filter: $filter) {
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
export const onUpdateCheckListItems = /* GraphQL */ `
  subscription OnUpdateCheckListItems(
    $filter: ModelSubscriptionCheckListItemsFilterInput
  ) {
    onUpdateCheckListItems(filter: $filter) {
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
export const onDeleteCheckListItems = /* GraphQL */ `
  subscription OnDeleteCheckListItems(
    $filter: ModelSubscriptionCheckListItemsFilterInput
  ) {
    onDeleteCheckListItems(filter: $filter) {
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
export const onCreateSavedWorkouts = /* GraphQL */ `
  subscription OnCreateSavedWorkouts(
    $filter: ModelSubscriptionSavedWorkoutsFilterInput
  ) {
    onCreateSavedWorkouts(filter: $filter) {
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
export const onUpdateSavedWorkouts = /* GraphQL */ `
  subscription OnUpdateSavedWorkouts(
    $filter: ModelSubscriptionSavedWorkoutsFilterInput
  ) {
    onUpdateSavedWorkouts(filter: $filter) {
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
export const onDeleteSavedWorkouts = /* GraphQL */ `
  subscription OnDeleteSavedWorkouts(
    $filter: ModelSubscriptionSavedWorkoutsFilterInput
  ) {
    onDeleteSavedWorkouts(filter: $filter) {
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
export const onCreateCheckin = /* GraphQL */ `
  subscription OnCreateCheckin($filter: ModelSubscriptionCheckinFilterInput) {
    onCreateCheckin(filter: $filter) {
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
export const onUpdateCheckin = /* GraphQL */ `
  subscription OnUpdateCheckin($filter: ModelSubscriptionCheckinFilterInput) {
    onUpdateCheckin(filter: $filter) {
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
export const onDeleteCheckin = /* GraphQL */ `
  subscription OnDeleteCheckin($filter: ModelSubscriptionCheckinFilterInput) {
    onDeleteCheckin(filter: $filter) {
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
export const onCreateFoodEntry = /* GraphQL */ `
  subscription OnCreateFoodEntry(
    $filter: ModelSubscriptionFoodEntryFilterInput
  ) {
    onCreateFoodEntry(filter: $filter) {
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
export const onUpdateFoodEntry = /* GraphQL */ `
  subscription OnUpdateFoodEntry(
    $filter: ModelSubscriptionFoodEntryFilterInput
  ) {
    onUpdateFoodEntry(filter: $filter) {
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
export const onDeleteFoodEntry = /* GraphQL */ `
  subscription OnDeleteFoodEntry(
    $filter: ModelSubscriptionFoodEntryFilterInput
  ) {
    onDeleteFoodEntry(filter: $filter) {
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
export const onCreateMessages = /* GraphQL */ `
  subscription OnCreateMessages($filter: ModelSubscriptionMessagesFilterInput) {
    onCreateMessages(filter: $filter) {
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
export const onUpdateMessages = /* GraphQL */ `
  subscription OnUpdateMessages($filter: ModelSubscriptionMessagesFilterInput) {
    onUpdateMessages(filter: $filter) {
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
export const onDeleteMessages = /* GraphQL */ `
  subscription OnDeleteMessages($filter: ModelSubscriptionMessagesFilterInput) {
    onDeleteMessages(filter: $filter) {
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
export const onCreateUserInfo = /* GraphQL */ `
  subscription OnCreateUserInfo($filter: ModelSubscriptionUserInfoFilterInput) {
    onCreateUserInfo(filter: $filter) {
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
        Programs {
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
export const onUpdateUserInfo = /* GraphQL */ `
  subscription OnUpdateUserInfo($filter: ModelSubscriptionUserInfoFilterInput) {
    onUpdateUserInfo(filter: $filter) {
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
        Programs {
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
export const onDeleteUserInfo = /* GraphQL */ `
  subscription OnDeleteUserInfo($filter: ModelSubscriptionUserInfoFilterInput) {
    onDeleteUserInfo(filter: $filter) {
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
        Programs {
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
export const onCreateArticles = /* GraphQL */ `
  subscription OnCreateArticles($filter: ModelSubscriptionArticlesFilterInput) {
    onCreateArticles(filter: $filter) {
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
export const onUpdateArticles = /* GraphQL */ `
  subscription OnUpdateArticles($filter: ModelSubscriptionArticlesFilterInput) {
    onUpdateArticles(filter: $filter) {
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
export const onDeleteArticles = /* GraphQL */ `
  subscription OnDeleteArticles($filter: ModelSubscriptionArticlesFilterInput) {
    onDeleteArticles(filter: $filter) {
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
export const onCreatePrograms = /* GraphQL */ `
  subscription OnCreatePrograms($filter: ModelSubscriptionProgramsFilterInput) {
    onCreatePrograms(filter: $filter) {
      id
      title
      desc
      free
      price
      downloadurl
      data_type
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
export const onUpdatePrograms = /* GraphQL */ `
  subscription OnUpdatePrograms($filter: ModelSubscriptionProgramsFilterInput) {
    onUpdatePrograms(filter: $filter) {
      id
      title
      desc
      free
      price
      downloadurl
      data_type
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
export const onDeletePrograms = /* GraphQL */ `
  subscription OnDeletePrograms($filter: ModelSubscriptionProgramsFilterInput) {
    onDeletePrograms(filter: $filter) {
      id
      title
      desc
      free
      price
      downloadurl
      data_type
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
export const onCreateComments = /* GraphQL */ `
  subscription OnCreateComments($filter: ModelSubscriptionCommentsFilterInput) {
    onCreateComments(filter: $filter) {
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
export const onUpdateComments = /* GraphQL */ `
  subscription OnUpdateComments($filter: ModelSubscriptionCommentsFilterInput) {
    onUpdateComments(filter: $filter) {
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
export const onDeleteComments = /* GraphQL */ `
  subscription OnDeleteComments($filter: ModelSubscriptionCommentsFilterInput) {
    onDeleteComments(filter: $filter) {
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
export const onCreateSubWorkouts = /* GraphQL */ `
  subscription OnCreateSubWorkouts(
    $filter: ModelSubscriptionSubWorkoutsFilterInput
  ) {
    onCreateSubWorkouts(filter: $filter) {
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
export const onUpdateSubWorkouts = /* GraphQL */ `
  subscription OnUpdateSubWorkouts(
    $filter: ModelSubscriptionSubWorkoutsFilterInput
  ) {
    onUpdateSubWorkouts(filter: $filter) {
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
export const onDeleteSubWorkouts = /* GraphQL */ `
  subscription OnDeleteSubWorkouts(
    $filter: ModelSubscriptionSubWorkoutsFilterInput
  ) {
    onDeleteSubWorkouts(filter: $filter) {
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
export const onCreateWorkoutResults = /* GraphQL */ `
  subscription OnCreateWorkoutResults(
    $filter: ModelSubscriptionWorkoutResultsFilterInput
  ) {
    onCreateWorkoutResults(filter: $filter) {
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
        Programs {
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
export const onUpdateWorkoutResults = /* GraphQL */ `
  subscription OnUpdateWorkoutResults(
    $filter: ModelSubscriptionWorkoutResultsFilterInput
  ) {
    onUpdateWorkoutResults(filter: $filter) {
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
        Programs {
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
export const onDeleteWorkoutResults = /* GraphQL */ `
  subscription OnDeleteWorkoutResults(
    $filter: ModelSubscriptionWorkoutResultsFilterInput
  ) {
    onDeleteWorkoutResults(filter: $filter) {
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
        Programs {
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
export const onCreateWorkouts = /* GraphQL */ `
  subscription OnCreateWorkouts($filter: ModelSubscriptionWorkoutsFilterInput) {
    onCreateWorkouts(filter: $filter) {
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
      legacy
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onUpdateWorkouts = /* GraphQL */ `
  subscription OnUpdateWorkouts($filter: ModelSubscriptionWorkoutsFilterInput) {
    onUpdateWorkouts(filter: $filter) {
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
      legacy
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onDeleteWorkouts = /* GraphQL */ `
  subscription OnDeleteWorkouts($filter: ModelSubscriptionWorkoutsFilterInput) {
    onDeleteWorkouts(filter: $filter) {
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
      legacy
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
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
      Programs {
        items {
          id
          title
          desc
          free
          price
          downloadurl
          data_type
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
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
      Programs {
        items {
          id
          title
          desc
          free
          price
          downloadurl
          data_type
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
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
      Programs {
        items {
          id
          title
          desc
          free
          price
          downloadurl
          data_type
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
export const onCreateUserCheckListItems = /* GraphQL */ `
  subscription OnCreateUserCheckListItems(
    $filter: ModelSubscriptionUserCheckListItemsFilterInput
  ) {
    onCreateUserCheckListItems(filter: $filter) {
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
        Programs {
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
export const onUpdateUserCheckListItems = /* GraphQL */ `
  subscription OnUpdateUserCheckListItems(
    $filter: ModelSubscriptionUserCheckListItemsFilterInput
  ) {
    onUpdateUserCheckListItems(filter: $filter) {
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
        Programs {
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
export const onDeleteUserCheckListItems = /* GraphQL */ `
  subscription OnDeleteUserCheckListItems(
    $filter: ModelSubscriptionUserCheckListItemsFilterInput
  ) {
    onDeleteUserCheckListItems(filter: $filter) {
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
        Programs {
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
