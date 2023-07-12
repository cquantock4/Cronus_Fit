import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Alert, ScrollView } from 'react-native';
import { TextInput, Pressable, Switch, FlatList, KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import Constants from 'expo-constants'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Bubble_Button } from '../../../components/ui/buttons'

import Header from '../../../components/ui/inputs/header';
import ListItem from '../../../components/ui/listItem';
import { SafeAreaView } from 'react-native-safe-area-context';
import {ActivityIndicator} from "@react-native-material/core";

import Modal from 'react-native-modal';
import { parse,  format } from 'date-fns';

import {useRoute} from '@react-navigation/native';
import {useForm} from 'react-hook-form';

//Themes
import ThemeContext from '../../../components/ThemeContext'
import {colors} from '../../../../assets/styles/themes'


import { Auth, DataStore  } from 'aws-amplify';
import { Workouts, User, WorkoutNotes, SavedWorkouts, WorkoutResults, SubWorkouts} from '../../../models';




export default function WorkoutDetails( {navigation} )  {
  const route = useRoute();
  const {control, handleSubmit, formState: {errors}} = useForm();

  //Workout Variables
  const [workoutcategory, setWorkoutCategory] = useState(route?.params?.value);
  const [selectedworkoutid, setSelectedWorkoutID] = useState(route?.params?.id);
  const [selectedWorkoutIndex, setSelectedWorkoutIndex] = useState(0);
  const [workouts, setWorkouts] = useState(false);
  const [workout, setWorkout] = useState(undefined);
  const [workoutid, setWorkoutID] = useState(undefined);
  const [workoutresults, setWorkoutResults] = useState(undefined);
  const [workoutresults_lookup, setWorkoutResultsLookup] = useState(undefined);
  const [subworkouts, setSubWorkouts] = useState(undefined);
  const [workoutnotes, setWorkoutNotes] = useState(undefined)

  //Permission
  const [workoutslog, setWorkoutsLog] = useState(false);

  //Modal
  const [modalVisibleNotes, setModalVisibleNotes] = useState(false);
  const [showfilter, setShowFilter] = useState(false);
  const [showsearch, setShowSearch] = useState(false);
  const [searchtext, setSearchText] = useState('');
  
  //Toggle
  const [isEnabledIndSave, setIsEnabledIndSave] = useState(false);

  const [userid, setUserID] = useState(route?.params?.userid);
  const [isLoading, setIsLoading] = useState(true);
  
  const [date, setNewDate] = useState(new Date());

  //Workout Sub Workouts Refresh and re-open tab
  const [refresh, setRefresh] = useState(false);
  const [savecategory, setSaveCategory] = useState('');
  const [modalsisiblesave, setModalVisibleSave] = useState(false);

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

      const unsubscribe = navigation.addListener('focus', () => {

        if (workoutcategory === 'myworkouts'){
          //Apply the filters and go to search Screen
          setShowSearch(true)
        }
      });


     // Return the function to unsubscribe from the event so it gets removed on unmount
     return unsubscribe;
    }, [navigation]);

    useEffect(() => {

      getUser();

      const workoutsub = DataStore.observeQuery(Workouts).subscribe(() => getWorkoutInfo().then(() => {
        setIsLoading(false); 
      }));


      return () => {
        workoutsub.unsubscribe();
      };


    }, [selectedworkoutid]);


    async function getWorkoutInfo() {

      const allworkouts = (await DataStore.query(Workouts)).filter(
        pe => pe.workout_type === workoutcategory
      )

      allworkouts.sort((a, b) => {
        const [monthA, dayA, yearA] = a.date.split('/');
        const [monthB, dayB, yearB] = b.date.split('/');
        const dateA = new Date(yearA, monthA - 1, dayA);
        const dateB = new Date(yearB, monthB - 1, dayB);
        return dateB - dateA;
      });

      setWorkouts(allworkouts)

      let selectedWorkoutIndex;

      if (selectedworkoutid === 0) {
        selectedWorkoutIndex = 0;
      } else {
        selectedWorkoutIndex = allworkouts.findIndex(workout => workout.id === selectedworkoutid);
      }

      if (selectedWorkoutIndex !== -1) {
        setSelectedWorkoutIndex(selectedWorkoutIndex);
        let curr_workout = allworkouts[selectedWorkoutIndex]
        setWorkout(curr_workout)
        setWorkoutID(curr_workout.id)
        getWorkoutDetails(curr_workout)

        
      }

        

    }

    async function getWorkoutDetails(currworkout) {

      //Notes for the workout
      const notes = (await DataStore.query(WorkoutNotes)).filter(
        pe => pe.workoutsID === currworkout.id && pe.userID === userid.toString()
      )

      if (notes.length > 0) {
        setWorkoutNotes(notes[0].note);
      } else {
        setWorkoutNotes(undefined);
      }

      //Check if the user saved the workout
      //const savedWorkouts = await DataStore.query(SavedWorkouts, (s) =>
         //s.workoutsID.eq(currworkout.id) && s.userID.eq(userid)
        //);
        const savedWorkouts = (await DataStore.query(SavedWorkouts)).filter(
          pe => pe.workoutsID === currworkout.id && pe.userID === userid.toString()
        )


        
      if (savedWorkouts.length === 1){
          setIsEnabledIndSave(true)
      } else {
          setIsEnabledIndSave(false)
      }
    
        // Find the subworkouts associated with the workout
        const subWorkouts = await DataStore.query(SubWorkouts, (s) =>
          s.workoutsID.eq(currworkout.id)
        );

       // Get all the subworkoutIds
       const subWorkoutIds = subWorkouts.map((sw) => sw.id);

       //Query all WorkoutResults
       const workoutResults = await DataStore.query(WorkoutResults, (s) =>
           s.userID.eq(userid)
       );

       setWorkoutResultsLookup(workoutResults)

       const workoutResults_filtered = workoutResults.filter(({subworkoutsID}) => subWorkoutIds.includes(subworkoutsID));
    
      const subWorkoutsWithResults = subWorkouts.map(subWorkout => {
        // Get the workout result for this sub workout from the results table
        const workoutResult = workoutResults_filtered.filter(result => result.subworkoutsID === subWorkout.id);
  
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


      //Defining starting data structer for top level workouts
      const dt = {
        id: currworkout.id,
        title: currworkout.title,
        desc: currworkout.desc,
        date: currworkout.date,
        type: currworkout.type,
      }
      
      // Add the subWorkoutsWithResults array to the dt object
      const dtWithResults = {
        ...dt,
        subWorkouts: subWorkoutsWithResults
      };

      setWorkoutResults(dtWithResults)
  
      if (dtWithResults.subWorkouts) {
        groupAndAdd(dtWithResults)
      }

    }
  
    const textDisplay = (item) => {

      if (item) {
        var str = item;
        var result = str.split("\\n"); 

        return result.map((i, key) => <Text key={key}>{i + "\n"}</Text>);
      }

      return undefined

    
    }
    
    const groupAndAdd = (arr) => {
        const res = [];

        let currworkoutid = arr.id
    
        arr.subWorkouts.forEach(el => {
            
            let curr_result_val, curr_order
            if (el.workoutresults[0]) {
                curr_result_val = el.workoutresults[0].value
                curr_order = el.order
            } else {
                curr_result_val = ''
                curr_order = 0
            }
            
        
    
          let grouptitle = el.group + '. ' + el.grouptitle
    
          //Checking to see if group exists
          //If not exists, add group to array
          if (!res[grouptitle]) {
            res.push(grouptitle);
          }
    
          let info = {id: el.id, workoutid: currworkoutid, desc: el.desc, resultcat: el.resultcategory, value: curr_result_val, order: curr_order}
    
          if(typeof res[grouptitle] === "undefined") {


            res[grouptitle] = {group: grouptitle, info: [info]}
  
          } else {
  
            res[grouptitle].info.push(info);
           
            //res[grouptitle].id.push(el.subWorkouts.id);
  
          }
          
          
        }, {});


        res.sort();
    
        setSubWorkouts(res);
    
    
      }
      

    async function getUser(){

        try {
          const authUser = await Auth.currentAuthenticatedUser({bypassCache: true});

          //Get local User Id for Query
          const user = await DataStore.query(User, sw =>
            sw.sub.eq(authUser.attributes.sub)
          )

          if (user[0]) {
            setUserID(user[0].id)
            setWorkoutsLog(user[0].workout_logs)

          }
        } catch (e) {
          console.log('Error: ' + e)
        }
  
      }


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

    const onAddNotesPress = async () => {
      setModalVisibleNotes(!modalVisibleNotes)
    }

    const onSaveNotesPress = async (text) => {

      try {
        // Check if the record exists
        
        const existingNotes = (await DataStore.query(WorkoutNotes)).filter(
          pe => pe.workoutsID === workoutid && pe.userID === userid
        )
    
        if (existingNotes.length > 0) {
          // Update the existing record
          const existingNote = existingNotes[0];
          existingNote.note = text;
          await DataStore.save(existingNote);
        } else {
          // Create a new record
          const newNote = new WorkoutNotes({ note: text, workoutsID: workoutid, userID: userid });
          await DataStore.save(newNote);
        }
      } catch (error) {
        console.error('Error saving workout notes:', error);
      }

      setRefresh(!refresh)
      setModalVisibleNotes(!modalVisibleNotes)
    };

    const toggleSwitchIndSave = (previousState) => {

        setIsEnabledIndSave(previousState => !previousState)
        //Get local User Id for Query
        if (previousState) {
            saveNewWorkout(workoutid, userid)
    
        } else {

            deleteSavedWorkout(workoutid, userid)
        }
  
    };
          
    async function saveNewWorkout(workoutid, userid) {

      try {

          // then you save the mode that links a post with an editor
          const saved_workout =  await DataStore.save(
              new SavedWorkouts({
                  userID: userid,
                  workoutsID: workoutid
              })
          );
        } catch (error) {
            console.log("Error Saving workout", error);
        }
    }
      
    async function deleteSavedWorkout(workoutid, userid) {

      try{

        const savedworkouts = await DataStore.query(SavedWorkouts, c =>
            c.userID.eq(userid) && c.workoutsID.eq(workoutid)
          );


          DataStore.delete(savedworkouts[0]);
          
          //.log("Workout Deleted")
      } catch (e) {
          console.log('error: ' + e)
      }
    

    }

    const DatePickerArrows = () => {

      const navigateForward = () => {

        if (selectedWorkoutIndex < workouts.length - 1) {
          setSelectedWorkoutIndex(selectedWorkoutIndex + 1);
          setWorkout(workouts[selectedWorkoutIndex + 1]);
          getWorkoutDetails(workouts[selectedWorkoutIndex + 1]);
        }
      };
      
      const navigateBackward = () => {

        if (selectedWorkoutIndex > 0) {
          setSelectedWorkoutIndex(selectedWorkoutIndex - 1);
          setWorkout(workouts[selectedWorkoutIndex - 1]);
          getWorkoutDetails(workouts[selectedWorkoutIndex - 1]);
        }
      };

      return (
        <View style={[styles.datePickerArrowsContainer]}>
          <Pressable style={{padding: 10, paddingHorizontal: 15}} onPress={navigateForward}>
            <Ionicons name='caret-back-outline' style={{fontSize: 25 , color: activeColors.primary_text}}/>
          </Pressable>
          <Pressable style={{padding: 10, paddingHorizontal: 15,}} onPress={navigateBackward}>
            <Ionicons  name='caret-forward-outline' style={{fontSize: 25, color: activeColors.primary_text}}/>
          </Pressable>
        </View>
      )

    
    }

    const WorkoutItemInput = (props) => {


      let setsreps1 = ''
      let setsreps2 = ''

      if (props.resultcat === 'SETSREPS') {
        if (props.value.includes('-')) {
          const [part1, part2] = props.value.split('-');
          setsreps1 = part1
          setsreps2 = part2
        }
      }

      let temp_hour =  ''
      let temp_min = ''
      let temp_sec = ''

      if (props.resultcat === 'TIME') {
        if (props.value.includes(':')) {
          const [hour, minute, second] = props.value.split(':');
          temp_hour = hour
          temp_min = minute
          temp_sec = second
        }
      }

      /*
      const formatTime = (inputTime) => {
        const digitsOnly = inputTime.replace(/\D/g, '');
        const paddedTime = digitsOnly.padStart(6, '0');
        const formattedTime = `${paddedTime.slice(0, 2)}:${paddedTime.slice(2, 4)}:${paddedTime.slice(4, 6)}`;
        return formattedTime;
      };
      */

      function handleChange(name, event) {
        // Here, we invoke the callback with the new value
        let text = event.nativeEvent.text
        let formatted_text = text

        if ( name === 'hour' || name == 'min' || 'sec' ) {
          if (name === 'hour' ) {
            formatted_text = text + ':' + temp_min + ':' + temp_sec
          } else if (name === 'min') {
            formatted_text = temp_hour + ':' + text + ':' + temp_sec
          } else if (name === 'sec') {
            formatted_text = temp_hour + ':' + temp_min + ':' + text
        }

       }

        props.onChange(formatted_text, name);
        
      }


      let input

      if (props.resultcat === 'WEIGHT') {
        input = <View style={{justifyContent: 'flex-end', alignItems: 'center', marginBottom: 5, flexDirection: 'row'}}>
                  <TextInput
                      name='weight'
                      placeholder='-'
                      placeholderTextColor={activeColors.primary_text}
                      control={control} 
                      keyboardType='numeric'
                      maxLength={5}
                      value={props.value}
                      style={{fontSize: 20, width: 75, textAlign: 'center', marginBottom: 20, marginTop: 20, borderBottomWidth: 0.5, color: activeColors.primary_text,  borderBottomColor: activeColors.primary_text}}
                      onChange={(event) => handleChange('weight', event)}
                  />
                  <Text  style={{color: activeColors.primary_text}}>
                    lbs
                  </Text>
                </View>
      } else if (props.resultcat === 'SETSREPS')  {

        //Split props.value on the - symbol


        input = <View style={{width: '100%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginBottom: 5}}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <TextInput
                      name='setsreps1'
                      placeholder='-'
                      placeholderTextColor={activeColors.primary_text}
                      control={control} 
                      keyboardType='numeric'
                      maxLength={3}
                      value={setsreps1}
                      style={{width: 50, marginBottom: 10, fontSize: 16, textAlign: 'center', marginBottom: 20, marginTop: 20, borderBottomWidth: 1, borderBottomColor: activeColors.primary_text, color: activeColors.primary_text}}
                      onChange={(event) => handleChange('setsreps1', event)}
                    />
                    <Text style={{color: activeColors.primary_text}}> Sets</Text>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <TextInput
                      name='setsreps2'
                      placeholder='-'
                      placeholderTextColor={activeColors.primary_text}
                      control={control} 
                      keyboardType='numeric'
                      maxLength={3}
                      value={setsreps2}
                      style={{width: 50, marginBottom: 10, fontSize: 20, textAlign: 'center', marginBottom: 20, marginTop: 20, borderBottomWidth: 1, borderBottomColor: activeColors.primary_text, color: activeColors.primary_text}}
                      onChange={(event) => handleChange('setsreps2', event)}
                    />
                    <Text style={{color: activeColors.primary_text}}> Reps</Text>
                  </View>
                </View>
      } else if (props.resultcat === 'TIME')  {
        input = <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {/*}
                    <TextInput
                      style={{ borderWidth: 1, borderColor: 'gray', padding: 10, color: activeColors.primary_text }}
                      value={props.value}
                      name='time'
                      onChange={(event) => handleChange('time', event)}
                      placeholder="Time (hh:mm:ss)"
                      placeholderTextColor={activeColors.primary_text}
      />*/} 


                    <TextInput
                      style={[styles.timeInput, {color: activeColors.primary_text, borderColor: activeColors.inverted_bg}]}
                      placeholder="hour"
                      placeholderTextColor={activeColors.primary_text}
                      keyboardType="numeric"
                      maxLength={2}
                      value={temp_hour}
                      onChange={(event) => handleChange('hour', event)}
                    />
                    <Text style={{color: activeColors.primary_text, fontWeight: '600'}}> : </Text>
                    <TextInput
                      style={[styles.timeInput, {color: activeColors.primary_text, borderColor: activeColors.inverted_bg}]}
                      placeholder="min"
                      placeholderTextColor={activeColors.primary_text}
                      keyboardType="numeric"
                      maxLength={2}
                      value={temp_min}
                      onChange={(event) => handleChange('min', event)}
                    />
                    <Text style={{color: activeColors.primary_text, fontWeight: '600'}}> : </Text>
                    <TextInput
                      style={[styles.timeInput, {color: activeColors.primary_text, borderColor: activeColors.inverted_bg}]}
                      placeholder="sec"
                      placeholderTextColor={activeColors.primary_text}
                      keyboardType="numeric"
                      maxLength={2}
                      value={temp_sec}
                      onChange={(event) => handleChange('sec', event)}
                    />

                    {/* Use getTimeValue() to get the formatted time value */}
                  </View>
      }

      return (
        
        input
        
      )

    }

    const WorkoutItem = ({category}) => {

      const [expand, setExpand] = useState((savecategory === subworkouts[category].group) ? true : false);
      const [values, setValues] = useState(subworkouts[category].info.sort((a, b) => a.order - b.order));
  

      const onSavePress = async () => {

        //setting the current save index so we know which tab to keep open
        setSaveCategory(subworkouts[category].group)

        //loop over sub workouts subWorkoutWorkoutRresults table
        var arrayLength = subworkouts[category].info.length;

        for (var i = 0; i < arrayLength; i++) {
            
            let curr_subworkoutid = subworkouts[category].info[i].id
            let curr_workoutid = workoutresults.id
            let curr_value = subworkouts[category].info[i].value
            let res_category = subworkouts[category].info[i].resultcat

            if (res_category === 'TIME'){

              let [hour, min, sec] = [null, null, null];

              if (curr_value.includes(':')) {
                const parts = curr_value.split(':');

                // Handle different cases based on the number of parts
                if (parts.length === 3) {
                  [hour, min, sec] = parts;
                } else if (parts.length === 2) {
                  [min, sec] = parts;
                } else if (parts.length === 1) {
                  // Check if the single value is an hour, minute, or second
                  const value = parts[0];
                  if (value.length === 2) {
                    // Assume it's an hour
                    hour = value;
                  } else if (value.length === 1) {
                    // Assume it's a minute or second
                    min = value;
                  }
                }
              }

              let temp_hour = (hour === '') ? '00' : hour.padStart(2, '0')
              let temp_min = (min === '') ? '00' : min.padStart(2, '0')
              let temp_sec = (sec === '') ? '00' : sec.padStart(2, '0')

              curr_value = temp_hour + ':' + temp_min + ':' + temp_sec

            }

            
            try {

            
                const workout_result = workoutresults_lookup.filter(
                    pe => pe.userID === userid && pe.subworkoutsID === curr_subworkoutid
                )
                
                if (workout_result.length === 1){
    
                  let curr_result_obj = workout_result[0];
    
                  //Update the row
                  const updatedWorkoutResult = WorkoutResults.copyOf(curr_result_obj, updated => {
                    updated.value = curr_value;
                  })
          
                  DataStore.save(updatedWorkoutResult)
                  
    
                } else {
    
                  try {
    
    
                    await DataStore.save(
                      new WorkoutResults({
                        value: curr_value,
                        userID: userid,
                        subworkoutsID: curr_subworkoutid
                      })
                    );
    
                  } catch (error) {
                    console.log("Error saving post", error);
                  }
    
                }

            } catch (e) {
                console.log(e)
            }
            

        }

        //Open Alert Modal
        setModalVisibleSave(true);

        //Refresh the data
        setRefresh(!refresh)

        //Close Modal after X Seconds
        
        setTimeout(() => {
          setModalVisibleSave(false);
        }, 1500);  
        
        
        
      };

      const expandRow = async () => {

        //Clear out saveCategory
        setSaveCategory('')

        //Show/hide
        setExpand(!expand)
        
      };

      return (

        <View>
          <Pressable onPress={expandRow}>
            <View style={[styles.subWorkoutblock, {borderBottomColor: activeColors.primary_text}]}>
              <Text style={{fontWeight: '600', fontSize: 20, color: activeColors.primary_text}}>{subworkouts[category].group}</Text>
            </View>
          </Pressable>

          <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 0}
              keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -100}
              style={{ flex: 1 }}
            >
            {expand ? (

                  values.map((item, index) => {
                  

                  function handleChange(newValue, name) {

                    let newArr = [...values]; 

                    const inputValue = newArr[index].value;

                    let finalresult = newValue

                    if ( name === 'setsreps1' || name == 'setsreps2' ) {
                      let joinedValue = ''

                      if (inputValue.includes('-')) {
                        // Splitting the input value into two parts
                        const [part1, part2] = inputValue.split('-');

                        if ( name === 'setsreps1' ) {
                          joinedValue = `${newValue}-${part2}`;
                        } else if ( name === 'setsreps2' ) {
                          joinedValue = `${part1}-${newValue}`;
                        }
                      } else {

                        if ( name === 'setsreps1' ) {
                          joinedValue = `${newValue}-${'0'}`;
                        } else if ( name === 'setsreps2' ) {
                          joinedValue = `${'0'}-${newValue}`;
                        }
                      }

                      finalresult = joinedValue

                   }


                    // Joining the two parts back together
                    
                    newArr[index].value = finalresult; // replace e.target.value with whatever you want to change it to
                    setValues(newArr);
                  }

                  return(
                    <View key={item.id} style={{padding: 12, flexDirection: "row", justifyContent: 'space-between'}}>
                      <View style={{alignItems: 'flex-start', justifyContent: 'center', width: workoutslog ? '60%' : '100%'}}>
                        <Text  style={{fontWeight: '400', fontSize: 15, lineHeight: 25, color: activeColors.primary_text}}>{textDisplay(item.desc)}</Text>
                      </View>
                      {workoutslog ? (
                      <View style={{padding: 0, width: '40%'}}>
                          <WorkoutItemInput resultcat={item.resultcat} value={values[index].value} onChange={handleChange} />
                      </View>
                      ) : (
                        <></>
                      )}
                    </View>
                  )

                })  

                
            ) : (
              <></>
            )}

          </KeyboardAvoidingView>

          { expand && workoutslog ? (
            <View style={{alignItems: 'flex-end'}}>
                <Bubble_Button 
                  text='SAVE'
                  onPress={onSavePress}
                  bgColor='#F8BE13'
                  fgColor='#363636'
                  cstyle={{width: '30%', padding: 10, marginRight: 5}}
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

        function isValidDate(dateString) {
          const pattern = /^\d{2}\/\d{2}\/\d{4}$/; // pattern for MM/dd/yyyy
    
          if (!pattern.test(dateString)) {
            return false;
          }
    
          return true;
    
        }

        let date_final = ''

        if (isValidDate(date)) {
          date_final = date.toString()
        } else {
          date_final = format(new Date(date), 'MM/dd/yyyy')
        }


        return (
            <>
              <View style={styles.infoViewContainer}>
              {isLoading ? (
                  <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                    <ActivityIndicator size="large" color={activeColors.accent_text} />
                  </View>
                ) : (
                  <>
                    <View style={styles.datePicker}>
                      <View style={{justifyContent: 'center'}}>
                        { workout ? (
                          <Text style={{color: activeColors.primary_text, fontSize: 27}}>{workout.date}</Text>
                        ) : (
                          <></>
                        )}
                          
                      </View>
                      <View style={{paddingRight: 10}}>
                        <DatePickerArrows />
                      </View>
                    </View>
          
                    <ScrollView >
                        {workout ? (

                        <View key={workout.id} style={{ alignItems: 'center', paddingHorizontal: 3, paddingTop: 10 }}>
                          <View>
                            <Text style={{ fontWeight: '400', lineHeight: 25, textAlign: 'left', color: activeColors.primary_text }}>{textDisplay(workout.desc)}</Text>
                          </View>
                        </View>
                          
                        ) : (
                          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 200}}>
                            <Text style={{fontWeight: '400', lineHeight: 25, color: activeColors.primary_text}}>No workout posted today</Text>
                          </View>
                        )}

                        <View style={{paddingBottom: 75}}>
                          {subworkouts ? (
                              subworkouts.map((category, index) => {
                                return(
                                    <WorkoutItem key={subworkouts[category].group} category={category} />
                                )

                              })
                            ) : (
                              <></>
                            )
                          }
                        </View>

                        
                    </ScrollView>
                    <View style={{position: 'absolute', bottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginTop: 10, paddingHorizontal: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                              <Text style={{ fontWeight: '600', color: activeColors.accent_text, marginRight: 5 }}>Save</Text>
                              <Switch
                                trackColor={{ false: "#767577", true: "#363636" }}
                                thumbColor={isEnabledIndSave ? "#F8BE13" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitchIndSave}
                                value={isEnabledIndSave}
                              />
                            </View>
                            
                            <TouchableOpacity style={{padding: 10,flexDirection: 'row',borderRadius: 5, backgroundColor: activeColors.accent_text }} onPress={onAddNotesPress}>
                              <View style={{ justifyContent: 'center' }}>
                                <Ionicons name='add-outline' style={{ fontSize: 20, color: '#363636', fontWeight: '600' }} />
                              </View>
                              <View style={{ justifyContent: 'center' }}>
                                <Text style={{ color: '#363636', fontWeight: '600' }}>Notes</Text>
                              </View>
                            </TouchableOpacity>

                            
                          </View>

                  </>
                )}
                    
                    {/*workout ? (
                      <>
                      
                      <View style={{justifyContent: 'center', alignItems: 'center', padding: 5, marginTop: 10}}>
                        <Text style={{color: activeColors.primary_text, fontSize: 18, fontWeight: 600}}>Notes</Text>
                      </View>
                        <Pressable onPress={onAddNotesPress} style={{margin: 5, borderWidth: 1, borderColor:activeColors.just_gray, padding: 5, borderRadius: 5, minHeight: 75 }}>
                          {workoutnotes ? (
                            <Text style={{color: activeColors.just_gray}}>{workoutnotes}</Text>
                          ) : (
                            <Text style={{color: activeColors.just_gray}}>Enter Notes Here</Text>
                          )}
                        </Pressable>
                      </>
                    ) : (
                      <>
                      </>
                    )*/}
                   

              </View>
            </>
          )
      };
    

    /*
      Entering Workout Notes
    */
    const NotesModal = (props) => {

      const [workoutnotes, setWorkoutNotes] = useState(props.value)

      const handleSaveNotesPress = () => {
        
        props.onPress(workoutnotes)
      };

      let weightsTitle = 'Weight Used (lbs)'

      return(
        <Modal
            animationType="fade" //slide or none
            transparent={true}
            visible={modalVisibleNotes}
            onRequestClose={() => {
              setModalVisibleNotes(!modalVisibleNotes);
            }}
          >
            <View style={[styles.centeredView, ]}>
              <View style={{backgroundColor: activeColors.secondary_bg, padding: 10}}>
              <View style={{flexDirection: 'row'}}>
                  <Pressable
                    style={{justifyContent: 'flex-start', paddingRight: 5}}
                    onPress={() => setModalVisibleNotes(!modalVisibleNotes)}
                  >
                    <Ionicons name='add-outline' color={activeColors.primary_text} style={{fontSize: 32, transform: [{rotate: '45deg'}]}}/>
                  </Pressable>
                </View>
                <View style={[styles.modalHeader, {marginBottom: 15,justifyContent: 'center'}]}>
                    <Text style={{color: activeColors.primary_text, fontSize: 23, fontWeight: '600'}}>Workout Notes</Text>
                </View>

                <View style={[styles.modalBody, { backgroundColor: activeColors.secondary_bg }]}>
                  <TextInput
                    style={[styles.textInput, { color: activeColors.primary_text,borderColor: activeColors.inverted_bg_alt }]}
                    onChangeText={(text) => setWorkoutNotes(text)}
                    value={workoutnotes}
                    multiline
                    placeholder="Enter Notes Here"
                    placeholderTextColor={activeColors.just_gray}
                    textAlignVertical="top"
                    minHeight={100} // Set a minimum height for the text input
                    maxHeight={200} // Set a maximum height for the text input (optional)
                  />
                </View>

                <View style={[styles.modalFooter, {backgroundColor: activeColors.secondary_bg}]}>
                  <Bubble_Button 
                    text='SAVE'
                    onPress={handleSaveNotesPress}
                    bgColor='#F8BE13'
                    fgColor='#363636'
                    cstyle={{width: '95%'}}
                    tstyle={{fontWeight: '900'}}
                  />
                </View>
              </View>
            </View>
          </Modal>
      );
    
    }

    const handleItemListPress = (id, type) => {
      setSelectedWorkoutID(id)
      setWorkoutCategory(type)
      setShowSearch(false);
    };

    const handleSearch = (text) => {
      setSearchText(text);
      setShowSearch(true);
    };
    
    const handleCancelSearch = () => {
      setSearchText('');
      setShowSearch(false);
    };

    // Filter the list based on the search text
    const filteredList = showsearch
    ? workouts.filter((item) =>
        item.title.toLowerCase().includes(searchtext.toLowerCase()) ||
        item.date.toLowerCase().includes(searchtext.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchtext.toLowerCase())
      )
    : workouts;

    return(
      <SafeAreaView style={[styles.container, {backgroundColor: activeColors.primary_bg}]}>
        <Header title={workoutcategory === 'FUNCTIONALFITNESS' ? 'Functional Fitness' : 'Military Prep'} searchable
        onSearch={handleSearch} 
        searchMode={showsearch}
        onCancelSearch={handleCancelSearch}
        backButtonPath="FitnessScreen"
        navigation={navigation} />
        {/* Modals */}
        <NotesModal value={workoutnotes} onPress={(text) => onSaveNotesPress(text)}/>
        <View style={{flex: 1}}>
          { showsearch ? (
            <ScrollView>
              {filteredList.map((item, index) => (
                <ListItem
                  key={index}
                  id={item.id}
                  title={item.title}
                  subtitle={item.desc}
                  date={item.date}
                  navtext="View Leaderboard"
                  onPress={() => handleItemListPress(item.id, item.workout_type)}
                />
              ))}
          
          </ScrollView>
          ) : (
            <WorkoutInfoView />
          )}
          <Modal
            animationType='slide'
            transparent={true}
            visible={modalsisiblesave}
            onRequestClose={() => {
              setModalVisibleSave(!modalsisiblesave);
            }}
          >
            <View style={styles.centeredViewSave}>
              <View style={[styles.modalViewSave , {backgroundColor: activeColors.primary_bg, borderWidth: 0.5, borderColor: activeColors.primary_text}]}>
                <Text style={[styles.modalTextSave, {color: activeColors.primary_text}]}>Workout Results Saved!</Text>
                <Pressable
                  style={[styles.buttonCloseSave]}
                  onPress={() => setModalVisibleSave(!modalsisiblesave)}
                >
                  <Ionicons name='add-outline' style={{fontSize: 40, color:activeColors.primary_text, transform: [{ rotateZ: "45deg" }]}}/>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>

      </SafeAreaView>
    )

  }

const statusBarHeight = Constants.statusBarHeight

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  marginTop: {
    marginTop: statusBarHeight,
  },
  datePicker: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 10,
    marginHorizontal: 10
  },
  datePickerArrowsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  //Modal
  centeredView: {
    flex: 1,
    justifyContent: "center",
    flexDirection: 'column',
  },
  modalHeader: {
    flexDirection: 'row',
  },
  modalBody: {
    backgroundColor: '#E3E3E3',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalFooter: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomEndRadius: 5,
    borderBottomStartRadius: 5
  },
  textInput: {
    borderRadius: 5,
    padding: 5,
    fontSize: 20,
    width: '95%', // Adjust the width as needed
  },
  infoViewContainer: {
    flex: 1
  },
  //Sub Workout
  subWorkoutblock: {
    padding: 15, 
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
  buttonCloseSave: {
    padding: 5,
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

  timeInput: {
    flex: 1, 
    textAlign: 'center', 
    borderWidth: 1
  },

  
});
