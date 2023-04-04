import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import Constants from 'expo-constants'

import { Amplify, Auth, DataStore, Hub } from 'aws-amplify';
import { Workouts } from '../../../models';

import { parseISO,  format } from 'date-fns';

//Themes
import ThemeContext from '../../../components/ThemeContext'
import {colors} from '../../../../assets/styles/themes'


const WorkoutsCard = ( { navigation }) => {

    const date = new Date()
    const workoutcategory = 'Functional Fitness'
    const [workout, setWorkout] = useState(undefined);

    const theme = useContext(ThemeContext)
    const darkMode = theme.state.darkMode;

    let activeColors = ''

    if (darkMode) {
      activeColors = colors['dark'];
    } else {
      activeColors = colors['light'];
    }


    useEffect(() => {

      const sub = DataStore.observeQuery(Workouts).subscribe(({ items }) => {


        setWorkout(items[0]);
        
      });

      return () => {
        sub.unsubscribe();
      };
      
      

     }, []);
  

  return(
    <View style={{padding: 5, flexDirection: 'row', justifyContent: 'space-evenly', flexWrap: 'wrap', backgroundColor: activeColors.primary_bg}}>
      <View style={{height: 250, width: '100%', borderBottomWidth: 1, borderColor: '#c9c9c9', padding: 5, paddingHorizontal: 0, marginTop: 20}}>
        <View style={{ marginBottom: 10, borderBottomColor: '#c9c9c9', borderBottomWidth: 1 }}>
          <Text style={{fontSize: 25, fontWeight: '500', color: '#E1AB09', marginLeft: 5}}>Workout of the Day</Text>
        </View>
        
          <ScrollView nestedScrollEnabled = {true}>
          {workout ? (
            <>
              <Text style={{color: '#969696', marginBottom: 5}}>{workout.type}</Text>
              <Text style={{color: '#969696', marginBottom: 5}}>{workout.date}</Text>
              <Text style={{color: '#969696', lineHeight: 25, marginBottom: 50}}>{workout.desc}</Text>
            </>
            ) : (
              <Text style={{color: '#969696', marginBottom: 5}}>Today's workout hasn't been added yet</Text>
            )}
            
          </ScrollView>
      </View>
      <Pressable 
        onPress={() => navigation.navigate('WorkoutDetails', {value: 'Functional Fitness'})}
        style={{width: '100%', borderColor: '#c9c9c9' , borderBottomWidth: 1,  justifyContent: 'flex-end', color: '#363636', alignItems: 'flex-start', padding: 5, marginTop: 25}}>
        <Text style={{fontSize: 25, fontWeight: '500', color: activeColors.primary_text}}>Functional Fitness</Text>
      </Pressable>
      <Pressable 
        onPress={() => navigation.navigate('WorkoutDetails', {value: 'Military Prep'})}
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

        <View style={[styles.container, {backgroundColor: activeColors.primary_bg}]}>
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
    marginTop: statusBarHeight,
    //backgroundColor: 'white',
    //alignItems: 'center',
    //paddingTop: 40
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
  }
  
  
  
});
