import React, { useState , useEffect, useContext} from 'react';
import { StyleSheet, Text, View, Pressable, ActivityIndicator, ScrollView, RefreshControl, SafeAreaView, StatusBar } from 'react-native';
import Constants from 'expo-constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Bubble_Button_Small } from '../../../components/ui/buttons'

//import { listWorkoutsSubWorkouts_date,listTestQuery } from '../../../graphql/queries';


//Amplify DataStore
import { Amplify, Auth, DataStore, Hub, API, Predicates } from 'aws-amplify';
import { Workouts, User, WorkoutResultsSubWorkouts, SubWorkouts, WorkoutResults } from '../../../models';


//Form Controller
import { format } from 'date-fns';

//Themes
import ThemeContext from '../../../components/ThemeContext'
import {colors} from '../../../../assets/styles/themes'





const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}


const initialState = {};

export default function Leaderboard( {navigation} ) {
  const [showDaily, setShowDaily] = useState(true);
  const [showAll, setShowAll] = useState(false);


  //Testing New Data Pull
  const [formData, setFormData] = useState(initialState);
  const [date, setNewDate] = useState(new Date());
  const [workout, setWorkout] = useState(undefined);
  const [workoutid, setWorkoutID] = useState(undefined);

  const [workoutresults, setWorkoutResults] = useState([]);
  const [currworkout, setCurrWorkout] = useState([]);
  const [userid, setUserID] = useState(undefined);
  const [users, setUsers] = useState(undefined);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);

  //Toggle
  const [isEnabledIndSave, setIsEnabledIndSave] = useState(false);
  //const toggleSwitchIndSave = () => setIsEnabledIndSave(previousState => !previousState);

  const [workouts, setWorkouts] = useState([]);
  const [subworkouts, setSubWorkouts] = useState([]);
  const [workoutlist, setWorkoutList] = useState([]);
  const [savedworkouts, setSavedWorkouts] = useState([]);
  const [sub, setAuthSub] = useState(undefined);


  const theme = useContext(ThemeContext)
  const darkMode = theme.state.darkMode;

  let activeColors = ''

  if (darkMode) {
    activeColors = colors['dark'];
  } else {
    activeColors = colors['light'];
  }
  
  
  /* Get the User on the first load of the page */
  useEffect(() => {
    getUser();

  }, []);

  const groupAndAdd = (arr) => {
    const res = [];

    //console.log('Starting group and add')

    //console.log(arr)

    arr.forEach(el => {
  

      let grouptitle = el.group + '. ' + el.grouptitle

      //Checking to see if group exists
      //If not exists, add group to array
      if (!res[grouptitle]) {
        res.push(grouptitle);
      }

      let info = {id: el.id, desc: el.desc, resultcat: el.resultcategory}

      if(typeof res[grouptitle] === "undefined") {


        res[grouptitle] = {group: grouptitle, info: [info]}

      } else {

        res[grouptitle].info.push(info);
        //res[grouptitle].id.push(el.subWorkouts.id);

      }
      
      
    }, {});

    //console.log(res)

    setSubWorkouts(res);

    //return(res)


  }

  const buildUserDT = (arr, user_res) => {
    const res = [];

    function ordinal(n) {
      var s = ["th", "st", "nd", "rd"];
      var v = n%100;
      //return n + (s[(v-20)%10] || s[v] || s[0]);
      return (s[(v-20)%10] || s[v] || s[0]);
    }
    
    //console.log('starting to build User DT')
    //Loop over arr
    //console.log('This one this one: ' +JSON.stringify(arr))
    //console.log(user_res)

    arr.subWorkouts.forEach(el => {
      //console.log('category: ' + JSON.stringify(subworkouts[category]))

      //console.log(el)

      let subworkoutid = el.id
      let required =  el.required
      let timecap =  el.timecap
      let resultcategory = el.resultcategory


      el.workoutresults.forEach(item => {

        let userid = item.userID
        let workoutResults =  item.value
        let calc_workoutResults = item.value

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
    
          //Lookup User info
          if (user_res.length != 0) {

            let user_filtered = user_res.filter(obj => (obj.id == userid));
    
            let user_name
            
            if (user_filtered.length != 0) {
              user_name = user_filtered[0].name
            }
    
    
    
            //console.log('this: ' + JSON.stringify(res))
            
            if(typeof res[userid] === "undefined") {
    
              //Create new row
              //console.log('create new row')
              res[userid] = {number: 0, ordinal: '', name: user_name, workoutID: arr.id, score: score, results: [results]}
    
            } else {
    
              res[userid].results.push(results);
    
              res[userid].score = parseInt(res[userid].score) + parseInt(score);
    
            }   
    
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
      //console.log(res[el].number)

    }, {});


    //console.log(JSON.stringify(res))

    setWorkoutResults(res)

  }

  useEffect(() => {

    const today = format(new Date(), 'MM/dd/yyyy');

    const subs = DataStore.observeQuery(Workouts).subscribe(() => getWorkoutAndSubWorkouts(today));
  
    return () => {
      subs.unsubscribe();
    };

  }, [refreshing]);



  async function getWorkoutAndSubWorkouts(date) {


    // Find today's workout
    const workouts = await DataStore.query(Workouts);

    //console.log('this: ' + JSON.stringify(workouts))

    //onsole.log(workouts[0].date)

    //Sort the list

    workouts.sort((a, b) => {
      const [monthA, dayA, yearA] = a.date.split('/');
      const [monthB, dayB, yearB] = b.date.split('/');
      const dateA = new Date(yearA, monthA - 1, dayA);
      const dateB = new Date(yearB, monthB - 1, dayB);
      return dateB - dateA;
    });

    setWorkoutList(workouts)

    //const workouts = await DataStore.query(Workouts, (w) => w.date.eq(date));
    

    if (workouts.length === 0) {
      //console.log('No workout found for today');
      return null;
    }

    // Find the subworkouts associated with the workout
    const subWorkouts = await DataStore.query(SubWorkouts, (s) =>
      s.workoutsID.eq(workouts[0].id)
    );

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

      //console.log(subWorkout.id)
      //console.log('workout Results: ' + JSON.stringify(workoutResult))
    
      // If there is no workout result for this sub workout, return the sub workout object as is
      if (!workoutResult) {
        return subWorkout;
      }

    
      // If there is a workout result for this sub workout, add it as a property of the sub workout object
      
      return {
        ...subWorkout,
        workoutresults: workoutResult.map(result => ({
          id: result.id,
          value: result.value,
          userID: result.userID
        })) 
      };


      /*
      return {
        ...subWorkout,
        workoutresults: {
          id: workoutResult.id,
          value: workoutResult.value,
          userID: workoutResult.userID
        }
      };*/


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


    //console.log('this this this: ' + JSON.stringify(subWorkoutsWithResults))
    
    // Add the subWorkoutsWithResults array to the dt object
    const dtWithResults = {
      ...dt,
      subWorkouts: subWorkoutsWithResults
    };

    //console.log('Here is the value: ' + JSON.stringify(dtWithResults))
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

    
    const today = format(new Date(), 'MM/dd/yyyy');

    //('this is today: ' + today)

    let workoutssubworkouts= ''

    setWorkouts(workoutssubworkouts)

    let res
    if (workoutssubworkouts) {
      res = groupAndAdd(workoutssubworkouts)
    }


    //Get Users
    const userResults = (await DataStore.query(User))

    //console.log(userResults)

    setUsers(userResults)

    if (userResults.length != 0) {


      const workoutresultssubworkouts = (await DataStore.query(WorkoutResultsSubWorkouts))


      if (workoutresultssubworkouts && (workoutssubworkouts.length != 0 )) {
        
        buildUserDT(workoutresultssubworkouts, userResults, workoutssubworkouts)
  
      } 

    }
  }

  /*
    Leaderboard preview
  */
  
  const LeaderBoardUserRow = (props) => {


    
    return(
          <View style={[styles.container_userRow, {backgroundColor: activeColors.secondary_bg}]} >
            <View style={{width: '20%'}}>
              <View style={styles.rowNumber}>
                { props.userid === userid ? (
                  <Text style={{ fontSize: 25, fontWeight: '600', color:  activeColors.secondary_text }}>Me</Text>
                ) : (
                  <>
                    <Text style={{ fontSize: 30, fontWeight: '600', color: activeColors.secondary_text }}>{props.number}</Text>
                    <Text style={{ fontSize: 10, fontWeight: '600', color: activeColors.secondary_text }}>{props.ordinal}</Text>
                  </>
                )}
                
              </View>
            </View>
            <View style={styles.rowMiddleSection}>
              <Text style={{fontSize: 14, color: 'black', fontWeight: '500', color: activeColors.secondary_text}}>{props.name}</Text>
              <Text style={{fontSize: 11, color: activeColors.accent_text}}>USA - 26 y/o</Text>
            </View>
            <View style={styles.rowCounts}>
              <View style={[styles.rowCountsContainer, {backgroundColor: activeColors.inverted_bg}]}>
                <Text style={{fontSize: 10, color: activeColors.inverted_text, fontWeight: '400'}}>{props.score}</Text>
              </View>
            </View>
          </View>   
    );
  
  }
    
  const LeaderBoardPreview = (props) => {

    let key = props.id

    const onRowPress = () => {
      //console.log("Let's go here: " + key)
      navigation.navigate('LeaderboardDetails', {value: key})
    }
    
    //console.log('here we are now: ' + JSON.stringify(workoutresults))


    let datadisplayed = workoutresults.map((category, index) => {

      //console.log('this this :' + JSON.stringify(workoutresults[category]))

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

        { workoutresults.length > 0 ? (
          <ScrollView
                style={{marginBottom: 47}}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
              >
            <View style={[styles.container_preview, {backgroundColor: activeColors.secondary_bg}]}>
              <View style={styles.container_header}>
                <View style={{flex: 1}}>
                  <Text style={{fontSize: 20, fontWeight: '600', color: activeColors.secondary_text}}>{props.title}</Text>
                  <Text style={{fontSize: 14, fontWeight: '400', color: activeColors.secondary_text}}>{props.workout_date}</Text>
                </View>
                <View>
                  <Pressable onPress={onRowPress} style={{flex: 1, paddingleft: 10,  justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: activeColors.accent_text}}>View Details</Text>
                  </Pressable>
                </View>
              </View>
              
              
              <View style={styles.container_userRows}>
                {datadisplayed}
              </View>
              
            </View>

          </ScrollView>
        ) : (

          <View>
            <Text>No Results posted yet</Text>
          </View>

        )}
        
        
      </View>
    );
  
  }

  async function getUser(){

    try {
      const authUser = await Auth.currentAuthenticatedUser({bypassCache: true});
      //console.log(authUser.attributes.sub)
      setAuthSub(authUser.attributes.sub)

      
      //Get local User Id for Query
      //const user = await DataStore.query(User, sw =>
        //sw.sub('eq', authUser.attributes.sub)
      //)

      const user = await DataStore.query(User, (u) => u.sub.eq(authUser.attributes.sub));
    

      //Query Matrix Table to find list of ids  
      if (user[0]) {
        //Set state variable
        setUserID(user[0].id)
        //console.log(user[0])

      }
    } catch (e) {
      console.log('Error: ' + e)
    }

  }

  const onDailyPress = async () => {
    //console.log('Daily button pressed')
    setShowDaily(true)
    setShowAll(false)
  };

  const onAllPress = async () => {
    //console.log('Overall button pressed')
    setShowDaily(false)
    setShowAll(true)
    
  };

  const LeaderBoardList = (props) => {

    const key = props.id
  
    const onRowPress = () => {
      //console.log("Let's go here: " + key)
      props.navigation.navigate('LeaderboardDetails', {value: key})
    }
  
    return(
      <Pressable onPress={onRowPress} style={{ width: '100%', flexDirection: 'row', padding: 10, justifyContent: 'space-between', backgroundColor: activeColors.secondary_bg, borderBottomWidth: 1, borderBottomColor: '#C8C8C8'}}>
        <View style={{}}>
            <Text style={{fontSize: 20, fontWeight: '600', color: activeColors.secondary_text}}>{props.title}</Text>
            <Text style={{fontSize: 14, fontWeight: '400',  color: activeColors.secondary_text}}>{props.workout_date}</Text>
        </View>
        <View style={{justifyContent: 'center', paddingRight: 10}}>
          <Ionicons name='chevron-forward-outline' style={{fontSize: 25, color: activeColors.secondary_text}}/>
        </View>
      </Pressable>
    );
  
  }

  let leaderboarddatalist = workoutlist.map((item, index) => {
    return (
      <LeaderBoardList navigation={navigation} title={item.title} key={item.id} id={item.id} workout_date={item.date}/>
    );
  })


  if (workouts.length > 0 && workoutresults.length < 1) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  }
  
  
  return(
      <SafeAreaView style={[Platform.OS === 'ios' && styles.marginTop, {flex: 1, backgroundColor: activeColors.primary_bg }]}>

      {/* Header with Search and Filtering Window 

      <Header title='Leaderboards' showbackbutton={false} />        

      */}

        <View style={[styles.header, {backgroundColor: activeColors.primary_bg}]}>
            <View>
                <Text style={[styles.header_text, { color: activeColors.primary_text }]}>Leaderboards</Text>
            </View>
        </View>


      {/* LeaderBoard option buttons */}
      <View style={[styles.catcontainer, {backgroundColor: activeColors.primary_bg}]}>
        <View style={styles.catcontainerbuttons}>
            <Bubble_Button_Small 
              onPress={onDailyPress}
              text='Daily'
              bgColor= {showDaily ? activeColors.button_active : activeColors.button_inactive }
              fgColor= {showDaily ? activeColors.accent_text : activeColors.button_inactive_text }
            />
            <Bubble_Button_Small 
              onPress={onAllPress}
              text='All'
              bgColor= {showAll ? activeColors.button_active : activeColors.button_inactive }
              fgColor= {showAll ? activeColors.accent_text : activeColors.button_inactive_text }
            />
        </View>
      </View>

      
      <ScrollView style={{marginBottom: 50}}>
      
        {/* LeaderBoard Page Containers */}
        {showDaily ? (
          <View style={[styles.dailyPageContainer, {backgroundColor: activeColors.primary_bg}]}>
            {
            
              ( workouts.length != 0 )  ? (
              
              <LeaderBoardPreview key={workouts.id} id={workouts.id} title={workouts.title} workout_date={workouts.date} />
              ) : (
                <>
                </>
              )
              
              }
          </View>
        ) : null}
        {showAll ? (
          <View style={styles.allPageContainer}>
            {leaderboarddatalist}
          </View>
        ) : null}
      </ScrollView>
      
    </SafeAreaView>
  );
}


//Allowing for space from the top of the status bar
const statusBarHeight = Constants.statusBarHeight

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    flexDirection: 'column',
    //marginTop: statusBarHeight,
    //backgroundColor: 'white'
  },  
  marginTop: {
    marginTop: statusBarHeight,
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: 'white',
    borderBottomColor: '#c9c9c9', 
    borderBottomWidth: 1
  },
  header_icon_container: {
    flexDirection: 'row',
    marginRight: 10,
  },
  header_text: {
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 10,
    color:'#363636',
  },
  header_image: {
    flex:1,
    width: '20%',
    height: '90%',
    marginRight: '5%',
  },
  header_icons: {
    height: 25,
    width: 25,
    marginLeft:10
  },
  header_icons_filter: {
    height: 20,
    width: 20,
    marginLeft:10,
    marginTop: 2
  },
  catcontainer: {
    //backgroundColor: 'white', 
    //height: '6%',
    justifyContent: 'center',
    alignItems: 'center',
    //borderColor: '#CCCCCC',
    //borderBottomWidth: 1,
    //backgroundColor:'blue',
    padding: 10
  },
  catcontainerbuttons: {
    //backgroundColor: 'green',
    width: '90%',
    flexDirection: 'row',
  },

  //Daily and All Containers
  dailyPageContainer: {
    //backgroundColor:'#DCDCDC', 
    flex: 1
  },

  allPageContainer: {
    //backgroundColor:'#DCDCDC', 
    flex: 1,
    alignItems: 'center',
    padding: 5,
    //backgroundColor: 'white'
  },


  //Container Preview
  container_preview: {
    //backgroundColor: 'blue',
    margin: 5,
    
    //borderWidth: 1
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
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15
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
    //backgroundColor: '#363636', 
    width: '80%', 
    alignSelf: 'center', 
    alignItems: 'center', 
    padding: 5, 
    borderRadius: 3
  },
  searchBar: {
    flex: 1,
    height: 25,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 3,
    backgroundColor: '#E7E7E7',
    paddingLeft: 10
  },

  //Modal
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: 'column',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalHeader: {
    width: '95%',
    height: 40,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopEndRadius: 5,
    borderTopStartRadius: 5
  },
  modalBody: {
    width: '95%',
    height: 250,
    backgroundColor: '#E3E3E3'
  },
  modalFooter: {
    width: '95%',
    height: 60,
    backgroundColor: '#E3E3E3',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomEndRadius: 5,
    borderBottomStartRadius: 5
  }
  

});
