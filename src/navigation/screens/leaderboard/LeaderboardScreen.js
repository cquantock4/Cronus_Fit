import React, { useState , useEffect, useContext} from 'react';
import { StyleSheet, View, ScrollView, RefreshControl } from 'react-native';

import Header from '../../../components/ui/inputs/header';
import ListItem from '../../../components/ui/listItem';
import LeaderBoardDisplay from '../../../components/ui/leaderboarddisplay';
import { SafeAreaView } from 'react-native-safe-area-context';

import {ActivityIndicator} from "@react-native-material/core";

//Amplify DataStore
import {Auth, DataStore, API } from 'aws-amplify';
import { graphqlOperation } from 'aws-amplify';
import { User } from '../../../models';

//Themes
import ThemeContext from '../../../components/ThemeContext'
import {colors} from '../../../../assets/styles/themes'

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}


const initialState = {};

export default function Leaderboard( {navigation} ) {
  const [showsearch, setShowSearch] = useState(false);
  const [searchtext, setSearchText] = useState('');
  const [userid, setUserID] = useState(undefined);
  const [workoutlist, setWorkoutList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);

  const [functionalfitnessworkoutinfo, setFunctionalFitnessWorkoutInfo] = useState([])
  const [functionalfitnessleaderboard, setFunctionalFitnessLeaderboard] = useState([])
  const [militaryprepworkoutinfo, setMilitaryPrepWorkoutInfo] = useState([])
  const [militaryprepleaderboard, setMilitaryPrepLeaderboard] = useState([])

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

            //console.log('here is the list: ' + JSON.stringify(workoutResponse.data.listWorkouts.items))

            setWorkoutList(workoutResponse.data.listWorkouts.items)

            // Filter the workouts with workout type FUNCTIONALFITNESS
            const functionalFitnessWorkouts = workoutResponse.data.listWorkouts.items.filter(
              (workout) => workout.workout_type === 'FUNCTIONALFITNESS'
            );

            functionalFitnessWorkouts.sort((a, b) => {
              const [monthA, dayA, yearA] = a.date.split('/');
              const [monthB, dayB, yearB] = b.date.split('/');
              const dateA = new Date(yearA, monthA - 1, dayA);
              const dateB = new Date(yearB, monthB - 1, dayB);
              return dateB - dateA;
            });

            // Sort the functionalFitnessWorkouts by date in descending order
            //functionalFitnessWorkouts.sort((a, b) => new Date(b.date) - new Date(a.date));

            // Get the latest FUNCTIONALFITNESS workout
            setFunctionalFitnessWorkoutInfo(functionalFitnessWorkouts[0])
            setFunctionalFitnessLeaderboard(buildLeaderboard(functionalFitnessWorkouts[0]))

            // Filter the workouts with workout type MILITARYPREP
            const militaryPrepWorkouts = workoutResponse.data.listWorkouts.items.filter(
              (workout) => workout.workout_type === 'MILITARYPREP'
            );

            militaryPrepWorkouts.sort((a, b) => {
              const [monthA, dayA, yearA] = a.date.split('/');
              const [monthB, dayB, yearB] = b.date.split('/');
              const dateA = new Date(yearA, monthA - 1, dayA);
              const dateB = new Date(yearB, monthB - 1, dayB);
              return dateB - dateA;
            });

            // Get the latest MILITARYPREP workout
            setMilitaryPrepWorkoutInfo(militaryPrepWorkouts[0])
            setMilitaryPrepLeaderboard(buildLeaderboard(militaryPrepWorkouts[0]))

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

    return(res)
    //setWorkoutResults(res)  
    
  }

  async function getUser(){

    try {
      const authUser = await Auth.currentAuthenticatedUser({bypassCache: true});
      const user = await DataStore.query(User, (u) => u.sub.eq(authUser.attributes.sub));
    

      //Query Matrix Table to find list of ids  
      if (user[0]) {
        //Set state variable
        setUserID(user[0].id)

      }
    } catch (e) {
      console.log('Error: ' + e)
    }

  }

  const handleItemListPress = (key) => {
    navigation.navigate('LeaderboardDetails', { value: key });
  };

  const handleSearch = (text) => {
    setSearchText(text);
    setShowSearch(true);
  };
  
  const handleCancelSearch = () => {
    setSearchText('');
    setShowSearch(false);
  };

  const handleLeaderboardOnPress = (key) => {
    navigation.navigate('LeaderboardDetails', {value: key})
  }
  
  // Filter the list based on the search text
  const filteredList = showsearch
    ? workoutlist.filter((item) =>
        item.title.toLowerCase().includes(searchtext.toLowerCase()) ||
        item.date.toLowerCase().includes(searchtext.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchtext.toLowerCase())
      )
    : workoutlist;


  return(

    <SafeAreaView style={[styles.container, {backgroundColor: activeColors.primary_bg}]}>
      <Header title="Leaderboards" searchable 
      onSearch={handleSearch} 
      searchMode={showsearch}
      onCancelSearch={handleCancelSearch} />
       {isLoading ? (
        <View style={[styles.container, {justifyContent: 'center', alignItems: 'center'}]}>
          <ActivityIndicator size="large" color={activeColors.accent_text} />
        </View>
      ) : (
      showsearch ? (
        <ScrollView style={{marginBottom: 50}}>
          {filteredList.map((item, index) => (
            <ListItem
              key={index}
              id={item.id}
              title={item.title}
              subtitle={item.desc}
              date={item.date}
              navtext="View Leaderboard"
              onPress={() => handleItemListPress(item.id)}
            />
          ))}
        
      </ScrollView>
        ) : (
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
          >
            
            <View>
                { functionalfitnessworkoutinfo ? (
                  <LeaderBoardDisplay preview onPress={() => handleLeaderboardOnPress(functionalfitnessworkoutinfo.id)} key={functionalfitnessworkoutinfo.id} userid={userid} workoutinfo={functionalfitnessworkoutinfo} results={functionalfitnessleaderboard} />
                ) : (
                  <>
                  </>
                )}
                { militaryprepworkoutinfo  ? (
                  <LeaderBoardDisplay preview onPress={() => handleLeaderboardOnPress(militaryprepworkoutinfo.id)} key={militaryprepworkoutinfo.id} userid={userid} workoutinfo={militaryprepworkoutinfo} results={militaryprepleaderboard}  />
                ) : (
                  <>
                  </>
                )}
            </View>
                
          </ScrollView>
        )
      )}

    </SafeAreaView>
  )
  
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
  },  

});
