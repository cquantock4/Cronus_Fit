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
      _version
      _deleted
      _lastChangedAt
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
      _version
      _deleted
      _lastChangedAt
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
      _version
      _deleted
      _lastChangedAt
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
      _version
      _deleted
      _lastChangedAt
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
      _version
      _deleted
      _lastChangedAt
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
      _version
      _deleted
      _lastChangedAt
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
          startedAt
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
          startedAt
        }
        Foodentries {
          nextToken
          startedAt
        }
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
          startedAt
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
          startedAt
        }
        Foodentries {
          nextToken
          startedAt
        }
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
          startedAt
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
          startedAt
        }
        Foodentries {
          nextToken
          startedAt
        }
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
      _version
      _deleted
      _lastChangedAt
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
      _version
      _deleted
      _lastChangedAt
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
      _version
      _deleted
      _lastChangedAt
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
      _version
      _deleted
      _lastChangedAt
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
      _version
      _deleted
      _lastChangedAt
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
      _version
      _deleted
      _lastChangedAt
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
          commentsID
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
export const onUpdateComments = /* GraphQL */ `
  subscription OnUpdateComments($filter: ModelSubscriptionCommentsFilterInput) {
    onUpdateComments(filter: $filter) {
      id
      comment
      userid
      Workouts {
        items {
          id
          commentsID
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
export const onDeleteComments = /* GraphQL */ `
  subscription OnDeleteComments($filter: ModelSubscriptionCommentsFilterInput) {
    onDeleteComments(filter: $filter) {
      id
      comment
      userid
      Workouts {
        items {
          id
          commentsID
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
          workoutResultsID
          subWorkoutsID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      userid
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
          workoutResultsID
          subWorkoutsID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      userid
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
          workoutResultsID
          subWorkoutsID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      userid
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
          subWorkoutsID
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
      desc
      resultcategory
      workoutresultss {
        items {
          id
          workoutResultsID
          subWorkoutsID
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
          subWorkoutsID
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
      desc
      resultcategory
      workoutresultss {
        items {
          id
          workoutResultsID
          subWorkoutsID
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
          subWorkoutsID
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
      desc
      resultcategory
      workoutresultss {
        items {
          id
          workoutResultsID
          subWorkoutsID
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
      type
      SubWorkouts {
        items {
          id
          subWorkoutsID
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
          commentsID
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
      type
      SubWorkouts {
        items {
          id
          subWorkoutsID
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
          commentsID
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
      type
      SubWorkouts {
        items {
          id
          subWorkoutsID
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
          commentsID
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateCommentsWorkouts = /* GraphQL */ `
  subscription OnCreateCommentsWorkouts(
    $filter: ModelSubscriptionCommentsWorkoutsFilterInput
  ) {
    onCreateCommentsWorkouts(filter: $filter) {
      id
      commentsID
      workoutsID
      comments {
        id
        comment
        userid
        Workouts {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      workouts {
        id
        title
        desc
        date
        users {
          nextToken
          startedAt
        }
        type
        SubWorkouts {
          nextToken
          startedAt
        }
        commentss {
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
    }
  }
`;
export const onUpdateCommentsWorkouts = /* GraphQL */ `
  subscription OnUpdateCommentsWorkouts(
    $filter: ModelSubscriptionCommentsWorkoutsFilterInput
  ) {
    onUpdateCommentsWorkouts(filter: $filter) {
      id
      commentsID
      workoutsID
      comments {
        id
        comment
        userid
        Workouts {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      workouts {
        id
        title
        desc
        date
        users {
          nextToken
          startedAt
        }
        type
        SubWorkouts {
          nextToken
          startedAt
        }
        commentss {
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
    }
  }
`;
export const onDeleteCommentsWorkouts = /* GraphQL */ `
  subscription OnDeleteCommentsWorkouts(
    $filter: ModelSubscriptionCommentsWorkoutsFilterInput
  ) {
    onDeleteCommentsWorkouts(filter: $filter) {
      id
      commentsID
      workoutsID
      comments {
        id
        comment
        userid
        Workouts {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      workouts {
        id
        title
        desc
        date
        users {
          nextToken
          startedAt
        }
        type
        SubWorkouts {
          nextToken
          startedAt
        }
        commentss {
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
    }
  }
`;
export const onCreateWorkoutResultsSubWorkouts = /* GraphQL */ `
  subscription OnCreateWorkoutResultsSubWorkouts(
    $filter: ModelSubscriptionWorkoutResultsSubWorkoutsFilterInput
  ) {
    onCreateWorkoutResultsSubWorkouts(filter: $filter) {
      id
      workoutResultsID
      subWorkoutsID
      workoutResults {
        id
        value
        SubWorkouts {
          nextToken
          startedAt
        }
        userid
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      subWorkouts {
        id
        group
        grouptitle
        workoutss {
          nextToken
          startedAt
        }
        desc
        resultcategory
        workoutresultss {
          nextToken
          startedAt
        }
        required
        timecap
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
    }
  }
`;
export const onUpdateWorkoutResultsSubWorkouts = /* GraphQL */ `
  subscription OnUpdateWorkoutResultsSubWorkouts(
    $filter: ModelSubscriptionWorkoutResultsSubWorkoutsFilterInput
  ) {
    onUpdateWorkoutResultsSubWorkouts(filter: $filter) {
      id
      workoutResultsID
      subWorkoutsID
      workoutResults {
        id
        value
        SubWorkouts {
          nextToken
          startedAt
        }
        userid
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      subWorkouts {
        id
        group
        grouptitle
        workoutss {
          nextToken
          startedAt
        }
        desc
        resultcategory
        workoutresultss {
          nextToken
          startedAt
        }
        required
        timecap
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
    }
  }
`;
export const onDeleteWorkoutResultsSubWorkouts = /* GraphQL */ `
  subscription OnDeleteWorkoutResultsSubWorkouts(
    $filter: ModelSubscriptionWorkoutResultsSubWorkoutsFilterInput
  ) {
    onDeleteWorkoutResultsSubWorkouts(filter: $filter) {
      id
      workoutResultsID
      subWorkoutsID
      workoutResults {
        id
        value
        SubWorkouts {
          nextToken
          startedAt
        }
        userid
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      subWorkouts {
        id
        group
        grouptitle
        workoutss {
          nextToken
          startedAt
        }
        desc
        resultcategory
        workoutresultss {
          nextToken
          startedAt
        }
        required
        timecap
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
    }
  }
`;
export const onCreateWorkoutsSubWorkouts = /* GraphQL */ `
  subscription OnCreateWorkoutsSubWorkouts(
    $filter: ModelSubscriptionWorkoutsSubWorkoutsFilterInput
  ) {
    onCreateWorkoutsSubWorkouts(filter: $filter) {
      id
      subWorkoutsID
      workoutsID
      subWorkouts {
        id
        group
        grouptitle
        workoutss {
          nextToken
          startedAt
        }
        desc
        resultcategory
        workoutresultss {
          nextToken
          startedAt
        }
        required
        timecap
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      workouts {
        id
        title
        desc
        date
        users {
          nextToken
          startedAt
        }
        type
        SubWorkouts {
          nextToken
          startedAt
        }
        commentss {
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
    }
  }
`;
export const onUpdateWorkoutsSubWorkouts = /* GraphQL */ `
  subscription OnUpdateWorkoutsSubWorkouts(
    $filter: ModelSubscriptionWorkoutsSubWorkoutsFilterInput
  ) {
    onUpdateWorkoutsSubWorkouts(filter: $filter) {
      id
      subWorkoutsID
      workoutsID
      subWorkouts {
        id
        group
        grouptitle
        workoutss {
          nextToken
          startedAt
        }
        desc
        resultcategory
        workoutresultss {
          nextToken
          startedAt
        }
        required
        timecap
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      workouts {
        id
        title
        desc
        date
        users {
          nextToken
          startedAt
        }
        type
        SubWorkouts {
          nextToken
          startedAt
        }
        commentss {
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
    }
  }
`;
export const onDeleteWorkoutsSubWorkouts = /* GraphQL */ `
  subscription OnDeleteWorkoutsSubWorkouts(
    $filter: ModelSubscriptionWorkoutsSubWorkoutsFilterInput
  ) {
    onDeleteWorkoutsSubWorkouts(filter: $filter) {
      id
      subWorkoutsID
      workoutsID
      subWorkouts {
        id
        group
        grouptitle
        workoutss {
          nextToken
          startedAt
        }
        desc
        resultcategory
        workoutresultss {
          nextToken
          startedAt
        }
        required
        timecap
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      workouts {
        id
        title
        desc
        date
        users {
          nextToken
          startedAt
        }
        type
        SubWorkouts {
          nextToken
          startedAt
        }
        commentss {
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
    }
  }
`;
export const onCreateUserWorkouts = /* GraphQL */ `
  subscription OnCreateUserWorkouts(
    $filter: ModelSubscriptionUserWorkoutsFilterInput
  ) {
    onCreateUserWorkouts(filter: $filter) {
      id
      workoutsID
      userID
      workouts {
        id
        title
        desc
        date
        users {
          nextToken
          startedAt
        }
        type
        SubWorkouts {
          nextToken
          startedAt
        }
        commentss {
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
        Workouts {
          nextToken
          startedAt
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
          startedAt
        }
        Foodentries {
          nextToken
          startedAt
        }
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
    }
  }
`;
export const onUpdateUserWorkouts = /* GraphQL */ `
  subscription OnUpdateUserWorkouts(
    $filter: ModelSubscriptionUserWorkoutsFilterInput
  ) {
    onUpdateUserWorkouts(filter: $filter) {
      id
      workoutsID
      userID
      workouts {
        id
        title
        desc
        date
        users {
          nextToken
          startedAt
        }
        type
        SubWorkouts {
          nextToken
          startedAt
        }
        commentss {
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
        Workouts {
          nextToken
          startedAt
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
          startedAt
        }
        Foodentries {
          nextToken
          startedAt
        }
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
    }
  }
`;
export const onDeleteUserWorkouts = /* GraphQL */ `
  subscription OnDeleteUserWorkouts(
    $filter: ModelSubscriptionUserWorkoutsFilterInput
  ) {
    onDeleteUserWorkouts(filter: $filter) {
      id
      workoutsID
      userID
      workouts {
        id
        title
        desc
        date
        users {
          nextToken
          startedAt
        }
        type
        SubWorkouts {
          nextToken
          startedAt
        }
        commentss {
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
        Workouts {
          nextToken
          startedAt
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
          startedAt
        }
        Foodentries {
          nextToken
          startedAt
        }
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
    }
  }
`;