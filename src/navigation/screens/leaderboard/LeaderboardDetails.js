import React, { useState, useEffect, useRef, useContext } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { TextInput, Pressable, RefreshControl } from 'react-native';
import Constants from 'expo-constants'
import Ionicons from 'react-native-vector-icons/Ionicons';

//Date Formatting
import { parseISO,  format } from 'date-fns';

import {useRoute} from '@react-navigation/native';
import {useForm} from 'react-hook-form';

import { Amplify, Auth, DataStore, Hub } from 'aws-amplify';
import { Workouts, User, WorkoutsSubWorkouts, WorkoutResultsSubWorkouts, CommentsWorkouts, Comments } from '../../../models';

//Themes
import ThemeContext from '../../../components/ThemeContext'
import {colors} from '../../../../assets/styles/themes'


const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}


export default function LeaderboardDetails( {navigation} ) {
  const route = useRoute();
  const {control, handleSubmit, formState: {errors}} = useForm();
  const [currleaderboard, setCurrLeaderboard] = useState(route?.params?.value);

  const [hassubworkouts, setHasSubWorkouts] = useState([false]);
  const [workouts, setWorkouts] = useState([]);
  const [currworkout, setCurrWorkout] = useState([]);
  const [subworkouts, setSubWorkouts] = useState([]);
  const [workoutresults, setWorkoutResults] = useState([]);
  const [users, setUsers] = useState(undefined);
  const [commentsworkouts, setCommentsWorkouts] = useState(undefined);

  const [units, setUnits] = useState('lbs');
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

  useEffect(() => {

    getUser();

  }, []);

  useEffect(() => {


    const subs = DataStore.observeQuery(WorkoutsSubWorkouts).subscribe(() => getLeaderBoardInfo());

  
    return () => {
      subs.unsubscribe();
    };


  }, [refreshing, commentrefresh]);

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

  async function getUser(){

    try {
      const authUser = await Auth.currentAuthenticatedUser({bypassCache: true});
      console.log(authUser.attributes.sub)
      //setAuthSub(authUser.attributes.sub)

     
      //Get local User Id for Query
      const user = await DataStore.query(User, sw =>
        sw.sub('eq', authUser.attributes.sub)
      )
    
      //console.log('Here we are: ' + JSON.stringify(user))
      //Query Matrix Table to find list of ids  
      if (user[0]) {
        //console.log('made it in here')

        //console.log(user[0])
        //Set state variable
        setUserID(user[0].id)
        setUnits(user[0].units.toLowerCase())
        //console.log(user[0])

      }
    } catch (e) {
      console.log('Error: ' + e)
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
                console.log('this value is included')
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

  /*
    Leaderboard preview
  */
  
  const LeaderBoardUserRow = (props) => {


    const [expand, setExpand] = useState(false);

    //Loop over inner results list and create drop down

    //console.log(props)

    let datadisplayed = workoutresults[props.curr_item].results.map((item, index) => {


      const subworkouts_filtered = workouts.filter(
        pe => pe.subWorkouts.id === item.subWorkoutID
      )

      //console.log('this: ' + JSON.stringify(subworkouts_filtered))
      
      if (subworkouts_filtered.length != 0){
        let curr_units = ''

        if (subworkouts_filtered[0].subWorkouts.resultcategory === 'TIME') {

          curr_units = <View style={{flexDirection: 'row'}}>
                          <Text style={{color: activeColors.primary_text}}>{item.value}</Text>
                      </View>

        } else if (subworkouts_filtered[0].subWorkouts.resultcategory === 'SETSREPS') {

          curr_units = <View style={{alignItems: 'flex-end'}}>
                          <Text style={{color: activeColors.primary_text}}>{item.value}&nbsp;</Text>
                          <Text style={{color: activeColors.primary_text}}>rounds/sets - reps</Text>
                      </View>

        } else if (subworkouts_filtered[0].subWorkouts.resultcategory === 'WEIGHT') {

          curr_units = <View style={{flexDirection: 'row'}}>
                          <Text style={{color: activeColors.primary_text}}>{item.value}&nbsp;</Text>
                          <Text style={{color: activeColors.primary_text}}>{units}</Text>
                      </View>

        }


        //Only return rows with a value entered
        if (item.value != null) {
          return (
            <View key={item.subWorkoutID} style={{padding: 30, paddingVertical: 15, justifyContent: 'space-between', flexDirection:'row', borderBottomWidth: 0.25, borderBottomColor: activeColors.primary_text}}>
              <View style={{maxWidth: 200}}>
                <Text style={{fontSize: 15, color: activeColors.secondary_text}}>{subworkouts_filtered[0].subWorkouts.desc}</Text>
              </View>
              {curr_units}
            </View>
          );
        }
      }

      


    })
    
    return(
      <>
      <Pressable onPress={() => setExpand(!expand)}>
        <View style={styles.container_userRow}>
          <View style={{width: '20%'}}>
            <View style={styles.rowNumber}>
              { props.userid === userid ? (
                <Text style={{ fontSize: 25, fontWeight: '600', color: activeColors.primary_text }}>Me</Text>
              ) : (
                <>
                  <Text style={{ fontSize: 30, fontWeight: '600', color: activeColors.primary_text }}>{props.number}</Text>
                  <Text style={{ fontSize: 10, fontWeight: '600', color: activeColors.primary_text }}>{props.ordinal}</Text>
                </>
              )}
              
            </View>
          </View>
          <View style={styles.rowMiddleSection}>
            <Text style={{fontSize: 14, color: 'black', fontWeight: '500', color: activeColors.primary_text}}>{props.name}</Text>
            <Text style={{fontSize: 11, color: activeColors.accent_text}}>USA - 26 y/o</Text>
          </View>
          <View style={styles.rowCounts}>
            <View style={[styles.rowCountsContainer, {backgroundColor: activeColors.inverted_bg}]}>
                <Text style={{fontSize: 10, color: activeColors.inverted_text, fontWeight: '400'}}>{props.score}</Text>
              </View>
          </View>
        </View>
      </Pressable>

        { expand ? (
          <View>
              {datadisplayed}
          </View>
        ) : (
          <>
          </>
        )}
        
      </>
    );
  
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
    

    let datadisplayed
    if (commentsworkouts) {
      datadisplayed = commentsworkouts.map((item, index) => {

          let comment_id = item.comments.id;

          //console.log('this: ' + item.comments.userid)
          //console.log(users)

          const user_lookup = users.filter(
            pe => pe.id === item.comments.userid
          )

          
          let user_name = ''
          if (user_lookup != 0) {
            //console.log('This one: ' + JSON.stringify(user_lookup))

            user_name = user_lookup[0].name;

            return (
              <Comment key={comment_id} name={user_name} comment={item.comments.comment} createdat={item.comments.createdAt} />
            );
          }
          

          
        })
  }
  
    return (
      <View>
        <View>
          {datadisplayed}
        </View>
      </View>
    )
      
  }
    
  const LeaderBoardPreview = (props) => {
    const [link, setLink] = useState('');
    const [commenttext, setCommentText] = useState('');

  
    const postComment = async () => {

      if (commenttext != '') {
        //Insert
        try {

          const comment = await DataStore.save(
            new Comments({
              comment: commenttext,
              userid: userid
            })
          );


          await DataStore.save(
            new CommentsWorkouts({
              comments: comment,
              workouts: currworkout[0]
            })
          );


          console.log("Comment saved successfully!");
        } catch (error) {
          console.log("Error saving post", error);
        }

        
        //Refresh page
        setCommentRefresh(!commentrefresh)

        //Clear textbox
        setCommentText('')
      }
      
      
    }

    //console.log('Workout Results this one: ' + JSON.stringify(workoutresults["42a4f8ed-5853-4804-b3c2-025f3880b77b"]))
      
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
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

        <ScrollView
              style={{marginBottom: 47}}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
              }
            >
          <View style={styles.container_preview}>
            <View style={styles.container_header}>
              <Text style={{fontSize: 20, fontWeight: '600', color: activeColors.primary_text}}>{props.title}</Text>
              <Text style={{fontSize: 14, fontWeight: '400',  color: activeColors.primary_text}}>{props.workout_date}</Text>
            </View>
            
            <View style={styles.container_userRows}>
              {datadisplayed}
            </View>
            
          </View>
        
          <View style={{padding: 5, alignItems: 'center'}}>
            <Text style={{fontSize: 15, fontWeight: '500', color: activeColors.primary_text}}>Comments:</Text>
          </View>
          
          
          <CommentSection />

        </ScrollView>

        
        
        <View style={{flexDirection: 'row', padding: 3, backgroundColor: activeColors.primary_bg, position: 'absolute', bottom: 0}}>
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
    );
  
  }

  /*
      Header and Button Functions
  */

    const goBackPress = async () => {
        navigation.navigate('LeaderboardScreen')
        //console.log('Go to Profile Screen')
    }

    const onSearchPress = async () => {
        console.log('Search button pressed')
        setShowSearch(false)
    };

    const onCancelPress = async () => {
        console.log('Cancel button pressed')
        setShowSearch(true)
    };

    const onFilterPress = async () => {
        console.log('Filter button pressed')  
        setModalVisible(!modalVisible)
    };

    function Header(props) {        
  
        return (
  
            showSearch ? (
                    <View style={[styles.header, {backgroundColor: activeColors.primary_bg}]}>
                    <Pressable onPress={goBackPress}>
                        <Ionicons name='chevron-back-outline' style={{fontSize: 30, color: activeColors.primary_text}}/>
                    </Pressable>
                    <View>
                        <Text style={[styles.header_text, {color: activeColors.primary_text}]}>Leaderboards</Text>
                    </View>
                    {props.hidebuttons ? (
                          <View style={{flexDirection: 'row'}}>
                              <Pressable style={{padding: 5}} onPress={onSearchPress}>
                                  { darkMode ? <Image style={styles.header_icons} source={require('../../../../assets/images/Search-White.png')} /> : <Image style={styles.header_icons} source={require('../../../../assets/images/Search-Black.png')} />}
                              </Pressable>
                              <Pressable style={{padding: 5}} onPress={onFilterPress}>
                                  { darkMode ? <Image style={styles.header_icons_filter} source={require('../../../../assets/images/Filter-icon-white.png')}/> : <Image style={styles.header_icons_filter} source={require('../../../../assets/images/Filter-icon-black.png')}/>}
                              </Pressable>
                          </View>
                          ) : (
                      <>
                      </>
                    )}
                </View>
              ) : (
              
              <>
              </>

              )
            
          )
    }

    /*
     Made this update, not sure if additional changes need to be made. 
     if (workoutresults.length < 1) {
    */
  

    console.log('this: ' +  workoutresults)
  
    return(
      <View style={[styles.container, {backgroundColor: activeColors.primary_bg}]}>

        <Header />
     
        {/* Checking to see if any workout results exist */}
        {/* (workouts.length != 0 ) ? (*/}
        { (workoutresults.length > 0) ? (
            <LeaderBoardPreview title={workouts[0].workouts.title} workout_date={workouts[0].workouts.date} />
        ) : (
          <>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: activeColors.primary_bg}}>
              {/*<ActivityIndicator />*/}

              <Text style={{color: activeColors.primary_text}}>No results to display</Text>
            </View>
          </>
        )}

            
            
      </View>
    );
}

const statusBarHeight = Constants.statusBarHeight



const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginTop: statusBarHeight,
    backgroundColor: '#EFEFEF',
    marginBottom: 50
    //alignItems: 'center'
  },
  marginBottom50: {
    marginBottom: 50
  },
  marginBottomNone: {
    marginBottom: 0
  },
  header: {

    flexDirection: 'row',
    //padding: 10,
    paddingRight: 10,
    paddingLeft: 10,
    //backgroundColor: 'white',
    borderBottomColor: '#DCDCDC',
    borderBottomWidth: 1,
    justifyContent: 'space-between'
  },
  header_text: {
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 10,
    color:'#363636',
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
  
});
