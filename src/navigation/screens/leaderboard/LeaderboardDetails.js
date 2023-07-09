import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { TextInput, Pressable, RefreshControl, Dimensions, Platform, KeyboardAvoidingView } from 'react-native';
import Constants from 'expo-constants'
import Ionicons from 'react-native-vector-icons/Ionicons';

import Header from '../../../components/ui/inputs/header';
import LeaderBoardDisplay from '../../../components/ui/leaderboarddisplay';
import { SafeAreaView } from 'react-native-safe-area-context';
import {ActivityIndicator, Avatar} from "@react-native-material/core";

//Date Formatting
import { format } from 'date-fns';

import {useRoute} from '@react-navigation/native';

import {Auth, DataStore, API, graphqlOperation } from 'aws-amplify';
import {User, Comments} from '../../../models';

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
  const [currleaderboard, setCurrLeaderboard] = useState(route?.params?.value);

  //New Variables
  const [workout, setWorkout] = useState([])
  const [workoutleaderboard, setWorkoutLeaderboard] = useState([])
  const [isLoading, setIsLoading] = useState([]);
  const [users, setUsers] = useState(undefined);
  const [commentsworkouts, setCommentsWorkouts] = useState(undefined);


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


  //Refresh
  const [refreshing, setRefreshing] = useState(false);
  const [commentrefresh, setCommentRefresh] = useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {

    const getWorkoutsQuery = `
      query GetAllWorkouts {
        listWorkouts(filter: { _deleted: { ne: true } }) {
          items {
            id
            title
            desc
            date
            workout_type
            SubWorkouts(filter: { _deleted: { ne: true } }) {
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

  useEffect(() => {

    getUser();

  }, []);


  useEffect(() => {



    const subs = DataStore.observeQuery(Comments).subscribe(() => getWorkoutComments());

  
    return () => {
      subs.unsubscribe();
    };


    
  }, [commentrefresh]);


  async function getUser(){

    try {
      const authUser = await Auth.currentAuthenticatedUser({bypassCache: true});
      //console.log(authUser.attributes.sub)
      //setAuthSub(authUser.attributes.sub)

     
      //Get local User Id for Query
      const user = await DataStore.query(User, sw =>
        sw.sub.eq(authUser.attributes.sub)
      )

      //Load all Users
      const userResults = (await DataStore.query(User))

      setUsers(userResults)
    
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

      //Get Comments
      const comments = await DataStore.query(Comments, (s) =>
        s.workoutsID.eq(currleaderboard)
      );

      console.log('comments: ' + JSON.stringify(comments))

      comments.sort((a, b) => (a.createdAt > b.createdAt) ? -1 : 1)

      /*
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
      */
      //console.log(dt.comments)
    
    
      //console.log(comments
      setCommentsWorkouts(comments)


    } catch (e) {
      console.log(e)
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
      <View style={{flexDirection: 'row', padding: 5, }}>
        <View style={{marginRight: 5, justifyContent: 'center'}}>
          <Avatar label={props.name} autoColor size={35} image={{ uri: props.image }} />
        </View>
        <View style={{flex: 1, flexDirection: 'column', paddingLeft: 5, paddingRight: 3, paddingBottom: 3, borderBottomWidth: 0.2, borderBottomColor: activeColors.just_gray}}>
          <View style={{padding: 5, paddingBottom: 0, flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{marginRight: 10}}>
              <Text style={{fontWeight: '400', flexShrink: 1, color: activeColors.primary_text}}>{props.name}</Text>
            </View>
            <View>
              <Text style={{fontSize: 12, color: activeColors.primary_text}}>{created_at_formatted}</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', padding: 5, paddingTop: 0, justifyContent: 'space-between'}}>
              <Text style={{fontSize: 14, fontWeight: '300', color: activeColors.primary_text}}>{props.comment}</Text>
          </View>
          
        </View>
      </View>
    )
    
  }
  
  const CommentSection = (props) => {


    //console.log(commentsworkouts)

    let datadisplayed = ''
    
    if (commentsworkouts) {

      datadisplayed =  commentsworkouts.map((item, index) => {

          let comment_id = item.id;
          
          try {
            const user_lookup = users.filter(
              pe => pe.id === item.userID
            )

            let user_name, user_img
            if (user_lookup != 0) {
  
              user_name = user_lookup[0].name;
              user_img = user_lookup[0].image;
  
              return (
                <Comment key={comment_id} name={user_name} image={user_img} comment={item.comment} createdat={item.createdAt} />
              );
            }
          } catch (e) {
            console.log(e)
          }
          
        })
        
    }
    
  
    return (

      <View style={{ flex: 1, paddingTop: 10, backgroundColor: activeColors.primary_bg}}>
        {datadisplayed}
      </View>
      
    )
      
  }
    

  const HeaderTitle = () => {
      
      const title = <Text style={{fontWeight: '500'}}>{workout.title}</Text>
      const date = <Text style={{fontWeight: '400', fontSize: 13}}> {workout.date}</Text>


      return(
        <>
          {title} {date}
        </>
      )
  }

  const handleCommentsOnPress = () => {
    setShowComments(!showcomments);
  };

   {/*
              <View style={[styles.commentsContainer, { top: 56 + statusBarHeight }]}>
                <View style={[styles.commentsHeader, {backgroundColor: activeColors.primary_bg}]}>
                  <Text style={[styles.commentsHeaderText, {color: activeColors.primary_text}]}>Comments</Text>
                  <TouchableOpacity style={[styles.collapseButton, {transform: [{ rotate: '45deg' }]}]} onPress={handleCommentsOnPress}>
                    <Ionicons name={'add-outline'} size={32} style={[styles.drawerButtonIcon, {color: activeColors.primary_text}]} />
                  </TouchableOpacity>
                </View>
                <ScrollView
                      refreshControl={
                        <RefreshControl
                          refreshing={refreshing}
                          onRefresh={onRefresh}
                        />
                      }
                    >
                    <CommentSection />
                    
                </ScrollView>
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
              </View>
            */}

    {/*  
      <TextInput
        style={styles.textInput}
        placeholder="Write a message"
        // Other text input props
      /> 
    */}
  
  return (
    
    <SafeAreaView style={[styles.container, { backgroundColor: activeColors.primary_bg }]}>
      <View style={{ flex: 1 }}>
        <Header title={workout ? <HeaderTitle /> : ""} navigation={navigation} backButtonPath="LeaderboardScreen" />
          {isLoading ? (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
              <ActivityIndicator size="large" color={activeColors.accent_text} />
            </View>
          ) : (
            <ScrollView style={{flex: 1}}>
              <View>
                {workoutleaderboard ? (
                  <LeaderBoardDisplay onPress={() => handleCommentsOnPress(workout.id)} key={workout.id} userid={userid} workoutinfo={workout} results={workoutleaderboard} />

                ) : (
                    <>
                      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: activeColors.primary_bg }}>
                        <Text style={{ color: activeColors.primary_text }}>No results to display</Text>
                      </View>
                    </>
                  )}
              </View>
            </ScrollView>
          )}
        {showcomments && (
          <>
            <View style={[styles.commentsHeader, { backgroundColor: activeColors.primary_bg }]}>
              <Text style={[styles.commentsHeaderText, { color: activeColors.primary_text }]}>Comments</Text>
              <TouchableOpacity style={[styles.collapseButton, { transform: [{ rotate: '45deg' }] }]} onPress={handleCommentsOnPress}>
                <Ionicons name={'add-outline'} size={32} style={[styles.drawerButtonIcon, { color: activeColors.primary_text }]} />
              </TouchableOpacity>
            </View>
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
              }>
              <CommentSection />
            </ScrollView>
            <View style={{flexDirection: 'row', padding: 3, paddingTop: 5, backgroundColor: activeColors.primary_bg, borderTopWidth: 1, borderColor: activeColors.secondary_text}}>
                <View style={{flex: 1}} >
                  <TextInput 
                      multiline 
                      value={commenttext} 
                      onChangeText={setCommentText}
                      placeholder={'Write a message'} 
                      placeholderTextColor={activeColors.primary_text} 
                      style={{marginRight: 5, padding: 5, backgroundColor: activeColors.primary_bg, color: activeColors.secondary_text}}
                    />
                  </View>
              <View style={{ justifyContent: 'flex-end' }}>
                <Pressable onPress={postComment} style={{ height: 40, borderRadius: 5, padding: 10, paddingLeft: 20, paddingRight: 20, justifyContent: 'center', backgroundColor: '#E1AB09' }}>
                  <Text>Send</Text>
                </Pressable>
              </View>
            </View>
          </>
        )}
        {!showcomments && (
          <TouchableOpacity style={[styles.drawerButton, { backgroundColor: activeColors.comment_btn_bg }]} onPress={handleCommentsOnPress}>
            <Text style={[styles.drawerButtonText, { color: activeColors.comment_btn_text }]}>View Comments</Text>
            <Ionicons name={showcomments ? 'chevron-down' : 'chevron-up'} size={20} style={[styles.drawerButtonIcon, { color: activeColors.comment_btn_text }]} />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>

  )
  return(
    <SafeAreaView style={[styles.container, {backgroundColor: activeColors.primary_bg}]}>
       <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : ''}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 75 : 0}
          style={{
            borderRadius: 10,
            flex: 1,
            marginHorizontal: 10,
          }}>
       <Header title={workout ? <HeaderTitle /> : ""} navigation={navigation} backButtonPath="LeaderboardScreen" />
       {isLoading ? (
        <View style={[styles.container, {justifyContent: 'center', alignItems: 'center'}]}>
          <ActivityIndicator size="large" color={activeColors.accent_text} />
        </View>
      ) : (
        <>
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
          
          {showcomments && (
            <View style={{flex: 1, justifyContent: 'space-between'}}>
              <View style={[styles.commentsHeader, {backgroundColor: activeColors.primary_bg}]}>
                <Text style={[styles.commentsHeaderText, {color: activeColors.primary_text}]}>Comments</Text>
                <TouchableOpacity style={[styles.collapseButton, {transform: [{ rotate: '45deg' }]}]} onPress={handleCommentsOnPress}>
                  <Ionicons name={'add-outline'} size={32} style={[styles.drawerButtonIcon, {color: activeColors.primary_text}]} />
                </TouchableOpacity>
              </View>
                <ScrollView 
                            refreshControl={
                              <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                              />
                            }>
                  <CommentSection />
                </ScrollView>
      
                <View style={{flexDirection: 'row', padding: 3, paddingTop: 10, backgroundColor: activeColors.primary_bg, borderTopWidth: 1, borderColor: activeColors.secondary_text}}>
                      <TextInput 
                      multiline 
                      value={commenttext} 
                      onChangeText={setCommentText}
                      placeholder={'Write a message'} 
                      placeholderTextColor={activeColors.primary_text} 
                      style={{flex: 1, borderRadius: 5,marginRight: 5, padding: 5, backgroundColor: activeColors.primary_bg, color: activeColors.secondary_text}}
                    />
                  <View style={{ justifyContent: 'flex-end'}}>
                    <Pressable onPress={postComment} style={{height: 40, borderRadius: 5, padding: 10, paddingLeft: 20, paddingRight: 20, justifyContent: 'center', backgroundColor: '#E1AB09'}}>
                      <Text>Send</Text>
                    </Pressable>
                  </View>
              
                </View>
            </View>
           
          )}
          {!showcomments && (
            <TouchableOpacity style={[styles.drawerButton, {backgroundColor: activeColors.comment_btn_bg}]} onPress={handleCommentsOnPress}>
              <Text style={[styles.drawerButtonText, {color: activeColors.comment_btn_text}]}>View Comments</Text>
              <Ionicons name={showcomments ? 'chevron-down' : 'chevron-up'} size={20} style={[styles.drawerButtonIcon, {color: activeColors.comment_btn_text}]} />
            </TouchableOpacity>
          )}
        </>
      )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  )

}

const statusBarHeight = Constants.statusBarHeight

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container_userRow: {
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
    flexDirection: 'row',
    padding:15
  },
  commentsContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  commentsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 7,
  },
  commentsHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  collapseButton: {
    borderRadius: 20,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  collapseButtonText: {
    marginRight: 8,
  },
  collapseButtonIcon: {
  },
  drawerButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 7,
    flexDirection: 'row',
    alignItems: 'center',
  },
  drawerButtonText: {
    color: 'white',
    marginRight: 8,
  },
  drawerButtonIcon: {
    color: 'white',
  },

  //testing
  textInputContainer: {
    flexDirection: 'row',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  textInput: {
    height: 40,
    paddingHorizontal: 10,
    backgroundColor: '#E1E1E1',
    // Other text input styles
  },
});
