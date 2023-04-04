import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Image, Alert, ScrollView } from 'react-native';
import { TextInput, Pressable, Switch, Input, FlatList} from 'react-native';
import Constants from 'expo-constants'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Bubble_Button, Bubble_Button_Small, Button_Link } from '../../../components/ui/buttons'
import { BubbleMultiLine, BubbleTextInput } from '../../../components/ui/inputs'

import Modal from 'react-native-modal';
import {MaskedTextInput, MaskedText} from 'react-native-mask-text';

import { parse,  format } from 'date-fns';

import {useRoute} from '@react-navigation/native';
import {useForm} from 'react-hook-form';

//Themes
import ThemeContext from '../../../components/ThemeContext'
import {colors} from '../../../../assets/styles/themes'

//import Header from '../../../ui/components/headers/header'

import { Amplify, Auth, DataStore, Hub } from 'aws-amplify';
import { Workouts, User, UserWorkouts, SavedWorkouts, WorkoutResults, SubWorkouts} from '../../../models';




export default function WorkoutDetails( {navigation} ) {
  const route = useRoute();
  const {control, handleSubmit, formState: {errors}} = useForm();
  const [workoutcategory, setWorkoutCategory] = useState(route?.params?.value);


  //Modal
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleNotes, setModalVisibleNotes] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showfilter, setShowFilter] = useState(false);
  
  //Toggle
  const [isEnabledIndSave, setIsEnabledIndSave] = useState(false);
  //const toggleSwitchIndSave = () => setIsEnabledIndSave(previousState => !previousState);
  const [isEnabledFilters, setIsEnabledFilters] = useState(false);
  const toggleSwitchFilters = () => setIsEnabledFilters(previousState => !previousState);

  //Data
  const [workoutsarr, setWorkoutArr] = useState();
  const [userid, setUserID] = useState(undefined);

  const [workout, setWorkout] = useState(undefined);
  const [workoutid, setWorkoutID] = useState(undefined);
  const [workoutresults, setWorkoutResults] = useState(undefined);
  const [workoutresults_lookup, setWorkoutResultsLookup] = useState(undefined);
  const [subworkouts, setSubWorkouts] = useState(undefined);
  const [subworkout_archive, setSubWorkoutArchive] = useState(undefined);
  const [savedworkouts, setSavedWorkouts] = useState(undefined)

  const [date, setNewDate] = useState(new Date());

  //Search Filtering
  
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  //Workout Sub Workouts Refresh and re-open tab
  const [refresh, setRefresh] = useState(false);
  const [savecategory, setSaveCategory] = useState('');
  const [modalsisiblesave, setModalVisibleSave] = useState(false);
  const [units, setUnits] = useState('lbs');

  //Theme
  const theme = useContext(ThemeContext)
  const darkMode = theme.state.darkMode;

  let activeColors = ''

  if (darkMode) {
    activeColors = colors['dark'];
  } else {
    activeColors = colors['light'];
  }


    /*
        Get Data
    */
    useEffect(() => {

      getUser();

      const unsubscribe = navigation.addListener('focus', () => {
        
        //setWorkoutCategory(route?.params?.value)

        //console.log(route?.params?.value)

        if (workoutcategory === 'myworkouts'){
          //Set the my workouts toggle to be true
          setIsEnabledFilters(true)
          //Apply the filters and go to search Screen
          setShowSearch(true)
        }
      });


     // Return the function to unsubscribe from the event so it gets removed on unmount
     return unsubscribe;
    }, [navigation]);
  

    useEffect(() => {


      const workoutsub = DataStore.observeQuery(Workouts).subscribe(() => getWorkoutAndSubWorkouts());


      return () => {
        workoutsub.unsubscribe();
      };


    }, [date, refresh, userid]);

    /*
      Search
    */
    useEffect(() => {

      const subs = DataStore.observeQuery(Workouts).subscribe((snapshot) => {
        //isSynced can be used to show a loading spinner when the list is being loaded. 
        const { items, isSynced } = snapshot;

        //console.log(items)

        //setWorkouts(items)

        setFilteredDataSource(items);
        setMasterDataSource(items);
        
      });


      return () => {
        subs.unsubscribe();
      };

    }, []);


    const searchFilterFunction = (text) => {
      // Check if searched text is not blank
      if (text) {
        // Inserted text is not blank
        // Filter the masterDataSource and update FilteredDataSource
        const newData = masterDataSource.filter(function (item) {

          // Applying filter for the inserted text in search bar
          const itemData = item.title
            ? item.title.toUpperCase()
            : ''.toUpperCase();

          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });

        setFilteredDataSource(newData);
        setSearch(text);

      } else {

        // Inserted text is blank
        // Update FilteredDataSource with masterDataSource
        setFilteredDataSource(masterDataSource);
        setSearch(text);

      }
    };

    const ItemView = ({ item }) => {

      console.log('item: ' + JSON.stringify(item))

      const goToWorkoutPress = () => {

        //Get the current workout
        //getTodaysWorkout();

        //Setting the Category
        setWorkoutCategory(item.type)

        //Hide the search page
        setShowSearch(!showSearch)

        console.log(item.date)
        
        try {
          if (item.date) {
            //const parsedDate = parse(item.date, 'MM/dd/yyyy', new Date());
            //setNewDate(format(parsedDate, 'MM/dd/yyyy').toString());

            //const dateString = item.date;
            //const dateParts = dateString.split('/');
            //const dateObject = new Date(`${dateParts[2]}-${dateParts[0]}-${dateParts[1]}`);
            //const formattedDate = dateObject.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' });
            //console.log(formattedDate); // Output: Tue Apr 23 1996 12:00:00 AM GMT-0400
            console.log('what: ' + item.date)

            /*
            const dateString = item.date;
            const dateParts = dateString.split('/');
            const dateObject = new Date(`${dateParts[2]}-${dateParts[0]}-${dateParts[1]}`);
            const isoDate = dateObject.toISOString();
            */

            /*
            const dateString = item.date;
            const dateParts = dateString.split('/');
            
            const dateObject = new Date(`${dateParts[2]}-${dateParts[0]}-${dateParts[1]}`);
            console.log(dateObject)

            const isoDate = dateObject.toISOString(); // convert to ISO format
            console.log(isoDate)
            
            const localIsoDate = new Date(isoDate).toLocaleString(); // convert to local timezone
            console.log(localIsoDate)

            const formattedDate = localIsoDate.substring(0, 9); // remove time part
            
            */
            //let result = new Date(isoDate)
            setNewDate(item.date);

            
            //setNewDate(isoDate)
          }
        } catch (e) {
          console.log(e)
        }

       
          
    }

      return (

        <Pressable onPress={goToWorkoutPress}>
          <View style={[styles.resultsItemContainer, {backgroundColor: activeColors.primary_bg}]}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}>
              <Text style={{fontSize: 20, color: activeColors.primary_text}}>{item.title}</Text>
              <Text style={{fontSize: 15, color: activeColors.primary_text}}>{item.date}</Text>
            </View>
            
            <Text style={{fontSize: 14, marginBottom: 10, fontWeight: '300', color: activeColors.primary_text}}>{item.desc.slice(0,75)}...</Text>
            <Text style={{fontSize: 12, justifyContent: 'flex-end', color: activeColors.accent_text}}>View Workout</Text>
          </View>
        </Pressable>

      );
    };
  
    const ItemSeparatorView = () => {
      return (
        // Flat List Item Separator
        <View
          style={{
            height: 0.5,
            width: '100%',
            backgroundColor: '#C8C8C8',
          }}
        />
      );
    };


    /*
      Get the User and Todays workout based on date
    */
    
    const groupAndAdd = (arr) => {
        const res = [];
    
        console.log('Starting group and add')
    
        //console.log(arr.id)

        let currworkoutid = arr.id
    
        arr.subWorkouts.forEach(el => {

            //console.log(el.id)

            
            let curr_result_val
            if (el.workoutresults[0]) {
                curr_result_val = el.workoutresults[0].value
            } else {
                curr_result_val = ''
            }
            
        
    
          let grouptitle = el.group + '. ' + el.grouptitle
    
          //Checking to see if group exists
          //If not exists, add group to array
          if (!res[grouptitle]) {
            res.push(grouptitle);
          }
    
          let info = {id: el.id, workoutid: currworkoutid, desc: el.desc, resultcat: el.resultcategory, value: curr_result_val}
    
          if(typeof res[grouptitle] === "undefined") {


            res[grouptitle] = {group: grouptitle, info: [info]}
  
          } else {
  
            res[grouptitle].info.push(info);
            //res[grouptitle].id.push(el.subWorkouts.id);
  
          }
          
          
        }, {});
    
        //console.log('HEre is this full dataset: ' + JSON.stringify(res["A. Functional maybe"]))
    
        setSubWorkouts(res);
    
        //return(res)
    
    
      }
      
      
/*
    const groupAndAdd = (arr, arr_workoutresults) => {
      const res = [];

      arr.forEach(el => {
        
        const curr_workoutresults = arr_workoutresults.filter(
          pe => pe.subWorkouts.id === el.subWorkouts.id
        )

        //console.log(curr_workoutresults)
        
        let curr_result_val
        if (curr_workoutresults != 0) {
          curr_result_val = curr_workoutresults[0].workoutResults.value
        } else {
          curr_result_val = ''
        }
    

        let grouptitle = el.subWorkouts.group + '. ' + el.subWorkouts.grouptitle

        //Checking to see if group exists
        //If not exists, add group to array
        if (!res[grouptitle]) {
          res.push(grouptitle);
        }

        let info = {id: el.subWorkouts.id, desc: el.subWorkouts.desc, resultcat: el.subWorkouts.resultcategory, value: curr_result_val}

        if(typeof res[grouptitle] === "undefined") {


          res[grouptitle] = {group: grouptitle, info: [info]}

        } else {

          res[grouptitle].info.push(info);
          //res[grouptitle].id.push(el.subWorkouts.id);

        }
        
        
      }, {});

      //console.log(res["A. Accessory"])

      setSubWorkouts(res)


    }
    
*/
   

    async function getTodaysWorkout(){
        
        //console.log(workoutcategory)

        //console.log('here we are')

        try{
            //const currworkout = await DataStore.query(Workouts , (w) =>
             //w.date.eq(format(new Date(date), 'MM/dd/yyyy').toString()).type("eq", workoutcategory.toString()))

            const currworkout = (await DataStore.query(Workouts)).filter(
                pe => pe.date === format(new Date(date), 'MM/dd/yyyy').toString() && pe.type === workoutcategory.toString()
            )

            console.log(currworkout)

            //console.log(currworkout)

             //Set the current Workout
            if (currworkout.length != 0) {

                console.log(userid + ' ' + currworkout[0].id)

                //check to see if user workout exixts
                const savedworkout = (await DataStore.query(UserWorkouts)).filter(
                    pe => pe.user.id === userid && pe.workouts.id === currworkout[0].id
                )

                //Get Workout Info
                const subworkouts = (await DataStore.query(WorkoutsSubWorkouts)).filter(
                    pe => pe.workouts.id === currworkout[0].id
                )
                

                const subworkoutslookup = (await DataStore.query(SubWorkouts))

                setSubWorkoutArchive(subworkoutslookup)

                //userid
                //console.log(userworkouts)

                //Fix Issue somewhere here when savibg workout results. 

                //console.log(userid)

                //Get Workout Results
                const workoutresults = (await DataStore.query(WorkoutResultsSubWorkouts)).filter(
                pe => pe.workoutResults.userid === userid
                )

                console.log('loaded: ' + workoutresults)

                setWorkoutResults(workoutresults)


                if (subworkouts) {
                    groupAndAdd(subworkouts, workoutresults)
                }

                //setSubWorkouts(groupAndAdd(subworkouts))

                //console.log(subworkouts)
                
            
                console.log('this: ' + savedworkout.length)

                if (savedworkout.length === 1) {
                    setIsEnabledIndSave(true)
                } else {
                    setIsEnabledIndSave(false)
                }

                //console.log(currworkout[0])

                setWorkout(currworkout[0]);
    
                //Set the current workout ID
                setWorkoutID(currworkout[0].id)
            } else {
                setWorkout(undefined)
                setWorkoutID(undefined)
                setIsEnabledIndSave(false)
                setSubWorkouts(undefined)
            }

            //console.log(userid)
            //console.log(workoutid)
        } catch (e) {
            console.log(e)
        }
        
           
        
  
      }

    async function getWorkoutAndSubWorkouts() {

        console.log('running now')  
        console.log(date)

        function isValidDate(dateString) {
          const pattern = /^\d{2}\/\d{2}\/\d{4}$/; // pattern for MM/dd/yyyy

          if (!pattern.test(dateString)) {
            console.log(dateString)
            return format(new Date(dateString), 'MM/dd/yyyy').toString();
          }

          return dateString;
          //const date = new Date(dateString);
          //return !isNaN(date);

        }

        const formatted_date = isValidDate(date)

        console.log(formatted_date)

        //const formatted_date = format(new Date(date), 'MM/dd/yyyy').toString()

        // Find today's workout
        const currworkout = (await DataStore.query(Workouts)).filter(
          pe => pe.date === formatted_date && pe.type === workoutcategory.toString()
        )


        console.log('reloading here: ' + date + ' ' + JSON.stringify(currworkout))

    
        if (currworkout.length === 0) {
            console.log('No workout found on this date');
            setWorkout(undefined)
            setWorkoutID(undefined)
            setIsEnabledIndSave(false)
            setSubWorkouts(undefined)

            return null;
        }

        console.log('userid: ' + userid)
        console.log(currworkout[0].id)
        //query saved workouts
        const savedWorkouts = await DataStore.query(SavedWorkouts, (s) =>
          s.workoutsID.eq(currworkout[0].id) && s.userID.eq(userid)
        );
        
        console.log(savedWorkouts[0])
        console.log(currworkout[0].id)

        if (savedWorkouts.length === 1){

            setSavedWorkouts(savedWorkouts[0])

            setIsEnabledIndSave(true)
        } else {
            setIsEnabledIndSave(false)
        }
        

        //console.log('Saved Workouts: ' + JSON.stringify(savedWorkouts))
        
    
        // Find the subworkouts associated with the workout
        const subWorkouts = await DataStore.query(SubWorkouts, (s) =>
          s.workoutsID.eq(currworkout[0].id)
        );

        setSubWorkoutArchive(subWorkouts)

        // Get all the subworkoutIds
        const subWorkoutIds = subWorkouts.map((sw) => sw.id);


        //Query all WorkoutResults
        const workoutResults = await DataStore.query(WorkoutResults, (s) =>
            s.userID.eq(userid)
        );

        setWorkoutResultsLookup(workoutResults)

    
        //console.log('here are the workoutResults: ' + JSON.stringify(workoutResults))
    
        //var arr = workoutResults.filter(item => subWorkoutIds.indexOf(item.subworkoutsID) == 1);
        const workoutResults_filtered = workoutResults.filter(({subworkoutsID}) => subWorkoutIds.includes(subworkoutsID));
    
        const subWorkoutsWithResults = subWorkouts.map(subWorkout => {
          // Get the workout result for this sub workout from the results table
          //const workoutResult = workoutResults_filtered.find(result => result.subworkoutsID === subWorkout.id);
          const workoutResult = workoutResults_filtered.filter(result => result.subworkoutsID === subWorkout.id);
    
         // console.log(subWorkout.id)
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
              subworkoutsID: result.subworkoutsID,
              value: result.value,
              userID: result.userID
            })) 
          };
    
    
        });
    
        const currentWorkout = currworkout[0]
    

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
        setWorkoutResults(dtWithResults)
    
        if (dtWithResults.subWorkouts) {
          groupAndAdd(dtWithResults)
        }

        //console.log(currworkout[0])

        setWorkout(currworkout[0]);
    
        //Set the current workout ID
        setWorkoutID(currworkout[0].id)
    
      }

    async function getUser(){

        try {
          const authUser = await Auth.currentAuthenticatedUser({bypassCache: true});
          //console.log(authUser.attributes.sub)
          //setAuthSub(authUser.attributes.sub)
  
         
          //Get local User Id for Query
          const user = await DataStore.query(User, sw =>
            sw.sub.eq(authUser.attributes.sub)
          )
        
  
          //Query Matrix Table to find list of ids  
          if (user[0]) {
            //Set state variable
            setUserID(user[0].id)
            setUnits(user[0].units.toLowerCase())
            //console.log(user[0])
  
          }
        } catch (e) {
          console.log('Error: ' + e)
        }
  
      }

    /*
        Header and Button Functions
    */

    const goBackPress = async () => {
        navigation.navigate('FitnessScreen')
        //console.log('Go to Profile Screen')
    }

    const onSearchPress = async () => {
        console.log('Search button pressed')
        setShowSearch(true)
    };

    const onCancelPress = async () => {
        console.log('Cancel button pressed')
        setShowSearch(false)
        setShowFilter(false)
    };

    const FilterSection = () => {
      const [modalVisible, setModalVisible] = useState(false);
      const [switch1Value, setSwitch1Value] = useState(false);
      const [switch2Value, setSwitch2Value] = useState(false);

      return (
        <View style={styles.switchOutsideContainer}>
          <View style={[styles.switchContainer, {backgroundColor: activeColors.primary_bg}]}>
            <Text style={[styles.switchTitle, {color: activeColors.primary_text}]}>My Workouts</Text>
            <Switch
              thumbColor={switch1Value ? '#F8BE13' : '#f4f3f4'}
              trackColor={{ false: '#767577', true: '#363636' }}
              value={switch1Value}
              onValueChange={value => setSwitch1Value(value)}
            />
          </View>
        </View>
      );
    };

    const onFilterPress = async () => {
        console.log('Filter button pressed')  
        setShowFilter(!showfilter)
        setShowSearch(true)
    };

    function Header() {        
  
        return (
  
            showSearch ? (
 
                <>
                </>
             ) : (
              
                <>
                  <View style={[styles.header, {backgroundColor: activeColors.primary_bg}]}>
                      <Pressable onPress={goBackPress}>
                          <Ionicons name='chevron-back-outline' style={{fontSize: 30, color: activeColors.primary_text}}/>
                      </Pressable>
                      <View>
                          <Text style={[styles.header_text, {color: activeColors.primary_text}]}>Functional Fitness</Text>
                      </View>
                      <View style={{flexDirection: 'row'}}>
                          <Pressable style={{padding: 5}} onPress={onSearchPress}>
                              { darkMode ? <Image style={styles.header_icons} source={require('../../../../assets/images/Search-White.png')} /> : <Image style={styles.header_icons} source={require('../../../../assets/images/Search-Black.png')} />}
                          </Pressable>
                          <Pressable style={{padding: 5}} onPress={onFilterPress}>
                              { darkMode ? <Image style={styles.header_icons_filter} source={require('../../../../assets/images/Filter-icon-white.png')}/> : <Image style={styles.header_icons_filter} source={require('../../../../assets/images/Filter-icon-black.png')}/>}
                          </Pressable>
                      </View>
                  </View>
                
                </>
              )
            
          )
    }


    const FilterModal = () => {

        return(
          <Modal
              animationType="fade" //slide or none
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.centeredView}>
                  <View style={styles.modalHeader}>
                    <Pressable
                      style={{justifyContent: 'center', paddingLeft: 10, paddingRight: 5}}
                      onPress={() => setModalVisible(!modalVisible)}
                    >
                      <Ionicons name='add-outline' color='#363636' style={{fontSize: 32, transform: [{rotate: '45deg'}]}}/>
                    </Pressable>
                    <View style={{justifyContent: 'center'}}>
                      <Text style={{color: '#363636', fontSize: 18, fontWeight: '700'}}>Filters</Text>
                    </View>
                    <View style={{justifyContent: 'center', paddingRight: 10, paddingLeft: 5}}>
                      <Text style={{color: '#363636'}}>Reset</Text>
                    </View>
                  </View>
                  <View style={styles.modalBody}>
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                      <Text style={{marginRight: 10, fontWeight: '500'}}>Only Show Saved Workouts</Text>
                      <Switch
                        //363636
                        trackColor={{ false: "#767577", true: "#363636" }}
                        thumbColor={isEnabledFilters ? "#F8BE13" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitchFilters}
                        value={isEnabledFilters}
                      />
                    </View>
  
                  </View>
                  <View style={styles.modalFooter}>
                  <Bubble_Button 
                    text='APPLY FILTERS'
                    onPress={onApplyFiltersPress}
                    bgColor='#ACACAC'
                    fgColor='#fff'
                    cstyle={{width: '95%'}}
                    tstyle={{fontWeight: '900'}}
                  />
                  </View>
              </View>
            </Modal>
        );
      
      }


    /*
      Add Workout Notes and MOdal
    */
    const onAddNotesPress = async () => {
      setModalVisibleNotes(!modalVisibleNotes)
      console.log('Add Notes')
    }

    const onApplyFiltersPress = async () => {
      console.log('Apply Filters Pressed')  
      setShowSearch(false)
      setModalVisible(!modalVisible)
    };

    const onSaveNotesPress = async () => {
      console.log('Notes have been Pressed')  
      setModalVisibleNotes(!modalVisibleNotes)
    };


    /*
        Save Workout Logic
    */

    const toggleSwitchIndSave = (previousState) => {

        setIsEnabledIndSave(previousState => !previousState)
    
        //Get local User Id for Query
        if (previousState) {
            saveNewWorkout(workoutid, userid)
    
        } else {

            deleteSavedWorkout(workoutid, userid)
        }
    
        //setFormData({ ...formData, [e.target.name]: e.target.value });
    };
          
    async function saveNewWorkout(workoutid, userid) {

      try {

                console.log(userid)
                //console.log(workoutid)
                // then you save the mode that links a post with an editor
                const saved_workout =  await DataStore.save(
                    new SavedWorkouts({
                        userID: userid,
                        workoutsID: workoutid
                    })
                );

                setSavedWorkouts(saved_workout)

        } catch (error) {
            console.log("Error Saving workout", error);
        }
    }
      
    async function deleteSavedWorkout(workoutid, userid) {

        console.log(savedworkouts)
        console.log(userid)

      try{

        const savedworkouts = await DataStore.query(SavedWorkouts, c =>
            c.userID.eq(userid) && c.workoutsID.eq(workoutid)
          );

          //console.log(workout)

          DataStore.delete(savedworkouts[0]);
          
          console.log("Workout Deleted")
      } catch (e) {
          console.log('error: ' + e)
      }
    

    }


    /*
        Workout Display
    */
    const DatePickerArrows = () => {

      //Date Picker Info

      function isValidDate(dateString) {
        const pattern = /^\d{2}\/\d{2}\/\d{4}$/; // pattern for MM/dd/yyyy

        if (!pattern.test(dateString)) {
          return false;
        }

        return true;
        //const date = new Date(dateString);
        //return !isNaN(date);

      }

    
      const addADay = () => {
        console.log('here: ' + date)

        let isoDateString = ''

        if (isValidDate(date)) {
          const dateComponents = date.split('/');
          const year = dateComponents[2];
          const month = dateComponents[0];
          const day = dateComponents[1];
          isoDateString = `${year}-${month}-${day}`;
        } else {
          isoDateString = date
        }
        
        let result = new Date(isoDateString)

        console.log('res: ' +result)

        setNewDate(result.setDate(result.getDate() + 1 ));
      };
    
      const subADay = () => {

        let isoDateString = ''

        if (isValidDate(date)) {
          const dateComponents = date.split('/');
          const year = dateComponents[2];
          const month = dateComponents[0];
          const day = dateComponents[1];
          isoDateString = `${year}-${month}-${day}`;
        } else {
          isoDateString = date
        }

        let result = new Date(isoDateString)

        setNewDate(result.setDate(result.getDate() - 1 ));
      };

      //console.log('this one: ' + date)

      let date_final = ''

      if (isValidDate(date)) {
        date_final = date.toString()
      } else {
        date_final = format(new Date(date), 'MM/dd/yyyy')
      }

      //console.log(date_final)

    
      return(
        <View style={styles.datePickerArrowsContainer}>
          <Pressable style={{padding: 5, paddingRight: 10, paddingLeft: 10}} onPress={subADay}>
            <Ionicons name='caret-back-outline' style={{fontSize: 25 , color: activeColors.primary_text}}/>
          </Pressable>
          <Pressable  style={{alignItems: 'center', justifyContent: 'center', marginRight: 20, marginLeft: 20}}>
            <Text style={{fontSize: 25, fontWeight: '300', color: activeColors.primary_text}}>
                {/*{format(date, 'EEEE, MMM do yyyy')}*/}
                {/*format(new Date(date), 'MM/dd/yyyy')*/}
                {date_final}
               {/*{moment.(date).format('dddd, MMM Do YYYY')}*/}
            </Text>
          </Pressable>
          <Pressable style={{padding: 5, paddingRight: 10, paddingLeft: 10}} onPress={addADay}>
            <Ionicons  name='caret-forward-outline' style={{fontSize: 25, color: activeColors.primary_text}}/>
          </Pressable>
          {/*<Text>selected: {date.toLocaleString()}</Text>*/}
          {/*moment(date).format('dddd, MMM Do YYYY')*/}
        </View>
      )
      
    
    }
    

    const WorkoutItemInput = (props) => {

      const timermask = '00:00:00';

      function handleChange(event) {
        // Here, we invoke the callback with the new value
        
        props.onChange(event.nativeEvent.text);
        
        
        console.log(event.nativeEvent.text)
      }

      let input

      if (props.resultcat === 'WEIGHT') {
        input = <View style={{justifyContent: 'space-around', alignItems: 'center', marginBottom: 5, flexDirection: 'row'}}>
                  <TextInput
                      name='weight'
                      placeholder='ex. 225'
                      control={control} 
                      keyboardType='numeric'
                      maxLength={5}
                      value={props.value}
                      style={{fontSize: 20, width: 100, textAlign: 'center', marginBottom: 20, marginTop: 20, borderBottomWidth: 0.5, color: activeColors.primary_text,  borderBottomColor: activeColors.primary_text}}
                      onChange={handleChange}
                  />
                  <Text  style={{color: activeColors.primary_text}}>
                    {units}
                  </Text>
                </View>
      } else if (props.resultcat === 'SETSREPS')  {
        input = <View style={{width: '100%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginBottom: 5}}>
                  {/*}
                    <TextInput
                      name='setsreps'
                      placeholder='Sets'
                      control={control} 
                      keyboardType='numeric'
                      maxLength={3}
                      value={props.value}
                      style={{width: '30%', textAlign: 'center', marginBottom: 20, marginTop: 20, borderBottomWidth: 1, borderBottomColor: 'black'}}
                      onChange={handleChange}
                    />
                  */}
                  <MaskedTextInput
                      mask="99-99"
                      name='setsreps'
                      value={props.value}
                      keyboardType='numeric'
                      onChange={handleChange}
                      onChangeText={(text, rawText) => {
                        console.log(text);
                        console.log(rawText);
                      }}
                      style={{fontSize: 20, textAlign: 'center', marginBottom: 20, marginTop: 20, borderBottomWidth: 1, borderBottomColor: activeColors.primary_text, color: activeColors.primary_text}}
                    />
                    <Text style={{color: activeColors.primary_text}}>
                      rounds/sets - reps
                    </Text>
                </View>
      } else if (props.resultcat === 'TIME')  {
        input = <View style={{flexDirection: 'row',}}>
                    <MaskedTextInput
                      autoFocus
                      mask="9:99:99"
                      placeholder= "0:00:00"
                      name='time'
                      value={props.value}
                      keyboardType='numeric'
                      onChange={handleChange}
                      onChangeText={(text, rawText) => {
                        console.log(text);
                        console.log(rawText);
                      }}
                      style={{fontSize: 20, width: '100%', textAlign: 'center', marginBottom: 20, marginTop: 20, borderBottomWidth: 1, borderBottomColor: activeColors.primary_text, color: activeColors.primary_text}}
                    />
                  </View>
      }

      return (
        
        input
        
      )

    }

    const WorkoutItem = ({category}) => {

        //console.log('here we are: ' + JSON.stringify(subworkouts[category]))

      const [expand, setExpand] = useState((savecategory === subworkouts[category].group) ? true : false);

      const [values, setValues] = useState(subworkouts[category].info);
      
      //console.log('workoutresults: ' + JSON.stringify(values))


      const onSavePress = async () => {

        //setting the current save index so we know which tab to keep open
        //console.log(subworkouts[category].group)
        setSaveCategory(subworkouts[category].group)
        
        
        //DataStore.save(updatedUser)
        //console.log(subworkouts[category].info)
        //console.log('This is the result: ' + subworkouts[category].info[2].id)

        //loop over sub workouts subWorkoutWorkoutRresults table
        var arrayLength = subworkouts[category].info.length;

        //console.log('length: ' + arrayLength)

        for (var i = 0; i < arrayLength; i++) {
            //console.log('current subworkout id: ' + subworkouts[category].info[i].id);
            
            let curr_subworkoutid = subworkouts[category].info[i].id
            let curr_workoutid = workoutresults.id
            let curr_value = subworkouts[category].info[i].value

            //console.log('archive: ' + JSON.stringify(subworkout_archive))


            //Query subworkouts for workoutid on insert
            
            const curr_sub_workout = subworkout_archive.filter(
              pe => pe.id === curr_subworkoutid
            )
            
            //console.log(curr_subworkoutid)
            //console.log('originial: ' + JSON.stringify(workoutresults.subWorkouts))

            //Query by the subworkout ID: subworkouts[category].info[2].id
            /*
            const filteredResults = workoutresults.subWorkouts.filter(
              pe => pe.workoutresults[0].userID === userid && pe.id === curr_subworkoutid
            )
            */
            
            try {

            
                const workout_result = workoutresults_lookup.filter(
                    pe => pe.userID === userid && pe.subworkoutsID === curr_subworkoutid
                )
    
                //console.log('new: ' + JSON.stringify(workout_result))
                
                if (workout_result.length === 1){
                  console.log('Update');
    
                  let curr_result_obj = workout_result[0];
                  console.log(curr_result_obj)
    
    
                  //Update the row
                  const updatedWorkoutResult = WorkoutResults.copyOf(curr_result_obj, updated => {
                    updated.value = curr_value;
                  })
    
                  console.log(updatedWorkoutResult)
          
                  DataStore.save(updatedWorkoutResult)
                  
    
                } else {
                  console.log('Insert')
    
                  try {
    
    
                    await DataStore.save(
                      new WorkoutResults({
                        value: curr_value,
                        userID: userid,
                        subworkoutsID: curr_subworkoutid
                      })
                    );
    
                    console.log("Post saved successfully!");
                  } catch (error) {
                    console.log("Error saving post", error);
                  }
    
                }

            } catch (e) {
                console.log(e)
            }
            

        }

      

        //console.log('Results have been saved')

        //Open Alert Modal
        setModalVisibleSave(true);

        //Refresh the data
        setRefresh(!refresh)

        //Close Modal after X Seconds
        
        setTimeout(() => {
          setModalVisibleSave(false);
        }, 1500);  
        
        
        
      };

      //console.log('this is it: ' + JSON.stringify(subworkouts[category].info))


      const expandRow = async () => {

        //Clear out saveCategory
        setSaveCategory('')

        //Show/hide
        setExpand(!expand)
        
      };

      //console.log('WHat is this? ' + JSON.stringify(subworkouts[category].info))

      return (

        <View>

          <Pressable onPress={expandRow}>
            <View style={styles.subWorkoutblock}>
              <Text style={{fontWeight: '300', fontSize: 20, color: activeColors.primary_text}}>{subworkouts[category].group}</Text>
            </View>
          </Pressable>


          {expand ? (

             
            
              subworkouts[category].info.map((item, index) => {

                /*
                const filteredResults = workoutresults.filter(
                  pe => pe.subWorkouts.id === item.id
                )
                */
                

                function handleChange(newValue) {

                  //console.log('changed to: ' + newValue)
          
                  let newArr = [...values]; // copying the old array's data

                  newArr[index].value = newValue; // replace e.target.value with whatever you want to change it to
          
                  setValues(newArr);
                }


                /*
                if (item.resultcat === 'WEIGHT') {
                  input = <View style={{alignItems: 'flex-end', marginBottom: 5}}>
                      <TextInput
                          name='weight'
                          placeholder='ex. 225'
                          //control={control} 
                          keyboardType='numeric'
                          maxLength={5}
                          value={value_1}
                          style={{fontSize: 20, width: 100, textAlign: 'center', marginBottom: 20, marginTop: 20, borderBottomWidth: 0.5, borderBottomColor: '#363636'}}
                          //onChangeText={onChangeNumber}
                          //onChange={updateFieldChanged(index)}
                        />
                      </View>
                } else if (item.resultcat === 'SETSREPS')  {
                  input = <View style={{width: '100%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginBottom: 5}}>
                            <TextInput
                              name='sets'
                              placeholder='Sets'
                              control={control} 
                              keyboardType='numeric'
                              maxLength={3}
                              value={value_1}
                              style={{width: '30%', textAlign: 'center', marginBottom: 20, marginTop: 20, borderBottomWidth: 1, borderBottomColor: 'black'}}
                              //onChangeText={onChangeNumber}
                              //onChange={updateFieldChanged(index)}
                            />
                          </View>
                } else if (item.resultcat === 'TIME')  {
                  input = <View style={{flexDirection: 'row',}}>
                    <BubbleTextInput
                        name='hours'
                        placeholder='00'
                        control={control}
                        maxLength={2}
                        keyboardType='numeric'
                        vstyle={[
                          styles.modalInputBoxTime,
                          {width: 50, marginRight: 5, }
                        ]}
                      />
                    <Text style={{marginTop: 5, fontWeight: 'bold'}}>:</Text>
                    <BubbleTextInput
                        name='minutes'
                        placeholder='00'
                        control={control}
                        maxLength={2}
                        keyboardType='numeric'
                        vstyle={[
                          styles.modalInputBoxTime,
                          {width: 50, marginRight: 5,  marginLeft: 5}
                        ]}
                      />
                    <Text style={{marginTop: 5, fontWeight: 'bold'}}>:</Text>
                  </View>
                }
                */

                return(
                  <View key={item.id} style={{padding: 12, flexDirection: "row", borderBottomColor: '#363636', borderBottomWidth: 0.5, justifyContent: 'space-between'}}>
                    <View style={{alignItems: 'flex-start', justifyContent: 'center', width: '60%'}}>
                      <Text  style={{fontWeight: '400', fontSize: 15, lineHeight: 25, color: activeColors.primary_text}}>{item.desc}</Text>
                    </View>

                    <View style={{padding: 0, width: '40%'}}>
                        <WorkoutItemInput resultcat={item.resultcat} value={values[index].value} onChange={handleChange} />
                    </View>
                  </View>
                )

              })  

              
          ) : (
            <></>
          )}

          { expand ? (
            <View style={{alignItems: 'center'}}>
                <Bubble_Button 
                  text='SAVE'
                  onPress={onSavePress}
                  bgColor='#F8BE13'
                  fgColor='#363636'
                  cstyle={{width: '100%', borderBottomColor: '#363636', borderBottomWidth: 0.5}}
                  tstyle={{fontWeight: '400'}}
                />
            </View>

          ) : (
            <></>
          )}

        </View>
        
       
      );
        
    }


    const WorkoutInfoView = () => {



        return (
  
            <View style={styles.workoutCategory}>
              {/*<Text>{route?.params?.value}</Text>*/}
              <View style={styles.infoViewContainer}>
  
                    { 
                      /*
                        Show Workout Desc
                      */

                      workout ? (
                        <>
                          <View key={workout.id} style={{alignItems: 'center', padding: 20, paddingBottom: 0, paddingHorizontal: 15}}>
                            {/*<Text style={{fontSize: 18, fontWeight: '500', marginBottom: 20}}>{workout.title}</Text>*/}
                            <Text style={{fontWeight: '400', lineHeight: 25, textAlign: 'left', color: activeColors.primary_text}}>{workout.desc}</Text>
                            <View style={{backgroundColor: 'transparent',alignSelf: 'flex-end', justifyContent:'flex-end', flexDirection: 'row', alignItems: 'center'}}>
                              <Text style={{fontWeight: '500', color: activeColors.primary_text, marginTop: -5}}>Save</Text>
                              <Switch
                              //363636
                                trackColor={{ false: "#767577", true: "#363636" }}
                                thumbColor={isEnabledIndSave ? "#F8BE13" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitchIndSave}
                                value={isEnabledIndSave}
                                style={{marginTop: -5}}
                              />
                            </View>
                          </View>

                        </>
                      
                    ) : (
                      <></>
                    )}

                    {


                      /*
                        Show Sub Workout Items
                      */
                        subworkouts ? (


                          subworkouts.map((category, index) => {

                            //console.log('category: ' + JSON.stringify(subworkouts[category]))

                            return(
                                <WorkoutItem key={subworkouts[category].group} category={category} />
                            )

                          })


                        ) : (
                          <></>
                        )
                    }

                   

              </View>
            </View>
            
          )
      }
    

    /*
      Entering Workout Notes
    */
    const NotesModal = () => {



      let weightsTitle = 'Weight Used (lbs)'

      return(
        <Modal
            animationType="fade" //slide or none
            transparent={true}
            visible={modalVisibleNotes}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisibleNotes(!modalVisibleNotes);
            }}
          >
            <View style={styles.centeredView}>
                <View style={styles.modalHeader}>
                  <Pressable
                    style={{justifyContent: 'center', paddingLeft: 10, paddingRight: 5}}
                    onPress={() => setModalVisibleNotes(!modalVisibleNotes)}
                  >
                    <Ionicons name='add-outline' color='#363636' style={{fontSize: 32, transform: [{rotate: '45deg'}]}}/>
                  </Pressable>
                  <View style={{justifyContent: 'center'}}>
                    <Text style={{color: '#363636', fontSize: 18, fontWeight: '700'}}>Workout Notes</Text>
                  </View>
                  <View style={{justifyContent: 'center', paddingRight: 10, paddingLeft: 5}}>
                    <Text style={{color: '#363636'}}>Reset</Text>
                  </View>
                </View>

                
                <View style={styles.modalBody}>

                  <Text style={{fontWeight: 'bold', marginBottom: 5}}>Total Time</Text>
                  <Text style={{fontWeight: '400', marginBottom: 5, fontSize: 10}}>(hours:minutes:seconds)</Text>
                  <View style={{flexDirection: 'row',}}>
                    <BubbleTextInput
                        name='hours'
                        placeholder='00'
                        control={control}
                        maxLength={2}
                        keyboardType='numeric'
                        vstyle={[
                          styles.modalInputBoxTime,
                          {width: 50, marginRight: 5, }
                        ]}
                      />
                    <Text style={{marginTop: 5, fontWeight: 'bold'}}>:</Text>
                    <BubbleTextInput
                        name='minutes'
                        placeholder='00'
                        control={control}
                        maxLength={2}
                        keyboardType='numeric'
                        vstyle={[
                          styles.modalInputBoxTime,
                          {width: 50, marginRight: 5,  marginLeft: 5}
                        ]}
                      />
                    <Text style={{marginTop: 5, fontWeight: 'bold'}}>:</Text>
                    <BubbleTextInput
                        name='seconds'
                        placeholder='00'
                        control={control}
                        maxLength={2}
                        keyboardType='numeric'
                        vstyle={[
                          styles.modalInputBoxTime,
                          {width: 50, marginLeft: 5}
                        ]}
                      />
                  </View>
                  
                  <Text style={{fontWeight: 'bold', marginBottom: 5}}># of Sets and Reps Completed</Text>
                  <View style={{width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 5}}>
                    <BubbleTextInput
                      name='sets'
                      placeholder='Sets'
                      control={control}
                      maxLength={3}
                      keyboardType='numeric'
                      vstyle={[
                        styles.modalInputBoxRegular,
                        {width: 50}
                      ]}
                    />
                    <BubbleTextInput
                      name='reps'
                      placeholder='Reps'
                      control={control}
                      maxLength={3}
                      keyboardType='numeric'
                      vstyle={[
                        styles.modalInputBoxRegular,
                        {width: 50}
                      ]}
                    />
                  </View>
                
                  <Text style={{fontWeight: 'bold', marginBottom: 5}}>{weightsTitle}</Text>
                  <BubbleTextInput
                      name='weight'
                      placeholder='ex. 225'
                      control={control}
                      maxLength={5}
                      keyboardType='numeric'
                      vstyle={[
                        styles.modalInputBoxRegular,
                        {width: 100}
                      ]}
                    />
                  <BubbleMultiLine
                    name='details'
                    placeholder='Other Details and Notes'
                    control={control} 
                    //multiline={true}
                  />
                  
                </View>
                <View style={styles.modalFooter}>
                <Bubble_Button 
                  text='SAVE'
                  onPress={onSaveNotesPress}
                  bgColor='#F8BE13'
                  fgColor='#363636'
                  cstyle={{width: '95%'}}
                  tstyle={{fontWeight: '900'}}
                />
                

                </View>
            </View>
          </Modal>
      );
    
    }


    return(
      
        <View style={[styles.container, {backgroundColor: activeColors.primary_bg}]}>

          {/* Modals */}
          <NotesModal />
          <Modal
            animationType='slide'
            transparent={true}
            visible={modalsisiblesave}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisibleSave(!modalsisiblesave);
            }}
          >
            <View style={styles.centeredViewSave}>
              <View style={styles.modalViewSave}>
                <Text style={styles.modalTextSave}>Workout Results Saved!</Text>
                <Pressable
                  style={[styles.buttonCloseSave]}
                  onPress={() => setModalVisibleSave(!modalsisiblesave)}
                >
                  <Ionicons name='add-outline' style={{fontSize: 40, transform: [{ rotateZ: "45deg" }]}}/>
                </Pressable>
              </View>
            </View>
          </Modal>

          
          

          {showSearch ? (
              <View style={[styles.header, {backgroundColor: activeColors.primary_bg}]}>
                <TextInput
                  style={[styles.searchBar, { backgroundColor: activeColors.inverted_bg_alt}]}
                  onChangeText={(text) => searchFilterFunction(text)}
                  value={search}
                  underlineColorAndroid="transparent"
                  placeholder="Search Here"
                />
                <Pressable onPress={onCancelPress} style={{marginRight: 5}}>
                  <Text style={{fontSize: 14, color: activeColors.primary_text}}>Cancel</Text>
                </Pressable>
              </View>
            ) : (
              <Header />
          )}  

          {showfilter ? (
              <FilterSection />
          ) : (
            <>
            </>
          )}
        
          
          {showSearch ? (
              <>
                <FlatList
                  data={filteredDataSource}
                  keyExtractor={(item, index) => index.toString()}
                  ItemSeparatorComponent={ItemSeparatorView}
                  renderItem={ItemView}
                />
              </>     
                
            ) : (
              

                <ScrollView style={{marginBottom: -50}}>
                  <View style={styles.datePicker}>
                    <DatePickerArrows />
                  </View>
                  <WorkoutInfoView />
                </ScrollView>
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
    //alignItems: 'center'
  },

  //Search
  itemStyle: {
    padding: 10,
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: '#009688',
    backgroundColor: '#FFFFFF',
  },

  //header
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

  datePicker: {
    justifyContent: 'center',
    flexDirection: 'row'
  },
  workoutCategory: {
    //backgroundColor: 'blue',
    //paddingLeft: 10,
    //paddingRight: 10,
    paddingBottom: 100,
    marginBottom: 100,
  },
  datePickerArrowsContainer: {
    //backgroundColor: '#EFEFEF',
    borderRadius: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    //paddingRight: 60,
    paddingBottom: 0,
    paddingTop: 20,
    width: 200
  },
  header_icon_container: {
    flexDirection: 'row',
    marginTop: 12
    //backgroundColor: 'blue',
  },
  header_icons: {
    height: 27,
    width: 27,
    marginBottom: 0,
    //backgroundColor: 'green',
    marginTop: 1,
    marginRight: 10
  },
  header_icons_filter: {
    height: 23,
    width: 23,
    marginTop: 3
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
    height: 350,
    paddingTop: 20,
    backgroundColor: '#E3E3E3',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  modalFooter: {
    width: '95%',
    height: 60,
    backgroundColor: '#E3E3E3',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomEndRadius: 5,
    borderBottomStartRadius: 5
  },
  modalInputBoxRegular: {
    padding: 0, 
    alignItems: 'center', 
    paddingRight: 5, 
    paddingBottom: 4, 
    marginRight: 10, 
    borderRadius: 0
  },
  modalInputBoxTime: {
    padding: 0, 
    alignItems: 'center', 
    //paddingRight: 5, 
    paddingBottom: 4, 
    //marginRight: 10, 
    borderRadius: 0
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
  searchFilterResultsContainer: {

  },
  infoViewContainer: {
    width: '100%',
   
    //alignItems: 'center'
  },

  //Search Results
  resultsItemContainer: {
    padding: 10,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E6E6E6',
    
  },

  //Sub Workout
  subWorkoutblock: {
    padding: 15, 
    //backgroundColor: 'white', 
    borderBottomColor: 'gray', 
    borderBottomWidth: 0.75,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },


  //Model Save
  centeredViewSave: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 50,
  },
  modalViewSave: {
    width: '95%',
    flexDirection: 'row',
    backgroundColor: "white",
    justifyContent: 'space-between',
    borderRadius: 5,
    margin: 20,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  buttonSave: {
    //borderRadius: 20,
    //padding: 10,
    //elevation: 2
  },
  buttonOpenSave: {
    backgroundColor: "#F194FF",
  },
  buttonCloseSave: {
    //backgroundColor: "white",
    padding: 5,
  },
  textStyleSave: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalTextSave: {
    marginLeft: 20,
    textAlign: "center",
    fontSize: 18
  },

  switchOutsideContainer: {

    justifyContent: 'space-between',
    alignItems: 'center',
  },
  switchContainer: {
    flexDirection: 'row',
    //backgroundColor: 'white',
    width: '100%',
    height: 80,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  switchTitle: {
    fontSize: 20,
    fontWeight: '400',
    color: 'black',
    marginBottom: 10,
  },
  
});
