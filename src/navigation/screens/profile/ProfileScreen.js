import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import {Button, Pressable, ActivityIndicator, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useIsFocused } from '@react-navigation/native';


import { Bubble_Button} from '../../../components/ui/buttons'

import { Auth, DataStore, Storage } from 'aws-amplify';
import { User } from '../../../models';

import { onScreen } from '../../../components/constants'

import * as ImagePicker from 'expo-image-picker';

//Styles
//import style from '../../../assets/styles/style.scss';

//Themes
import ThemeContext from '../../../components/ThemeContext'
import {colors} from '../../../../assets/styles/themes'



export default function ProfileScreen( {navigation} ) {
  
  const isFocused = useIsFocused();

  //Data
  const [userdata, setUserData] = useState();
  const [user, setUser] = useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [fullname, setFullname] = useState();


  const [contacts, updateContacts] = useState([])

  //Images
  const [progressText, setProgressText] = useState('');
  const [isLoading, setisLoading] = useState(false);

  const [profileImage, setProfileImage] = useState(null);
  const [refresh, setRefresh] = useState(false);

  //Modal
  const [imagemodalvisible, setImageModalVisible] = useState(false);

  //Theme
  const theme = useContext(ThemeContext)
  const darkMode = theme.state.darkMode;

  let activeColors = ''

  if (darkMode) {
    activeColors = colors['dark'];
  } else {
    activeColors = colors['light'];
  }
    
  useEffect(() => {

    // Call only when screen open or when back on screen 
    //console.log(isFocused)
    if(isFocused){ 
        getUser();
    }

    //getUser();

  }, [isFocused, refresh]);


  async function getUser(){

    try {
      const authUser = await Auth.currentAuthenticatedUser({bypassCache: true});
      //console.log(authUser.attributes.sub)
      setUsername(authUser.username)

     
      //Get local User Id for Query
      const _user = await DataStore.query(User, sw =>
        sw.sub.eq(authUser.attributes.sub)
      )
    
      //console.log('Here we are: ' + JSON.stringify(user))
      //Query Matrix Table to find list of ids  
      if (_user[0]) {
        setUserData(_user)
        setUser(_user[0])
        setEmail(_user[0].email)
        setFullname(_user[0].name)

        setProfileImage(_user[0].image); 
      }

    
    } catch (e) {
      console.log('Error: ' + e)
    }

  }

  /*
     Image Upload Section
  */

     const pickImage = async () => {
      try {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          console.log('Permission to access media library denied');
          return;
        }
  
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
  
        if (!result.canceled) {
          // Upload the selected image to S3
          const uploadedImage = await uploadImage(result.assets[0].uri);
  
          // Update the user's profile image in the database
          await updateUserProfileImage(uploadedImage);
  
          // Update the profile image state
          setProfileImage(uploadedImage);
        }
      } catch (error) {
        console.log('Error picking image:', error);
      }
    };
  
    const uploadImage = async (imageUri) => {
      try {
        const response = await fetch(imageUri);
        const blob = await response.blob();
        const fileName = `profileimages/${Date.now()}.jpg`;
  
        // Upload the image to S3 bucket using Amplify Storage
        await Storage.put(fileName, blob, {
          contentType: 'image/jpeg',
        });
  
        // Get the public URL of the uploaded image
        const imageUrl = await Storage.get(fileName);
        return imageUrl;
      } catch (error) {
        console.log('Error uploading image:', error);
        throw error;
      }
    };
  
    const updateUserProfileImage = async (imageUrl) => {


      try {

        // Delete the current profile image from the S3 bucket
        if (user.image) {
          //const imageName = user.image.split('/').pop();

          const imageUrlParts = user.image.split('/');
          const imageNameWithParams = imageUrlParts.pop();
          const imageName = imageNameWithParams.split('?')[0];

          await Storage.remove(`profileimages/${imageName}`);
        }


        if (user) {
          DataStore.save(
            User.copyOf(user, (updated) => {
              updated.image = imageUrl
            })
          )
        }
        
        setRefresh(!refresh)

      } catch (error) {
        console.log('Error updating profile image:', error);
      }
    };

  /*
    Navigation
  */

  const onLogOutPress = async () => {
      await DataStore.clear();

      //DataStore.stop();
      //DataStore.clear();
      Auth.signOut();
  };

  const onSettingsPress = async () => {
      navigation.navigate('ProfileEditScreen', {title: 'settings'})
      //console.log('Go to Profile Screen')
  };

  const onChangePasswordPress = async () => {
      onScreen('ForgotPasswordScreen', navigation)()
  };

  const ProfileInfoEditButtons = ({title, value, onPress, navigation}) => {

      const onEditPress = async () => {
        //onScreen('ProfileEditScreen', navigation)()
        navigation.navigate('ProfileEditScreen', {title: title, value: value})
        //console.log('Go to Profile Screen')
      }
    
      return(
        <Pressable onPress={onEditPress} style={styles.pressableContainer}>
          <View style={styles.editButtonContainer}>
            <View style={styles.buttonTitle}>
              <Text style={{color: activeColors.primary_text}}>{title ? title : ''}</Text>
            </View>
            <View style={styles.valueArrowContainer}>
              <View style={styles.buttonContent}>
                <Text style={{marginBottom: 2, color: activeColors.primary_text}}>{value ? value : ''}</Text>
              </View>
              <View style={styles.buttonArrowContainer}>
                <Ionicons name='chevron-forward-outline' color='#363636' style={{fontSize: 25, color: activeColors.primary_text}}/>
              </View> 
            </View> 
          </View>
        </Pressable>
      );
    
  }

  return(
    <View style={[styles.container, Platform.OS === 'ios' && styles.marginTop, {backgroundColor: activeColors.primary_bg}]}>
        <View style={styles.topContainer}>
          <View style={styles.topLeftContainer}> 

            <TouchableOpacity onPress={pickImage} style={{justifyContent: 'center', alignItems: 'center'}}>
              {profileImage ? (
                <Image source={{ uri: profileImage }} style={styles.profile_image}/>
              ) : (
                <Image style={styles.profile_image} source={require('../../../../assets/images/AddProfileImage.png')} />
              )}
            </TouchableOpacity>

            {/*
              <Pressable onPress={pickImage} style={{justifyContent: 'center', alignItems: 'center'}}>
              {imageURI ? (
                isLoading ? (
                    <ActivityIndicator />
                ) : (
                  imageURI && <Image source={{ uri: imageURI }} style={styles.profile_image} />
                )
                
              ) : (
                <Image style={styles.profile_image} source={require('../../../../assets/images/AddProfileImage.png')} />
              )}
                
              </Pressable>
            */}

          </View>

          <View style={styles.topRightContainer}>
            {/*
            <View style={styles.topLogo}>
              <Image style={styles.header_logo} source={require('../../../assets/images/Cronus_Fit_CLean_Logo.png')} />
            </View>
          */}
            <View style={[styles.topText, {backgroundColor: activeColors.primary_bg}]}>
              <Text style={{marginBottom: 5, color: activeColors.primary_text}}>
                {fullname}
              </Text>
              <Text style={{color: activeColors.primary_text}}>
                {email}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.bottomContainerTop}>
            { userdata ? (

              userdata.map(item => (
                <View key={item.id}>
                  <ProfileInfoEditButtons title='Name' value={item.name} navigation={navigation}/>
                </View>
                  
              ))
            ) : (
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator />
              </View>
            )}
        </View>
        <View style={styles.bottomContainerBottom}>
            <Bubble_Button 
                text='Change Password'
                bgColor={activeColors.primary_bg}
                fgColor='#E1AB09'
                cstyle={{
                    width: '100%', 
                    flexDirection: 'row', 
                    padding: 5, 
                    paddingVertical: 15,
                    justifyContent: 'center', 
                    //backgroundColor:'white', 
                    borderBottomWidth: 1, 
                    borderBottomColor: '#C8C8C8'
                }}
                //cstyle={{width: '100%', marginBottom: 5,marginTop: 5}}
                tstyle={{fontWeight: '400', fontSize: 17}}
                onPress={onChangePasswordPress}
              />
            <Bubble_Button 
                text='Settings'
                bgColor={activeColors.primary_bg}
                fgColor={activeColors.primary_text}
                cstyle={{
                  width: '100%', 
                  flexDirection: 'row', 
                  padding: 5, 
                  paddingVertical: 15,
                  justifyContent: 'center', 
                  //backgroundColor:'white', 
                  borderBottomWidth: 1, 
                  borderBottomColor: '#C8C8C8'
              }}
                tstyle={{fontWeight: '400', fontSize: 17}}
                onPress={onSettingsPress}
              />
              <Bubble_Button 
                text='Logout'
                bgColor={activeColors.primary_bg}
                fgColor='#FF8080'
                onPress={onLogOutPress}
                cstyle={{
                  width: '100%', 
                  flexDirection: 'row', 
                  padding: 5, 
                  paddingVertical: 15,
                  justifyContent: 'center', 
                  //backgroundColor:'white', 
                  //borderBottomWidth: 1, 
                  //borderBottomColor: '#C8C8C8'
              }}
                tstyle={{fontWeight: '400', fontSize: 17}}
              />
        </View>
      </View>
        
  );
}

const statusBarHeight = Constants.statusBarHeight

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    flexDirection: 'column',
    //marginTop: statusBarHeight,
    backgroundColor: 'white'
  },  
  marginTop: {
    marginTop: statusBarHeight,
  },
  topContainer: {
    //flex: 1,
    height: 200,
    //backgroundColor: 'blue',
    padding: 10,
    flexDirection: 'row'
  },
  bottomContainerTop: {
    flex: 2,
    //backgroundColor: '#363636',
    padding: 5,
    alignItems: 'center',
  },
  bottomContainerBottom: {
    //flex: 1.75,
    //backgroundColor: 'white',
    padding: 15,
    marginBottom: 40,
    alignItems: 'center',
  },
  topLeftContainer: {
    flex:1,
    backgroundColor: 'white',
    paddingLeft: 0,
    justifyContent: 'center',
    //alignItems: 'center'
  },
  topRightContainer: {
    flex:1.25,
    //backgroundColor: 'yellow',
    flexDirection: 'column',
    padding: 5
  },
  topLogo: {
    flex: 1,
    //backgroundColor: 'blue',
    alignItems: 'flex-end',
  },
  topText: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    flexDirection: 'column',
    
  },

  //Top Section Items
  profile_image: {
    height: '100%',
    width: '100%'
  },
  header_logo: {
    height: '100%',
    width: '30%'
  },
  activity_wheel: {
    height: '100%',
    width: '30%',
    justifyContent: 'center', 
    alignItems: 'center'
  },

  //Edit Info buttons
  editButtonContainer: {
    width: '100%', 
    flexDirection: 'row', 
    padding: 5, 
    paddingVertical: 15,
    justifyContent: 'space-between', 
    //backgroundColor:'white', 
    borderBottomWidth: 1, 
    borderBottomColor: '#C8C8C8'
  },
  pressableContainer: {
    flexDirection: 'row',
  },

  buttonTitle: {
    //backgroundColor: 'blue',
    //color: 'white',
    alignSelf: 'flex-start'
  },
  valueArrowContainer: {
    flexDirection: 'row',
    //backgroundColor: 'blue'
  },
  buttonContent: {
    //backgroundColor: 'green',
    alignSelf: 'flex-end',
    marginRight: 20,
    marginBottom: 2,
    
  },
  buttonArrowContainer: {
    //backgroundColor: 'black'
    paddingTop: 0, 
    marginRight: 5
  },
  profileContentContainer: {
    flex: 1.5,
    backgroundColor: 'blue',
    padding: 15,
    alignItems: 'center',
  },
  profileOtherContainer: {
    flex: 1,
    backgroundColor: 'green',
    padding: 15,
    alignItems: 'center',
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
