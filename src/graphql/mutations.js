/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
    }
  }
`;
export const createFoodentry = /* GraphQL */ `
  mutation CreateFoodentry(
    $input: CreateFoodentryInput!
    $condition: ModelFoodentryConditionInput
  ) {
    createFoodentry(input: $input, condition: $condition) {
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
export const updateFoodentry = /* GraphQL */ `
  mutation UpdateFoodentry(
    $input: UpdateFoodentryInput!
    $condition: ModelFoodentryConditionInput
  ) {
    updateFoodentry(input: $input, condition: $condition) {
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
export const deleteFoodentry = /* GraphQL */ `
  mutation DeleteFoodentry(
    $input: DeleteFoodentryInput!
    $condition: ModelFoodentryConditionInput
  ) {
    deleteFoodentry(input: $input, condition: $condition) {
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
      createdAt
      updatedAt
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
      createdAt
      updatedAt
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
      createdAt
      updatedAt
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
export const createArticles = /* GraphQL */ `
  mutation CreateArticles(
    $input: CreateArticlesInput!
    $condition: ModelArticlesConditionInput
  ) {
    createArticles(input: $input, condition: $condition) {
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
export const updateArticles = /* GraphQL */ `
  mutation UpdateArticles(
    $input: UpdateArticlesInput!
    $condition: ModelArticlesConditionInput
  ) {
    updateArticles(input: $input, condition: $condition) {
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
export const deleteArticles = /* GraphQL */ `
  mutation DeleteArticles(
    $input: DeleteArticlesInput!
    $condition: ModelArticlesConditionInput
  ) {
    deleteArticles(input: $input, condition: $condition) {
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
      workoutsID
      userID
      createdAt
      updatedAt
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
      workoutsID
      userID
      createdAt
      updatedAt
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
      workoutsID
      userID
      createdAt
      updatedAt
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
      subworkoutsID
      userID
      createdAt
      updatedAt
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
      subworkoutsID
      userID
      createdAt
      updatedAt
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
      subworkoutsID
      userID
      createdAt
      updatedAt
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
