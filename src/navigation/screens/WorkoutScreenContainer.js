import React, { useState, useEffect } from 'react';
import {
  StyleSheet
} from 'react-native';

import FitnessScreen from '../screens/workouts/FitnessScreen'
import WorkoutDetails from '../screens/workouts/WorkoutDetails'
import ProgrammingScreen from '../screens/workouts/ProgrammingScreen'

import Constants from 'expo-constants'

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();


export default function ProfileScreenContainer({navigation}) {


    return(
      <Stack.Navigator>
        <Stack.Screen name="FitnessScreen" component={FitnessScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="WorkoutDetails" component={WorkoutDetails} options={{ headerShown: false }}/>
        <Stack.Screen name="ProgrammingScreen" component={ProgrammingScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
                
    );
}

const statusBarHeight = Constants.statusBarHeight

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    flexDirection: 'column',
    marginTop: statusBarHeight,
    backgroundColor: 'white'
  },  

});
