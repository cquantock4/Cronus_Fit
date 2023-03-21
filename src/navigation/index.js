import React, {useEffect, useState, useContext} from 'react';
import {View, ActivityIndicator, Image, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Bottom Tab Navigator Items
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';


//Login Screens
import LoginScreen from "./screens/login/LoginScreen";

//Themes
import ThemeContext from "../components/ThemeContext"

//Amplify Imports
import {Auth, Hub, DataStore} from 'aws-amplify';
import { User } from "../models";


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

//Nav Pages
const homeName = 'Home'
const fitnessName = 'Fitness'
const profileName = 'Profile'
const nutritionScreen = 'Nutrition'
const leaderboardName = 'LeaderBoard'


const Navigation = () => {
  const [user, setUser] = useState(undefined);
  const [username, setUsername] = useState(undefined);
  //Theme
  const theme = useContext(ThemeContext)
  //const darkMode = theme.state.darkMode;

  let theme_result = 'LIGHT'

  const checkUser = async () => {
    try {

      const authUser = await Auth.currentAuthenticatedUser({bypassCache: true});
      setUser(authUser);
      setUsername(authUser.username)
      console.log('testing')

      //Query User table for theme
      const results = await DataStore.query(User, u => u.sub("eq", authUser.attributes.sub));


      if (results.length > 0){
        theme_result = results[0].theme
        theme.dispatch({ userid: results[0] });
      }

      //console.log(theme_result)

      if (theme_result == "DARK")
        theme.dispatch({ type: "DARKMODE" });
      else
        theme.dispatch({ type: "LIGHTMODE" });

    } catch (e) {
      setUser(null);
    }

  };

  useEffect(() => {
    checkUser();
    
  }, []);


  //const header_label = <Text style={{color: '#252a2e', fontWeight: 'bold', textTransform: 'uppercase'}}>Cronus<Text style={{color: '#fcbd10'}}> Fit</Text></Text>
  const header_label = <Image style={styles.image} source={require('../../assets/images/CronusFit_Logo_Transparent.png')} />

  return (

      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerTitle: () => header_label}}>
          {user ? (
              <>
              </>
          ) : (
            <>
              <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }}/>
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
  );

 
};


const styles = StyleSheet.create({
  image: {
    width:100,
    height: 20,
  },
  leaderboard_icon: {
    height: 30,
    width:30
  }
});


export default Navigation;


