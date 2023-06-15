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

  const [image, setImage] = useState();
  const [imagekey, setImageKey] = useState();
  const [imageURI, setImageURI] = useState(undefined);

  const [profileImage, setProfileImage] = useState(null);


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
    console.log(isFocused)
    if(isFocused){ 
        getUser();
    }

    //getUser();

  }, [isFocused]);

/*
  useEffect(() => {

    if (image) {
      console.log('running this')
      uploadResource()
    }
    

  }, [image]);
  */

  async function getUser(){

    try {
      const authUser = await Auth.currentAuthenticatedUser({bypassCache: true});
      //console.log(authUser.attributes.sub)
      setUsername(authUser.username)

     
      //Get local User Id for Query
      const _user = await DataStore.query(User, sw =>
        sw.sub.eq(authUser.attributes.sub)
      )

      console.log(_user)
    
      //console.log('Here we are: ' + JSON.stringify(user))
      //Query Matrix Table to find list of ids  
      if (_user[0]) {
        setUserData(_user)
        setUser(_user[0])
        setEmail(_user[0].email)
        setFullname(_user[0].name)
        console.log('setting the imageurl to: ' + _user[0].image)

        setProfileImage(_user[0].image);
        
        setImageURI(_user[0].image)
        setImageKey(_user[0].image_uri)
      }

    
    } catch (e) {
      console.log('Error: ' + e)
    }

  }
  /*
  useEffect(() => {
    /*
    const fetchUsers = () => {
      //Get current authenticated user
      try {
        const authUser =  Auth.currentAuthenticatedUser({bypassCache: true});
        setUsername(authUser.username)

        const _user =  DataStore.query(User , (w) => w.sub("eq", authUser.attributes.sub))

        setUserData(_user)
        setUser(_user[0])

        if (_user[0]) {
          setEmail(_user[0].email)
          setFullname(_user[0].name)
          setImageURI(_user[0].image)

        }
       
      } catch (e) {
        setUsername(null);
      }
     
    }
   
    fetchUsers();   
     

    //if (image) {
      
      //uploadResource()
    //}
    

  }, [userdata, user]);
  */

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

        console.log('updating User profile image')

      try {

        if (user) {
          DataStore.save(
            User.copyOf(user, (updated) => {
              updated.image = imageUrl
            })
          )
        }
        

      } catch (error) {
        console.log('Error updating profile image:', error);
      }
    };

  /*
  const pickImage = async () => {


    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });


    console.log(result);

    if (!result.canceled) {
      //console.log('This is the delete key: **************: ' + imagekey);

      await Storage.remove(imagekey);

      setImage(result);
      setImageKey(result.assets[0].uri);
      console.log('uploading resource: ' + result.assets[0].uri)
    }

   

  };

  const updateProfileImage = (temp_img_url) => {

    //console.log('here')



    if (temp_img_url) {

      try {

        console.log('updating the profile image: ' + temp_img_url)

        //const authUser =  Auth.currentAuthenticatedUser({bypassCache: true});

        //console.log(authUser)

        //const original = DataStore.query(User , (w) => w.sub("eq", authUser.attributes.sub))


        //console.log(original[0])

        //Exclude objects
        //let result = Object.values(original[0].User).filter( x => typeof x != "object")
        //let result = Object.values(original[0])
        
        DataStore.save(
          User.copyOf(user, (updated) => {
            updated.image = temp_img_url
          })
        )

        //update

        //('image saved')
        

      } catch (err) {
        console.log('Error: ' + err)
      }
    }

  }

  const fetchResourceFromURI = async uri => {
    const response = await fetch(uri);
    //console.log(JSON.stringify(response));
    const blob = await response.blob();
    return blob;
  };

  const uploadResource = async () => {
    //console.log(isLoading)
    if (isLoading) return;

    setisLoading(true);
    
    //console.log('we made it here')



    //console.log(image)
    const img = await fetchResourceFromURI(image.assets[0].uri);

    console.log(img)

    const path = 'profileimages/';
    //const fileName = user.name.replace(/\s+/g, '')+ '_profileImage.jpeg';
    const fileName = `${path}${Date.now()}-${file.name}`;

    console.log(fileName)

    let temp_img_url = ''    

    return Storage.put(fileName, img, {
      level: 'public',
      contentType: image.assets[0].type,
      progressCallback(uploadProgress) {

        setProgressText(
          ` ${Math.round(
            (uploadProgress.loaded / uploadProgress.total) * 100,
          )} %`,
        );

        console.log(
          `Progress: ${uploadProgress.loaded}/${uploadProgress.total}`,
        );

      },
    })
      .then(res => {
        setProgressText('');
        //setImage(null);

        //console.log('This is the key ---**:: ' + res.key)

        Storage.get(res.key)
          .then(result => {

            console.log('here is the result: ' + JSON.stringify(result))
            //console.log('made it here too')

            setImageURI(result)

            temp_img_url = result

            //console.log('Updating Profile image')
            updateProfileImage(temp_img_url);

            //console.log(result)
            //updateProfileImage()
          })
          .catch(err => {
            setProgressText('Upload Error');
            //console.log(err);
          });

          setisLoading(false);

          

      })
      .catch(err => {
        setisLoading(false);
        setProgressText('Upload Error');
        //console.log(err);
      });


      
  };
  */

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
