import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput, Pressable } from 'react-native';
import Constants from 'expo-constants'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Bubble_Button, Bubble_Button_Small, Button_Link } from '../../../components/ui/buttons'
import {useRoute} from '@react-navigation/native';
import {useForm} from 'react-hook-form';

import { Auth, DataStore } from 'aws-amplify';
import { User } from '../../../models';


//Themes
import ThemeContext from '../../../components/ThemeContext'
import {colors} from '../../../../assets/styles/themes'



export default function ProfileEditScreen( { navigation } ) {
  const route = useRoute();
  const {control, handleSubmit, formState: {errors}} = useForm();

  //Theme
  const theme = useContext(ThemeContext)
  const darkMode = theme.state.darkMode;


  let activeColors = ''

  if (darkMode) {
    activeColors = colors['dark'];
  } else {
    activeColors = colors['light'];
  }
    

  //Settings State Variables
  const [showMetric, setShowMetric] = useState(true);
  const [showImperial, setShowImperial] = useState(false);
  const [showLight, setShowLight] = useState(true);
  const [showDark, setShowDark] = useState(false);

  //Data
  const[user, setUser] = useState(null);
  //const[user, setUser] = useState(theme.state.userid);

  const[navvalue, setNavValue] = useState('');
  const[usersub, setUserSub] = useState(undefined);

  const navtitle = route?.params?.title


  useEffect(() => {

    const getCurrentuser = async () => {
        //Get current auth user
        const curr_user = await Auth.currentAuthenticatedUser();

        console.log(curr_user.attributes.sub)

        const dbUsers = await DataStore.query(User, c => c.sub.eq(curr_user.attributes.sub));

        //const dbUsers = await DataStore.query(
         // User,
          //u => u.sub === curr_user.attributes.sub,
        //);

        if (dbUsers.length < 0){
          return;
        }

        const dbUser = dbUsers[0];
        setUser(dbUser);

        if (navtitle === 'Name') {

          setNavValue(dbUser.name)
    
        } else if (navtitle === 'settings') {
    
          setNavValue(dbUser.country)

          if (dbUser.units === 'KG') {
            setShowMetric(true)
            setShowImperial(false)
          } else {
            setShowMetric(false)
            setShowImperial(true)
          }

          if (dbUser.theme === 'DARK') {
            setShowLight(false)
            setShowDark(true)
          } else {
            setShowLight(true)
            setShowDark(false)
          }
    
        }
    }

    getCurrentuser();

  }, []);

  /*
  useEffect(() => {

    const loaduserinfo = async () => {

        console.log('here we are' + user.name)

        if (navtitle === 'Name') {

          setNavValue(user.name)
    
        } else if (navtitle === 'settings') {
    
          setNavValue(user.country)

          if (user.units === 'KG') {
            setShowMetric(true)
            setShowImperial(false)
          } else {
            setShowMetric(false)
            setShowImperial(true)
          }

          if (user.theme === 'DARK') {
            setShowLight(false)
            setShowDark(true)
          } else {
            setShowLight(true)
            setShowDark(false)
          }
    
        }
    }

    loaduserinfo();

  }, []);
  */

  const goBackPress = async () => {
    navigation.navigate('ProfileScreen')
    //console.log('Go to Profile Screen')
  }

  const isValid = () => {
    if (navtitle === 'Name') {
      return navvalue;
    } else {
      return true;
    }
    
  }

  const onSavePress = async () => {

  
    if (!isValid()) {
      console.log('Not Valid')
      return;
    }

    if (user) {
      if (navtitle === 'Name') {

        //console.log(navvalue)

       const updatedUser = User.copyOf(user, updated => {
          updated.name = navvalue;
       })

       DataStore.save(updatedUser)

       //Update context Variable
       //theme.dispatch({ userid: updatedUser });
  
      } else if (navtitle === 'settings') {

        let temp_units = 'LBS'
        let temp_theme = 'LIGHT'

        if (showMetric) {
          temp_units = 'KG'
        } 

        if (showDark) {
          temp_theme = 'DARK'
        } 

        //Set theme context
        if (temp_theme == "DARK")
          theme.dispatch({ type: "DARKMODE" });
        else
          theme.dispatch({ type: "LIGHTMODE" });
  
        const updatedUser = User.copyOf(user, updated => {
          updated.units = temp_units;
          updated.theme = temp_theme;
       })
  
        DataStore.save(updatedUser)

        //Update context Variable
        theme.dispatch({ userid: updatedUser });
      }

     
    }
  
    navigation.navigate('ProfileScreen')
    //console.log('Saved')
  }

  const onMetricPress = async () => {
    console.log('Daily button pressed')
    setShowMetric(true)
    setShowImperial(false)
  };
  const onImperialPress = async () => {
    console.log('Imperial button pressed')
    setShowMetric(false)
    setShowImperial(true)
  };

  const onLightPress = async () => {
    console.log('Light button pressed')
    setShowLight(true)
    setShowDark(false)
  };

  const onDarkPress = async () => {
    console.log('Dark button pressed')
    setShowLight(false)
    setShowDark(true)
  };


  return(
    <View style={[styles.container, {backgroundColor: activeColors.primary_bg}]}>
      <View style={styles.header}>
        <Pressable onPress={goBackPress}>
          <Ionicons name='arrow-back-outline' style={{fontSize: 30, color: activeColors.primary_text}}/>
        </Pressable>
      </View>

      {navtitle != 'settings' ? (
      <View style={styles.bodyContainer}>
        {/*
          <BubbleTextInput
            name='editValue'
            placeholder={navtitle}
            control={control} 
            value={navvalue}
            vstyle={{borderWidth: 1,borderColor: '#BFBFBF', color:'#363636', paddingTop: 10, paddingBottom: 10}}
          />
        */}
        <TextInput
          name='editValue'
          placeholder={navtitle}
          control={control} 
          value={navvalue}
          onChangeText={setNavValue}
          style={{width: '100%', textAlign: 'center', marginBottom: 20, borderBottomWidth: 1, borderBottomColor: activeColors.primary_text, color: activeColors.primary_text}}
          placeholderTextColor={activeColors.primary_text}
          //onChangeText={onChangeNumber}
        />
        <Bubble_Button 
          text='SAVE'
          onPress={handleSubmit(onSavePress)}
          bgColor='#F8BE13'
          fgColor='#363636'
        />
      </View>
      ) : (
      <View style={styles.bodyContainer}>
          <Text style={{fontSize: 20, fontWeight: '500', marginBottom: 20, color: activeColors.primary_text}}>Settings</Text>
          
          <View style={{marginBottom: 30}}>

            <View style={styles.catcontainer}>
              <Text style={{marginBottom: 10, fontSize: 15, fontWeight: '300', color: activeColors.primary_text}}>Please Select Default Units</Text>
              <View style={styles.catcontainerbuttons}>
                  <Bubble_Button_Small 
                    onPress={onMetricPress}
                    text='Metric'
                    bgColor= {showMetric ? activeColors.button_active : activeColors.button_inactive }
                    fgColor= {showMetric ? activeColors.accent_text : activeColors.button_inactive_text }
                    cstyle={{paddingTop: 20, paddingBottom: 20}}
                  />
                  <Bubble_Button_Small 
                    onPress={onImperialPress}
                    text='Imperial'
                    bgColor= {showImperial ? activeColors.button_active : activeColors.button_inactive }
                    fgColor= {showImperial ? activeColors.accent_text : activeColors.button_inactive_text }
                    cstyle={{paddingTop: 20, paddingBottom: 20}}
                  />
              </View>
            </View>

            <View style={styles.catcontainer}>
              <Text style={{marginBottom: 10, fontSize: 15, fontWeight: '300', color: activeColors.primary_text}}>Please Select Default Theme</Text>
              <View style={styles.catcontainerbuttons}>
                  <Bubble_Button_Small 
                    onPress={onLightPress}
                    text='Light'
                    bgColor= {showLight ? activeColors.button_active : activeColors.button_inactive }
                    fgColor= {showLight ? activeColors.accent_text : activeColors.button_inactive_text }
                    cstyle={{paddingTop: 20, paddingBottom: 20}}
                  />
                  <Bubble_Button_Small 
                    onPress={onDarkPress}
                    text='Dark'
                    bgColor= {showDark ? activeColors.button_active : activeColors.button_inactive }
                    fgColor= {showDark ? activeColors.accent_text : activeColors.button_inactive_text }
                    cstyle={{paddingTop: 20, paddingBottom: 20}}
                  />
              </View>
            </View>


          </View>
          
          <Bubble_Button 
            text='SAVE'
            onPress={handleSubmit(onSavePress)}
            bgColor='#F8BE13'
            fgColor='#363636'
          />
      </View>

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
    backgroundColor: 'white',
  },  
  bodyContainer: {
   alignItems: 'center',
   padding: 10,
   marginTop: 20,
  },  
  header: {
    flexDirection: 'row',
    padding: 10,
    //backgroundColor: 'blue'
    borderBottomColor: '#DCDCDC',
    borderBottomWidth: 1
  },

  catcontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#CCCCCC',
    padding: 10
  },
  catcontainerbuttons: {
    width: '90%',
    flexDirection: 'row',
  },
 
  

});
