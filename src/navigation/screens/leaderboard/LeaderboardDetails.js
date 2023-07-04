import React, { useState, useEffect, useRef, useContext } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, KeyboardAvoidingView, FlatList, TouchableOpacity } from 'react-native';
import { TextInput, Pressable, RefreshControl, Dimensions, Platform } from 'react-native';
import Constants from 'expo-constants'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

import Header from '../../../components/ui/inputs/header';
import ListItem from '../../../components/ui/listItem';
import LeaderBoardDisplay from '../../../components/ui/leaderboarddisplay';
import { SafeAreaView } from 'react-native-safe-area-context';

//Date Formatting
import { parseISO,  format } from 'date-fns';

import {useRoute} from '@react-navigation/native';
import {useForm} from 'react-hook-form';

import { Amplify, Auth, DataStore, API, graphqlOperation } from 'aws-amplify';
import { Workouts, User, Comments, WorkoutResults, SubWorkouts } from '../../../models';

//Themes
import ThemeContext from '../../../components/ThemeContext'
import {colors} from '../../../../assets/styles/themes'


const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const windowHeight = Dimensions.get('window').height

const paddingBottom = Platform.OS === 'ios'
    ? 20 // add 20 padding on iOS
    : Dimensions.get('window').height * 0.05; // add 5% padding on Android


export default function LeaderboardDetails( {navigation} ) {
  const route = useRoute();
  const {control, handleSubmit, formState: {errors}} = useForm();
  const [currleaderboard, setCurrLeaderboard] = useState(route?.params?.value);


  //New Variables
  const [workout, setWorkout] = useState([])
  const [workoutleaderboard, setWorkoutLeaderboard] = useState([])
  const [isloading, setIsLoading] = useState([]);

  const [hassubworkouts, setHasSubWorkouts] = useState([false]);
  const [workouts, setWorkouts] = useState([]);
  const [currworkout, setCurrWorkout] = useState([]);
  const [subworkouts, setSubWorkouts] = useState([]);
  const [workoutresults, setWorkoutResults] = useState([]);
  const [users, setUsers] = useState(undefined);
  const [commentsworkouts, setCommentsWorkouts] = useState(undefined);

  const [workoutlist, setWorkoutList] = useState([]);

  const [showcomments, setShowComments] = useState(false);
  const [commenttext, setCommentText] = useState('');

  //const [units, setUnits] = useState('lbs');
  const [userid, setUserID] = useState(undefined);

  //Theme
  const theme = useContext(ThemeContext)
  const darkMode = theme.state.darkMode;

  let activeColors = ''

  if (darkMode) {
    activeColors = colors['dark'];
  } else {
    activeColors = colors['light'];
  }


  //Keyboard
  //const keyboard = useKeyboard()
  //const keyboard_shown = keyboard.keyboardShown 

  //Refresh
  const [refreshing, setRefreshing] = useState(false);
  const [commentrefresh, setCommentRefresh] = useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  //Header
  const [showSearch, setShowSearch] = useState(true);


  useEffect(() => {

    const getWorkoutsQuery = `
        query GetAllWorkouts {
          listWorkouts {
            items {
              id
              title
              desc
              date
              workout_type
              SubWorkouts {
                items {
                  id
                  group
                  grouptitle
                  desc
                  resultcategory
                  required
                  timecap
                  WorkoutResults {
                    items {
                      id
                      value
                      userID
                      User {
                        name
                      }
                    }
                  }
                  numitems
                  order
                }
              }
            }
          }
        }
    `

    const fetchWorkouts = async () => {
      try {
       
            // Fetch workouts
            const workoutResponse = await API.graphql(graphqlOperation(getWorkoutsQuery));

            setWorkoutList(workoutResponse.data.listWorkouts.items)

            // Filter the workouts with workout type FUNCTIONALFITNESS
            const filteredList = workoutResponse.data.listWorkouts.items.filter(
              (workout) => workout.id === currleaderboard
            );

            console.log('this: ' + JSON.stringify(filteredList))

            setWorkout(filteredList[0])
            setWorkoutLeaderboard(buildLeaderboard(filteredList[0]))

          } catch (error) {
            console.error('Error fetching workouts:', error);
          }
        };

    fetchWorkouts().then(() => {
      setIsLoading(false); // Set isLoading to false when the data is fetched successfully
    });

  }, [refreshing]);


  const buildLeaderboard = (workoutResults) => {
    const res = [];

    function ordinal(n) {
      var s = ["th", "st", "nd", "rd"];
      var v = n%100;
      //return n + (s[(v-20)%10] || s[v] || s[0]);
      return (s[(v-20)%10] || s[v] || s[0]);
    }


    workoutResults.SubWorkouts.items.forEach(el => {

      let subworkoutid = el.id
      let required =  el.required
      let desc = el.desc
      let timecap =  el.timecap
      let resultcategory = el.resultcategory
      let group = el.group
      let grouptitle = el.grouptitle


      el.WorkoutResults.items.forEach(item => {

        let userid = item.userID
        let workoutResults =  item.value
        let calc_workoutResults = item.value
        let user_name = item.User.name

         //Calculate total scores
          let score

          if (resultcategory === 'TIME') {

            calc_workoutResults = timecap.replace(':', '').replace(':', '') - parseInt(calc_workoutResults.replace(':', '').replace(':', ''));
            
            // If the user exceeded the time cap it will set their score to 0
            if (calc_workoutResults < 0) {  
              calc_workoutResults =0
            }
          
          
          }

          if (resultcategory === 'SETSREPS') {

            if (calc_workoutResults.includes('-')) {
              const [group, order] = calc_workoutResults.split('-');
              const formattedGroup = parseInt(group, 10).toString().padStart(2, '0');
              const formattedOrder = parseInt(order, 10).toString().padStart(2, '0');
              calc_workoutResults = `${formattedGroup}${formattedOrder}`;
            } else {
              calc_workoutResults = 0
            }


          }
          
          if (calc_workoutResults != null && required) {
            score = calc_workoutResults
          } else if (calc_workoutResults != null) { 
            score = calc_workoutResults * 0.25 //Scale to 25%
          } else {  
            score = 0
          }


          if (!res[userid]) {
            res.push(userid);
          }
    
          let results = {subWorkoutID: subworkoutid, value: workoutResults, group, grouptitle, desc, resultcategory}

  
          
          if(typeof res[userid] === "undefined") {
            //Create new row
            res[userid] = {number: 0, ordinal: '', name: user_name, workoutID: el.id, score: score, results: [results]}
  
          } else {
  
            res[userid].results.push(results);
  
            res[userid].score = parseInt(res[userid].score) + parseInt(score);
  
          }   
  
          
  
      })


    }, {});
    
    

    //Sort the list
    res.sort((a, b) => (res[a].score < res[b].score) ? 1 : -1)

    let count = 1

    //Add numbering to table
    res.forEach(el => {

      res[el].ordinal = ordinal(count)
      res[el].number = count;
      count++;

    }, {});

    console.log('HEre are the results: ' + JSON.stringify(res["d208bca8-2988-47d2-982f-0c33fedc0be6"]))
    return(res)
    
  }

  const postComment = async () => {

    if (commenttext != '') {
      //Insert
      try {

        await DataStore.save(
          new Comments({
            comment: commenttext,
            workoutsID: currleaderboard,
            userID: userid
          })
        );

        /*
        await DataStore.save(
          new CommentsWorkouts({
            comments: comment,
            workouts: currworkout[0]
          })
        );
        */


        //console.log("Comment saved successfully!");
      } catch (error) {
        console.log("Error saving post", error);
      }

      
      //Refresh page
      setCommentRefresh(!commentrefresh)

      //Clear textbox
      setCommentText('')
    }
    
    
  }


  /*
  //Old

  const groupAndAdd = (arr) => {
    const res = [];

    console.log(arr)

    arr.forEach(el => {
  

      let grouptitle = el.subWorkouts.group + '. ' + el.subWorkouts.grouptitle

      //Checking to see if group exists
      //If not exists, add group to array
      if (!res[grouptitle]) {
        res.push(grouptitle);
      }

      let info = {id: el.subWorkouts.id, desc: el.subWorkouts.desc, resultcat: el.subWorkouts.resultcategory}

      if(typeof res[grouptitle] === "undefined") {


        res[grouptitle] = {group: grouptitle, info: [info]}

      } else {

        res[grouptitle].info.push(info);
        //res[grouptitle].id.push(el.subWorkouts.id);

      }
      
      
    }, {});

    

    setSubWorkouts(res);

    return(res)


  }

  const buildUserDT = (arr, user_res, has_sub_workouts) => {
    const res = [];

    //console.log(arr)
  
    function ordinal(n) {
      var s = ["th", "st", "nd", "rd"];
      var v = n%100;
      //return n + (s[(v-20)%10] || s[v] || s[0]);
      return (s[(v-20)%10] || s[v] || s[0]);
    }

    //Check to see if current workout we are on has results
    if (has_sub_workouts) {

      arr.forEach(el => {
        //console.log('category: ' + JSON.stringify(subworkouts[category]))
  
        let userid = el.workoutResults.userid
        let subworkoutid = el.subWorkouts.id
        let workoutResults =  el.workoutResults.value
        let calc_workoutResults = el.workoutResults.value
        let required =  el.subWorkouts.required
        let timecap =  el.subWorkouts.timecap
        let resultcategory = el.subWorkouts.resultcategory
  
  
  
        //Calculate total scores
        let score
  
        if (resultcategory === 'TIME') {
  
          calc_workoutResults = timecap.replace(':', '').replace(':', '') - parseInt(calc_workoutResults.replace(':', '').replace(':', ''));
        }
        
        if (calc_workoutResults != null && required) {
          score = calc_workoutResults
        } else if (calc_workoutResults != null) { 
          score = calc_workoutResults * 0.25 //Scale to 25%
        } else {  
          score = 0
        }
  
  
        
        if (!res[userid]) {
          res.push(userid);
        }
  
        let results = {subWorkoutID: subworkoutid, value: workoutResults}
  
        //console.log(results)
  
        //Lookup User info
  
        if (user_res.length != 0) {
  
          let user_filtered = user_res.filter(obj => (obj.id == userid));
  
          let user_name
          
          if (user_filtered.length != 0) {
            user_name = user_filtered[0].name
          }
  
          //console.log('this: ' + JSON.stringify(res[userid]))
          
          if(typeof res[userid] === "undefined") {
  
            //Create new row
            //console.log('create new row')
            res[userid] = {number: 0, ordinal: '', name: user_name, workoutID: currleaderboard, score: score, results: [results]}
  
          } else {
  
            res[userid].results.push(results);
  
            res[userid].score = parseInt(res[userid].score) + parseInt(score);
  
          }   
  
        }
  
      }, {});
      

      //Sort the list
      res.sort((a, b) => (res[a].score < res[b].score) ? 1 : -1)
  
      let count = 1
  
      //Add numbering to table
      res.forEach(el => {
  
        res[el].ordinal = ordinal(count)
        res[el].number = count;
        count++;
        //console.log(res[el].number)
  
      }, {});
  
  
      setWorkoutResults(res)
  
    }
    
  }

  */

  useEffect(() => {

    getUser();

  }, []);


  useEffect(() => {



    const subs = DataStore.observeQuery(Comments).subscribe(() => getWorkoutComments());

  
    return () => {
      subs.unsubscribe();
    };


    
  }, [commentrefresh]);

  /*
  useEffect(() => {

    const today = format(new Date(), 'MM/dd/yyyy');

    const subs = DataStore.observeQuery(WorkoutResults).subscribe(() => getWorkoutAndSubWorkouts(today));

  
    return () => {
      subs.unsubscribe();
    };


  }, [refreshing]);
*/
 

  async function getUser(){

    try {
      const authUser = await Auth.currentAuthenticatedUser({bypassCache: true});
      //console.log(authUser.attributes.sub)
      //setAuthSub(authUser.attributes.sub)

     
      //Get local User Id for Query
      const user = await DataStore.query(User, sw =>
        sw.sub.eq(authUser.attributes.sub)
      )
    
      //console.log('Here we are: ' + JSON.stringify(user))
      //Query Matrix Table to find list of ids  
      if (user[0]) {
        //console.log('made it in here')

        //console.log(user[0])
        //Set state variable
        setUserID(user[0].id)
        //setUnits(user[0].units.toLowerCase())
        //console.log(user[0])

      }
    } catch (e) {
      console.log('Error: ' + e)
    }

  }

  async function getWorkoutComments() {


    //console.log('here we are')

    try {

      const workouts = await DataStore.query(Workouts, (s) =>
        s.id.eq(currleaderboard)
      );

      //console.log(workouts)

      const this_workout = workouts[0]

      //Get Comments
      const comments = await DataStore.query(Comments)


      comments.sort((a, b) => (a.createdAt > b.createdAt) ? -1 : 1)

      const dt = {
        id: this_workout.id,
        title: this_workout.title,
        desc: this_workout.desc,
        date: this_workout.date,
        type: this_workout.type,
        comments: comments.map(comments => ({
          id: comments.id,
          comment: comments.comment,
          userID: comments.userID,
          createdAt: comments.createdAt
        })),
      }

      //console.log(dt.comments)
    
    
      //console.log(comments
      setCommentsWorkouts(dt)


    } catch (e) {
      console.log(e)
    }
  }

  async function getWorkoutAndSubWorkouts(date) {

    // Custom comparator function
    const compare = (a, b) => {
      // Compare by "group" field
      if (a.group < b.group) {
        return -1;
      }
      if (a.group > b.group) {
        return 1;
      }

      // If "group" fields are equal, compare by "order" field
      if (a.order < b.order) {
        return -1;
      }
      if (a.order > b.order) {
        return 1;
      }

      // If both fields are equal, maintain the original order
      return 0;
    };


    // Find today's workout
    //const workouts = await DataStore.query(Workouts);
    const workouts = await DataStore.query(Workouts, (s) =>
      s.id.eq(currleaderboard)
    );

    setWorkoutList(workouts)
    

    if (workouts.length === 0) {
      //console.log('No workout found for today');
      return null;
    }

    // Find the subworkouts associated with the workout
    const subWorkouts_unfiltered = await DataStore.query(SubWorkouts, (s) =>
      s.workoutsID.eq(workouts[0].id)
    );

    const subWorkouts = subWorkouts_unfiltered.sort(compare)

    //console.log('here we are: ' + JSON.stringify(subWorkouts))

    // Sort the array using the comparator function
    //const sortedData = subWorkouts.sort(compare);

    // Get all the subworkoutIds
    const subWorkoutIds = subWorkouts.map((sw) => sw.id);

    //Query all WorkoutResults
    const workoutResults = await DataStore.query(WorkoutResults)

    //var arr = workoutResults.filter(item => subWorkoutIds.indexOf(item.subworkoutsID) == 1);
    const workoutResults_filtered = workoutResults.filter(({subworkoutsID}) => subWorkoutIds.includes(subworkoutsID));

    const subWorkoutsWithResults = subWorkouts.map(subWorkout => {
      // Get the workout result for this sub workout from the results table
      //const workoutResult = workoutResults_filtered.find(result => result.subworkoutsID === subWorkout.id);
      const workoutResult = workoutResults_filtered.filter(result => result.subworkoutsID === subWorkout.id);
    
      // If there is no workout result for this sub workout, return the sub workout object as is
      if (!workoutResult) {
        return subWorkout;
      }
      

      return {
        ...subWorkout,
        workoutresults: workoutResult.map(result => ({
          id: result.id,
          value: result.value,
          userID: result.userID
        })) 
      };



      // If there is a workout result for this sub workout, add it as a property of the sub workout object
      /*
      return {
        ...subWorkout,
        workoutresults: {
          id: workoutResult.id,
          value: workoutResult.value,
          userID: workoutResult.userID
        }
      };
      */
    });

    const currentWorkout = workouts[0]

    /*
    const dt = {
      id: currentWorkout.id,
      title: currentWorkout.title,
      desc: currentWorkout.desc,
      date: currentWorkout.date,
      type: currentWorkout.type,
      subWorkouts: subWorkouts.map(subWorkout => ({
        id: subWorkout.id,
        group: subWorkout.group,
        grouptitle: subWorkout.grouptitle,
        desc: subWorkout.desc,
        resultcategory: subWorkout.resultcategory,
        required: subWorkout.required,
        timecap: subWorkout.timecap,
      })),
    }
    */
    
    //Defining starting data structer for top level workouts
    const dt = {
      id: currentWorkout.id,
      title: currentWorkout.title,
      desc: currentWorkout.desc,
      date: currentWorkout.date,
      type: currentWorkout.type,
    }

    // Add the subWorkoutsWithResults array to the dt object
    const dtWithResults = {
      ...dt,
      subWorkouts: subWorkoutsWithResults
    };

    //console.log('Here is the value: ' + JSON.stringify(dtWithResults.subWorkouts))
    setWorkouts(dtWithResults)

    if (dtWithResults.subWorkouts) {
      groupAndAdd(dtWithResults.subWorkouts)
    }


    //Get Users
    const userResults = (await DataStore.query(User))

    setUsers(userResults)

    if (userResults) {

      if (dtWithResults) {
        
        buildUserDT(dtWithResults, userResults)
  
      } 

    }


  }

  async function getLeaderBoardInfo(){

    //console.log('running here')

    //Get curr Workout
    const curr_workout_res = (await DataStore.query(Workouts)).filter(
      pe => pe.id === currleaderboard
    )

    setCurrWorkout(curr_workout_res)


    //Get Users
    const userResults = (await DataStore.query(User))

    //console.log(userResults)

    setUsers(userResults)

    if (userResults.length != 0) {

      //console.log('leaderboard id: ' + currleaderboard)

      const workoutssubworkouts = (await DataStore.query(WorkoutsSubWorkouts)).filter(
        pe => pe.workouts.id === currleaderboard
      )

     //console.log('this is what we are looking for: ' + JSON.stringify(workoutssubworkouts))
      

      setWorkouts(workoutssubworkouts)
  
      let res
      if (workoutssubworkouts) {
        res = groupAndAdd(workoutssubworkouts)
      }
  
      const workoutresultssubworkouts = (await DataStore.query(WorkoutResultsSubWorkouts))

      //See if there are any workout results to show
      let sub_workout_ids = []
      
      workoutssubworkouts.forEach(workout => {
        sub_workout_ids.push(workout.subWorkouts.id)
      });
  
      //sub_workout_ids.push('7bda28eb-017c-4fb8-93a5-cb273f651719')
      //console.log(sub_workout_ids)

      let has_sub_workouts = false

      if (sub_workout_ids.length > 0) {
          sub_workout_ids.forEach(subid => {

            workoutresultssubworkouts.forEach(results => {

              if(results.subWorkouts.id.includes(subid)){
                //console.log('this value is included')
                setHasSubWorkouts(true);
                has_sub_workouts = true;
              }

            });
        })
      }
      

      //console.log(workoutresultssubworkouts

      if (workoutresultssubworkouts) {

        buildUserDT(workoutresultssubworkouts, userResults, has_sub_workouts)
  
      } 

      //Get Comments
      const comments = (await DataStore.query(CommentsWorkouts)).filter(
        pe => pe.workouts.id === currleaderboard
      )


      //Sort the list
      comments.sort((a, b) => (a.comments.createdAt > b.comments.createdAt) ? -1 : 1)

      //console.log(comments
      setCommentsWorkouts(comments)
    }
  }

  
  const Comment = (props) => {

    //console.log('this value: ' + props.createdat)


    let temp_val
    if (!props.createdat) {
      temp_val = '2022-12-07T04:40:23.156Z'
    } else {
      temp_val = props.createdat
    }

    const today = format(new Date(), 'MM/dd/yyyy');
    let created_at = format(new Date(temp_val), 'MM/dd/yyyy')

    let created_at_formatted

    if (today === created_at) {
      created_at_formatted = 'Today ' + format(new Date(temp_val), 'h:mmaaa')
    } else {
      created_at_formatted = format(new Date(temp_val), 'MM/dd h:mmaaa')
    }

    //console.log('made it here: ' + created_at_formatted)
   
  
    return (
      <View style={{flexDirection: 'row', padding: 5}}>
        <View style={{marginRight: 5}}>
          <Image style={{height: 30, width: 30}} source={require('../../../../assets/images/testingimages/ProfilePicTesting.png')} />
        </View>
        <View style={{flex: 1, flexDirection: 'column', backgroundColor: activeColors.secondary_bg, marginTop: 5, paddingLeft: 5, paddingRight: 3, paddingBottom: 3}}>
          <View style={{padding: 5, paddingBottom: 0}}>
              <Text style={{fontWeight: '500', flexShrink: 1, color: activeColors.primary_text}}>{props.name}</Text>
          </View>
          <View style={{flexDirection: 'row', padding: 5, paddingTop: 0, justifyContent: 'space-between'}}>
              <Text style={{fontSize: 13, fontWeight: '300', color: activeColors.primary_text}}>{props.comment}</Text>
          </View>
          <View style={{justifyContent: 'flex-end', flexDirection: 'row'}}>
              <Text style={{fontSize: 12, color: activeColors.primary_text}}>{created_at_formatted}</Text>
          </View>
        </View>
      </View>
    )
    
  }
  
  const CommentSection = (props) => {


    //console.log(commentsworkouts)

    let datadisplayed = ''
    
    if (commentsworkouts) {

      datadisplayed =  commentsworkouts.comments.map((item, index) => {

          let comment_id = item.id;

          //console.log('this: ' + item.userid)
          //console.log(users)
          
          try {
            const user_lookup = users.filter(
              pe => pe.id === item.userID
            )
  
            //console.log(user_lookup)
  
            
            let user_name = ''
            if (user_lookup != 0) {
              //console.log('This one: ' + JSON.stringify(user_lookup))
  
              user_name = user_lookup[0].name;
  
              return (
                <Comment key={comment_id} name={user_name} comment={item.comment} createdat={item.createdAt} />
              );
            }
          } catch (e) {
            console.log(e)
          }
          
          

          
        })
        
    }
    
  
    return (
      <View style={{ paddingTop: 10}}>

        
        {datadisplayed}
      
      </View>
    )
      
  }
    
  const LeaderBoardPreview = (props) => {
    const [link, setLink] = useState('');
    

    const viewComments = () => {
      setShowComments(true)
    }

  
    

    console.log('Workout Results this one: ' + JSON.stringify(workoutresults))
      
    let datadisplayed = workoutresults.map((category, index) => {

      return (
        <LeaderBoardUserRow 
          name={workoutresults[category].name} 
          userid={category}
          key={category} 
          score={workoutresults[category].score}
          number={workoutresults[category].number}
          ordinal={workoutresults[category].ordinal}
          curr_item={category}
        />
      );
    })


    
    return(
      <View style={{justifyContent: 'flex-end', flex: 1}}>

        
      {showcomments ? (
        <>
          <ScrollView
            style={{marginBottom: 100, paddingBottom: 50}}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
          >

          <CommentSection />

        </ScrollView>

        </>
      ) : (
        <ScrollView 
          refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />}
          >
          <View style={styles.container_preview}>
            <View style={styles.container_header}>
                <View style={{flex: 1}}>
                  <Text style={{fontSize: 20, fontWeight: '600', color: activeColors.secondary_text}}>{props.title}</Text>
                  <Text style={{fontSize: 14, fontWeight: '400', color: activeColors.secondary_text}}>{props.workout_date}</Text>
                </View>
                <Pressable onPress={viewComments} style={{flex: 1,  paddingleft: 10,  justifyContent: 'center', alignItems: 'flex-end'}}>
                  <Text style={{color: activeColors.accent_text}}>View Comments</Text>
                </Pressable>
              </View>
            
            <View style={styles.container_userRows}>
              {datadisplayed}
            
            </View>
            
          </View>
        </ScrollView>
      )}

      </View>
    );
  
  }

  const HeaderTitle = () => {
      
      const title = <Text style={{fontWeight: '500'}}>{workout.title}</Text>
      const date = <Text style={{fontWeight: '400', fontSize: 13}}>   {workout.date}</Text>


      return(
        <>
          {title} {date}
        </>
      )
  }

  const handleCommentsOnPress = () => {
    console.log('comment on press')
  };


  return(
    <SafeAreaView style={[styles.container, {backgroundColor: activeColors.primary_bg}]}>
       <Header title={workout ? <HeaderTitle /> : ""} />
          <ScrollView>
            <View>
                  {  workoutleaderboard ? (
                  <LeaderBoardDisplay onPress={() => handleCommentsOnPress(workout.id)} key={workout.id} userid={userid} workoutinfo={workout} results={workoutleaderboard} />

                ) : (
                <>
                  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: activeColors.primary_bg}}>
                    <Text style={{color: activeColors.primary_text}}>No results to display</Text>
                  </View>
                </>
              )}
            </View>
        </ScrollView>
    </SafeAreaView>
  )


    return(
      <SafeAreaView style={{flex: 1, backgroundColor: activeColors.primary_bg }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0}
        style={{
          borderRadius: 10,
          flex: 1,

        }}>
          
        <Header title={workout ? <HeaderTitle /> : ""} />
        {  workoutleaderboard ? (
            <LeaderBoardDisplay onPress={() => handleCommentsOnPress(workout.id)} key={workout.id} userid={userid} workoutinfo={workout} results={workoutleaderboard} />

          ) : (
          <>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: activeColors.primary_bg}}>
              <Text style={{color: activeColors.primary_text}}>No results to display</Text>
            </View>
          </>
        )}


         {showcomments ? (
          <View style={{flexDirection: 'row', padding: 3, backgroundColor: activeColors.primary_bg}}>
                <TextInput 
                multiline 
                value={commenttext} 
                onChangeText={setCommentText}
                placeholder={'Write a comment'} 
                placeholderTextColor={activeColors.primary_text} 
                style={{flex: 1, borderRadius: 5,marginRight: 5, padding: 5, backgroundColor: activeColors.primary_bg, color: activeColors.secondary_text}}
              />
            <View style={{ justifyContent: 'flex-end'}}>
              <Pressable onPress={postComment} style={{height: 40, borderRadius: 5, padding: 10, paddingLeft: 20, paddingRight: 20, justifyContent: 'center', backgroundColor: '#E1AB09'}}>
                <Text>Post</Text>
              </Pressable>
            </View>
        
          </View>
        ) : (
          <></>
        ) }

      </KeyboardAvoidingView>

      </SafeAreaView>
    );
}

const statusBarHeight = Constants.statusBarHeight



const styles = StyleSheet.create({
  container: {
    flex: 1,
    //</ScrollView>flexDirection: 'column',
    //marginTop: statusBarHeight,
    //backgroundColor: '#EFEFEF',
    //marginBottom: 48
    //alignItems: 'center'
  },
  container_new: {
    flex: 1,
    //paddingTop: statusBarHeight,
    //backgroundColor: '#fff',
    //paddingBottom: 50, // add padding to the bottom of the screen
  },
  content_new: {
    flex: 1,
    //alignItems: 'center',
    //justifyContent: 'center',
  },

  marginBottom50: {
    marginBottom: 50
  },
  marginBottomNone: {
    marginBottom: 0
  },
  datePicker: {
    justifyContent: 'space-between',
    //alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#C9C9C9',
    //backgroundColor: 'white',
    //marginBottom: 10,
    flexDirection: 'row'
  },
  workoutCategory: {
    //backgroundColor: 'blue',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 100,
    paddingTop: 20
  },
  datePickerArrowsContainer: {
    //backgroundColor: '#EFEFEF',
    borderRadius: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingRight: 60,
    paddingBottom: 15,
    paddingTop: 15,
    width: 200
  },
  //header
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingTop: 15,
    paddingBottom: 15,
    //backgroundColor: 'white',
    borderBottomColor: '#c9c9c9', 
    borderBottomWidth: 1
  },
  header_icon_container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10
    //marginRight: 10
  },
  header_text: {
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 10,
    color:'#363636',
    //backgroundColor: 'blue'
  },
  header_icons: {
    height: 27,
    width: 27,
    //marginLeft: 10
  },
  header_icons_filter: {
    height: 23,
    width: 23,
    //marginLeft:20
  },
  searchBar: {
    flex: 1,
    height: 30,
    marginLeft: 0,
    marginRight: 10,
    borderRadius: 0,
    backgroundColor: '#E7E7E7',
    paddingLeft: 10
  },

  allPageContainer: {
    backgroundColor:'#DCDCDC', flex: 1,
    alignItems: 'center'
  },
  //Container Preview
  container_preview: {
    //backgroundColor: 'blue',
    margin: 5
  },
  container_header: {
    //backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
    padding: 15,
    flexDirection: 'row'
    //paddingLeft: 10
  },
  container_footer: {
    //backgroundColor: 'white',
    //flexDirection: 'row',
    //justifyContent: 'space-between',
    //padding: 15
    maxHeight: 300,
    marginBottom: 5
  },
  container_userRows: {

  },
  container_userRow: {
    //backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
    flexDirection: 'row',
    padding:15
    //justifyContent: 'space-between',
  },
  rowNumber: { 
    flexDirection: 'row', 
    alignSelf: 'flex-start', 
    alignSelf:'center'
  },
  rowMiddleSection: {
    width: '40%', 
    justifyContent: 'center'
  },
  rowCounts: {
    width: '40%', 
    justifyContent: 'center'
  },
  rowCountsContainer: {
    backgroundColor: '#363636', 
    width: '80%', 
    alignSelf: 'center', 
    alignItems: 'center', 
    padding: 5, 
    borderRadius: 3
  },

  inputContainer_comments: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  input_comments: {
    flex: 1,
    marginRight: 10,
    fontSize: 16,
    lineHeight: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  
});
