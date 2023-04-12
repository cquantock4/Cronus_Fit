import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert, ScrollView } from 'react-native';

import { Auth } from 'aws-amplify';

import {useForm, Controller} from 'react-hook-form'

import { Bubble_Button, Button_Link } from '../../../components/ui/buttons'
import {BubbleTextInput} from "../../../components/ui/inputs"



const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const CreateAccountScreen = ( {navigation} ) => {

  const [loading, setLoading] = useState(false);


  //Handle Submit helps validate the fields
  const {control, handleSubmit, watch} = useForm();
  const pwd = watch('password')



  const onRegisterPressed = async(data) => {
    const {username, password, email, name} = data;

    setLoading(true);


    try {
      if (username, password, email, name) {
        await Auth.signUp({
          username,
          password,
          attributes: {email, name, preferred_username: username},
        });
  
        setLoading(false);

        navigation.navigate('ConfirmEmailScreen', {username, password})
      } else {
        Alert.alert('Oops', 'Fields are not completed')
      }
      
    } catch (e) {
      Alert.alert('Oops', e.message)
    }
  }

  const onGoToSignInPressed = async data => {
    navigation.navigate('LoginScreen')
    //console.log('onGoToSignInPressed')
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
    <View style={styles.container}>

      <Text style={styles.title}>Create Account</Text>

        <BubbleTextInput
          name="name"
          control={control}
          placeholder="Name"
          rules={{
            required: 'Name is required',
            minLength: {
              value: 3,
              message: 'Name should be at least 3 characters long',
            },
            maxLength: {
              value: 24,
              message: 'Name should be max 24 characters long',
            },
          }}
          vstyle={{borderWidth: 1,borderColor: '#BFBFBF', color:'#363636', paddingTop: 10, paddingBottom: 10}}
        />

        <BubbleTextInput
          name="username"
          control={control}
          placeholder="Email"
          rules={{
            required: 'Email is required',
            pattern: {value: EMAIL_REGEX, message: 'Email is invalid'},
          }}
          vstyle={{borderWidth: 1,borderColor: '#BFBFBF', color:'#363636', paddingTop: 10, paddingBottom: 10}}
        />

        {/*}
        <BubbleTextInput
          name="username"
          control={control}
          placeholder="Email"
          rules={{
            required: 'Email is required',
            minLength: {
              value: 3,
              message: 'Email should be at least 3 characters long',
            },
            maxLength: {
              value: 24,
              message: 'Email should be max 24 characters long',
            },
          }}
          vstyle={{borderWidth: 1,borderColor: '#BFBFBF', color:'#363636', paddingTop: 10, paddingBottom: 10}}
        />

        
        <BubbleTextInput
          name="email"
          control={control}
          placeholder="Email"
          rules={{
            required: 'Email is required',
            pattern: {value: EMAIL_REGEX, message: 'Email is invalid'},
          }}
          vstyle={{borderWidth: 1,borderColor: '#BFBFBF', color:'#363636', paddingTop: 10, paddingBottom: 10}}
        />
        */}

        <BubbleTextInput
          name="password"
          control={control}
          placeholder="Password"
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

        <BubbleTextInput
          name="password-repeat"
          control={control}
          placeholder="Repeat Password"
          secureTextEntry
          rules={{
            validate: value => value === pwd || 'Password do not match',
          }}
          vstyle={{borderWidth: 1,borderColor: '#BFBFBF', color:'#363636', paddingTop: 10, paddingBottom: 10}}
        />

        <Bubble_Button 
          text={loading ? 'Loading...' : "REGISTER"}
          onPress={handleSubmit(onRegisterPressed)}
          bgColor='#F8BE13'
        />

        <Button_Link 
          text={'Already have an account? Sign In'}
          onPress={onGoToSignInPressed}
        />

      </View>
      </ScrollView>
  );
};



const input_view_width = '70%';
const input_box_width= '90%';
const login_button_width = '50%';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //flexDirection: 'column',
    justifyContent: 'center',
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


export default CreateAccountScreen;


