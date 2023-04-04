import React from 'react';
import { StyleSheet} from 'react-native';
import Constants from 'expo-constants'


import ProfileScreen from '../screens/profile/ProfileScreen'
import ProfileEditScreen from '../screens/profile/ProfileEditScreen'

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();


export default function ProfileScreenContainer() {


    return(
      <Stack.Navigator>
              <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }}/>
              <Stack.Screen name="ProfileEditScreen" component={ProfileEditScreen} options={{ headerShown: false }}  />
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
