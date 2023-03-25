import React, { useInsertionEffect, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Alert, Pressable } from 'react-native';


import {useForm} from 'react-hook-form';
import { Bubble_Button, Button_Link } from '../../../components/ui/buttons'
import {BubbleTextInput} from "../../../components/ui/inputs"
//import { BubbleTextInput } from '../../../src/components/ui/inputs'

import { Amplify, Auth, DataStore } from 'aws-amplify';
import { onScreen } from '../../../components/constants'

import { User } from "../../../models"


const LoginScreen = ( {navigation} ) => {

  const [loading, setLoading] = useState(false);
  //Handle Submit helps validate the fields
  const {control, handleSubmit, formState: {errors}} = useForm();


  const onSignInPressed = async (data) => {

    if (loading){
      return;
    }

    setLoading(true);

    
    try{
      const response = await Auth.signIn(data.username, data.password);
      console.log(response)

    } catch (e) {
      Alert.alert('Oops', 'Username and Password are incorrect')
    }


    setLoading(false);

  }

  


  const onForgotPasswordPressed = () => {
    onScreen('ForgotPasswordScreen', navigation)()
    //navigation.navigate('ForgotPasswordScreen')
    console.log('Forgot Password')
  }

  const onSignUpPressed = () => {
    
    onScreen('CreateAccountScreen', navigation)()
    //navigation.navigate('CreateAccountScreen')
    console.log('CreateAccountScreen')
  }


  return (
    
      <View style={styles.container}>
      
        <View>   
          <Image style={styles.image} source={require('../../../../assets/images/cronusfit_base.png')} />
        </View>

        <BubbleTextInput
          name='username'
          placeholder='Email'
          control={control} 
          vstyle={{borderWidth: 1,borderColor: '#BFBFBF', color:'#363636', paddingTop: 10, paddingBottom: 10}}
        />

        <BubbleTextInput
          name='password'
          placeholder='Password'
          control={control} 
          vstyle={{borderWidth: 1,borderColor: '#BFBFBF', color:'#363636', paddingTop: 10, paddingBottom: 10}}
          secureTextEntry
        />


        <Bubble_Button 
          text={loading ? 'Loading...' : "LOGIN"}
          onPress={handleSubmit(onSignInPressed)}
          bgColor='#F8BE13'
          fgColor='#363636'
        />

        <Button_Link 
          text={'Forgot Password?'}
          onPress={onForgotPasswordPressed}
        />

        <Button_Link 
          text={'Sign Up?'}
          onPress={onSignUpPressed}
        />

       
  </View>

  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '30%',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    marginBottom: 20,
    width:150,
    height:150
  }
});


export default LoginScreen;


