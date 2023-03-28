import React, { useState, useEffect } from 'react';
import { FlatList, Modal, Pressable, StyleSheet } from 'react-native';

import LeaderboardScreen from './leaderboard/LeaderboardScreen'
import LeaderboardDetails from './leaderboard/LeaderboardDetails'


import Constants from 'expo-constants'

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();


export default function LeaderboardScreenContainer({navigation}) {


    return(
      <Stack.Navigator>
        <Stack.Screen name="LeaderboardScreen" component={LeaderboardScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="LeaderboardDetails" component={LeaderboardDetails} options={{ headerShown: false }}/>
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
