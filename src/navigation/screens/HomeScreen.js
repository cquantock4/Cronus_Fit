import React, { useState, useEffect, useContext } from 'react';
import {  Modal, Pressable, StyleSheet, Image, Linking,
  Text, View, ScrollView, ImageBackground, ActivityIndicator, Dimensions
} from 'react-native';
import Constants from 'expo-constants'

//Amplify DataStore
import { Amplify, Auth, DataStore, Hub, API } from 'aws-amplify';
import { User } from '../../../src/models';

//import { CardField } from '@stripe/stripe-react-native';
import PaymentScreen from '../../components/stripe'

//Styles
//import style from '../../assets/styles/style.scss';


//Themes
import ThemeContext from "../../components/ThemeContext"
import {colors} from "../../../assets/styles/themes"


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const Home_Block_Button = ({onPress, title_text, bgColor, fgColor, cstyle}) => {
  return (
    <Pressable
        onPress={onPress}
        style={[
            styles.pressable_area,
            bgColor ? {backgroundColor: bgColor} : {},
            cstyle ? cstyle : {},
        ]}>
        <Text
            style={[
              fgColor ? {color: fgColor} : {},
              ]}>
            {title_text}
        </Text>
    </Pressable>
  );
}


//Mobile App Setup Android
export default function HomeScreen( props, {navigation } ) {

  const [newuser, setNewUser] = useState(false);
  const [name, setName] = useState(undefined);
  const [sub, setAuthSub] = useState(undefined);
  const [showPayment, setShowPayment] = useState(false);

  const discordLogoWhite = require('./../../../assets/images/discord-logo-white.png');
  const discordLogoBlack = require('./../../../assets/images/discord-logo-black.png');

  //theming
  //const theme = {mode: "dark"}
  

  //const ThemeContext = React.createContext({})
  const theme = useContext(ThemeContext)
  const darkMode = theme.state.darkMode;

  let activeColors = ''

  if (darkMode) {
    activeColors = colors['dark'];
  } else {
    activeColors = colors['light'];
  }

  //console.log('dark mode: ' + darkMode)
  //console.log('activeColors: ' + JSON.stringify(activeColors))

  //Theming
  //const [darkMode, setDarkMode] = useState(false)
  //const [theme, setTheme] = useState("light")


  //Modal
  const [modalVisible, setModalVisible] = useState(false);

  
  useEffect(() => {
    //Amplify.DataStore.clear()
    
    if (newuser) {
      setModalVisible(true)
    }

    const fetchUsers = async () => {

      let temp_sub = ''

      //Get current authenticated user
      try {
        const authUser = await Auth.currentAuthenticatedUser({bypassCache: true});
        console.log('Here is the logged in user: ' + JSON.stringify(authUser))
        setAuthSub(authUser.attributes.sub)
        temp_sub = authUser.attributes.sub

      } catch (e) {
        setAuthSub(null);
      }

        //Query User table for 

        //const results = await DataStore.query(User, u => u.sub("eq", temp_sub));

        const results = await DataStore.query(User, (u) => u.sub.eq(temp_sub));

        let nameresult = results.map((item, index) => {
          return (
              item.name
          );
        })
        
        //Setting State Variable
        setName(nameresult)
        
    
    }
   
    fetchUsers();

  }, [sub]);


/*

  useEffect(() => {

    if (newuser) {
        setModalVisible(true)
    }


    getUser();

  }, []);

  async function getUser(){

    try {
      const authUser = await Auth.currentAuthenticatedUser({bypassCache: true});
      //console.log(authUser.attributes.sub)
      setAuthSub(authUser.attributes.sub)

     
      //Get local User Id for Query
      //const _user = await DataStore.query(User, sw =>
        //sw.sub('eq', authUser.attributes.sub)
      //)

      const _user = await DataStore.query(User, (u) => u.sub.eq(authUser.attributes.sub));
        
      //console.log(_user)
    
    } catch (e) {
      console.log('Error: ' + e)
    }

  }
  */

  const FirstTimeUserWelcome = () => {

    const onDismissPress = () => {
      setModalVisible(!modalVisible);
      setNewUser(false)
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
              <Text style={{fontSize: 20}}>Welcome to CronusFit!</Text>
              <Text>You will now be able to view all workouts and other information</Text>
              <Text>This is some more welcome information</Text>
              <Pressable style={styles.modalFooter} onPress={() => onDismissPress()}>
                <Text>Dismiss</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
    );
  
  }


  const Transparent_Background = () => {

    if (windowWidth > 300) {
      return <ImageBackground source={require('../../../assets/images/CenteredBackgroundImage_Large.png')} style={styles.image}></ImageBackground>
    }

    return <ImageBackground source={require('../../../assets/images/CenteredBackgroundImage_Large.png')} style={styles.image}></ImageBackground>

  
  }

  const openDiscord = () => {
    // Replace 'YOUR_DISCORD_SERVER_URL' with the actual URL of your Discord server
    console.log('pressed')
    const discordServerURL = 'https://discord.gg/s84FFvkE';
    Linking.openURL(discordServerURL);
  };

  //Activity loading trigger
  
  if (name === undefined) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  }
  
   
  {/*<View style={[styles.container, {backgroundColor: colors[theme].primary}]}>*/}
  {/*<View style={styles.container}></View>*/}
  return(
    <View style={[styles.container, Platform.OS === 'ios' && styles.marginTop, {backgroundColor: activeColors.primary_bg}]}>

     
      <FirstTimeUserWelcome />
      <ImageBackground source={require('../../../assets/images/CenteredBackgroundImage_Large.png')} style={styles.image}>
      
        {showPayment ? (
          <PaymentScreen />
        ) : (
          <>
            <View style={styles.header}>
              <Text style={{marginBottom: 10, color: activeColors.primary_text}}>Welcome, {name}!</Text>
            </View>

            <ScrollView style={{marginBottom: 50}}>
              <View style={{flexDirection: 'row', width: '100%', justifyContent: 'center', padding: 15}}>
                <View style={{marginBottom: 0,}}>
                  {/*<Switch value={darkMode} onValueChange={setTheme} />*/}
                  <Text style={{marginBottom: 20, color: activeColors.primary_text}}>BY RANGERS.</Text>
                  <Text style={{marginBottom: 20, marginLeft: 50, color: activeColors.primary_text}}>FOR RANGERS.</Text>
                  <Text style={{marginBottom: 0, marginLeft: 100, color: activeColors.primary_text}}>AND THOSE WHO DARE.</Text>
                </View>
              </View>

              
            
            </ScrollView>

            <Pressable onPress={() => setShowPayment(!showPayment)}  style={{backgroundColor: 'blue', padding: 5}}>
                <Text>Pay Now</Text>
            </Pressable>

            <Pressable style={styles.iconContainer} onPress={openDiscord}>
              <Text style={{color: activeColors.primary_text, fontWeight: '600', fontSize: 16}}>Find us on</Text>
              {darkMode ? ( 
                <Image source={discordLogoWhite} style={styles.icon} />
              ) : (
                <Image source={discordLogoBlack} style={styles.icon} />
              )}
              
            </Pressable>
          </>
        )}
          


      </ImageBackground>

      </View>
      
  );

}


//Allowing for space from the top of the status bar
const statusBarHeight = Constants.statusBarHeight

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    //justifyContent: 'space-between',
    alignItems: 'center',
    //marginTop: statusBarHeight,
    //backgroundColor: activeColors.primary
  },  
  icon: {
    width: '45%',
    height: 30,
    marginRight: 8,
    //tintColor: '#FEE75C', 
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  iconContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    marginBottom: 50
  },
  marginTop: {
    marginTop: statusBarHeight,
  },
  image: {
    height: '100%',
    width: '100%',
    //backgroundColor: 'blue',
    //alignContent: 'center',
    resizeMode: 'cover',
    marginBottom: statusBarHeight, //Fixing offset from status bar
    //justifyContent: 'space-between',
  },
  header: {
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 25,
    //marginBottom: 25,
    //marginTop: 25,
    alignItems: 'center', //Centered vertically
    backgroundColor: 'rgba(200, 200, 200, 0.0)'
  },
  header_text: {
    fontSize: 20,
    fontWeight: '500',
    marginLeft: 10,
  },
  pressable_area: {
    flex: 1,
    backgroundColor: 'white',
    margin: 5,
    borderRadius: 3,
    padding: 10
  },
  title_text: {
    fontSize: 18,
    fontWeight: '400',
    margin: 5
  },
  container_content: {
    width: '100%',
    backgroundColor: 'white',
    margin: 5,
    flex:1,
    padding: 70
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
  alertModalText: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 50
  },
  modalFooter: {
    width: '100%',
    height: 60,
    backgroundColor: '#E3E3E3',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomEndRadius: 5,
    borderBottomStartRadius: 5,
  },
});
