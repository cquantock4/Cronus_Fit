/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateFoodentry = /* GraphQL */ `
  subscription OnCreateFoodentry(
    $filter: ModelSubscriptionFoodentryFilterInput
  ) {
    onCreateFoodentry(filter: $filter) {
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
export const onUpdateFoodentry = /* GraphQL */ `
  subscription OnUpdateFoodentry(
    $filter: ModelSubscriptionFoodentryFilterInput
  ) {
    onUpdateFoodentry(filter: $filter) {
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
export const onDeleteFoodentry = /* GraphQL */ `
  subscription OnDeleteFoodentry(
    $filter: ModelSubscriptionFoodentryFilterInput
  ) {
    onDeleteFoodentry(filter: $filter) {
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
      createdAt
      updatedAt
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
      createdAt
      updatedAt
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
      createdAt
      updatedAt
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
export const onCreateArticles = /* GraphQL */ `
  subscription OnCreateArticles($filter: ModelSubscriptionArticlesFilterInput) {
    onCreateArticles(filter: $filter) {
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
export const onUpdateArticles = /* GraphQL */ `
  subscription OnUpdateArticles($filter: ModelSubscriptionArticlesFilterInput) {
    onUpdateArticles(filter: $filter) {
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
export const onDeleteArticles = /* GraphQL */ `
  subscription OnDeleteArticles($filter: ModelSubscriptionArticlesFilterInput) {
    onDeleteArticles(filter: $filter) {
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
export const onCreatePrograms = /* GraphQL */ `
  subscription OnCreatePrograms($filter: ModelSubscriptionProgramsFilterInput) {
    onCreatePrograms(filter: $filter) {
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
export const onUpdatePrograms = /* GraphQL */ `
  subscription OnUpdatePrograms($filter: ModelSubscriptionProgramsFilterInput) {
    onUpdatePrograms(filter: $filter) {
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
export const onDeletePrograms = /* GraphQL */ `
  subscription OnDeletePrograms($filter: ModelSubscriptionProgramsFilterInput) {
    onDeletePrograms(filter: $filter) {
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
export const onCreateComments = /* GraphQL */ `
  subscription OnCreateComments($filter: ModelSubscriptionCommentsFilterInput) {
    onCreateComments(filter: $filter) {
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
export const onUpdateComments = /* GraphQL */ `
  subscription OnUpdateComments($filter: ModelSubscriptionCommentsFilterInput) {
    onUpdateComments(filter: $filter) {
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
export const onDeleteComments = /* GraphQL */ `
  subscription OnDeleteComments($filter: ModelSubscriptionCommentsFilterInput) {
    onDeleteComments(filter: $filter) {
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
export const onCreateWorkoutResults = /* GraphQL */ `
  subscription OnCreateWorkoutResults(
    $filter: ModelSubscriptionWorkoutResultsFilterInput
  ) {
    onCreateWorkoutResults(filter: $filter) {
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
export const onUpdateWorkoutResults = /* GraphQL */ `
  subscription OnUpdateWorkoutResults(
    $filter: ModelSubscriptionWorkoutResultsFilterInput
  ) {
    onUpdateWorkoutResults(filter: $filter) {
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
export const onDeleteWorkoutResults = /* GraphQL */ `
  subscription OnDeleteWorkoutResults(
    $filter: ModelSubscriptionWorkoutResultsFilterInput
  ) {
    onDeleteWorkoutResults(filter: $filter) {
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
export const onCreateSubWorkouts = /* GraphQL */ `
  subscription OnCreateSubWorkouts(
    $filter: ModelSubscriptionSubWorkoutsFilterInput
  ) {
    onCreateSubWorkouts(filter: $filter) {
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
export const onUpdateSubWorkouts = /* GraphQL */ `
  subscription OnUpdateSubWorkouts(
    $filter: ModelSubscriptionSubWorkoutsFilterInput
  ) {
    onUpdateSubWorkouts(filter: $filter) {
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
export const onDeleteSubWorkouts = /* GraphQL */ `
  subscription OnDeleteSubWorkouts(
    $filter: ModelSubscriptionSubWorkoutsFilterInput
  ) {
    onDeleteSubWorkouts(filter: $filter) {
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
export const onCreateWorkouts = /* GraphQL */ `
  subscription OnCreateWorkouts($filter: ModelSubscriptionWorkoutsFilterInput) {
    onCreateWorkouts(filter: $filter) {
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
export const onUpdateWorkouts = /* GraphQL */ `
  subscription OnUpdateWorkouts($filter: ModelSubscriptionWorkoutsFilterInput) {
    onUpdateWorkouts(filter: $filter) {
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
export const onDeleteWorkouts = /* GraphQL */ `
  subscription OnDeleteWorkouts($filter: ModelSubscriptionWorkoutsFilterInput) {
    onDeleteWorkouts(filter: $filter) {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
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
export const onCreateCommentsWorkouts = /* GraphQL */ `
  subscription OnCreateCommentsWorkouts(
    $filter: ModelSubscriptionCommentsWorkoutsFilterInput
  ) {
    onCreateCommentsWorkouts(filter: $filter) {
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
export const onUpdateCommentsWorkouts = /* GraphQL */ `
  subscription OnUpdateCommentsWorkouts(
    $filter: ModelSubscriptionCommentsWorkoutsFilterInput
  ) {
    onUpdateCommentsWorkouts(filter: $filter) {
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
export const onDeleteCommentsWorkouts = /* GraphQL */ `
  subscription OnDeleteCommentsWorkouts(
    $filter: ModelSubscriptionCommentsWorkoutsFilterInput
  ) {
    onDeleteCommentsWorkouts(filter: $filter) {
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
export const onCreateWorkoutResultsSubWorkouts = /* GraphQL */ `
  subscription OnCreateWorkoutResultsSubWorkouts(
    $filter: ModelSubscriptionWorkoutResultsSubWorkoutsFilterInput
  ) {
    onCreateWorkoutResultsSubWorkouts(filter: $filter) {
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
export const onUpdateWorkoutResultsSubWorkouts = /* GraphQL */ `
  subscription OnUpdateWorkoutResultsSubWorkouts(
    $filter: ModelSubscriptionWorkoutResultsSubWorkoutsFilterInput
  ) {
    onUpdateWorkoutResultsSubWorkouts(filter: $filter) {
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
export const onDeleteWorkoutResultsSubWorkouts = /* GraphQL */ `
  subscription OnDeleteWorkoutResultsSubWorkouts(
    $filter: ModelSubscriptionWorkoutResultsSubWorkoutsFilterInput
  ) {
    onDeleteWorkoutResultsSubWorkouts(filter: $filter) {
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
export const onCreateWorkoutsSubWorkouts = /* GraphQL */ `
  subscription OnCreateWorkoutsSubWorkouts(
    $filter: ModelSubscriptionWorkoutsSubWorkoutsFilterInput
  ) {
    onCreateWorkoutsSubWorkouts(filter: $filter) {
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
export const onUpdateWorkoutsSubWorkouts = /* GraphQL */ `
  subscription OnUpdateWorkoutsSubWorkouts(
    $filter: ModelSubscriptionWorkoutsSubWorkoutsFilterInput
  ) {
    onUpdateWorkoutsSubWorkouts(filter: $filter) {
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
export const onDeleteWorkoutsSubWorkouts = /* GraphQL */ `
  subscription OnDeleteWorkoutsSubWorkouts(
    $filter: ModelSubscriptionWorkoutsSubWorkoutsFilterInput
  ) {
    onDeleteWorkoutsSubWorkouts(filter: $filter) {
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
export const onCreateUserWorkouts = /* GraphQL */ `
  subscription OnCreateUserWorkouts(
    $filter: ModelSubscriptionUserWorkoutsFilterInput
  ) {
    onCreateUserWorkouts(filter: $filter) {
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
export const onUpdateUserWorkouts = /* GraphQL */ `
  subscription OnUpdateUserWorkouts(
    $filter: ModelSubscriptionUserWorkoutsFilterInput
  ) {
    onUpdateUserWorkouts(filter: $filter) {
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
export const onDeleteUserWorkouts = /* GraphQL */ `
  subscription OnDeleteUserWorkouts(
    $filter: ModelSubscriptionUserWorkoutsFilterInput
  ) {
    onDeleteUserWorkouts(filter: $filter) {
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
