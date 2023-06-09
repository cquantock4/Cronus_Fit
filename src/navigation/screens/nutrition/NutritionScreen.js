import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Dimensions, Modal, Button, Linking, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Constants from 'expo-constants'
import * as Animatable from 'react-native-animatable';

import { PreventRemoveContext, useIsFocused } from "@react-navigation/native";

import { Bubble_Button} from '../../../components/ui/buttons'

import { DataStore, Amplify, Auth, Storage } from 'aws-amplify';
//import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { ScrollView } from 'react-native-gesture-handler';
import {useRoute} from '@react-navigation/native';

//import { Video, AVPlaybackStatus } from 'expo-av';

import { Articles, User, UserInfo, CheckListItems, UserCheckListItems} from '../../../models';

//Themes
import ThemeContext from '../../../components/ThemeContext'
import {colors} from '../../../../assets/styles/themes'

const windowHeight = Dimensions.get('window').height


//Mobile App Setup Android
export default function NutritionScreen( {navigation} ) {
  const route = useRoute();

  const [nutritioncoaching, setNutritionCoaching] = useState(undefined);
  const isFocused = useIsFocused();

  const [user, setUser] = useState([]);
  const [userinfo, setUserInfo] = useState(undefined);
  const [userchecklistItems, setUserChecklistItems] = useState([]);
  const [checklistItems, setChecklistItems] = useState([]);

  const [userid, setUserID] = useState(undefined);
  const [articles, setArticles] = useState([]);

  const [pdfFiles, setPDFFiles] = useState([]);

  const theme = useContext(ThemeContext)
  const darkMode = theme.state.darkMode;

  let activeColors = ''

  if (darkMode) {
    activeColors = colors['dark'];
  } else {
    activeColors = colors['light'];
  }


  useEffect(() => {
    getUser();
    const articlesub = DataStore.observeQuery(Articles).subscribe(() => loadData());
    
    return () => {
      articlesub.unsubscribe();
    };
  }, [navigation, isFocused]);

  async function loadData() {
    const articles = await DataStore.query(Articles);
    setArticles(articles);
    const storagePaths = articles.map((item) => item.storage_path);
    listPDFFiles('nutritionpdfs', storagePaths);
  }

  async function listPDFFiles(folderPath, storagePaths) {
    try {
      const fileList = await Storage.list(folderPath, { level: 'public', pageSize: 10 });
      const pdfFiles = fileList.results.filter((file) => storagePaths.includes(file.key));
      setPDFFiles(pdfFiles);
      console.log('PDF files:', pdfFiles);
    } catch (error) {
      console.error('Error listing PDF files:', error);
    }
  }

  /*
  async function loadData(){

    const articles = (await DataStore.query(Articles))

    console.log('Articles: ' + JSON.stringify(articles))

    const storagePaths = articles.map((item) => item.storage_path);

    setArticles(articles)

    const listPDFFiles = async (folderPath) => {
      try {
        const fileList = await Storage.list(folderPath, { level: 'public', pageSize: 10 });

        console.log(fileList)

        const pdfFiles = fileList.results.filter((file) =>
          storagePaths.includes(file.key)
        );

        setPDFFiles(pdfFiles);

        console.log('PDF files:', pdfFiles);
      } catch (error) {
        console.error('Error listing PDF files:', error);
      }
    };

    listPDFFiles('nutritionpdfs')

  }
  */

  async function getUser(){

    try {
      const authUser = await Auth.currentAuthenticatedUser({bypassCache: true});
      //console.log(authUser.attributes.sub)
      //setAuthSub(authUser.attributes.sub)

     
      //Get local User Id for Query
      const user = await DataStore.query(User, sw =>
        sw.sub.eq(authUser.attributes.sub)
      )

      console.log('this is the user: ' + JSON.stringify(user))
      

      if (user[0]) {

        console.log(user[0].id)
        const userInfo = await DataStore.query(UserInfo, sw =>
          sw.userInfoUserId.eq(user[0].id)
        )

        console.log('This is the user info: ' + JSON.stringify(userInfo))
        
        if (userInfo) {
          // Use the 'userInfo' object as needed
          setUserInfo(userInfo[0])
        }

        //Grab the user check list items here
        //const userChecklistItems = await DataStore.query(CheckListItems);

        //console.log('checklist items: ' + JSON.stringify(userChecklistItems))

        const userChecklistItems = await DataStore.query(UserCheckListItems, (item) =>
          item.userId.eq(user[0].id)
        );

        setUserChecklistItems(userChecklistItems)

        const checklistItemIds = userChecklistItems.map((item) => item.checkListItemsId);

        const fetchedChecklistItems = await Promise.all(
          checklistItemIds.map((itemId) => DataStore.query(CheckListItems, itemId))
        );

        setChecklistItems(fetchedChecklistItems);

        console.log('checklist items: ' + JSON.stringify(fetchedChecklistItems))

        //setChecklistItems(userChecklistItems);

      }
     
      //Query Matrix Table to find list of ids  
      if (user[0]) {
        //Set state variable
        setUser(user[0])
        setUserID(user[0].id)
        //console.log(user[0])
        setNutritionCoaching(user[0].nutrition_coaching)
      }
    } catch (e) {
      console.log('Error: ' + e)
    }

  }

  /*
  const ArticlesCard = ({ navigation }) => {
  
    
    const [currenturl, setCurrentUrl] = useState("");  
    //Modal
    const [modalVisible, setModalVisible] = useState(false);
  
    //Video
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});
  
    
  
    const VideoDisplayModal = () => {
  
      const onDismissPress = () => {
        setModalVisible(!modalVisible);
        //setNewUser(false)
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
              <View style={styles.alertModel}>
               <Text>{currenturl}</Text>
              </View>
            </View>
          </Modal>
        );
  
    } 
    
  
    const onGoToArticles = (navItem) => {
      navigation.navigate('NutritionArticleDetails', {value: navItem})

    };
  
  
    const ArticleTitleContainer = (props) => {
  
      const articleid = props.id
      const video_YN = props.video_YN
  
      
      //const [navItem, setNavItem] = useState('');
  
      const onVideoPress = () => {
        setModalVisible(!modalVisible);
        setCurrentUrl(props.video_url)
  
        //console.log(props.video_url)
  
        status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
      };
  
      return (
  
        // /onPress={() => status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()}
        <View>
          { video_YN ? (
            <>
              
              <Pressable style={{borderBottomWidth: 1, borderBottomColor: '#E6E6E6', padding: 5, flex: 1}} onPress={() => onVideoPress()}>
                <Text style={{fontSize: 15, fontWeight: '500', color: activeColors.primary_text, marginBottom: 5}}>{props.title}</Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  <Text style={{fontSize: 12, fontWeight: '500' , color: activeColors.accent_text, marginTop: 10}}>Click to watch video</Text>
                  <Text style={{fontSize: 10, fontWeight: '400' , color: activeColors.accent_text, marginTop: 15}}>{props.author} - {props.date}</Text>
                </View>
              </Pressable>
            </>
          ) : (
            
            <Pressable style={{borderBottomWidth: 1, borderBottomColor: '#E6E6E6', padding: 5, flex: 1}} onPress={() => onGoToArticles(articleid)}>
              <Text style={{fontSize: 15, fontWeight: '500', color: activeColors.primary_text, marginBottom: 5}}>{props.title}</Text>
              <Text style={{fontSize: 12, fontWeight: '300' , color: activeColors.primary_text}}>{props.body.slice(0, 200)}...</Text>
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{fontSize: 12, fontWeight: '500' , color: activeColors.accent_text, marginTop: 10}}>Click to Read More</Text>
                <Text style={{fontSize: 10, fontWeight: '400' , color: activeColors.accent_text, marginTop: 15}}>{props.author} - {props.date}</Text>
              </View>
            </Pressable>
          )}
        </View>
      
        
      )
    }


    const handleOpenPDF = () => {
      const pdfURL = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';

      Linking.openURL(pdfURL)
        .catch((error) => {
          console.log('Error opening PDF: ', error);
          // Handle error if the PDF cannot be opened
        });
    };

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

      console.log('this: ' + JSON.stringify(pdfFiles))
      console.log('this2: ' + pdfFiles.length)

      if (pdfFiles.length === 0) {
        return <Text>No PDF files available.</Text>;
      }



      return (
        <View>
          {pdfFiles.map((pdf, index) => (
            <View style={{padding: 10}}>
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
      <View style={styles.displayCardContainerArticles}>
        <VideoDisplayModal />
        <View style={{ width: '100%', backgroundColor: activeColors.primary_bg, padding: 5, height: '100%'}}>
            <Text style={{fontSize: 24, padding: 10, paddingBottom: 15, paddingLeft: 5,  fontWeight: '500', color: activeColors.primary_text, borderBottomColor: '#c9c9c9', borderBottomWidth: 1}}>General eating/lifestyle guidelines</Text>
            <ScrollView style={{backgroundColor: activeColors.primary_bg, width: '100%', marginBottom: 20}}>

                  {articles.length === 0 ? (
                    <Text>Loading articles...</Text>
                  ) : (
                    <PDFList pdfFiles={articles} onPDFPress={handlePDFPress} />
                  )}

                <Pressable onPress={() =>  onGoToArticles('all')}>
                  <Text style={{alignSelf: 'center', paddingBottom: 10}} >...</Text>
                </Pressable>
            </ScrollView>
        </View>
      </View>
    );
  
  }
  */
  
  const NutritionCard = ({ navigation }) => {
    
    const onGoToCoachingPress = async () => {
      navigation.navigate('NutritionDetails', {value: 'newcoaching'})
      //console.log('Go to Nutrition Details Screen')
    };
  
  
    return(
      <View style={styles.displayCardContainer}>
        {nutritioncoaching ? (
          <View style={{flexDirection: 'column', backgroundColor: activeColors.inverted_bg_alt, width: '100%'}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 1}}>
              {/*
                <Pressable onPress={() => onGoToNutritionDetails('checkin')} style={{ backgroundColor:'#F8BE13', borderRadius: 5, padding: 20, width: '49%', flexDirection:'row', justifyContent: 'space-between'}}>
                  <Text style={{color: '#363636', fontWeight: '500'}}> Check-In </Text>
                  <Ionicons name='chevron-forward-outline' style={{fontSize: 20}}/>
                </Pressable>
              */}
              <Pressable onPress={() => onGoToNutritionDetails('checkin')} style={{backgroundColor: activeColors.primary_bg, borderBottomColor: '#c9c9c9', borderBottomWidth: 1, padding: 25, width: '49.8%', flexDirection:'row', justifyContent: 'space-between'}}>
                <Text style={{color: activeColors.primary_text, fontWeight: '400', fontSize: 18}}> Check-In </Text>
                <Ionicons name='chevron-forward-outline' style={{fontSize: 24, color: activeColors.primary_text}}/>
              </Pressable>
  
              <Pressable onPress={() => onGoToNutritionDetails('addfood')} style={{backgroundColor: activeColors.primary_bg, borderBottomColor: '#c9c9c9', borderBottomWidth: 1, padding: 25, width: '49.8%', flexDirection:'row', justifyContent: 'space-between'}}>
                <Text style={{color: activeColors.primary_text, fontWeight: '400', fontSize: 18}}> Add Food </Text>
                <Ionicons name='chevron-forward-outline' style={{fontSize: 24, color: activeColors.primary_text}}/>
              </Pressable>
            </View>
  
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Pressable onPress={() => onGoToNutritionDetails('myinfo')} style={{backgroundColor: activeColors.primary_bg, borderBottomColor: '#c9c9c9', borderBottomWidth: 1, padding: 25, width: '49.8%', flexDirection:'row', justifyContent: 'space-between'}}>
              <Text style={{color: activeColors.primary_text, fontWeight: '400', fontSize: 18}}> My Info </Text>
              <Ionicons name='chevron-forward-outline' style={{fontSize: 24, color: activeColors.primary_text}}/>
            </Pressable>
  
            <Pressable onPress={() => onGoToNutritionDetails('messages')} style={{backgroundColor: activeColors.primary_bg, borderBottomColor: '#c9c9c9', borderBottomWidth: 1, padding: 25, width: '49.8%', flexDirection:'row', justifyContent: 'space-between'}}>
              <Text style={{color: activeColors.primary_text, fontWeight: '400', fontSize: 18}}> Messages </Text>
              <Ionicons name='chevron-forward-outline' style={{fontSize: 24, color: activeColors.primary_text}}/>
            </Pressable>
            </View>
          </View>
         ) : (
          
          <Pressable 
            onPress={onGoToCoachingPress}
            style={{ width: '100%',  color: '#363636', alignItems: 'center', paddingBottom: 20, paddingTop: 20, borderBottomColor: '#c9c9c9', borderBottomWidth: 1, backgroundColor: activeColors.primary_bg}}>
            <Text style={{fontSize: 21, marginBottom: 10, fontWeight: '500', color: activeColors.primary_text}}>Macro coaching and accountability</Text>
            <Text style={{fontSize: 13, marginBottom: 10, fontWeight: '500', color: activeColors.primary_text}}>Includes additional videos/articles for these members only</Text>
            <Text style={{fontSize: 12, fontWeight: '400', color: activeColors.primary_text}}>Click to see if coaching is right for you</Text>
          </Pressable>
  
        )}
      
      </View>
    );
  
  }

  const onGoToNutritionDetails = async (navitem) => {

    //console.log('passing this value: ' + user)
    navigation.navigate('NutritionDetails', {value: navitem, user_id: user})
    //console.log('Go to Nutrition Details Screen')
  };
  

  const onGoToCoachingPress = async () => {
    navigation.navigate('NutritionDetails', {value: 'newcoaching'})
    //console.log('Go to Nutrition Details Screen')
  };

  const icons = [
    { name: 'checkmark-done-outline', label: 'Check-in', path: 'checkin' },
    { name: 'document-text-outline', label: 'Reports' },
    { name: 'information-circle-outline', label: 'My Info', path: 'myinfo' },
    { name: 'fast-food-outline', label: 'Add Food', path: 'addfood' },
    { name: 'newspaper-outline', label: 'Articles', path: 'articles' },
  ];

  const renderIcons = () => {
    return icons.map((icon, index) => (
      <TouchableOpacity key={index} style={styles.iconContainer} onPress={() => onGoToNutritionDetails(icon.path)}>
        <Ionicons name={icon.name} size={30} color={activeColors.primary_text} />
        <Text style={{color: activeColors.primary_text}}>{icon.label}</Text>
      </TouchableOpacity>
    ));
  };

  const GoalMacrosView = () => {

    return (
      <>
      {userinfo ? (
        <View style={styles.mcontainer}>
        <View style={{alignItems: 'center', justifyContent: 'center', marginBottom: 20}}>
          <Text style={[styles.macrosheading, {color: activeColors.primary_text}]}>Macro Goals</Text>
        </View>
        <View style={styles.macrosContainer}>
          <View style={styles.macroItem}>
            <Text style={[styles.macroLabel, {color: activeColors.primary_text}]}>Protein</Text>
            <Text style={[styles.macroValue, {color: activeColors.primary_text}]}>{userinfo.goal_protein ? userinfo.goal_protein + ' g' : '-'}</Text>
          </View>
          <View style={styles.macroItem}>
            <Text style={[styles.macroLabel, {color: activeColors.primary_text}]}>Carbs</Text>
            <Text style={[styles.macroValue, {color: activeColors.primary_text}]}>{userinfo.goal_carb ? userinfo.goal_carb + ' g' : '-'}</Text>
          </View>
          <View style={styles.macroItem}>
            <Text style={[styles.macroLabel, {color: activeColors.primary_text}]}>Fat</Text>
            <Text style={[styles.macroValue, {color: activeColors.primary_text}]}>{userinfo.goal_fat ? userinfo.goal_fat + ' g' : '-'}</Text>
          </View>
          <View style={styles.macroItem}>
            <Text style={[styles.macroLabel, {color: activeColors.primary_text}]}>Fiber</Text>
            <Text style={[styles.macroValue, {color: activeColors.primary_text}]}>{userinfo.goal_fiber ? userinfo.goal_fiber + ' g' : '-'}</Text>
          </View>
        </View>
      </View>
      ) : (
        <View>
          <Text>Loading...</Text>
        </View>
      )}

    </>
      
    );
  };



  const ChecklistItem = ({ item, onCheck }) => {
    const [isChecked, setIsChecked] = useState(false);
  
    const handleCheck = () => {
      setIsChecked(!isChecked);
    };
  
    const handleAnimationEnd = () => {
      if (isChecked) {
        onCheck(item.id);
      }
    };
  
    return (

      <Animatable.View
        style={[styles.itemContainer, isChecked && styles.hiddenItem, {backgroundColor: 'rgba(248, 190, 19, 0.25)'}]}
        animation={isChecked ? 'fadeOutLeft' : null}
        onAnimationEnd={handleAnimationEnd}
      >
        <Text style={[styles.itemText, {color: activeColors.primary_text}]}>{item.value}</Text>
        <TouchableOpacity style={styles.checkbox} onPress={handleCheck} activeOpacity={0.8}>
          {isChecked ? (
            <Ionicons name="checkmark-circle" size={24} color="green" />
          ) : (
            <Ionicons name="checkmark-circle-outline" size={24} color={activeColors.primary_text} />
          )}
        </TouchableOpacity>
      </Animatable.View>
    );
  };
  

  
  const Checklist = ({ items }) => {
    const [checkedItems, setCheckedItems] = useState([]);
  
    const handleCheckItem = async (itemId) => {

      console.log(itemId + ' ' + JSON.stringify(user.id))
      setCheckedItems((prevCheckedItems) => [...prevCheckedItems, itemId]);


      const filteredItems = userchecklistItems.filter((item) =>
        item.userId === user.id && item.checkListItemsId === itemId
      );

      
      if (filteredItems.length > 0) {
        await DataStore.delete(filteredItems[0]);
        setChecklistItems(checklistItems.filter((item) => item.id !== itemId));
      }
      

    };
  
    const visibleItems = items.filter((item) => !checkedItems.includes(item.id));
  
    return (
      <View style={styles.checklistcontainer}>
        {visibleItems.map((item) => (
          <ChecklistItem key={item.id} item={item} onCheck={handleCheckItem} />
        ))}
      </View>
    );
  };
  

  const items = [
    { id: 1, label: 'Weekly Check in' },
    { id: 2, label: 'View Report from last week' },
    { id: 3, label: 'Upload Progress Pictures' },
    // Add more items as needed
  ];

  const Dashboard = () => {


    return(
      <>
      {nutritioncoaching ? (
        <>
          <View style={{flex: 0.23}}>
            <GoalMacrosView />
          </View>
          <View style={[styles.iconGrid, {flex: 0.3}]}>
            {renderIcons()}
          </View>
          <View style={{flex: 0.42}}>
            <Checklist items={checklistItems} />
          </View>
        </>

      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
           <View style={{color: '#363636', alignItems: 'center', width: '75%', marginBottom: 50}}>
              <Text style={{textAlign: 'center', fontSize: 25, marginBottom: 50, fontWeight: '500', color: activeColors.whiteblack}}>Macro Coaching and Accountability</Text>
              <Text style={{textAlign: 'center', fontSize: 20, marginBottom: 10, fontWeight: '400', color: activeColors.primary_text}}>Log Your Daily Food Intake</Text>
              <Text style={{textAlign: 'center', fontSize: 20, marginBottom: 10, fontWeight: '400', color: activeColors.primary_text}}>Daily Macro Goals</Text>
              <Text style={{textAlign: 'center', fontSize: 20, marginBottom: 10, fontWeight: '400', color: activeColors.primary_text}}>Weekly Check-ins</Text>
              <Text style={{textAlign: 'center', fontSize: 20, marginBottom: 10, fontWeight: '400', color: activeColors.primary_text}}>Private Coach Messaging and much more</Text>
            </View>
            <Bubble_Button 
              text="Let''s Go"
              onPress={onGoToCoachingPress}
              cstyle={{width: '100%'}}
              bgColor='#F8BE13'
              fgColor='#363636'
              />
        </View>
      )}
      </>
    )
  }

  return (
    <View style={[styles.container, Platform.OS === 'ios' && styles.marginTop, {backgroundColor: activeColors.primary_bg}]}>
        <View style={[styles.header, {backgroundColor: activeColors.primary_bg}]}>
          <View>
            <Text style={[styles.header_text, { color: activeColors.primary_text }]}>Nutrition</Text>
          </View>
          {nutritioncoaching ? (
          <Pressable onPress={() => onGoToNutritionDetails('messages')}>
            <Ionicons name='chatbox-outline' size={25} color={activeColors.primary_text} />
          </Pressable>
          ) : (
            <></>
          )}
        </View>  

        <Dashboard />

        {/*(nutritioncoaching === undefined) ? (
          <View>
            <Text style={{color: activeColors.primary_text}}>Loading...</Text>
            <ArticlesCard navigation={navigation} />
          </View>
        ) : (

          <Dashboard />
          

        )*/}
         

       

    </View>
  );

    return(
      <View style={[styles.container, Platform.OS === 'ios' && styles.marginTop, {backgroundColor: activeColors.primary_bg}]}>
        <View style={[styles.header, {backgroundColor: activeColors.primary_bg}]}>
          <Text style={[styles.header_text, { color: activeColors.primary_text }]}>Nutrition</Text>
        </View>  
        <NutritionCard navigation={navigation} />
        <ArticlesCard navigation={navigation} />
      </View>
    );


}

const statusBarHeight = Constants.statusBarHeight

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 10,
    paddingVertical: 20,
    //backgroundColor: '#fff',
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  iconContainer: {
    width: '32%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  mcontainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  macrosheading: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  macrosContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  macroItem: {
    alignItems: 'center',
  },
  macroLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  macroValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  //checklist
  checklistcontainer: {
    flex: 1,
    //padding: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  checkbox: {
    width: 27,
    height: 27,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    fontSize: 18,
    color: 'green',
  },
  itemText: {
    marginLeft: 8,
    fontSize: 16,
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
    backgroundColor: 'white',
    borderBottomColor: '#c9c9c9', 
    borderBottomWidth: 1,
    marginBottom: 10
  },
  header_text: {
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 10,
    color:'#363636',
  },
  displayCardContainer: {
    //flex: 1,
    //padding: 5,
    width: '100%',
    alignItems: 'center',
    //marginTop: 10,
    //padding: 5,
    //backgroundColor: 'blue'
    //marginBottom: 10
  },
  displayCardContainerArticles: {
    flex: 1,
    //padding: 5,
    width: '100%',
    //height: '50%',
    alignItems: 'center',
    backgroundColor: 'white'
    //backgroundColor: 'blue',
    //maxHeight: '60%',
    //paddingBottom: 50
    //overflow: "hidden",
    //flexGrow: 1,
    //height: '100%'
  },
  cardHeader: {
    alignSelf: 'center', 
    marginTop: 15, 
    fontWeight: '600',
    fontSize: 20
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
    backgroundColor: 'white',
    height: '90%',
    width: '90%',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 30
  },

})