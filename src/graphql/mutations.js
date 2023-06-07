/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCheckListItems = /* GraphQL */ `
  mutation CreateCheckListItems(
    $input: CreateCheckListItemsInput!
    $condition: ModelCheckListItemsConditionInput
  ) {
    createCheckListItems(input: $input, condition: $condition) {
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
export const updateCheckListItems = /* GraphQL */ `
  mutation UpdateCheckListItems(
    $input: UpdateCheckListItemsInput!
    $condition: ModelCheckListItemsConditionInput
  ) {
    updateCheckListItems(input: $input, condition: $condition) {
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
export const deleteCheckListItems = /* GraphQL */ `
  mutation DeleteCheckListItems(
    $input: DeleteCheckListItemsInput!
    $condition: ModelCheckListItemsConditionInput
  ) {
    deleteCheckListItems(input: $input, condition: $condition) {
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
export const createSavedWorkouts = /* GraphQL */ `
  mutation CreateSavedWorkouts(
    $input: CreateSavedWorkoutsInput!
    $condition: ModelSavedWorkoutsConditionInput
  ) {
    createSavedWorkouts(input: $input, condition: $condition) {
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
export const updateSavedWorkouts = /* GraphQL */ `
  mutation UpdateSavedWorkouts(
    $input: UpdateSavedWorkoutsInput!
    $condition: ModelSavedWorkoutsConditionInput
  ) {
    updateSavedWorkouts(input: $input, condition: $condition) {
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
export const deleteSavedWorkouts = /* GraphQL */ `
  mutation DeleteSavedWorkouts(
    $input: DeleteSavedWorkoutsInput!
    $condition: ModelSavedWorkoutsConditionInput
  ) {
    deleteSavedWorkouts(input: $input, condition: $condition) {
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
export const createCheckin = /* GraphQL */ `
  mutation CreateCheckin(
    $input: CreateCheckinInput!
    $condition: ModelCheckinConditionInput
  ) {
    createCheckin(input: $input, condition: $condition) {
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
    }
  }
`;
export const updateCheckin = /* GraphQL */ `
  mutation UpdateCheckin(
    $input: UpdateCheckinInput!
    $condition: ModelCheckinConditionInput
  ) {
    updateCheckin(input: $input, condition: $condition) {
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
    }
  }
`;
export const deleteCheckin = /* GraphQL */ `
  mutation DeleteCheckin(
    $input: DeleteCheckinInput!
    $condition: ModelCheckinConditionInput
  ) {
    deleteCheckin(input: $input, condition: $condition) {
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
    }
  }
`;
export const createFoodEntry = /* GraphQL */ `
  mutation CreateFoodEntry(
    $input: CreateFoodEntryInput!
    $condition: ModelFoodEntryConditionInput
  ) {
    createFoodEntry(input: $input, condition: $condition) {
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateFoodEntry = /* GraphQL */ `
  mutation UpdateFoodEntry(
    $input: UpdateFoodEntryInput!
    $condition: ModelFoodEntryConditionInput
  ) {
    updateFoodEntry(input: $input, condition: $condition) {
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteFoodEntry = /* GraphQL */ `
  mutation DeleteFoodEntry(
    $input: DeleteFoodEntryInput!
    $condition: ModelFoodEntryConditionInput
  ) {
    deleteFoodEntry(input: $input, condition: $condition) {
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createMessages = /* GraphQL */ `
  mutation CreateMessages(
    $input: CreateMessagesInput!
    $condition: ModelMessagesConditionInput
  ) {
    createMessages(input: $input, condition: $condition) {
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
export const updateMessages = /* GraphQL */ `
  mutation UpdateMessages(
    $input: UpdateMessagesInput!
    $condition: ModelMessagesConditionInput
  ) {
    updateMessages(input: $input, condition: $condition) {
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
export const deleteMessages = /* GraphQL */ `
  mutation DeleteMessages(
    $input: DeleteMessagesInput!
    $condition: ModelMessagesConditionInput
  ) {
    deleteMessages(input: $input, condition: $condition) {
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
export const createUserInfo = /* GraphQL */ `
  mutation CreateUserInfo(
    $input: CreateUserInfoInput!
    $condition: ModelUserInfoConditionInput
  ) {
    createUserInfo(input: $input, condition: $condition) {
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
        }
        Foodentries {
          nextToken
          startedAt
        }
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
        coach_yn
        updatedAt
        default_workout_type
        CheckListItems {
          nextToken
          startedAt
        }
        createdAt
        _version
        _deleted
        _lastChangedAt
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
    }
  }
`;
export const updateUserInfo = /* GraphQL */ `
  mutation UpdateUserInfo(
    $input: UpdateUserInfoInput!
    $condition: ModelUserInfoConditionInput
  ) {
    updateUserInfo(input: $input, condition: $condition) {
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
        }
        Foodentries {
          nextToken
          startedAt
        }
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
        coach_yn
        updatedAt
        default_workout_type
        CheckListItems {
          nextToken
          startedAt
        }
        createdAt
        _version
        _deleted
        _lastChangedAt
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
    }
  }
`;
export const deleteUserInfo = /* GraphQL */ `
  mutation DeleteUserInfo(
    $input: DeleteUserInfoInput!
    $condition: ModelUserInfoConditionInput
  ) {
    deleteUserInfo(input: $input, condition: $condition) {
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
        }
        Foodentries {
          nextToken
          startedAt
        }
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
        coach_yn
        updatedAt
        default_workout_type
        CheckListItems {
          nextToken
          startedAt
        }
        createdAt
        _version
        _deleted
        _lastChangedAt
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
    }
  }
`;
export const createArticles = /* GraphQL */ `
  mutation CreateArticles(
    $input: CreateArticlesInput!
    $condition: ModelArticlesConditionInput
  ) {
    createArticles(input: $input, condition: $condition) {
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
    }
  }
`;
export const updateArticles = /* GraphQL */ `
  mutation UpdateArticles(
    $input: UpdateArticlesInput!
    $condition: ModelArticlesConditionInput
  ) {
    updateArticles(input: $input, condition: $condition) {
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
    }
  }
`;
export const deleteArticles = /* GraphQL */ `
  mutation DeleteArticles(
    $input: DeleteArticlesInput!
    $condition: ModelArticlesConditionInput
  ) {
    deleteArticles(input: $input, condition: $condition) {
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
    }
  }
`;
export const createPrograms = /* GraphQL */ `
  mutation CreatePrograms(
    $input: CreateProgramsInput!
    $condition: ModelProgramsConditionInput
  ) {
    createPrograms(input: $input, condition: $condition) {
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
export const updatePrograms = /* GraphQL */ `
  mutation UpdatePrograms(
    $input: UpdateProgramsInput!
    $condition: ModelProgramsConditionInput
  ) {
    updatePrograms(input: $input, condition: $condition) {
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
export const deletePrograms = /* GraphQL */ `
  mutation DeletePrograms(
    $input: DeleteProgramsInput!
    $condition: ModelProgramsConditionInput
  ) {
    deletePrograms(input: $input, condition: $condition) {
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
export const createComments = /* GraphQL */ `
  mutation CreateComments(
    $input: CreateCommentsInput!
    $condition: ModelCommentsConditionInput
  ) {
    createComments(input: $input, condition: $condition) {
      id
      comment
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
export const updateComments = /* GraphQL */ `
  mutation UpdateComments(
    $input: UpdateCommentsInput!
    $condition: ModelCommentsConditionInput
  ) {
    updateComments(input: $input, condition: $condition) {
      id
      comment
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
export const deleteComments = /* GraphQL */ `
  mutation DeleteComments(
    $input: DeleteCommentsInput!
    $condition: ModelCommentsConditionInput
  ) {
    deleteComments(input: $input, condition: $condition) {
      id
      comment
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
export const createSubWorkouts = /* GraphQL */ `
  mutation CreateSubWorkouts(
    $input: CreateSubWorkoutsInput!
    $condition: ModelSubWorkoutsConditionInput
  ) {
    createSubWorkouts(input: $input, condition: $condition) {
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
        }
        nextToken
        startedAt
      }
      numitems
      order
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateSubWorkouts = /* GraphQL */ `
  mutation UpdateSubWorkouts(
    $input: UpdateSubWorkoutsInput!
    $condition: ModelSubWorkoutsConditionInput
  ) {
    updateSubWorkouts(input: $input, condition: $condition) {
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
        }
        nextToken
        startedAt
      }
      numitems
      order
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteSubWorkouts = /* GraphQL */ `
  mutation DeleteSubWorkouts(
    $input: DeleteSubWorkoutsInput!
    $condition: ModelSubWorkoutsConditionInput
  ) {
    deleteSubWorkouts(input: $input, condition: $condition) {
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
        }
        nextToken
        startedAt
      }
      numitems
      order
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createWorkoutResults = /* GraphQL */ `
  mutation CreateWorkoutResults(
    $input: CreateWorkoutResultsInput!
    $condition: ModelWorkoutResultsConditionInput
  ) {
    createWorkoutResults(input: $input, condition: $condition) {
      id
      value
      userID
      subworkoutsID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateWorkoutResults = /* GraphQL */ `
  mutation UpdateWorkoutResults(
    $input: UpdateWorkoutResultsInput!
    $condition: ModelWorkoutResultsConditionInput
  ) {
    updateWorkoutResults(input: $input, condition: $condition) {
      id
      value
      userID
      subworkoutsID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteWorkoutResults = /* GraphQL */ `
  mutation DeleteWorkoutResults(
    $input: DeleteWorkoutResultsInput!
    $condition: ModelWorkoutResultsConditionInput
  ) {
    deleteWorkoutResults(input: $input, condition: $condition) {
      id
      value
      userID
      subworkoutsID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createWorkouts = /* GraphQL */ `
  mutation CreateWorkouts(
    $input: CreateWorkoutsInput!
    $condition: ModelWorkoutsConditionInput
  ) {
    createWorkouts(input: $input, condition: $condition) {
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
        }
        nextToken
        startedAt
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
      workout_type
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateWorkouts = /* GraphQL */ `
  mutation UpdateWorkouts(
    $input: UpdateWorkoutsInput!
    $condition: ModelWorkoutsConditionInput
  ) {
    updateWorkouts(input: $input, condition: $condition) {
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
        }
        nextToken
        startedAt
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
      workout_type
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteWorkouts = /* GraphQL */ `
  mutation DeleteWorkouts(
    $input: DeleteWorkoutsInput!
    $condition: ModelWorkoutsConditionInput
  ) {
    deleteWorkouts(input: $input, condition: $condition) {
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
        }
        nextToken
        startedAt
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
      workout_type
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
        }
        nextToken
        startedAt
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
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
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
        }
        nextToken
        startedAt
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
        }
        nextToken
        startedAt
      }
      createdAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
        }
        nextToken
        startedAt
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
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
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
        }
        nextToken
        startedAt
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
        }
        nextToken
        startedAt
      }
      createdAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
        }
        nextToken
        startedAt
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
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
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
        }
        nextToken
        startedAt
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
        }
        nextToken
        startedAt
      }
      createdAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createUserCheckListItems = /* GraphQL */ `
  mutation CreateUserCheckListItems(
    $input: CreateUserCheckListItemsInput!
    $condition: ModelUserCheckListItemsConditionInput
  ) {
    createUserCheckListItems(input: $input, condition: $condition) {
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
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
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
        }
        Foodentries {
          nextToken
          startedAt
        }
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
        coach_yn
        updatedAt
        default_workout_type
        CheckListItems {
          nextToken
          startedAt
        }
        createdAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateUserCheckListItems = /* GraphQL */ `
  mutation UpdateUserCheckListItems(
    $input: UpdateUserCheckListItemsInput!
    $condition: ModelUserCheckListItemsConditionInput
  ) {
    updateUserCheckListItems(input: $input, condition: $condition) {
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
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
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
        }
        Foodentries {
          nextToken
          startedAt
        }
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
        coach_yn
        updatedAt
        default_workout_type
        CheckListItems {
          nextToken
          startedAt
        }
        createdAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteUserCheckListItems = /* GraphQL */ `
  mutation DeleteUserCheckListItems(
    $input: DeleteUserCheckListItemsInput!
    $condition: ModelUserCheckListItemsConditionInput
  ) {
    deleteUserCheckListItems(input: $input, condition: $condition) {
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
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
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
        }
        Foodentries {
          nextToken
          startedAt
        }
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
        coach_yn
        updatedAt
        default_workout_type
        CheckListItems {
          nextToken
          startedAt
        }
        createdAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
