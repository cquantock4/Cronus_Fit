import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Dimensions, Modal } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Constants from 'expo-constants'

import { useIsFocused } from "@react-navigation/native";

import { DataStore, Amplify, Auth } from 'aws-amplify';
//import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { ScrollView } from 'react-native-gesture-handler';
import {useRoute} from '@react-navigation/native';

//import { Video, AVPlaybackStatus } from 'expo-av';

import { Articles, User} from '../../../models';

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

  const [userid, setUserID] = useState(undefined);
  const [articles, setArticles] = useState([]);

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

  }, [navigation, isFocused])

  async function loadData(){

    const articles = (await DataStore.query(Articles))

    setArticles(articles)

  }

  async function getUser(){

    try {
      const authUser = await Auth.currentAuthenticatedUser({bypassCache: true});
      //console.log(authUser.attributes.sub)
      //setAuthSub(authUser.attributes.sub)

     
      //Get local User Id for Query
      const user = await DataStore.query(User, sw =>
        sw.sub.eq(authUser.attributes.sub)
      )

      
     
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
  
        console.log(props.video_url)
  
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
  
  
  
    return(
      <View style={styles.displayCardContainerArticles}>
        <VideoDisplayModal />
        <View style={{ width: '100%', backgroundColor: activeColors.primary_bg, padding: 5, height: '100%'}}>
            <Text style={{fontSize: 24, padding: 10, paddingBottom: 15, paddingLeft: 5,  fontWeight: '500', color: activeColors.primary_text, borderBottomColor: '#c9c9c9', borderBottomWidth: 1}}>General eating/lifestyle guidelines</Text>
            <ScrollView style={{backgroundColor: activeColors.primary_bg, width: '100%', marginBottom: 20}}>
                { articles ? (
                    articles.map((item, index) => {
  
                        return (
                          <ArticleTitleContainer key={item.id} id={item.id} title={item.title} author={item.author} body={item.desc} date={item.date} video_YN={false} video_url={''}/>
                        );
                        
                      })
                    ) : (
                        <></>
                    )
                }
                <Pressable onPress={() =>  onGoToArticles('all')}>
                  <Text style={{alignSelf: 'center', paddingBottom: 10}} >...</Text>
                </Pressable>
            </ScrollView>
          <Pressable 
            onPress={() => onGoToArticles('all')}
            style={{ width: '100%', backgroundColor: activeColors.primary_bg, color: 'white', alignItems: 'center', marginBottom: 10}}
           >
            <Text style={{fontWeight: '500', color: activeColors.primary_text}}>Click to view all articles</Text>
          </Pressable>
        </View>
      </View>
    );
  
  }
  
  const NutritionCard = ({ navigation }) => {
    
  
    
    const onGoToCoachingPress = async () => {
      navigation.navigate('NutritionDetails', {value: 'newcoaching'})
      console.log('Go to Nutrition Details Screen')
    };
  
  
    const onGoToNutritionDetails = async (navitem) => {

      console.log('passing this value: ' + user)
      navigation.navigate('NutritionDetails', {value: navitem, user_id: user})
      console.log('Go to Nutrition Details Screen')
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
  

    return(
      <>
      <View style={[styles.container, {backgroundColor: activeColors.primary_bg}]}>
        <View style={[styles.header, {backgroundColor: activeColors.primary_bg}]}>
          <Text style={[styles.header_text, { color: activeColors.primary_text }]}>Nutrition</Text>
        </View>  
        <NutritionCard navigation={navigation} />
        <ArticlesCard navigation={navigation} />
      </View>
      </>
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
    backgroundColor: 'white',
    borderBottomColor: '#c9c9c9', 
    borderBottomWidth: 1
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
    marginBottom: 50,
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