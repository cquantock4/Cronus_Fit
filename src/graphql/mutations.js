/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
export const updateComments = /* GraphQL */ `
  mutation UpdateComments(
    $input: UpdateCommentsInput!
    $condition: ModelCommentsConditionInput
  ) {
    updateComments(input: $input, condition: $condition) {
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
export const deleteComments = /* GraphQL */ `
  mutation DeleteComments(
    $input: DeleteCommentsInput!
    $condition: ModelCommentsConditionInput
  ) {
    deleteComments(input: $input, condition: $condition) {
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
export const createWorkoutResults = /* GraphQL */ `
  mutation CreateWorkoutResults(
    $input: CreateWorkoutResultsInput!
    $condition: ModelWorkoutResultsConditionInput
  ) {
    createWorkoutResults(input: $input, condition: $condition) {
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
export const updateWorkoutResults = /* GraphQL */ `
  mutation UpdateWorkoutResults(
    $input: UpdateWorkoutResultsInput!
    $condition: ModelWorkoutResultsConditionInput
  ) {
    updateWorkoutResults(input: $input, condition: $condition) {
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
export const deleteWorkoutResults = /* GraphQL */ `
  mutation DeleteWorkoutResults(
    $input: DeleteWorkoutResultsInput!
    $condition: ModelWorkoutResultsConditionInput
  ) {
    deleteWorkoutResults(input: $input, condition: $condition) {
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
export const createSubWorkouts = /* GraphQL */ `
  mutation CreateSubWorkouts(
    $input: CreateSubWorkoutsInput!
    $condition: ModelSubWorkoutsConditionInput
  ) {
    createSubWorkouts(input: $input, condition: $condition) {
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
export const updateSubWorkouts = /* GraphQL */ `
  mutation UpdateSubWorkouts(
    $input: UpdateSubWorkoutsInput!
    $condition: ModelSubWorkoutsConditionInput
  ) {
    updateSubWorkouts(input: $input, condition: $condition) {
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
export const deleteSubWorkouts = /* GraphQL */ `
  mutation DeleteSubWorkouts(
    $input: DeleteSubWorkoutsInput!
    $condition: ModelSubWorkoutsConditionInput
  ) {
    deleteSubWorkouts(input: $input, condition: $condition) {
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
export const createCommentsWorkouts = /* GraphQL */ `
  mutation CreateCommentsWorkouts(
    $input: CreateCommentsWorkoutsInput!
    $condition: ModelCommentsWorkoutsConditionInput
  ) {
    createCommentsWorkouts(input: $input, condition: $condition) {
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
export const updateCommentsWorkouts = /* GraphQL */ `
  mutation UpdateCommentsWorkouts(
    $input: UpdateCommentsWorkoutsInput!
    $condition: ModelCommentsWorkoutsConditionInput
  ) {
    updateCommentsWorkouts(input: $input, condition: $condition) {
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
export const deleteCommentsWorkouts = /* GraphQL */ `
  mutation DeleteCommentsWorkouts(
    $input: DeleteCommentsWorkoutsInput!
    $condition: ModelCommentsWorkoutsConditionInput
  ) {
    deleteCommentsWorkouts(input: $input, condition: $condition) {
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
export const createWorkoutResultsSubWorkouts = /* GraphQL */ `
  mutation CreateWorkoutResultsSubWorkouts(
    $input: CreateWorkoutResultsSubWorkoutsInput!
    $condition: ModelWorkoutResultsSubWorkoutsConditionInput
  ) {
    createWorkoutResultsSubWorkouts(input: $input, condition: $condition) {
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
export const updateWorkoutResultsSubWorkouts = /* GraphQL */ `
  mutation UpdateWorkoutResultsSubWorkouts(
    $input: UpdateWorkoutResultsSubWorkoutsInput!
    $condition: ModelWorkoutResultsSubWorkoutsConditionInput
  ) {
    updateWorkoutResultsSubWorkouts(input: $input, condition: $condition) {
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
export const deleteWorkoutResultsSubWorkouts = /* GraphQL */ `
  mutation DeleteWorkoutResultsSubWorkouts(
    $input: DeleteWorkoutResultsSubWorkoutsInput!
    $condition: ModelWorkoutResultsSubWorkoutsConditionInput
  ) {
    deleteWorkoutResultsSubWorkouts(input: $input, condition: $condition) {
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
export const createWorkoutsSubWorkouts = /* GraphQL */ `
  mutation CreateWorkoutsSubWorkouts(
    $input: CreateWorkoutsSubWorkoutsInput!
    $condition: ModelWorkoutsSubWorkoutsConditionInput
  ) {
    createWorkoutsSubWorkouts(input: $input, condition: $condition) {
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
export const updateWorkoutsSubWorkouts = /* GraphQL */ `
  mutation UpdateWorkoutsSubWorkouts(
    $input: UpdateWorkoutsSubWorkoutsInput!
    $condition: ModelWorkoutsSubWorkoutsConditionInput
  ) {
    updateWorkoutsSubWorkouts(input: $input, condition: $condition) {
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
export const deleteWorkoutsSubWorkouts = /* GraphQL */ `
  mutation DeleteWorkoutsSubWorkouts(
    $input: DeleteWorkoutsSubWorkoutsInput!
    $condition: ModelWorkoutsSubWorkoutsConditionInput
  ) {
    deleteWorkoutsSubWorkouts(input: $input, condition: $condition) {
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
export const createUserWorkouts = /* GraphQL */ `
  mutation CreateUserWorkouts(
    $input: CreateUserWorkoutsInput!
    $condition: ModelUserWorkoutsConditionInput
  ) {
    createUserWorkouts(input: $input, condition: $condition) {
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
export const updateUserWorkouts = /* GraphQL */ `
  mutation UpdateUserWorkouts(
    $input: UpdateUserWorkoutsInput!
    $condition: ModelUserWorkoutsConditionInput
  ) {
    updateUserWorkouts(input: $input, condition: $condition) {
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
export const deleteUserWorkouts = /* GraphQL */ `
  mutation DeleteUserWorkouts(
    $input: DeleteUserWorkoutsInput!
    $condition: ModelUserWorkoutsConditionInput
  ) {
    deleteUserWorkouts(input: $input, condition: $condition) {
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
