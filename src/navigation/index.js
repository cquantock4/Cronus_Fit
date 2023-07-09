import React, {useEffect, useState, useContext, useRef} from 'react';
import {View, ActivityIndicator, Image, StyleSheet, Dimensions, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

//Bottom Tab Navigator Items
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';


//Login Screens
import LoginScreen from "./screens/login/LoginScreen";
import CreateAccountScreen from "./screens/login/CreateAccountScreen";
import ConfirmEmailScreen from "./screens/login/ConfirmEmailScreen";
import ForgotPasswordScreen from "./screens/login/ForgotPasswordScreen";
import NewPasswordScreen from "./screens/login/NewPasswordScreen";

//Screen Containers
import LeaderboardScreenContainer from './screens/LeaderboardScreenContainer'
import ProfileScreenContainer from './screens/ProfileScreenContainer'
import WorkoutScreenContainer from './screens/WorkoutScreenContainer'
import NutritionScreenContainer from './screens/NutritionScreenContainer'

//Home Screens
import HomeScreen from './screens/HomeScreen'

//Themes
import ThemeContext from "../components/ThemeContext"
import {colors} from "../../assets/styles/themes"

//Amplify Imports
import {Auth, Hub, DataStore} from 'aws-amplify';
import { User } from "../models"

// Nav
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

  const darkMode = theme.state.darkMode;

  let activeColors = ''

  if (darkMode) {
    activeColors = colors['dark'];
  } else {
    activeColors = colors['light'];
  }

  

  function HomeScreenNav(props) {

    const username = props.username;
  
    //console.log('inside the home screen nav: ' + JSON.stringify(user))
  
    
  
    //const header_label = <Text style={{color: '#252a2e', fontWeight: 'bold', textTransform: 'uppercase'}}>Cronus<Text style={{color: '#fcbd10'}}> Fit</Text></Text>
  
    const header_label = <Image style={styles.image} source={require('../../assets/images/CronusFit_Logo_Transparent.png')} />
  
    return(
  
      
        <Tab.Navigator
            independent={true}
            screenOptions={({route}) => ({
                title:'', //Removes all icon titles
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    let ret_icon;
                    let rn = route.name;
  
                    if (rn === homeName){
                      iconName = focused ? 'home' : 'home-outline'
                      return <Ionicons name={iconName} size={size} color={color}/>
                    } else if (rn === fitnessName) {
                      iconName = focused ? 'barbell' : 'barbell-outline'
                      return <Ionicons name={iconName} size={size} color={color}/>
                    } else if (rn === profileName) {
                      iconName = focused ? 'person' : 'person-outline'
                      return <Ionicons name={iconName} size={size} color={color}/>
                    } else if (rn === nutritionScreen) {
                      iconName = focused ? 'pulse' : 'pulse-outline'
                      return <Ionicons name={iconName} size={size} color={color}/>
                    } else if (rn === leaderboardName) {
  
                      if (activeColors.tab_bar_inactive === '#fff'){
                        ret_icon = focused ? <Image style={styles.leaderboard_icon} source={require('../../assets/images/leaderboard-outline_active.png')} /> : <Image style={{height:30, width:30}} source={require('../../assets/images/leaderboard-outline-white.png')} />
                      } else {
                        ret_icon = focused ? <Image style={styles.leaderboard_icon} source={require('../../assets/images/leaderboard-outline_active.png')} /> : <Image style={{height:30, width:30}} source={require('../../assets/images/leaderboard-outline.png')} />
                      }
                      
                      
                      
                      return ret_icon
                    } 
  
                    
                },
                "tabBarActiveTintColor": "#F8BE13",
                "tabBarInactiveTintColor": activeColors.tab_bar_inactive,
                "tabBarLabelStyle": {
                    //"paddingBottom": 10,
                    //"fontSize": 20
                },
                "tabBarHideOnKeyboard": Platform.OS === 'android' ? true : false,
                "tabBarStyle": {
                  "paddingTop": 10,
                  "backgroundColor": activeColors.primary_bg,
                  "flexDirection": "column-reverse"
                },

                
                
                headerShown: true,
                //headerLeft: false
                headerTitle: () => header_label,
                headerLeft: ()=> null
            })}>
  
            {/*
              <Tab.Screen name={homeName}
                  options={{ headerShown: false }}>
                  {(props2) => <HomeScreen {...props2} username={username} />}
              </Tab.Screen>
            */}    
  
            <Tab.Screen name={homeName} component={HomeScreen} options={{ headerShown: false }}/>
            <Tab.Screen name={leaderboardName} component={LeaderboardScreenContainer} options={{ headerShown: false }}/> 
            <Tab.Screen name={fitnessName} component={WorkoutScreenContainer} options={{ headerShown: false }}/>
            <Tab.Screen name={nutritionScreen} component={NutritionScreenContainer} options={{ headerShown: false }}/>
            <Tab.Screen name={profileName} component={ProfileScreenContainer} options={{ headerShown: false }}/> 
         
            
        </Tab.Navigator>
      
    )
  }

  const checkUser = async () => {
    try {

      //console.log('item1: ' + JSON.stringify(user))

      const authUser = await Auth.currentAuthenticatedUser({bypassCache: true});
      //console.log('THIS: ' + JSON.stringify(authUser))
      setUser(authUser);
      setUsername(authUser.username)

      //console.log(authUser.username)

      //Query User table for theme
      //const results = await DataStore.query(User, u => u.sub("eq", authUser.attributes.sub));
      const results = await DataStore.query(User, (u) => u.sub.eq(authUser.attributes.sub));

      //console.log(authUser.attributes.sub)


      if (results.length > 0){
        theme_result = results[0].theme
        theme.dispatch({ userid: results[0] });
      }

      //console.log('theme result: ' + theme_result)

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
  

  useEffect(() => {

    const listener = data => {
      if (data.payload.event === 'signIn' || data.payload.event === 'signOut') {

        if (data.payload.event === 'signOut'){
           //DataStore.clear();
        }

        //if (data.payload.event === 'signIn'){
          //DataStore.start();
        //}
      
        checkUser();

      }
    };

    Hub.listen('auth', listener);

    return () => Hub.listen('auth', listener);

  }, []);  


  //const header_label = <Text style={{color: '#252a2e', fontWeight: 'bold', textTransform: 'uppercase'}}>Cronus<Text style={{color: '#fcbd10'}}> Fit</Text></Text>
  const header_label = <Image style={styles.image} source={require('../../assets/images/CronusFit_Logo_Transparent.png')} />

  return (
    
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerTitle: () => header_label}}>
          {user ? (
            
              <Stack.Screen name="HomeScreenNav" options={{ headerShown: false }}>
                {(props) => <HomeScreenNav {...props} username={username}/>}
              </Stack.Screen>
            
          ) : (
            <>
              <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }}/>
              <Stack.Screen name="CreateAccountScreen" component={CreateAccountScreen} />
              <Stack.Screen name="ConfirmEmailScreen" component={ConfirmEmailScreen} />
              <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
              <Stack.Screen name="NewPasswordScreen" component={NewPasswordScreen} />
            </>
          )}
        </Stack.Navigator>

        
      </NavigationContainer>

  );

 
};


const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 20,
  },
  leaderboard_icon: {
    height: 30,
    width:30
  }
});


export default Navigation;


