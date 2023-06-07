import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView, TouchableOpacity, Platform, Modal } from 'react-native';
import Constants from 'expo-constants'
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Amplify, Auth, DataStore, Hub } from 'aws-amplify';
import { Workouts, User} from '../../../models';

import { parseISO,  format, parse ,compareDesc} from 'date-fns';

//Themes
import ThemeContext from '../../../components/ThemeContext'
import {colors} from '../../../../assets/styles/themes'


const WorkoutsCard = ( { navigation }) => {

    const date = new Date()
    const workoutcategory = 'Functional Fitness'
    const [workout, setWorkout] = useState(undefined);
    const [user, setUser] = useState(undefined)
    const [workoutresultsallow, setWorkoutRestultsAllow] = useState(undefined)
    const [showAlert, setShowAlert] = useState(false);
    const [refresh, setRefresh] = useState(false);
  
    const theme = useContext(ThemeContext)
    const darkMode = theme.state.darkMode;

    let activeColors = ''

    if (darkMode) {
      activeColors = colors['dark'];
    } else {
      activeColors = colors['light'];
    }


    useEffect(() => {
       const fetchWorkouts = async () => {
        
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
            setUser(user[0])

            setWorkoutRestultsAllow(user[0].workout_logs)
        
            const sub = DataStore.observeQuery(Workouts).subscribe(({ items }) => {

              const filteredItems = items.filter(
                (item) =>
                  item.workout_type === user[0].default_workout_type
              );

              console.log('filtered items: ' + filteredItems)
          
              filteredItems.sort((a, b) => {
                const dateA = parse(a.date, 'MM/dd/yyyy', new Date());
                const dateB = parse(b.date, 'MM/dd/yyyy', new Date());
                return compareDesc(dateA, dateB);
              });
          
              setWorkout(filteredItems[0]);
          });
        
          return () => {
            sub.unsubscribe();
          };

        }


        } catch (error) {
          console.log('Error: ' + error)
        }


       }

       fetchWorkouts()
      
    }, [refresh]);
  


    const handleWorkoutResultsSignup = async (text) => {
      console.log('Signing up')

      if (user) {
        user.workout_logs = true;
        await DataStore.save(user);
      }
     

      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 2500); // Change the timeout duration as needed

      setRefresh(!refresh)
    };

    const shadowStyle = Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    });


  return(
    <View style={{padding: 5, flexDirection: 'row', justifyContent: 'space-evenly', flexWrap: 'wrap', backgroundColor: activeColors.primary_bg}}>
      <View style={{height: 250, width: '100%', borderBottomWidth: 1, borderColor: '#c9c9c9', padding: 5, paddingHorizontal: 0}}>
        {workoutresultsallow ? (
          <></>
        ) : (
          <View style={{ padding: 5}}>
          <TouchableOpacity style={[styles.signupbutton, shadowStyle, {backgroundColor: activeColors.secondary_bg}]} onPress={handleWorkoutResultsSignup}> 
            <Text style={{color: activeColors.primary_text, textAlign: 'center', fontWeight: 500}}>Sign up to log all workout results!</Text>
          </TouchableOpacity>
        </View>
        )}

        <Modal
          animationType='slide'
          transparent={true}
          visible={showAlert}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisibleSave(!modalsisiblesave);
          }}
        >
          <View style={styles.centeredViewSave}>
            <View style={styles.modalViewSave}>
              <Pressable
                style={[styles.buttonCloseSave]}
                onPress={() => setModalVisibleSave(!modalsisiblesave)}
              >
                <Ionicons name='add-outline' style={{ fontSize: 40, transform: [{ rotateZ: "45deg" }] }} />
              </Pressable>
              <View style={{margin: 20}}>
                <Text style={[styles.modalTextSave, { fontSize: 16 }]}>You have now signed up to record and track all workout results! *Payment Details will be collected after this notification</Text>
              </View>
            </View>
          </View>
        </Modal>
        
        
        <View style={{ marginBottom: 10, borderBottomColor: '#c9c9c9', borderBottomWidth: 1 }}>
          <Text style={{fontSize: 25, fontWeight: '500', color: '#E1AB09', marginLeft: 5}}>Workout of the Day</Text>
        </View>
        
          <ScrollView nestedScrollEnabled = {true}>
          {workout ? (
            <>
              <Text style={{color: activeColors.primary_text, marginBottom: 5}}>{workout.workout_type === 'FUNCTIONALFITNESS' ? ('Functional Fitness') : ('Military Prep')}</Text>
              <Text style={{color: activeColors.primary_text, marginBottom: 5}}>{workout.date}</Text>
              <Text style={{color: activeColors.primary_text, lineHeight: 25, marginBottom: 50}}>{workout.desc}</Text>
            </>
            ) : (
              <Text style={{color: activeColors.primary_text, marginBottom: 5}}>Today's workout hasn't been added yet</Text>
            )}
            
          </ScrollView>
      </View>
      <Pressable 
        onPress={() => navigation.navigate('WorkoutDetails', {value: 'FUNCTIONALFITNESS'})}
        style={{width: '100%', borderColor: '#c9c9c9' , borderBottomWidth: 1,  justifyContent: 'flex-end', color: '#363636', alignItems: 'flex-start', padding: 5, marginTop: 25}}>
        <Text style={{fontSize: 25, fontWeight: '500', color: activeColors.primary_text}}>Functional Fitness</Text>
      </Pressable>
      <Pressable 
        onPress={() => navigation.navigate('WorkoutDetails', {value: 'MILITARYPREP'})}
        style={{width: '100%', borderColor: '#c9c9c9' , borderBottomWidth: 1, justifyContent: 'flex-end', color: '#363636', alignItems: 'flex-start', padding: 5, marginTop: 25}}>
        <Text style={{fontSize: 25, fontWeight: '500', color: activeColors.primary_text}}>Military Prep</Text>
      </Pressable>
      <Pressable 
        onPress={() => navigation.navigate('WorkoutDetails', {value: 'myworkouts'})}
        style={{width: '100%', borderColor: '#c9c9c9' , borderBottomWidth: 1, justifyContent: 'flex-end', color: '#363636', alignItems: 'flex-start', padding: 5, marginTop: 25}}>
        <Text style={{fontSize: 25, fontWeight: '500', color: activeColors.primary_text}}>My Workouts</Text>
      </Pressable>
      <View style={{flexDirection: 'row', width: '100%'}}>
        <View style={{flex: 1, borderRadius: 0, borderColor: '#c9c9c9' , borderBottomWidth: 1, alignItems: 'flex-start', padding: 5, marginTop: 20, marginRight: 20}}>
          <Pressable 
            onPress={() => navigation.navigate('ProgrammingScreen', {value: 'Free'})}>
            <Text style={{fontSize: 25, fontWeight: '500', color: activeColors.primary_text}}>Programs</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );

}

export default function WorkoutScreen( {navigation} ) {

  const theme = useContext(ThemeContext)
  const darkMode = theme.state.darkMode;

  let activeColors = ''

  if (darkMode) {
    activeColors = colors['dark'];
  } else {
    activeColors = colors['light'];
  }


    return(
        
      
      <View style={[styles.container, Platform.OS === 'ios' && styles.marginTop, {backgroundColor: activeColors.primary_bg}]}>
           <View style={[styles.header, {backgroundColor: activeColors.primary_bg}]}>
            <View>
                <Text style={[styles.header_text, { color: activeColors.primary_text }]}>Fitness and Programming</Text>
            </View>
          </View>

          

          <ScrollView  style={{marginBottom: 50, width: '100%'}} nestedScrollEnabled = {true}>
            <View style={{alignItems: 'center'}}>
              <WorkoutsCard navigation={navigation} />
            </View>
          </ScrollView>
        </View>
      
    );
}

const statusBarHeight = Constants.statusBarHeight

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    flexDirection: 'column',
    //marginTop: statusBarHeight,
    //backgroundColor: 'white',
    //alignItems: 'center',
    //paddingTop: 40
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
    //backgroundColor: 'white',
    borderBottomColor: '#c9c9c9', 
    borderBottomWidth: 1
  },
  header_text: {
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 10,
    color:'#363636',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between'
  },
  cardHeader: {
    alignSelf: 'center', 
    marginTop: 15, 
    fontWeight: '600',
    fontSize: 20
  },
  bubbleSectionTop: {
    width: '100%',
    backgroundColor: '#363636',
    //backgroundColor: 'white',
    marginBottom: 15,
    //borderRadius: 5,
    padding: 10,
    flexDirection: 'row',
    elevation: 5
  },
  bubbleSectionTopLeft: {
    //backgroundColor: 'blue',
    width: '50%',
    alignItems: 'center'
  },
  bubbleSectionTopRight: {
    //backgroundColor: 'green',
    width: '50%',
    alignItems: 'center'
  },
  bubbleSectionBottom: {
    width: '100%',
    backgroundColor: '#fff',
    marginBottom: 15,
    //borderRadius: 5,
    padding: 10,
    //flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 4
  },
  formattedTextTop: {
    lineHeight: 25,
    color: '#FFC118',
    fontSize: 13,
  },
  formattedTextBottom: {
    lineHeight: 25,
    color: '#D89F02',
    fontSize: 13,
    fontWeight: '500',
  },
  bubbleSectionBottomTop: {
    //backgroundColor: 'blue',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 20,
    marginRight: 20
  },
  bubbleSectionBottomBottom: {
    alignItems: 'center'
  },
  signupbutton: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  
   //Model Save
   centeredViewSave: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start", // Adjusted to align the content to the top left
    marginBottom: 50,
  },
  modalViewSave: {
    width: '90%',
    flexDirection: 'column',
    backgroundColor: "white",
    justifyContent: 'space-around',
    borderRadius: 5,
    margin: 20,
    padding: 10,
    alignItems: "flex-start", // Adjusted to align the content to the top left
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
    alignSelf: "flex-start", // Adjusted to position the icon at the top left corner
    padding: 5,
  },
  modalTextSave: {
    marginLeft: 20,
    textAlign: "center",
    fontSize: 20, // Adjusted font size to make it slightly smaller
    lineHeight: 25
  },
  
});
