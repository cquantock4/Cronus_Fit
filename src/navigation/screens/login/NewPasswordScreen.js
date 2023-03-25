import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';

import {useForm} from 'react-hook-form';
import {useRoute} from '@react-navigation/native';

//Amplify
import {Auth} from 'aws-amplify';

import { Bubble_Button, Button_Link } from '../../../components/ui/buttons'
import {BubbleTextInput} from "../../../components/ui/inputs"


const NewPasswordScreen = ( { navigation } ) => {
  //const {control, handleSubmit} = useForm();
  const route = useRoute();
  const {control, handleSubmit, watch} = useForm({
    defaultValues: {username: route?.params?.username},
  });

  const username = watch('username');

  const onSubmitPressed = async data => {
    try {
      await Auth.forgotPasswordSubmit(data.username, data.code, data.password);
      //Add Confirmation Alert
      Alert.alert('Success', 'Password Updated');

      navigation.navigate('LoginScreen');
    } catch (e) {
      Alert.alert('Oops', e.message);
    }
  };

  const onSignInPress = () => {
    navigation.navigate('LoginScreen');
  };

  return (
      <View style={styles.container}>
        <Text style={styles.title}>Reset your password</Text>

        <BubbleTextInput
          placeholder="Username"
          name="username"
          control={control}
          rules={{required: 'Username is required'}}
          vstyle={{borderWidth: 1,borderColor: '#BFBFBF', color:'#363636', paddingTop: 10, paddingBottom: 10}}
        />

        <BubbleTextInput
          placeholder="Code"
          name="code"
          control={control}
          rules={{required: 'Code is required'}}
          vstyle={{borderWidth: 1,borderColor: '#BFBFBF', color:'#363636', paddingTop: 10, paddingBottom: 10}}
        />

        <BubbleTextInput
          placeholder="Enter your new password"
          name="password"
          control={control}
          secureTextEntry
          rules={{
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password should be at least 8 characters long',
            },
          }}
          vstyle={{borderWidth: 1,borderColor: '#BFBFBF', color:'#363636', paddingTop: 10, paddingBottom: 10}}
        />

        <Bubble_Button 
          text="Submit" 
          onPress={handleSubmit(onSubmitPressed)} 
          bgColor="#F8BE13"
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
    paddingTop: '20%',
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

export default NewPasswordScreen;