import React, {useState} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';

import { Bubble_Button, Button_Link } from '../../../components/ui/buttons'
import {BubbleTextInput} from "../../../components/ui/inputs"

import {useForm} from 'react-hook-form';
import {Auth} from 'aws-amplify';



const ForgotPasswordScreen = ( { navigation } ) => {
  //const {control, handleSubmit} = useForm();

  const {control, handleSubmit, watch} = useForm();
  const username = watch('username')


  const onSendPressed = async data => {
    try {
      if (data.username) {
        await Auth.forgotPassword(data.username);
        navigation.navigate('NewPasswordScreen', {username});
      } else {
        Alert.alert('Oops', 'Username incorrect');
      }
      //const response = 
      //console.log(response)
    } catch (e) {
      Alert.alert('Oops', 'Username incorrect');
    }
  };

  const onSignInPress = () => {
    navigation.navigate('LoginScreen');
  };

  return (
  
    <View style={styles.container}>
          <Text style={styles.title}>Reset your password</Text>
          

          <BubbleTextInput
            name="username"
            control={control}
            placeholder="Username"
            rules={{
              required: 'Username is required',
            }}
            vstyle={{borderWidth: 1,borderColor: '#BFBFBF', color:'#363636', paddingTop: 10, paddingBottom: 10}}
          />

          <Bubble_Button 
          text="Send" 
          onPress={handleSubmit(onSendPressed)}
          bgColor='#F8BE13'
          />

          <Button_Link
            text="Back to Sign in"
            onPress={onSignInPress}
          />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '30%',
    //flexDirection: 'column',
    //justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: '400',
    color: '#000000',
    margin: 20,
  },
});

export default ForgotPasswordScreen;