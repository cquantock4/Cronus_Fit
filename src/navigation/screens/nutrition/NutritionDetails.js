import React, { useState, useEffect, useContext, useRef } from 'react';
import { StyleSheet, Text, View, Alert, ScrollView, RefreshControl, FlatList, Button, TouchableOpacity} from 'react-native';
import { TextInput, Pressable, Modal, Dimensions,ActivityIndicator, KeyboardAvoidingView,SafeAreaView, Linking} from 'react-native';

import axios from 'axios';
import Constants from 'expo-constants'
import oauthSignature from 'oauth-signature';
import CryptoJS from 'crypto-js';
import OAuth from 'oauth-1.0a';


import Ionicons from 'react-native-vector-icons/Ionicons';
import { Bubble_Button} from '../../../components/ui/buttons'

import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import {useRoute} from '@react-navigation/native';

import ModalSelector from 'react-native-modal-selector'

import { Auth, DataStore, Storage } from 'aws-amplify';
import { Articles, User, UserInfo, Messages, Checkin, FoodEntry} from '../../../models';

//import Header from '../../../ui/components/headers/header'
//import moment from 'moment';
import { parseISO,  format } from 'date-fns';

import Slider from '@react-native-community/slider';

import FoodItem from '../../../components/ui/inputs/fooditem';
import FoodInputField from '../../../components/ui/inputs/foodinputfield';

//Themes
import ThemeContext from '../../../components/ThemeContext'
import {colors} from '../../../../assets/styles/themes'
import { ar } from 'date-fns/locale';


const window = Dimensions.get("window");
const screen = Dimensions.get("screen");


const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function NutritionDetails( {navigation} ) {
  const route = useRoute();
  //const {control, handleSubmit, formState: {errors}} = useForm();
  const tabBarHeight = useBottomTabBarHeight();
  const [user, setUser] = useState(route?.params?.user_id);
  const [userinfo, setUserInfo] = useState(null)
  const [users, setUsers] = useState(undefined);
  const [headertitle, setHeaderTitle] = useState('Nutrition');

  const [dimensions, setDimensions] = useState({ window, screen });

  //Modal
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleQuestionSave, setModalVisibleQuestionSave] = useState(false);

  //Questionnaire
  const [calsmacros, setCalsMacros] = useState('Yes - I have a lot of experience');
  const [experience, setExperience] = useState('Yes - 2+ years of experience');
  const [medical, setMedical] = useState('No');
  const [qualifiedyn, setQualifiedYN] = useState(false);
  const [firstload, setFirstLoad] = useState(false);

  

  //Main Nutrition page navigation
  const [addfood, setAddFood] = useState(false)
  const [weeklycheckin, setWeeklyCheckin] = useState(false)
  const [messagecoach, setMessageCoach] = useState(false)
  const [currentTitle, setCurrentTitle] = useState('')
  const [nutritionNav, setNutritionNav] = useState(route?.params?.value);

  const [showquestionaire, setShowQuestionaire] = useState(false);
  const [showeditwindow, setShowEditWindow] = useState(false);

  const [articles, setArticles] = useState(undefined);
  const [showarticles, setShowArticles] = useState(false);
  const [pdfFiles, setPDFFiles] = useState([]);

  //Food
  const [viewentryscreen, setViewEntryScreen] = useState(false)
  const [foodentries, setFoodEntries] = useState(false)
  //Breakfast
  const [viewbreakfast, setViewBreakfast] = useState(false)
  const [breakfastlist, setBreakfastList] = useState([]);
  //Lunch
  const [viewlunch, setViewLunch] = useState(false)
  const [lunchlist, setLunchList] = useState([]);
  //Dinner
  const [viewdinner, setViewDinner] = useState(false)
  const [dinnerlist, setDinnerList] = useState([]);
  //Snacks
  const [viewsnacks, setViewSnacks] = useState(false)
  const [snackslist, setSnacksList] = useState([]);

  

  //Search Filtering
  const [showSearch, setShowSearch] = useState(true);
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  //User to Coach Messaging
  const [messages, setMessages] = useState(undefined);

  //Theme
  const theme = useContext(ThemeContext)
  const darkMode = theme.state.darkMode;

  let activeColors = ''

  if (darkMode) {
    activeColors = colors['dark'];
  } else {
    activeColors = colors['light'];
  }



  //Refresh
  const [refreshing, setRefreshing] = useState(false);
  const [commentrefresh, setCommentRefresh] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));


  }, []);
  
  const [date, setNewDate] = useState(new Date());


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {

      if (nutritionNav === 'newcoaching'){
        setShowQuestionaire(true)
      } else if (nutritionNav === 'checkin'){
        setWeeklyCheckin(true)
        if (!weeklycheckin){
          setCurrentTitle('Weekly Check-in')
        } else {
          setCurrentTitle('')
        }
      } else if (nutritionNav === 'addfood'){
        setAddFood(true)
        if (!addfood){
          setCurrentTitle('Add Food')
        } else {
          setCurrentTitle('')
        }
      } else if (nutritionNav === 'messages'){
        setMessageCoach(!messagecoach)
        if (!messagecoach){
          setCurrentTitle('Message Coach')
        } else {
          setCurrentTitle('')
        }
      } else if (nutritionNav === 'myinfo'){
        setShowEditWindow(true)
      } else if (nutritionNav === 'articles'){
        setShowArticles(true)
      }

    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);


  useEffect(() => {
    const articlesub = DataStore.observeQuery(Articles).subscribe(() => loadData());
    
    return () => {
      articlesub.unsubscribe();
    };
  }, [navigation]);

  async function loadData() {
    const articles = await DataStore.query(Articles);

    console.log('here we are: ' + JSON.stringify(articles))
    setArticles(articles);
    const storagePaths = articles.map((item) => item.storage_path);
    listPDFFiles('nutritionpdfs', storagePaths);
  }

  async function listPDFFiles(folderPath, storagePaths) {
    try {
      const fileList = await Storage.list(folderPath, { level: 'public', pageSize: 10 });
      const pdfFiles = fileList.results.filter((file) => storagePaths.includes(file.key));
      setPDFFiles(pdfFiles);
      //console.log('PDF files:', pdfFiles);
    } catch (error) {
      console.error('Error listing PDF files:', error);
    }
  }
  
  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      "change",
      ({ window, screen }) => {
        setDimensions({ window, screen });
      }
    );

    return () => subscription?.remove();


  }, [Dimensions]);

   
  useEffect(() => {

    const getCurrentuser = async () => {
        //Get current auth user
        const curr_user = await Auth.currentAuthenticatedUser();
        //console.log(curr_user.attributes.sub)

        const dbUsers = await DataStore.query(User, c => c.sub.eq(curr_user.attributes.sub));

        if (dbUsers.length < 0){
          return;
        }

        const dbUser = dbUsers[0];
        setUser(dbUser);

        //console.log(dbUser.id)
        //Get Users
        const userResults = (await DataStore.query(User))

        //console.log(userResults)

        setUsers(userResults)

        //const userinfo_query = await DataStore.query(UserInfo, c => c.Users.User.id("eq", dbUser.id));
        //console.log(userinfo_query)
        
        const userinfo_results = (await DataStore.query(UserInfo)).filter(
          pe => pe.userInfoUserId === dbUser.id
        )   

        //console.log('this: '+ userinfo_results)

        const userinfo = userinfo_results[0]

        //Set Db Values
        //console.log('this: '+ userinfo)

        if (userinfo){
          

          setUserInfo(userinfo)
          //console.log(userinfo)
          
        }


        if (dbUser.coach_userid) {

          const coach_user_id = dbUser.coach_userid

          /*
          const messages = (await DataStore.query(Messages)).filter(
            pe => pe.sender_userid === dbUser.id || 
            (pe.receiver_userid === dbUser.id && pe.sender_userid === dbUser.coach_userid)
          )
           */

          const allMessages = await DataStore.query(Messages);

          // Filter messages based on user and coach criteria
          const messages = allMessages.filter(message =>
            (message.sender_userid === dbUser.id && message.receiver_userid === coach_user_id) ||
            (message.sender_userid === coach_user_id && message.receiver_userid === dbUser.id)
          );

      
          //Sort the list
          messages.sort((a, b) => (a.createdAt > b.createdAt) ? 1 : -1)
          
      
          setMessages(messages)

        }


        
    }

    getCurrentuser();

  }, [commentrefresh]);


  useEffect(() => {

    getFoodEntries();

  }, [date]);


  
  /*
  useEffect(() => {


    const subs = DataStore.observeQuery(Messages).subscribe(() => getMessages());

    return () => {
      subs.unsubscribe();
    };


  }, [refreshing, commentrefresh]);


  async function getMessages(){

     //Get Messages
     const messages = (await DataStore.query(Messages)).filter(
      pe => pe.sender_userid === user.id || pe.receiver_userid === user.id
    )


    //Sort the list
    messages.sort((a, b) => (a.createdAt > b.createdAt) ? 1 : -1)
    
    console.log('Messages: ' + JSON.stringify(messages))

    setMessages(messages)

  }
  */

 

  const getFoodEntries = async () => {

    //Get current auth user
    const curr_user = await Auth.currentAuthenticatedUser();
    //console.log(curr_user.attributes.sub)

    setBreakfastList([])
    setLunchList([])
    setDinnerList([])
    setSnacksList([])

    

    if (user) {
      //const foodentries = await DataStore.query(Foodentry, c => c.userID("eq", user.id));

      //console.log(user.id)
      //console.log(format(new Date(date), 'MM/dd/yyyy').toString())

      const foodentries = (await DataStore.query(FoodEntry)).filter(
        pe => pe.userID === user.id && pe.date === format(new Date(date), 'MM/dd/yyyy').toString()
      )


      setFoodEntries(foodentries)

      //console.log('here are the entries: ' + JSON.stringify(foodentries))

      const result_breakfast = foodentries.filter((value, index) => value.category === 'BREAKFAST')
      const result_lunch = foodentries.filter((value, index) => value.category === 'LUNCH')
      const result_dinner = foodentries.filter((value, index) => value.category === 'DINNER')
      const result_snacks = foodentries.filter((value, index) => value.category === 'SNACKS')

      result_breakfast.map((item, index) => {
        
        //console.log(item.desc)

        setBreakfastList(breakfastlist => ([...breakfastlist, {
          id: item.id,
          desc: item.desc,
          protein: item.protein,
          carbs: item.carbs,
          fat: item.fat,
          fiber: item.fiber,
          calories: item.calories
        }]));

      })  


      result_lunch.map((item, index) => {
        
        //console.log(item.desc)

        setLunchList(lunchlist => ([...lunchlist, {
          id: item.id,
          desc: item.desc,
          protein: item.protein,
          carbs: item.carbs,
          fat: item.fat,
          fiber: item.fiber,
          calories: item.calories
        }]));

      })  

      result_dinner.map((item, index) => {
        
        //console.log(item.desc)

        setDinnerList(dinnerlist => ([...dinnerlist, {
          id: item.id,
          desc: item.desc,
          protein: item.protein,
          carbs: item.carbs,
          fat: item.fat,
          fiber: item.fiber,
          calories: item.calories
        }]));

      })  

      result_snacks.map((item, index) => {
        
        //console.log(item.desc)

        setSnacksList(snacklist => ([...snacklist, {
          id: item.id,
          desc: item.desc,
          protein: item.protein,
          carbs: item.carbs,
          fat: item.fat,
          fiber: item.fiber,
          calories: item.calories
        }]));

      })  

    }


}
/*
  const QuestionaireAlertModal = () => {

    const onDismissPress = () => {
      setModalVisible(!modalVisible);
      goBackPress();
    };

    return(
      <Modal
          animationType="fade" //slide or none
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={[styles.alertModel, {backgroundColor: activeColors.primary_bg, borderColor: activeColors.primary_text, borderWidth: 1}]}>
              { qualifiedyn ? (
                <>
              <Text style={[styles.alertModalText, {color: activeColors.primary_text}]}>
                Congrats! You Qualify
              </Text>
              
              <Bubble_Button 
                text="Let''s Get Started"
                onPress={() => setModalVisible(!modalVisible)}
                bgColor='#F8BE13'
                fgColor='#363636'
              />
              </>
              ) : (
                <>
                  <Text style={[styles.alertModalText, {color: activeColors.primary_text}]}>
                    Unfortunately you do not qualify for our nutrition Program
                  </Text>
                  <Bubble_Button 
                  text="Back to Nutrition Home"
                  onPress={onDismissPress}
                  bgColor='#F8BE13'
                  fgColor='#363636'
                  />
                </>
              )}
              
            </View>
          </View>
        </Modal>
    );
  
  }
*/


  const onSaveQuestionnairePress = async ( { navigation } ) => {
    //navigation.navigate('NutritionScreen')


    if ((calsmacros === 'Yes - I have a lot of experience' || calsmacros === 'Yes - 2+ years of experience') &&
      (medical === 'No')){
        setQualifiedYN(true)
        //console.log('Qualified')
        //Change Screens
        setShowQuestionaire(false)
        setShowEditWindow(true)
        setFirstLoad(true)

        //Pop up Alert
        setModalVisible(!modalVisible)

        //Save
        if (user) {
    
           const updatedUser = User.copyOf(user, updated => {
              updated.q_calsmacros = calsmacros;
              updated.q_experience = experience;
              updated.q_medical = medical;
              updated.nutrition_coaching = true;
           })
    
           DataStore.save(updatedUser)

           //console.log('userid: ' + user.id)

           /*
           //Create User Info Record
           const user_info = await DataStore.save(
                new UserInfo({
                    "Users": user
                })
            );
            */

        /*
            i_gender: i_gender,
              i_goals: goal,
              i_height: height,
              i_height_units: '',
              i_hip: hip,
              i_hip_units: '',
              i_lifestyleactivity: lifestyle,
              i_neck: neck,
              i_neck_units: 'sd',
              i_trainingactivity: exercise,
              i_waist: waist,
              i_waist_units: '',
              i_weight: weight,
              i_weight_units: '',
              i_body_fat_pct: bodyfatpct,
        
              */


        //console.log(user_info)
        //setUserInfo(user_info)


        }

      } else {
        setQualifiedYN(false)
        //console.log('Not Qualified')
        setModalVisible(!modalVisible)

         //Save
         if (user) {
    
          const updatedUser = User.copyOf(user, updated => {
             updated.q_calsmacros = calsmacros;
             updated.q_experience = experience;
             updated.q_medical = medical;
             updated.nutrition_coaching = false;
          })
   
          DataStore.save(updatedUser)
        
       }
        
      }
    
  }

  const onAcceptWaiver = async ( { navigation } ) => {
    //navigation.navigate('NutritionScreen')

    setQualifiedYN(true)
    setShowQuestionaire(false)
    setShowEditWindow(true)
    setFirstLoad(true)

    try {
      if (user) {
    
        const updatedUser = User.copyOf(user, updated => {
           updated.q_calsmacros = calsmacros;
           updated.q_experience = experience;
           updated.q_medical = medical;
           updated.nutrition_coaching = true;
        })
 
        DataStore.save(updatedUser)
     }
    }catch (error) {
      console.log("Error saving data", error);
    }
    //setModalVisible(!modalVisible)

      /*
    if ((calsmacros === 'Yes - I have a lot of experience' || calsmacros === 'Yes - 2+ years of experience') &&
      (medical === 'No')){
        setQualifiedYN(true)
        //console.log('Qualified')
        //Change Screens
        setShowQuestionaire(false)
        setShowEditWindow(true)
        setFirstLoad(true)

        //Pop up Alert
        setModalVisible(!modalVisible)

        //Save
        if (user) {
    
           const updatedUser = User.copyOf(user, updated => {
              updated.q_calsmacros = calsmacros;
              updated.q_experience = experience;
              updated.q_medical = medical;
              updated.nutrition_coaching = true;
           })
    
           DataStore.save(updatedUser)

           //console.log('userid: ' + user.id)

           /*
           //Create User Info Record
           const user_info = await DataStore.save(
                new UserInfo({
                    "Users": user
                })
            );
            */

        /*
            i_gender: i_gender,
              i_goals: goal,
              i_height: height,
              i_height_units: '',
              i_hip: hip,
              i_hip_units: '',
              i_lifestyleactivity: lifestyle,
              i_neck: neck,
              i_neck_units: 'sd',
              i_trainingactivity: exercise,
              i_waist: waist,
              i_waist_units: '',
              i_weight: weight,
              i_weight_units: '',
              i_body_fat_pct: bodyfatpct,
        



        //console.log(user_info)
        //setUserInfo(user_info)


        }

      } else {
        setQualifiedYN(false)
        //console.log('Not Qualified')
        setModalVisible(!modalVisible)

         //Save
         if (user) {
    
          const updatedUser = User.copyOf(user, updated => {
             updated.q_calsmacros = calsmacros;
             updated.q_experience = experience;
             updated.q_medical = medical;
             updated.nutrition_coaching = false;
          })
   
          DataStore.save(updatedUser)
        
       }
        
      }
      */
    
  }

  const Questionaire = () => {

      /*
    //Data
    let calexpindex = 0
    const calexpdata = [
      { key: calexpindex++, label: 'Yes - I have a lot of experience', value:"yesexp"},
      { key: calexpindex++, label: 'Yes - I have some experience', value:"yessome"},
      { key: calexpindex++, label: "No - I''ve never tracked before in my life", value:"nonever"}
    ];

    let expindex = 0
    const expdata = [
      { key: expindex++, label: 'Yes - 2+ years of experience', value:"yestwoplus"},
      { key: expindex++, label: 'Yes - <2 years of experience', value:"yestwominus"},
      { key: expindex++, label: "No - I have never trained in my life", value:"nonever"}
    ];

    let medicalindex = 0
    const medicaldata = [
      { key: medicalindex++, label: 'Yes', value:"yes"},
      { key: medicalindex++, label: 'No', value:"no"}
    ];

    return (
    <>

    <View style={{padding: 20}}>
      <View style={{width:'100%', alignItems: 'center', marginBottom: 10}}>
        <Text style={{fontSize: 22, fontWeight: '500', textAlign: 'center', marginBottom: 10, color: activeColors.secondary_text}}>Questionaire</Text>
      </View>

            <View style={{width:'100%', alignItems: 'center', marginBottom: 10}}>
              <Text style={{fontSize: 16, fontWeight: '400', textAlign: 'center', marginBottom: 10, color: activeColors.secondary_text}}>Do you have experience accurately tracking calories/macronutrients?</Text>
              <ModalSelector
                data={calexpdata}
                initValue={calsmacros}
                style={{width: '100%', backgroundColor: '#363636', borderRadius: 5,marginBottom: 10}}
                //Selected Item text Style
                selectedItemTextStyle={{color: activeColors.accent_text}}
                //Picker Option Text Style
                optionTextStyle={{color: 'white'}}
                cancelTextStyle={{color: 'white'}}
                cancelStyle={{padding: 20, backgroundColor: '#363636' }}
                optionStyle={{padding: 20}}
                optionContainerStyle={{backgroundColor: '#363636'}}
                initValueTextStyle={{color: activeColors.accent_text, padding: 7}}
                onChange={(option)=>{ setCalsMacros(option.label) }} />  
            </View>

            <View style={{width:'100%', alignItems: 'center', marginBottom: 10}}>
              <Text style={{fontSize: 18, fontWeight: '400', textAlign: 'center', marginBottom: 10, color: activeColors.secondary_text}}>Are you an experienced trainee?</Text>
              <ModalSelector
                data={expdata}
                initValue={experience}
                style={{width: '100%', backgroundColor: '#363636', borderRadius: 5, marginBottom: 10}}
                //Selected Item text Style
                selectedItemTextStyle={{color: '#F8BE13'}}
                //Picker Option Text Style
                optionTextStyle={{color: 'white'}}
                cancelTextStyle={{color: 'white'}}
                cancelStyle={{padding: 20, backgroundColor: '#363636' }}
                optionStyle={{padding: 20}}
                optionContainerStyle={{backgroundColor: '#363636'}}
                initValueTextStyle={{color: '#F8BE13', padding: 7}}
                onChange={(option)=>{ setExperience(option.label) }} />  
            </View>

            <View style={{width:'100%', alignItems: 'center', marginBottom: 10}}>
              <Text style={{fontSize: 18, fontWeight: '400', textAlign: 'center', marginBottom: 10, color: activeColors.secondary_text}}>Do you have any medical conditions/diagnoses?</Text>
              <ModalSelector
                data={medicaldata}
                initValue={medical}
                style={{width: '100%', backgroundColor: '#363636', borderRadius: 5, marginBottom: 30}}
                //Selected Item text Style
                selectedItemTextStyle={{color: '#F8BE13'}}
                //Picker Option Text Style
                optionTextStyle={{color: 'white'}}
                cancelTextStyle={{color: 'white'}}
                cancelStyle={{padding: 20, backgroundColor: '#363636' }}
                optionStyle={{padding: 20}}
                optionContainerStyle={{backgroundColor: '#363636'}}
                initValueTextStyle={{color: '#F8BE13', padding: 7}}
                onChange={(option)=>{ setMedical(option.label) }} />  
            </View>


            <Bubble_Button 
              text='Submit'
              onPress={onSaveQuestionnairePress}
              cstyle={{width: '100%'}}
              bgColor='#F8BE13'
              fgColor='#363636'
            />

          </View>
        </>
    )
    */
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: 'red', marginBottom: 20, fontSize: 18}}>

            EXAMPLE: Liability Waiver placeholder 
          </Text>
          <Text style={{color: 'white', fontSize: 16, textAlign: 'center'}}>
          I understand that it is my responsibility to consult with a physician prior to and regarding my
participation in the above mentioned program. I represent and warrant that I have no medical condition
that would prevent my participation in the program. 
          </Text>
          <Bubble_Button 
              text='Accept'
              onPress={onAcceptWaiver}
              cstyle={{width: '100%', marginTop: 50}}
              bgColor='#F8BE13'
              fgColor='#363636'
            />
        </View>
      )
  }

  const EditWindow = () => {


    //EditScreen
    //Measurements
    const [i_gender, setGender] = useState('Male');
    const [goal, setGoal] = useState('Lose Fat');
    const [exercise, setExercise] = useState('Moderate Exercise');
    const [lifestyle, setLifestyle] = useState('Moderate Activity');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [neck, setNeck] = useState('');
    const [waist, setWaist] = useState('');
    const [hip, setHip] = useState('');
    const [bodyfatpct, setBodyFatPct] = useState('');

    const [showMale, setShowMale] = useState(undefined);
    const [showFemale, setShowFemale] = useState(false);
    const [heightftincm, setHeightFTINCM] = useState(false);
    const [weightlbskgs, setWeightLBSKGS] = useState(false);
    const [neckincm, setNeckincm] = useState(false);
    const [waistincm, setWaistincm] = useState(false);
    const [hipincm, setHipincm] = useState(false);

    useEffect(() => {

      if(userinfo) {
        if (userinfo.i_gender == 'Male') {
          //console.log('male')
          setShowMale(true)
          setShowFemale(false)
          setGender(userinfo.i_gender)
        } else if (userinfo.i_gender == 'Female') {
          setShowMale(false)
          setShowFemale(true)
          setGender(userinfo.i_gender)
        }
        
        setGoal(userinfo.i_goals)
        setHeight(userinfo.i_height)
        setWeight(userinfo.i_weight)
        setNeck(userinfo.i_neck)
        setWaist(userinfo.i_waist)
        setHip(userinfo.i_hip)
        setBodyFatPct(userinfo.i_body_fat_pct)
      }

      
    }, [])
      

    const onMalePress = async () => {
      //console.log('Male button pressed')
      setShowMale(true)
      setShowFemale(false)
      setGender('Male')
      
    };
    const onFemalePress = async () => {
      //console.log('Female button pressed')
      setShowMale(false)
      setShowFemale(true)
      setGender('Female')
    };

    const onheightftincmPress = async () => {
      //console.log('Male button pressed')
      setHeightFTINCM(!heightftincm)
    };

    const onWeightlbskgsPress = async () => {
      //console.log('Male button pressed')
      setWeightLBSKGS(!weightlbskgs)
    };

    const onNecklbskgsPress = async () => {
      //console.log('Male button pressed')
      setNeckincm(!neckincm)
    };

    const onWaistlbskgsPress = async () => {
      //console.log('Male button pressed')
      setWaistincm(!waistincm)
    };

    const onHiplbskgsPress = async () => {
      //console.log('Male button pressed')
      setHipincm(!hipincm)
    };

    const saveEditWindowPress = async () => {

      // Save this data to database

      console.log('here we are')


      if (userinfo) {
        //Update
        //('Update');

        console.log('here it is: ' + userinfo)

        //Update the row
        const updatedinfo = UserInfo.copyOf(userinfo, updated => {
          updated.i_gender = i_gender,
          updated.i_goals = goal,
          updated.i_trainingactivity = exercise,
          updated.i_lifestyleactivity = lifestyle,
          updated.i_height = height,
          updated.i_weight = weight,
          updated.i_neck = neck,
          updated.i_waist = waist,
          updated.i_hip = hip
          //updated.i_body_fat_pct = bodyfatpct
        })
        


        DataStore.save(updatedinfo)

        setModalVisibleQuestionSave(true)

      } else {
        //Insert

        console.log('insert')

        try {

          console.log(user)
          await DataStore.save(
            new UserInfo({
              User: user,
              type: '',
              i_gender: i_gender,
              i_goals: goal,
              i_height: height,
              //i_height_units: '',
              i_hip: hip,
              //i_hip_units: '',
              i_lifestyleactivity: lifestyle,
              i_neck: neck,
              //i_neck_units: 'sd',
              i_trainingactivity: exercise,
              i_waist: waist,
              //i_waist_units: '',
              i_weight: weight,
              //i_weight_units: ''
              //i_body_fat_pct: bodyfatpct,
            })
          );

          //console.log("Data Saved successfully!");
        } catch (error) {
          console.log("Error saving data", error);
        }

        // Trigger user table boolean so we know this is completed. 

        setModalVisibleQuestionSave(true)
      }
        

    }

    //Data
    let goalindex = 0
    const goaldata = [
      { key: goalindex++, label: 'Gain Muscle'},
      { key: goalindex++, label: 'Lose Fat'},
      { key: goalindex++, label: 'Maintain Body Weight'}
    ];

    let lifestyleindex = 0
    const lifestyledata = [
      { key: lifestyleindex++, label: 'Sedentary'},
      { key: lifestyleindex++, label: 'Light Activity'},
      { key: lifestyleindex++, label: 'Moderate Activity'},
      { key: lifestyleindex++, label: 'High Activity'},
      { key: lifestyleindex++, label: 'Extreme Activity'},
    ];

    let exerciseindex = 0
    const exercisedata = [
      { key: exerciseindex++, label: 'Sedentary'},
      { key: exerciseindex++, label: 'Light Exercise'},
      { key: exerciseindex++, label: 'Moderate Exercise'},
      { key: exerciseindex++, label: 'Intense Exercise'},
      { key: exerciseindex++, label: 'Extreme Exercise'},
    ];

    //const [additionalComments, setAdditionalComments] = useState("");

    function calculateBodyFatPercentage(gender, height, weight, neck, waist, hip) {
      // Convert height from inches to centimeters
      var heightCM = height * 2.54;

      if (gender, height, weight, neck, waist, hip) {
        // Convert weight from pounds to kilograms
        var weightKG = weight * 0.45359237;
      
        // Calculate the body fat percentage based on gender
        var bodyFatPercentage = 0;
        if (gender === 'male') {
          // Formula for males: 86.010 * log10(abdomen - neck) - 70.041 * log10(height) + 36.76
          var log10 = Math.log10;
          bodyFatPercentage = 86.010 * log10(waist - neck) - 70.041 * log10(heightCM) + 36.76;
        } else if (gender === 'female') {
          // Formula for females: 163.205 * log10(waist + hip - neck) - 97.684 * log10(height) - 78.387
          var log10 = Math.log10;
          bodyFatPercentage = 163.205 * log10(waist + hip - neck) - 97.684 * log10(heightCM) - 78.387;
        }

        // Adjust the body fat percentage based on weight
        bodyFatPercentage += weightKG * 0.082 + 34.89;

        console.log('Setting Body Fat pct to: ' + bodyFatPercentage.toFixed(2))
        setBodyFatPct(bodyFatPercentage.toFixed(2))

      } else {
        setBodyFatPct(null)
      }
    
      
       // Return the body fat percentage rounded to 2 decimal places

       return bodyFatPercentage.toFixed(2);
    }


    function handleHeightChange(event) {
      const input =  event.nativeEvent.text;

      calculateBodyFatPercentage(i_gender, input, weight, neck, waist, hip)

      // validate all you want here
      //console.log(input)

      //setAdditionalComments(input)
      setHeight(input)
    };

    function handleWeightChange(event) {
      const input =  event.nativeEvent.text;

      // validate all you want here
      //console.log(input)

      //setAdditionalComments(input)
      setWeight(input)
    };

    function handleNeckChange(event) {
      const input =  event.nativeEvent.text;

      // validate all you want here
      //console.log(input)

      //setAdditionalComments(input)
      setNeck(input)
    };

    function handleWaistChange(event) {
      const input =  event.nativeEvent.text;

      // validate all you want here
      //console.log(input)

      //setAdditionalComments(input)
      setWaist(input)
    };

    function handleHipChange(event) {
      const input =  event.nativeEvent.text;

      // validate all you want here
      //console.log(input)

      //setAdditionalComments(input)
      setHip(input)
    };

    function handleBodyFatChange(event) {
      const input =  event.nativeEvent.text;

      // validate all you want here
      //console.log(input)

      //setAdditionalComments(input)
      setBodyFatPct(input)
    };

    


    return(
      <ScrollView style={{padding: 0, margin: 0}}> 
      <View style={{flex: 1}}>

        <EditWindowSaveAlertModal />

        
        <View style={{padding: 10, paddingTop: 0, alignItems: 'center'}}>
          <View style={{marginTop: 10, marginBottom: 10}}>
            <Text style={{fontSize: 22, fontWeight: '500', textAlign: 'center', color: activeColors.secondary_text}}>Please fill out the information below</Text>
            <Text style={{fontSize: 13, fontWeight: '300', textAlign: 'center', color: activeColors.secondary_text}}>This information will not be visible on your public profile</Text>
          </View>
          <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-evenly', marginBottom: 10, marginTop: 10}}>
            <Bubble_Button 
              onPress={onMalePress}
              text='Male'
              bgColor= {showMale ? '#363636' : '#363636' }
              fgColor= {showMale ? '#E1AB09' : 'white' }
              cstyle= {{width: '50%', borderRadius: 5, padding: 25, marginRight: 10}}
              />
            <Bubble_Button
              onPress={onFemalePress}
              text='Female'
              bgColor= {showFemale ? '#363636' : '#363636' }
              fgColor= {showFemale ? '#E1AB09' : 'white' }
              cstyle= {{width: '50%', borderRadius: 5, padding: 25}}
              />
          </View>
          <View style={{width:'100%', alignItems: 'center', marginBottom: 10}}>
            <Text style={{fontSize: 18, fontWeight: '300', textAlign: 'center', marginBottom: 5, color: activeColors.secondary_text}}>Goals</Text>
            <ModalSelector
              data={goaldata}
              initValue={goal}
              style={{width: '100%', backgroundColor: '#363636', borderRadius: 5}}
              //Selected Item text Style
              selectedItemTextStyle={{color: '#F8BE13'}}
              //Picker Option Text Style
              optionTextStyle={{color: 'white'}}
              cancelTextStyle={{color: 'white'}}
              cancelStyle={{padding: 20, backgroundColor: '#363636' }}
              optionStyle={{padding: 20}}
              optionContainerStyle={{backgroundColor: '#363636'}}
              initValueTextStyle={{color: '#F8BE13', padding: 7}}
              onChange={(option)=>{ setGoal(option.label) }} />  
          </View>
          <View style={{width:'100%', alignItems: 'center', marginBottom: 10}}>
            <Text style={{fontSize: 18, fontWeight: '300', textAlign: 'center', marginBottom: 5, color: activeColors.secondary_text}}>Training/Exercise Activity</Text>
            <ModalSelector
              data={exercisedata}
              initValue={exercise}
              style={{width: '100%', backgroundColor: '#363636', borderRadius: 5}}
              //Selected Item text Style
              selectedItemTextStyle={{color: '#F8BE13'}}
              //Picker Option Text Style
              optionTextStyle={{color: 'white'}}
              cancelTextStyle={{color: 'white'}}
              cancelStyle={{padding: 20, backgroundColor: '#363636' }}
              optionStyle={{padding: 20}}
              optionContainerStyle={{backgroundColor: '#363636'}}
              initValueTextStyle={{color: '#F8BE13', padding: 7}}
              onChange={(option)=>{ setExercise(option.label) }} />  
          </View>
          <View style={{width:'100%', alignItems: 'center', marginBottom: 10}}>
            <Text style={{fontSize: 18, fontWeight: '300', textAlign: 'center', marginBottom: 5, color: activeColors.secondary_text}}>Lifestyle Activity</Text>
            <ModalSelector
              data={lifestyledata}
              initValue={lifestyle}
              style={{width: '100%', backgroundColor: '#363636', borderRadius: 5}}
              //Selected Item text Style
              selectedItemTextStyle={{color: '#F8BE13'}}
              //Picker Option Text Style
              optionTextStyle={{color: 'white'}}
              cancelTextStyle={{color: 'white'}}
              cancelStyle={{padding: 20, backgroundColor: '#363636' }}
              optionStyle={{padding: 20}}
              optionContainerStyle={{backgroundColor: '#363636'}}
              initValueTextStyle={{color: '#F8BE13', padding: 7}}
              onChange={(option)=>{ setLifestyle(option.label) }} />  
          </View>
          <View style={{flexDirection: 'row', width: '100%', marginBottom: 10}}>
            <View style={{width: '50%',flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',}}>
              <Text style={{marginLeft:20, color: activeColors.secondary_text}}>Height</Text>
                <View style={styles.inputView}>

                  <TextInput
                      name='height'
                      placeholder="00"
                      keyboardType='numeric'
                      maxLength={5}
                      onEndEditing={handleHeightChange}
                      defaultValue={height}
                      style={{textAlign: 'center'}}
                  />

                </View>
            </View>
            <View style={{width: '50%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',}}>
                <Text style={[{fontSize: 15}, heightftincm ? {color: activeColors.secondary_text} : {color: activeColors.secondary_text}]}>ft/in</Text>
            </View>
          </View>
          
          <View style={{flexDirection: 'row', width: '100%', marginBottom: 10}}>
              <View style={{width: '50%', flexDirection: 'row', alignItems: 'center',  justifyContent: 'space-between', paddingLeft: 20}}>
                <Text style={{color: activeColors.secondary_text}}>Weight</Text>
                  <View style={styles.inputView}>
                  <TextInput
                      name='weight'
                      placeholder="00"
                      keyboardType='numeric'
                      maxLength={5}
                      onEndEditing={handleWeightChange}
                      defaultValue={weight}
                      style={{textAlign: 'center'}}
                  />

                  </View>
              </View>
              <View style={{width: '50%', flexDirection: 'row', justifyContent: 'center',alignItems: 'center'}}>
                    <Text style={[{fontSize: 15}, weightlbskgs ? { color: activeColors.secondary_text} : {color: activeColors.secondary_text}]}>lbs</Text>
              </View>
          </View>
          <View style={{flexDirection: 'row', width: '100%', marginBottom: 10}}>
              <View style={{width: '50%', flexDirection: 'row', alignItems: 'center',  justifyContent: 'space-between', paddingLeft: 20}}>
                <Text style={{color: activeColors.secondary_text}}>Neck</Text>
                <View style={styles.inputView}>
                <TextInput
                      name='neck'
                      placeholder="00"
                      keyboardType='numeric'
                      maxLength={5}
                      onEndEditing={handleNeckChange}
                      defaultValue={neck}
                      style={{textAlign: 'center'}}
                  />
                </View>
              </View>
              <View style={{width: '50%', flexDirection: 'row', justifyContent: 'center',alignItems: 'center'}}>
                    <Text style={[{fontSize: 15}, neckincm ? {color: activeColors.secondary_text} : {color: activeColors.secondary_text}]}>in</Text>
              </View>
          </View>
          <View style={{flexDirection: 'row', width: '100%', marginBottom: 10}}>
              <View style={{width: '50%', flexDirection: 'row', alignItems: 'center',  justifyContent: 'space-between', paddingLeft: 20}}>
                <Text style={{color: activeColors.secondary_text}}>Waist</Text>
                <View style={styles.inputView}>
                <TextInput
                      name='waist'
                      placeholder="00"
                      keyboardType='numeric'
                      maxLength={5}
                      onEndEditing={handleWaistChange}
                      defaultValue={waist}
                      style={{textAlign: 'center'}}
                  />
                </View>
              </View>
              <View style={{width: '50%', flexDirection: 'row', justifyContent: 'center',alignItems: 'center'}}>
                    <Text style={[{fontSize: 15}, waistincm ? { color: activeColors.secondary_text} : {color: activeColors.secondary_text}]}>in</Text>
              </View>
          </View>
          <View style={{flexDirection: 'row', width: '100%', marginBottom: 10}}>
              <View style={{width: '50%', flexDirection: 'row', alignItems: 'center',  justifyContent: 'space-between', paddingLeft: 20}}>
                <Text style={{color: activeColors.secondary_text}}>Hip</Text>
                <View style={styles.inputView}>
                    <TextInput
                      name='hip'
                      placeholder="00"
                      keyboardType='numeric'
                      maxLength={5}
                      onEndEditing={handleHipChange}
                      defaultValue={hip}
                      style={{textAlign: 'center'}}
                  />
                </View>
              </View>
              <View style={{width: '50%', flexDirection: 'row', justifyContent: 'center',alignItems: 'center'}}>
                <Pressable
                  style={{marginRight: 10}}
                  onPress={onHiplbskgsPress}
                  >
                    <Text style={[{fontSize: 15}, hipincm ? { color: activeColors.secondary_text} : {color: activeColors.secondary_text}]}>in</Text>
                  </Pressable>
              </View>
          </View>
          {/*
          <View style={{marginTop: 20, marginBottom: 10}}>
            <Text style={{fontSize: 18, fontWeight: '300', textAlign: 'center', color: activeColors.secondary_text}}>Not sure of the above measurements? Estimate your body fat % below</Text>
          </View>
      */}
          <View style={{width: '100%', flexDirection: 'row', alignItems: 'center',  justifyContent: 'space-evenly', paddingLeft: 20}}>
                <Text style={{color: activeColors.secondary_text}}>Body Fat Percentage:</Text>
                {bodyfatpct ? (
                  <Text style={{color: activeColors.secondary_text}}>{bodyfatpct} %</Text>
                ) : (
                  <Text style={{color: activeColors.secondary_text}}>- %</Text>
                )

                }
                
                  {/*
                  <View style={styles.inputView}>
                    <TextInput
                      name='bodyfatpct'
                      placeholder="00"
                      keyboardType='numeric'
                      maxLength={5}
                      onEndEditing={handleBodyFatChange}
                      defaultValue={bodyfatpct}
                      style={{textAlign: 'center'}}
                  />
                  </View>
                */}
                
          </View>

          
        </View>

      
      </View>
      <View>
        <Bubble_Button 
          text='Save'
          onPress={saveEditWindowPress}
          cstyle={{width: '100%'}}
          bgColor='#F8BE13'
          fgColor='#363636'
          />
      </View>
      </ScrollView>
    )
  }

  const EditWindowSaveAlertModal = () => {

    let message = ""
    let vertpadding = 0
    if (userinfo) {
      message = "Information Saved"
      //message = "Thanks for choosing Macro and Accountability coaching through CronusFit! \n\n Your coach James will reach out to you within the next 24 hours with your individualized macro plan and additional recommended resources. \n\nIn the meantime, you now have access to some additional resources for only coaching clients, check them out here"

      vertpadding = 15
    } else {
      message = "Thanks for choosing Macro and Accountability coaching through CronusFit! \n\n Your coach James will reach out to you within the next 24 hours with your individualized macro plan and additional recommended resources. \n\nIn the meantime, you now have access to some additional resources for only coaching clients, check them out here"
      vertpadding = 50
    }


    const onDismissPress = () => {
      setModalVisibleQuestionSave(!modalVisibleQuestionSave);
      setShowEditWindow(false);
      

      navigation.navigate('NutritionScreen', {value: 'true'})
    };

    return(

      <Modal
          animationType="fade" //slide or none
          transparent={true}
          visible={modalVisibleQuestionSave}
          onRequestClose={() => {
            //Alert.alert("Modal has been closed.");
            setModalVisibleQuestionSave(!modalVisibleQuestionSave);
          }}
        >
          <View style={styles.centeredView}>
            <View style={[styles.alertModelInfoSaved, {padding: 20, justifyContent: 'space-between', backgroundColor: activeColors.secondary_bg, borderWidth: 2, borderColor: activeColors.primary_text}]}>
              <Text style={[styles.alertModalText, {fontSize: 20, fontWeight: '400', marginBottom: 20, color: activeColors.primary_text} ]}>
              {message}
              </Text>
              
              <Bubble_Button 
                text="Dismiss"
                onPress={onDismissPress}
                bgColor='#F8BE13'
                fgColor='#363636'
                cstyle={{width: 300}}
              />
            </View>
          </View>
        </Modal>
    );
  
  }

  const DatePickerArrows =  () => {

    //Date Picker Info
    
    const [testval, setTestVal] = useState(0);
  
    const addADay = () => {
      let result = new Date(date)
      setNewDate(result.setDate(result.getDate() + 1 ));
    };
  
    const subADay = () => {
      let result = new Date(date)
      setNewDate(result.setDate(result.getDate() - 1 ));
    };
  
    return(
      <View style={styles.datePickerArrowsContainer}>
        <Pressable onPress={subADay}>
          <Ionicons name='chevron-back-outline' style={{fontSize: 20, color: activeColors.secondary_text}}/>
        </Pressable>
        <Pressable  style={{alignItems: 'center', width: 150, marginTop: 2, marginRight: 5, marginLeft: 5}}>
          <Text style={{fontSize: 12, color: activeColors.secondary_text}}>
            {/*moment(date).format('dddd, MMM Do YYYY')*/}
            {format(new Date(date), 'MM/dd/yyyy')}
          </Text>
        </Pressable>
        <Pressable  onPress={addADay}>
          <Ionicons name='chevron-forward-outline' style={{fontSize: 20, color: activeColors.secondary_text}}/>
        </Pressable>
        {/*<Text>selected: {date.toLocaleString()}</Text>*/}
        {/*moment(date).format('dddd, MMM Do YYYY')*/}
      </View>
    )
    
  
  }

  /*
  Main Nutrtion Page Screens. 
  Adding Meals, Weekly Checkin, Upload Status pictures and Nutrition Coach Messages. 
  */
  const AddMealSnack = () => {

    const FoodSearch = () => {
      const [searchTerm, setSearchTerm] = useState('');
      const [searchResults, setSearchResults] = useState([]);
    
      const handleSearch = async () => {
        try {
          const oauth = OAuth({
            consumer: {
              key: Constants.expoConfig.extra.fatSecretAPIKey,
              secret: Constants.expoConfig.extra.fatSecretAPISecret,
            },
            signature_method: 'HMAC-SHA1',
            hash_function: (baseString, key) =>
              CryptoJS.HmacSHA1(baseString, key).toString(CryptoJS.enc.Base64),
          });
    
          const requestData = {
            url: 'https://platform.fatsecret.com/rest/server.api',
            method: 'GET',
            data: {
              method: 'foods.search',
              format: 'json',
              search_expression: searchTerm,
            },
          };
    
          const headers = oauth.toHeader(
            oauth.authorize(requestData, {
              key: Constants.expoConfig.extra.fatSecretAPIKey,
              secret: Constants.expoConfig.extra.fatSecretAPISecret,
            })
          );
    
          const response = await axios.get(requestData.url, {
            headers: headers,
            params: requestData.data,
          });

          console.log(response)
    
          const foodResults = response.data?.foods?.food;
    
          if (foodResults) {
            if (Array.isArray(foodResults)) {
              setSearchResults(foodResults);
            } else {
              setSearchResults([foodResults]);
            }
          } else {
            setSearchResults([]);
          }
        } catch (error) {
          console.error(error);
        }
      };
    
      return (
        <View>
          <TextInput
            placeholder="Search for food"
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
          <Button title="Search" onPress={handleSearch} />
          {searchResults.map((food) => (
            <View key={food.food_id}>
              <Text>Name: {food.food_name}</Text>
              <Text>Brand: {food.brand_name}</Text>
              <Text>Calories: {food.calories}</Text>
              {/* Add more fields as per your requirements */}
            </View>
          ))}
        </View>
      );
    };


    //const addFood = (pfooddesc, pprotein, pcarbs, pfat, pfiber, pcalories, category) => {
    const addFood = async (pfooddesc, pprotein, pcarbs, pfat, pfiber, pcalories, category) => {

      //console.log(category)

      //console.log(pprotein)
      //if (pfooddesc == null || pprotein == null || pcarbs == null || pfat == null || pfiber == null || pcalories == null) return;
      
      if (pfooddesc == null || pcalories == null) return;


      if (category === 'breakfast') {
        setBreakfastList(breakfastlist => ([...breakfastlist, {
          desc: pfooddesc,
          protein: pprotein,
          carbs: pcarbs,
          fat: pfat,
          fiber: pfiber,
          calories: pcalories
        } ]));

        //Insert into DB
        try {
          await DataStore.save(
            new Foodentry({
              date: format(new Date(date), 'MM/dd/yyyy').toString(),
              category: 'BREAKFAST',
              desc: pfooddesc,
              protein: parseFloat(pprotein),
              carbs: parseFloat(pcarbs),
              fat: parseFloat(pfat),
              fiber: parseFloat(pfiber),
              calories: parseFloat(pcalories),
              userID: user.id
            })
          );
  
            //console.log("Data Saved successfully!");
          } catch (error) {
            console.log("Error saving data", error);
          }

      } else if (category === 'lunch') {
        setLunchList(lunchlist => ([...lunchlist, {
          desc: pfooddesc,
          protein: pprotein,
          carbs: pcarbs,
          fat: pfat,
          fiber: pfiber,
          calories: pcalories
        } ]));

        //Insert into DB
        try {
          await DataStore.save(
            new Foodentry({
              date: format(new Date(date), 'MM/dd/yyyy').toString(),
              category: 'LUNCH',
              desc: pfooddesc,
              protein: parseFloat(pprotein),
              carbs: parseFloat(pcarbs),
              fat: parseFloat(pfat),
              fiber: parseFloat(pfiber),
              calories: parseFloat(pcalories),
              userID: user.id
            })
          );
  
            //console.log("Data Saved successfully!");
          } catch (error) {
            console.log("Error saving data", error);
          }

      } else if (category === 'dinner') {
        setDinnerList(dinnerlist => ([...dinnerlist, {
          desc: pfooddesc,
          protein: pprotein,
          carbs: pcarbs,
          fat: pfat,
          fiber: pfiber,
          calories: pcalories
        } ]));

        //Insert into DB
        try {
          await DataStore.save(
            new Foodentry({
              date: format(new Date(date), 'MM/dd/yyyy').toString(),
              category: 'DINNER',
              desc: pfooddesc,
              protein: parseFloat(pprotein),
              carbs: parseFloat(pcarbs),
              fat: parseFloat(pfat),
              fiber: parseFloat(pfiber),
              calories: parseFloat(pcalories),
              userID: user.id
            })
          );
  
            //console.log("Data Saved successfully!");
          } catch (error) {
            console.log("Error saving data", error);
          }

      } else if (category === 'snacks') {
        setSnacksList(snackslist => ([...snackslist, {
          desc: pfooddesc,
          protein: pprotein,
          carbs: pcarbs,
          fat: pfat,
          fiber: pfiber,
          calories: pcalories
        } ]));

        //Insert into DB
        try {
          await DataStore.save(
            new Foodentry({
              date: format(new Date(date), 'MM/dd/yyyy').toString(),
              category: 'SNACKS',
              desc: pfooddesc,
              protein: parseFloat(pprotein),
              carbs: parseFloat(pcarbs),
              fat: parseFloat(pfat),
              fiber: parseFloat(pfiber),
              calories: parseFloat(pcalories),
              userID: user.id
            })
          );
  
            //console.log("Data Saved successfully!");
          } catch (error) {
            console.log("Error saving data", error);
          }

      }
      
    }

    const deleteTask = (deleteIndex, category, item) => {

      //console.log(category)
      if (category === 'breakfast') {
        setBreakfastList(breakfastlist.filter((value, index) => index != deleteIndex));
      } else if (category === 'lunch') {
        setLunchList(lunchlist.filter((value, index) => index != deleteIndex));
      } else if (category === 'dinner') {
        setDinnerList(dinnerlist.filter((value, index) => index != deleteIndex));
      } else if (category === 'snacks') {
        setSnacksList(snackslist.filter((value, index) => index != deleteIndex));
      } 

     

      const item_to_delete = foodentries.filter((value) => value.id === item.id)

      //console.log('we need to delete this food item: ' + JSON.stringify(item_to_delete))

      if (item_to_delete[0]) {

        //console.log("found it, let''s delete it")

        DataStore.delete(item_to_delete[0]);

      }
      
    }

    const saveFoodEntries = async () => {
      setAddFood(!addfood)

       navigation.navigate('NutritionScreen')
      //console.log(addfood)
    }

  
    const expandCategory = async (label) => {

      //console.log(label.category)

      if (label.category === 'breakfast') {
        setViewBreakfast(!viewbreakfast)
      } else if (label.category === 'lunch') {
        setViewLunch(!viewlunch)
      } else if (label.category === 'dinner') {
        setViewDinner(!viewdinner)
      }  else if (label.category === 'snacks') {
        setViewSnacks(!viewsnacks)
      }

      /*

      {
              breakfastlist ? (
                breakfastlist.map((item, index) => {
                  return (
                    <View key={index} style={{flex: 1}}>
                      <Text>{item.calories}</Text>
                    </View>
                  );
                })
              ) : (
                <></>
              )
            }
      */
      
      
    }
    

    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    const ExpandableSectionButton = ({itemList, viewTrigger, category}) => {

      return (
          <Pressable style={styles.expandentrybutton} onPress={() => expandCategory({category})}>
            <View>
              <Text style={{fontSize: 20, color: activeColors.secondary_text}}>{capitalizeFirstLetter(category)}</Text>
            </View>
            <View style={{flexDirection: 'row', marginRight: 20}}>
              <Text style={{marginTop: 5, marginRight: 25, color: activeColors.secondary_text}}>
              {
                itemList.reduce((total,currentItem) =>  total = parseInt(total) + parseInt(currentItem.calories) , 0 )
              } calories
              </Text>
          
              { viewTrigger ? (
                <Ionicons name='chevron-back-outline' color={activeColors.secondary_text} style={{fontSize: 25}}/>
              ) : (
                <Ionicons name='chevron-down-outline' color={ activeColors.secondary_text} style={{fontSize: 25}}/>
              )}
            </View>
            
        </Pressable>
      );
    };

    const ExpandableSectionArea = ({itemList, viewTrigger, category}) => {
      return (
          viewTrigger ? (
              <View style={{padding: 10, width: '100%', flexDirection: 'column', justifyContent: 'space-evenly'}}>
                <ScrollView>
                  {
                    (itemList.length > 0) ? (
                        //Filter out 0 calorie items and then display the food items
                        itemList.filter(function(item) {
                        if (item.calories === 0) {
                          return false; // skip
                        }
                        return true;
                      }).map((item, index) => {
                        return (
                          <View key={index} style={{flex: 1}}>
                              <FoodItem index={index + 1} item={item} deleteTask={() => deleteTask(index, category, item)}/>
                          </View>
                        );
                      })
                    ) : (
                        <View>
                            <Text style={{color: activeColors.primary_text}}>No data</Text>
                        </View>
                    )} 
                </ScrollView>
                {/*
                <View style={{marginTop: 5}}>
                  <FoodInputField addFood={addFood} category={category}/>
                </View>*/}
              </View>
          ) : (
            <>
            </>
          )
          
        );
    };

    const AddFoodItemArea = ({viewTrigger}) => {
        return (
            viewTrigger ? (
                <View style={{padding: 10, width: '100%', flexDirection: 'column', justifyContent: 'space-evenly'}}>
                  <View style={{marginTop: 5}}>
                    <FoodInputField addFood={addFood}/>
                  </View>
                </View>
            ) : (
              <>
              </>
            )
            
          );
      };


    //const testingfoodData = require('../../../assets/testData/testingfooddata.json');

    //var result = testingfoodData.filter(obj => (obj.date == moment(date).format('MM/DD/YYYY').toString()));

  {/* 
    let datadisplayed = result.map((item, index) => {
      let datadisplayed_inner = item.food.map((item_1, index) => {
        let datadisplayed_inner_2 = item.food_item.map((item_2, index) => {
            return (
              <View>
                <Text>{item_2.protein}</Text>
              </View> 
            );
        })
      })
    })
  */}
      

    /*
    let datadisplayed = result.food.map((item, index) => {
      return(
        item.food_item
      )
    })
    */

    return(
      <View style={{width: '100%', height: '100%', alignItems: 'center'}}>
        <DatePickerArrows />
        <ScrollView style={{width: '100%'}}>
        <View style={{width: '100%'}}>
            <Pressable style={{padding: 10, flexDirection: 'row'}} onPress={() => setViewEntryScreen(!viewentryscreen)}>
                
                { viewentryscreen ? (
                        <>
                            <Text style={{color: activeColors.primary_text}}>Add Food  </Text>
                            <Ionicons name='remove-outline' color= {activeColors.primary_text} style={{fontSize: 18}}/>
                        </>
                    ) : (
                        <>
                            <Text style={{color: activeColors.primary_text}}>Add Food  </Text>
                            <Ionicons name='add-outline' color={activeColors.primary_text} style={{fontSize: 18}}/>
                        </>
                    )
                }
                
                
            </Pressable>
            <AddFoodItemArea viewTrigger={viewentryscreen} category='breakfast'/>
        </View>
        { viewentryscreen ? (
            <></>
        ) : (
            <View style={{width: '100%', alignItems: 'center', padding: 10}}>

            {/* Breakfast */}
            <ExpandableSectionButton itemList={breakfastlist} viewTrigger={viewbreakfast} category='breakfast' />
            <ExpandableSectionArea itemList={breakfastlist} viewTrigger={viewbreakfast} category='breakfast'/>

            {/* Lunch */}
            <ExpandableSectionButton itemList={lunchlist} viewTrigger={viewlunch} category='lunch' />
            <ExpandableSectionArea itemList={lunchlist} viewTrigger={viewlunch} category='lunch'/>

            {/* Dinner */}
            <ExpandableSectionButton itemList={dinnerlist} viewTrigger={viewdinner} category='dinner' />
            <ExpandableSectionArea itemList={dinnerlist} viewTrigger={viewdinner} category='dinner'/>

            {/* Snacks */}
            <ExpandableSectionButton itemList={snackslist} viewTrigger={viewsnacks} category='snacks' />
            <ExpandableSectionArea itemList={snackslist} viewTrigger={viewsnacks} category='snacks'/>
            

            <View style={{marginTop: 25, justifyContent: 'center', alignItems: 'center'}}>
            <View style={{flexDirection: 'row', padding: 15, backgroundColor: '#363636', borderRadius: 5, width: '50%', marginBottom: 10}}>
                <Text style={{color: 'white', fontWeight: '300'}}>Total Calories: </Text>
                <Text style={{color: 'white', fontWeight: '300'}}>
                {
                breakfastlist.reduce((total,currentItem) =>  total = parseInt(total) + (parseInt(currentItem.calories) || 0) , 0 )
                + 
                lunchlist.reduce((total,currentItem) =>  total = parseInt(total) + (parseInt(currentItem.calories) || 0) , 0 )
                + 
                dinnerlist.reduce((total,currentItem) =>  total = parseInt(total) + (parseInt(currentItem.calories) || 0) , 0 )
                + 
                snackslist.reduce((total,currentItem) =>  total = parseInt(total) + (parseInt(currentItem.calories) || 0) , 0 )
                } 
                </Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-evenly', width: '100%', marginBottom: 10}}>
                <View style={{flexDirection: 'row', padding: 15, backgroundColor: '#363636', borderRadius: 5, width: '45%', justifyContent: 'center'}}>
                <Text style={{color: 'white', fontWeight: '300'}}>Total Protein: </Text>
                <Text style={{color: 'white', fontWeight: '300'}}>
                    {
                    breakfastlist.reduce((total,currentItem) =>  total = parseInt(total) + (parseInt(currentItem.protein) || 0) , 0 )
                    + 
                    lunchlist.reduce((total,currentItem) =>  total = parseInt(total) + (parseInt(currentItem.protein) || 0) , 0 )
                    + 
                    dinnerlist.reduce((total,currentItem) =>  total = parseInt(total) + (parseInt(currentItem.protein) || 0) , 0 )
                    + 
                    snackslist.reduce((total,currentItem) =>  total = parseInt(total) + (parseInt(currentItem.protein) || 0) , 0 )
                    } g 
                </Text>
                </View>
                <View style={{flexDirection: 'row', padding: 15, backgroundColor: '#363636', borderRadius: 5, width: '45%', justifyContent: 'center'}}>
                <Text style={{color: 'white', fontWeight: '300'}}>Total Carbs: </Text>
                <Text style={{color: 'white', fontWeight: '300'}}>
                    {
                    breakfastlist.reduce((total , currentItem) =>  total = parseInt(total) + (parseInt(currentItem.carbs) || 0) , 0 )
                    + 
                    lunchlist.reduce((total,currentItem) =>  total = parseInt(total) + (parseInt(currentItem.carbs) || 0) , 0 )
                    + 
                    dinnerlist.reduce((total,currentItem) =>  total = parseInt(total) + (parseInt(currentItem.carbs) || 0) , 0 )
                    + 
                    snackslist.reduce((total,currentItem) =>  total = parseInt(total) + (parseInt(currentItem.carbs) || 0) , 0 )
                    } g 
                </Text>
                </View>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-evenly', width: '100%'}}>
                <View style={{flexDirection: 'row', padding: 15, backgroundColor: '#363636', borderRadius: 5, width: '45%', justifyContent: 'center'}}>
                <Text style={{color: 'white', fontWeight: '300'}}>Total Fat: </Text>
                <Text style={{color: 'white', fontWeight: '300'}}>
                    {
                    breakfastlist.reduce((total,currentItem) =>  total = parseInt(total) + (parseInt(currentItem.fat) || 0) , 0 )
                    + 
                    lunchlist.reduce((total,currentItem) =>  total = parseInt(total) + (parseInt(currentItem.fat) || 0) , 0 )
                    + 
                    dinnerlist.reduce((total,currentItem) =>  total = parseInt(total) + (parseInt(currentItem.fat) || 0) , 0 )
                    + 
                    snackslist.reduce((total,currentItem) =>  total = parseInt(total) + (parseInt(currentItem.fat) || 0) , 0 )
                    } g 
                </Text>
                </View>
                <View style={{flexDirection: 'row', padding: 15, backgroundColor: '#363636', borderRadius: 5, width: '45%', justifyContent: 'center'}}>
                <Text style={{color: 'white', fontWeight: '300'}}>Total Fiber: </Text>
                <Text style={{color: 'white', fontWeight: '300'}}> 
                    {
                    breakfastlist.reduce((total,currentItem) =>  total = parseInt(total) + (parseInt(currentItem.fiber) || 0) , 0 )
                    + 
                    lunchlist.reduce((total,currentItem) =>  total = parseInt(total) + (parseInt(currentItem.fiber) || 0) , 0 )
                    + 
                    dinnerlist.reduce((total,currentItem) =>  total = parseInt(total) + (parseInt(currentItem.fiber) || 0) , 0 )
                    + 
                    snackslist.reduce((total,currentItem) =>  total = parseInt(total) + (parseInt(currentItem.fiber) || 0) , 0 )
                    } g 
                </Text>
                </View>
            </View>
            </View>
            {/*}
            <View style={{marginTop: 50, width: '100%', marginBottom: 50}}>
            <Bubble_Button 
                text='Save Food Entries'
                onPress={saveFoodEntries}
                bgColor='#F8BE13'
                fgColor='#363636'
                cstyle={{width: '100%'}}
            />
            </View>
                */}
            </View>
        )}
          

        </ScrollView>
      </View>
    )
  }

  const WeeklyCheckin = () => {

    const [currnumbersleep, setCurrNumberSleep] = useState(5)
    const [currnumberappetite, setCurrNumberAppetite] = useState(5)
    const [currnumberenergy, setCurrNumberEnergy] = useState(5)

    //Check in
    const [checkin, setCheckin] = useState(undefined)
    const [lowweight, setLowWeight] = useState('')
    const [somewins, setSomeWins] = useState('')
    const [setbacks, setSetbacks] = useState('')
    const [barriers, setBarriers] = useState('')
    //const [sleepquality, setSleepQuality] = useState(undefined)
    //const [appetite, setAppetite] = useState(undefined)
    //const [energylevel, setEnergyLevel] = useState(undefined)
    const [othernotes, setOtherNotes] = useState('')
    const [generalnotes, setGeneralNotes] = useState('')
    const [checkinwaist, setCheckinWaist] = useState('')
    const [checkinneck, setCheckinNeck] = useState('')


    const saveWeeklyCheckinPress = async () => {

      // Save this data to database

      
        //Insert

      try {
        await DataStore.save(
          new Checkin({
            lowestweight: lowweight,
            somewins: somewins,
            setbacks: setbacks,
            barriers: barriers,
            sleepquality: currnumbersleep.toString(),
            appetite: currnumberappetite.toString(),
            energylevel: currnumberenergy.toString(),
            othernotes: othernotes,
            generalnotes: generalnotes,
            waist: checkinwaist.toString(),
            neck: checkinneck.toString(),
            userID: user.id
          })
        );

          //console.log("Data Saved successfully!");
        } catch (error) {
          console.log("Error saving data", error);
        }


        setWeeklyCheckin(!weeklycheckin)
        //Save weekly checkin window

        navigation.navigate('NutritionScreen')

        

    }


    function handleLowWeightChange(event) {
      const input =  event.nativeEvent.text;


      //setAdditionalComments(input)
      setLowWeight(input)
    };

    function handleSomeWinsChange(event) {
      const input =  event.nativeEvent.text;
      //console.log(input)
      //setAdditionalComments(input)
      setSomeWins(input)
    };

    function handleSetBacksChange(event) {
      const input =  event.nativeEvent.text;
      
      //setAdditionalComments(input)
      setSetbacks(input)
    };

    function handleBarriersChange(event) {
      const input =  event.nativeEvent.text;
      
      //setAdditionalComments(input)
      setBarriers(input)
    };

    function handleOtherNotesChange(event) {
      const input =  event.nativeEvent.text;
        
      //setAdditionalComments(input)
      setOtherNotes(input)
    };

    function handleGeneralNotesChange(event) {
      const input =  event.nativeEvent.text;
        
      //setAdditionalComments(input)
      setGeneralNotes(input)
    };

    function handleCheckinWaistChange(event) {
      const input =  event.nativeEvent.text;
        
      //setAdditionalComments(input)
      setCheckinWaist(input)
    };

    function handleCheckinNeckChange(event) {
      const input =  event.nativeEvent.text;
        
      //setAdditionalComments(input)
      setCheckinNeck(input)
    };


    return(
      <View style={{height: '100%'}}>
     
      <ScrollView style={{marginBottom: 0}}>
          <View style={{flexDirection: 'column', alignItems: 'center', padding: 20, paddingBottom: 75}}>

            <Text style={{marginBottom: 20, fontSize: 20, color: activeColors.secondary_text}}>This past week...</Text>
            {/* Lowest Weight Checkin */}
            <View style={{width: '100%', flexDirection: 'column', alignItems: 'center', marginBottom: 20}}>
              <Text style={{fontSize: 15, fontWeight: '300', textAlign: 'center', marginBottom: 5, color: activeColors.secondary_text}}>What was your lowest weigh-in?</Text>
              <View style={{flexDirection: 'row'}}>
                <View style={{width: '20%', borderBottomColor: '#c9c9c9', borderBottomWidth: 1}}>
                    <TextInput
                        name='lowweight'
                        placeholder="0"
                        keyboardType='numeric'
                        maxLength={3}
                        onEndEditing={handleLowWeightChange}
                        defaultValue={lowweight}
                        style={{textAlign: 'center', color: activeColors.secondary_text}}
                        placeholderTextColor={activeColors.secondary_text}
                    />
                  </View>
                <View style={{ justifyContent: 'flex-end', marginLeft: 5}}>
                  <Text style={{color: activeColors.secondary_text}}>lbs</Text>
                </View>
              </View>
            </View>

            {/* Wins this Past week */}
            <View style={{flexDirection: 'column', alignItems: 'center', marginBottom: 20}}>
              <Text style={{fontSize: 15, fontWeight: '300', textAlign: 'center', marginBottom: 10, color: activeColors.secondary_text}}>What were some wins?</Text>
              <TextInput
                  name='winspastweek'
                  placeholder="e.g. clothes felt looser, I feel more energized, etc."
                  onEndEditing={handleSomeWinsChange}
                  defaultValue={somewins}
                  multiline={true}
                  numberOfLines={2}
                  maxLength={200}
                  style={{borderWidth: 1, borderColor: '#BFBFBF',  paddingTop: 3, paddingBottom: 3, paddingLeft: 5, width: 250, marginBottom: 0, borderRadius: 5, color: activeColors.secondary_text}}
                  placeholderTextColor={activeColors.primary_text}
              />
            </View>

            {/* Setbacks this past week*/}
            <View style={{flexDirection: 'column', alignItems: 'center', marginBottom: 20}}>
              <Text style={{fontSize: 15, fontWeight: '300', textAlign: 'center', marginBottom: 10,color: activeColors.secondary_text}}>What were some of the setbacks?</Text>
              <TextInput
                  name='setbacks'
                  placeholder="e.g. I went over calories on one day, I missed a training session, etc."
                  onEndEditing={handleSetBacksChange}
                  defaultValue={setbacks}
                  multiline={true}
                  numberOfLines={2}
                  maxLength={200}
                  style={{borderWidth: 1, borderColor: '#BFBFBF',  paddingTop: 3, paddingBottom: 3, paddingLeft: 5, width: 250, marginBottom: 0, borderRadius: 5, color: activeColors.secondary_text}}
                  placeholderTextColor={activeColors.primary_text}              
              />
            </View>

            {/* Barriers this past week */}
            <View style={{flexDirection: 'column', alignItems: 'center', marginBottom: 20}}>
              <Text style={{fontSize: 15, fontWeight: '300', textAlign: 'center', marginBottom: 10, color: activeColors.secondary_text}}>What are the barriers going to be this upcoming week?</Text>
              <TextInput
                  name='barriers'
                  placeholder="e.g. I have a busy work schedule, I have to drive 5 hours to see family, etc."
                  onEndEditing={handleBarriersChange}
                  defaultValue={barriers}
                  multiline={true}
                  numberOfLines={3}
                  maxLength={200}
                  style={{borderWidth: 1, borderColor: '#BFBFBF',  paddingTop: 3, paddingBottom: 3, paddingLeft: 5, width: 250, marginBottom: 0, borderRadius: 5, color: activeColors.secondary_text}}
                  placeholderTextColor={activeColors.primary_text}
              />
            </View>

            {/* Rate your sleep */}
            <View style={{flexDirection: 'column', alignItems: 'center', marginBottom: 20}}>
              <Text style={{fontSize: 15, fontWeight: '300', textAlign: 'center', marginBottom: 10, color: activeColors.secondary_text}}>Rate your sleep (quality and duration) on a scale of 1-10 (1 being poor, 10 being excellent).</Text>
              <Text style={{marginBottom: 10, color: activeColors.secondary_text}}>{currnumbersleep}</Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={{marginRight: 5, color: activeColors.secondary_text}}>0</Text>
                <Slider
                  style={{width: 250, height: 20}}
                  step={1}
                  minimumValue={0}
                  maximumValue={10}
                  value={currnumbersleep}
                  onValueChange={
                    (currnumbersleep) => setCurrNumberSleep(currnumbersleep)
                  }
                  thumbTintColor="#F8BE13"
                  minimumTrackTintColor="#F8BE13"
                  maximumTrackTintColor="#000000"
                />
                <Text style={{color: activeColors.secondary_text}}>10</Text>
              </View>
            </View>

            {/* Rate your appetite */}
            <View style={{flexDirection: 'column', alignItems: 'center', marginBottom: 20}}>
              <Text style={{fontSize: 15, fontWeight: '300', textAlign: 'center', marginBottom: 10, color: activeColors.secondary_text}}>Rate your appetite on a scale of 1-10 (1 being never hungry, 10 being insatiable appetite).</Text>
              <Text style={{marginBottom: 10, color: activeColors.secondary_text}}>{currnumberappetite}</Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={{marginRight: 5, color: activeColors.secondary_text}}>0</Text>
                <Slider
                  style={{width: 250, height: 20}}
                  step={1}
                  minimumValue={0}
                  maximumValue={10}
                  value={currnumberappetite}
                  onValueChange={
                    (currnumberappetite) => setCurrNumberAppetite(currnumberappetite)
                  }
                  thumbTintColor="#F8BE13"
                  minimumTrackTintColor="#F8BE13"
                  maximumTrackTintColor="#000000"
                />
                <Text style={{color: activeColors.secondary_text}}>10</Text>
              </View>
            </View>

            {/* Rate your energy levels */}
            <View style={{flexDirection: 'column', alignItems: 'center', marginBottom: 20}}>
              <Text style={{fontSize: 15, fontWeight: '300', textAlign: 'center', marginBottom: 10, color: activeColors.secondary_text}}>Rate your energy levels on a scale of 1-10 (1 being extremely lethargic, 10 being extremely energized)</Text>
              <Text style={{marginBottom: 10, color: activeColors.secondary_text}}>{currnumberenergy}</Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={{marginRight: 5, color: activeColors.secondary_text}}>0</Text>
                <Slider
                  style={{width: 250, height: 20}}
                  step={1}
                  minimumValue={0}
                  maximumValue={10}
                  value={currnumberenergy}
                  onValueChange={
                    (currnumberenergy) => setCurrNumberEnergy(currnumberenergy)
                  }
                  thumbTintColor="#F8BE13"
                  minimumTrackTintColor="#F8BE13"
                  maximumTrackTintColor="#000000"
                />
                <Text style={{color: activeColors.secondary_text}}>10</Text>
              </View>
            </View>


            {/* How did training go? */}
            <View style={{flexDirection: 'column', alignItems: 'center', marginBottom: 20}}>
              <Text style={{fontSize: 15, fontWeight: '300', textAlign: 'center', marginBottom: 10, color: activeColors.secondary_text}}>How did training go? Did you hit any PRs? Did you skip sessions?</Text>
              <TextInput
                  name='othernotes'
                  placeholder="notes"
                  onEndEditing={handleOtherNotesChange}
                  defaultValue={othernotes}
                  multiline={true}
                  numberOfLines={3}
                  maxLength={200}
                  style={{textAlign: 'center', borderWidth: 1, borderColor: '#BFBFBF',  paddingTop: 3, paddingBottom: 3, paddingLeft: 5, width: 250, marginBottom: 0, borderRadius: 5, color: activeColors.secondary_text}}
                  placeholderTextColor={activeColors.primary_text}
              />
            </View>

            {/* General Other info */}
            <View style={{flexDirection: 'column', alignItems: 'center', marginBottom: 20}}>
              <Text style={{fontSize: 15, fontWeight: '300', textAlign: 'center', marginBottom: 10, color: activeColors.secondary_text}}>Are there any other notes that you would like to share?</Text>
              <TextInput
                  name='generalnotes'
                  placeholder="general notes"
                  onEndEditing={handleGeneralNotesChange}
                  defaultValue={generalnotes}
                  multiline={true}
                  numberOfLines={3}
                  maxLength={200}
                  style={{textAlign: 'center', borderWidth: 1, borderColor: '#BFBFBF',  paddingTop: 3, paddingBottom: 3, paddingLeft: 5, width: 250, marginBottom: 0, borderRadius: 5, color: activeColors.secondary_text}}
                  placeholderTextColor={activeColors.primary_text}
              />
            </View>

            {/* Waist Measurement */}
            <View style={{flexDirection: 'column', alignItems: 'center', marginBottom: 20}}>
              <Text style={{fontSize: 15, fontWeight: '300', textAlign: 'center', marginBottom: 10, color: activeColors.secondary_text}}>Waist Measurement</Text>
              <TextInput
                  name='checkinwaist'
                  placeholder="0.0"
                  keyboardType='numeric'
                  onEndEditing={handleCheckinWaistChange}
                  defaultValue={checkinwaist}
                  maxLength={5}
                  style={{textAlign: 'center', borderWidth: 1,borderColor: '#BFBFBF', color:'#363636', paddingTop: 3, paddingBottom: 3, paddingLeft: 0, width: 100, marginBottom: 0, color: activeColors.secondary_text}}
                  placeholderTextColor={activeColors.primary_text}
              />
            </View>

            {/* Neck Measurement */}
            <View style={{flexDirection: 'column', alignItems: 'center', marginBottom: 20}}>
              <Text style={{fontSize: 15, fontWeight: '300', textAlign: 'center', marginBottom: 10, color: activeColors.secondary_text}}>Neck Measurement</Text>
               <TextInput
                  name='checkinneck'
                  placeholder="0.0"
                  keyboardType='numeric'
                  onEndEditing={handleCheckinNeckChange}
                  defaultValue={checkinneck}
                  maxLength={5}
                  style={{textAlign: 'center', borderWidth: 1,borderColor: '#BFBFBF', color:'#363636', paddingTop: 3, paddingBottom: 3, paddingLeft: 0, width: 100, marginBottom: 0, color: activeColors.secondary_text}}
                  placeholderTextColor={activeColors.primary_text}
              />
            </View>

            {/* Picture Preview */}
            {/*
            <View style={{flexDirection: 'column', marginBottom: 20}}>
              <Text style={{fontSize: 15, fontWeight: '300', textAlign: 'center', marginBottom: 10}}>Pictures of physique - front and side relaxed</Text>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', height: 150, alignItems: 'center'}}>
                <View style={{borderColor: '#363636', borderWidth: 1, borderRadius: 5, padding: 10}}>
                  <Pressable onPress={() => {console.log('Add Picture')}}>
                    <Ionicons name='add-outline' color='#363636' style={{fontSize: 25}}/>
                  </Pressable>
                </View>
                <View style={{ backgroundColor: '#F8BE13', height: '100%', alignItems: 'center', justifyContent: 'center', borderRadius: 5}}>
                  <Pressable onPress={() => {console.log('Preview Pic One')}}>
                    <Text>Pic Preview 1</Text>
                  </Pressable>
                </View>
                <View style={{ backgroundColor: '#F8BE13', height: '100%', alignItems: 'center', justifyContent: 'center', borderRadius: 5}}>
                  <Pressable onPress={() => {console.log('Preview Pic Two')}}>
                    <Text>Pic Preview 2</Text>
                  </Pressable>
                </View>
              </View>
            </View>
            */}

            {/* Comments and Questions? */}
            {/*
            <View style={{flexDirection: 'column', alignItems: 'center', marginBottom: 20}}>
              <Text style={{fontSize: 15, fontWeight: '300', textAlign: 'center', marginBottom: 10}}>Comments/Questions:</Text>
              <BubbleMultiLine
                name='barriers'
                placeholder=''
                keyboardType='numeric'
                control={control} 
                vstyle={{borderWidth: 1, borderColor: '#BFBFBF',  paddingTop: 3, paddingBottom: 3, paddingLeft: 5, width: 250, marginBottom: 0}}
              />
            </View>
            <View style={{marginBottom: 20}}>
              <Text style={{textAlign: 'center'}}>Thanks for checking in with us! You'll receive your feedback in 24-48 hours.</Text>
            </View>
            */}

            <Bubble_Button 
                text='Submit Weekly Check-in'
                onPress={saveWeeklyCheckinPress}
                bgColor='#F8BE13'
                fgColor='#363636'
              />
          </View>
                
        </ScrollView>
      </View>
    )
  }

  const MessageCoach = () => {

    const scrollViewRef = React.useRef();


    const hideMessageCoach = async () => {
      setMessageCoach(!messagecoach)
    }

    const Message = (props) => {

      const userMessage = props.usermessage;

      let temp_val
      if (!props.time) {
        temp_val = '2022-12-07T04:40:23.156Z'
      } else {
        temp_val = props.time
      }

      const today = format(new Date(), 'MM/dd/yyyy');
      let created_at = format(new Date(temp_val), 'MM/dd/yyyy')

      let created_at_formatted

      if (today === created_at) {
        created_at_formatted = 'Today ' + format(new Date(temp_val), 'h:mmaaa')
      } else {
        created_at_formatted = format(new Date(temp_val), 'MM/dd h:mmaaa')
    }

      return (

        userMessage ? (

          /*
            User Message Format
          */
          <View style={{alignItems: 'flex-end', elevation: 20}}>
            <View style={{flexDirection: 'row', maxWidth: '70%'}}>
              <View style={{flex: 1, flexDirection: 'column', backgroundColor: '#FFF0B7', marginTop: 5, paddingLeft: 5}}>
                <View style={{padding: 5, paddingBottom: 0}}>
                    <Text style={{fontWeight: '500', flexShrink: 1, fontSize: 13}}>{props.username}</Text>
                </View>
                <View style={{flexDirection: 'row', padding: 5, paddingTop: 0, justifyContent: 'space-between'}}>
                  <View style={{flex: 1, paddingBottom: 5}}>
                    <Text style={{fontSize: 13, fontWeight: '300'}}>{props.message}</Text>
                  </View>
                  <View style={{justifyContent: 'flex-end'}}>
                    <Text style={{fontSize: 12, color: 'grey'}}>{created_at_formatted}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

        ) : (

          /*
            User Message Format
          */

          <View style={{flexDirection: 'row', padding: 5, maxWidth: '70%', elevation: 20}}>
            <View style={{flex: 1, flexDirection: 'column', backgroundColor: '#E1E2E2', marginTop: 5, paddingLeft: 5}}>
              <View style={{padding: 5, paddingBottom: 0}}>
                  <Text style={{fontWeight: '500', flexShrink: 1, fontSize: 13}}>{props.username}</Text>
              </View>
              <View style={{flexDirection: 'row', padding: 5, justifyContent: 'space-between'}}>
                <View style={{flex: 1, paddingBottom: 5}}>
                  <Text style={{fontSize: 13, fontWeight: '300'}}>{props.message}</Text>
                </View>
                <View style={{justifyContent: 'flex-end'}}>
                  <Text style={{fontSize: 12, color: 'grey'}}>{created_at_formatted}</Text>
                </View>
              </View>
            </View>
           </View>

        )
        
      )
      
    }

    const MessageSection = (props) => {

      let datadisplayed
      if (messages && user.id) {
        datadisplayed = messages.map((item, index) => {
  
            let message_id = item.id;
  
            const user_lookup = users.filter(
              pe => pe.id === item.sender_userid
            )
  
            //console.log(user_lookup)
  
            let user_name = user_lookup[0].name;
            let message_style = false
            
            if (item.sender_userid === user.id) {
              message_style = true
            }

            return (
              <Message key={message_id} usermessage={message_style} username={user_name} message={item.message} time={item.createdAt} />
            );
          })
    }
    
      return (
        <View>
          <View>
            {datadisplayed}
          </View>
        </View>
      )

      
    }

    const [link, setLink] = useState('');
    const [messagetext, setMessageText] = useState('');
  
    const sendMessage = async () => {

      if (messagetext != '') {
        //Insert
        try {

          const date = new Date().toISOString();

          //console.log(date)

          await DataStore.save(
            new Messages({
              message: messagetext,
              sender_userid: user.id,
              receiver_userid: 'ee8bb6eb-c9bc-47a9-87f4-f7dfe4d92813',
              createdAt: date
            })
          );

          //console.log("Message sent successfully!");
        } catch (error) {
          console.log("Error sending message", error);
        }

        
        //Refresh page
        setCommentRefresh(!commentrefresh)

        //Clear textbox
        setMessageText('')
      }
      
      
    }

    const windowheight = dimensions.window.height - 120

    const [inputbottommargin, setInputBottomMargin] = useState(50)

    return(
      <View style={{flex: 1, justifyContent: 'space-between'}}>
          <ScrollView ref={scrollViewRef}
                      onContentSizeChange={() =>
                        scrollViewRef.current.scrollToEnd({ animated: true })
                      }
                      refreshControl={
                        <RefreshControl
                          refreshing={refreshing}
                          onRefresh={onRefresh}
                        />
                      }>
            <MessageSection />
          </ScrollView>

          <View style={{flexDirection: 'row', padding: 3, paddingTop: 10, backgroundColor: activeColors.primary_bg, borderTopWidth: 1, borderColor: activeColors.secondary_text}}>
                <TextInput 
                multiline 
                value={messagetext} 
                onChangeText={setMessageText}
                placeholder={'Write a message'} 
                placeholderTextColor={activeColors.primary_text} 
                style={{flex: 1, borderRadius: 5,marginRight: 5, padding: 5, backgroundColor: activeColors.primary_bg, color: activeColors.secondary_text}}
              />
            <View style={{ justifyContent: 'flex-end'}}>
              <Pressable onPress={sendMessage} style={{height: 40, borderRadius: 5, padding: 10, paddingLeft: 20, paddingRight: 20, justifyContent: 'center', backgroundColor: '#E1AB09'}}>
                <Text>Send</Text>
              </Pressable>
            </View>
        
          </View>
        {/*
          <View style={{justifyContent: 'flex-end', flexDirection: 'row', padding: 3, borderTopColor: activeColors.primary_text, borderTopWidth: 1}}>
            
            <TextInput 
              multiline 
              value={messagetext} 
              onChangeText={setMessageText}
              placeholder={'Write a message'} 
              placeholderTextColor={activeColors.primary_text} 
              style={{flex: 1, borderRadius: 5,marginRight: 5, padding: 5, backgroundColor: activeColors.primary_bg, color: activeColors.secondary_text}}
            />
            <Pressable onPress={sendMessage} style={{borderRadius: 5, padding: 10, paddingLeft: 20, paddingRight: 20, justifyContent: 'center', backgroundColor: '#F8BE13'}} >
              <Text>Send</Text>
            </Pressable>
          </View>
        */}

      </View>
    )
  }

  const HomeScreen = () => {



    const addFoodPress = () => {
      setAddFood(!addfood)
      if (!addfood){
        setCurrentTitle('Add Food')
      } else {
        setCurrentTitle('')
      }
      
    }

    const weeklyCheckinPress = async () => {
      setWeeklyCheckin(!weeklycheckin)
      if (!weeklycheckin){
        setCurrentTitle('Weekly Check-in')
      } else {
        setCurrentTitle('')
      }
    }

    const messageCoachPress = async () => {
      setMessageCoach(!messagecoach)
      if (!messagecoach){
        setCurrentTitle('Message Coach')
      } else {
        setCurrentTitle('')
      }
    }



    return(
    <>
    {/*
      <Header navigation={navigation} title={currentTitle} navlocation='NutritionScreen' showbackbutton={true} showbuttons={false}/>
    */}
      <View style={{padding: 5, flex: 1}}>

        {addfood ? (
            <AddMealSnack />
          ) : (
            <>
            </>
          )}

        {weeklycheckin ? (
            <WeeklyCheckin />
          ) : (
            <>
            </>
          )}

        {messagecoach ? (
            <MessageCoach />
          ) : (
            <>
            </>
          )}
      </View>
        
        { /*  <HTTP Method>&<Request URL>&<Normalized Parameters>
        HTTP Methods (Get and POST)
        RequestURL: https://platform.fatsecret.com/rest/server.api */
        }

    </>
    )
  }

  const ArticlesWindow= () => {
    
    console.log('articles: ' + JSON.stringify(pdfFiles))

    const handlePDFPress = async (pdfKey) => {

      try {
        const url = await Storage.get(pdfKey);
        Linking.openURL(url)
          .catch((error) => {
            console.log('Error opening PDF: ', error);
            // Handle error if the PDF cannot be opened
          });
      } catch (error) {
        console.log('Error getting file URL: ', error);
        // Handle error if the file URL cannot be retrieved
      }
    };

    const PDFList = ({ pdfFiles, onPDFPress }) => {

      if (pdfFiles.length === 0) {
        return <Text>No PDF files available.</Text>;
      }



      return (
        <View>
          {pdfFiles.map((pdf, index) => (
            <View key={index} style={{padding: 10}}>
              <TouchableOpacity key={pdf.storage_path} onPress={() => onPDFPress(pdf.storage_path)} style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{justifyContent: 'space-around'}}>
                  <Text style={{color: activeColors.whiteblack}}>{pdf.title}</Text>
                  <Text style={{color: activeColors.primary_text}}>{pdf.desc}</Text>
                </View>
                <View style={{justifyContent: 'center'}}>
                  <Ionicons name='cloud-download-outline' style={{fontSize: 24, color: activeColors.primary_text}}/>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      );

            
      

    };

    return(
      <View style={{ width: '100%', backgroundColor: activeColors.primary_bg, padding: 5, height: '100%'}}>
            <Text style={{fontSize: 24, padding: 10, paddingBottom: 15, paddingLeft: 5,  fontWeight: '500', color: activeColors.primary_text, borderBottomColor: '#c9c9c9', borderBottomWidth: 1}}>Articles</Text>
            <ScrollView style={{backgroundColor: activeColors.primary_bg, width: '100%', marginBottom: 20}}>
                  {/*<Button title="Open PDF" onPress={handleOpenPDF} />*/}

                  {articles ? (
                    <PDFList pdfFiles={articles} onPDFPress={handlePDFPress} />
                    
                  ) : (
                    <Text>Loading articles...</Text>
                  )}

                <Pressable onPress={() =>  onGoToArticles('all')}>
                  <Text style={{alignSelf: 'center', paddingBottom: 10}} >...</Text>
                </Pressable>
            </ScrollView>
          {/*<Pressable 
            onPress={() => onGoToArticles('all')}
            style={{ width: '100%', backgroundColor: activeColors.primary_bg, color: 'white', alignItems: 'center', marginBottom: 10}}
           >
            <Text style={{fontWeight: '500', color: activeColors.primary_text}}>Click to view all articles</Text>
          </Pressable>*/}
        </View>
    )
  }

  const Controller = () => {
    
    if (showquestionaire) {
      return <Questionaire />;
    } else if (showeditwindow){

      //Activity loading trigger

      //console.log('this is the user info: ' + JSON.stringify(userinfo))
      /*
      if ((userinfo === null && nutritionNav != 'myinfo') || (!firstload && nutritionNav != 'myinfo')) {

            return (
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                  <ActivityIndicator />
              </View>
            );
      */
        return <EditWindow />;
    
    } else if (showarticles) {

      return <ArticlesWindow />;
    } else {

      return <HomeScreen />;
    }
  }

  /*
        Header and Button Functions
  */

    const goBackPress = async () => {
        navigation.navigate('NutritionScreen')
    }

    const onSearchPress = async () => {
        //console.log('Search button pressed')
        setShowSearch(false)
    };

    const onCancelPress = async () => {
        //console.log('Cancel button pressed')
        setShowSearch(true)
    };

    const onFilterPress = async () => {
        //console.log('Filter button pressed')  
        setModalVisible(!modalVisible)
    };

    function Header() {        
    
        return (
    
            showSearch ? (
                <View style={[styles.header, {backgroundColor: activeColors.primary_bg}]}>
                    <Pressable onPress={goBackPress}>
                        <Ionicons name='chevron-back-outline' style={{fontSize: 30, color: activeColors.primary_text}}/>
                    </Pressable>
                    <View>
                      <Text style={[styles.header_text, {color: activeColors.primary_text}]}>{headertitle}</Text>
                    </View>
                </View>
                ) : (
                
                <>
                </>

                )
            
            )
    }

    return(
      
      <SafeAreaView style={[Platform.OS === 'ios' && styles.marginTop, {flex: 1, backgroundColor: activeColors.primary_bg }]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : ''}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0}
          style={{
            borderRadius: 10,
            flex: 1,
            marginHorizontal: 10,

          }}>
            
          <View style={[styles.container, {backgroundColor: activeColors.primary_bg}]}>
            <Header />
            <Controller />
          </View>
        </KeyboardAvoidingView>      
      </SafeAreaView>
    );
}

const statusBarHeight = Constants.statusBarHeight

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    flexDirection: 'column',
    //marginTop: statusBarHeight,
    backgroundColor: '#EFEFEF',
    //alignItems: 'center'
  },
  marginTop: {
    marginTop: statusBarHeight,
  },
  //header
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: 'white',
    borderBottomColor: '#c9c9c9', 
    borderBottomWidth: 1
  },
  header_icon_container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10
    //marginRight: 10
  },
  header_text: {
    fontSize: 18,
    fontWeight: '500',
    //marginLeft: 10,
    color:'#363636',
    //backgroundColor: 'blue'
  },
  header_icons: {
    height: 27,
    width: 27,
    //marginLeft: 10
  },
  header_icons_filter: {
    height: 23,
    width: 23,
    //marginLeft:20
  },
  //Modal
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: 'column',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  alertModel: {
    //backgroundColor: 'white',
    height: '40%',
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  alertModelInfoSaved: {
    //backgroundColor: 'white',
    //height: '60%',
    //width: '90%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  alertModalText: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 50
  },
  modalHeader: {
    width: '95%',
    height: 40,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopEndRadius: 5,
    borderTopStartRadius: 5
  },
  modalBody: {
    width: '95%',
    height: 350,
    paddingTop: 20,
    backgroundColor: '#E3E3E3',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  modalFooter: {
    width: '95%',
    height: 60,
    backgroundColor: '#E3E3E3',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomEndRadius: 5,
    borderBottomStartRadius: 5
  },

  questionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    //alignItems: 'center',
    marginBottom: 5,
    backgroundColor: 'blue',
    paddingBottom: 0
  },

  //Expandable entry button
  expandentrybutton: {
    flexDirection: 'row', 
    width: '100%', 
    justifyContent: 'space-between', 
    borderBottomWidth: 1, 
    borderBottomColor: '#969696', 
    paddingBottom: 10,
    marginTop: 20
  },

  //DropDownLists
  ddlOutline: {
    backgroundColor: 'white',
    width: '70%',
    alignItems: 'center',
    borderRadius: 5,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  ddlFooter: {
    backgroundColor: 'lightblue',
    width: '70%',
    alignItems: 'center',
    padding: 20,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5
  },

  //DatePicker
  datePickerArrowsContainer: {
    //backgroundColor: '#EFEFEF',
    borderRadius: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 15,
    paddingTop: 15,
    width: 200
  },

  inputView: {
    backgroundColor: "#fff",
    borderRadius: 5,
    width: '90%',
    paddingLeft: 5,
    paddingTop: 2,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#BFBFBF', 
    color:'#363636', 
    paddingTop: 3, 
    paddingBottom: 3, 
    paddingLeft: 0, 
    width: 75, 
    marginBottom: 0
  },

});
