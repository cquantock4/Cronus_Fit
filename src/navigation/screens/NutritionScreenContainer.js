import React, { useState, useEffect } from 'react';
import {StyleSheet} from 'react-native';

import NutritionArticleDetails from './nutrition/NutritionArticleDetails'
import NutritionDetails from './nutrition/NutritionDetails'
import NutritionScreen from './nutrition/NutritionScreen'

import Constants from 'expo-constants'

import { createNativeStackNavigator } from '@react-navigation/native-stack';



const Stack = createNativeStackNavigator();


export default function NutritionScreenContainer({navigation}) {


    return(
      <Stack.Navigator>
        <Stack.Screen name="NutritionScreen" component={NutritionScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="NutritionArticleDetails" component={NutritionArticleDetails} options={{ headerShown: false }}/>
        <Stack.Screen name="NutritionDetails" component={NutritionDetails} options={{ headerShown: false }}/>
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
