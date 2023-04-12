import React, {useState} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {useForm} from 'react-hook-form';
import {useRoute} from '@react-navigation/native';

import { Bubble_Button, Button_Link } from '../../../components/ui/buttons'
import {BubbleTextInput} from "../../../components/ui/inputs"


//Amplify imports
import { DataStore, Auth } from 'aws-amplify';

import { User } from "../../../models";



const ConfirmEmailScreen = ( {navigation} ) => {
  const route = useRoute();
  const {control, handleSubmit, watch} = useForm({
    defaultValues: {username: route?.params?.username},
  });

  const username = watch('username');

  const [loading, setLoading] = useState(false);

  const onConfirmPressed = async data => {
    try {

      setLoading(true)
      await Auth.confirmSignUp(data.username, data.code);
      //Add Confirmation Alert
      Alert.alert('Success', 'Account successfully created');

      //Auto Login
      try{


        await Auth.signIn(route?.params?.username, route?.params?.password);

        //Get Auth User
        const authUser = await Auth.currentAuthenticatedUser({bypassCache: true});

        //console.log(authUser)


        //Create User in table
        
        await DataStore.save(
            new User({
            "name": authUser.attributes.name,
            "email": authUser.attributes.email,
            "sub": authUser.attributes.sub
          })  
        );
      


      } catch (e) {
        Alert.alert('Oops', e.message)
      }


      setLoading(false)
      
      //navigation.navigate('LoginScreen', {username});
    } catch (e) {
      Alert.alert('Oops', e.message);
    }
  };

  const onSignInPress = () => {
    navigation.navigate('LoginScreen');
  };

  const onResendPress = async () => {
    try {
      await Auth.resendSignUp(username);
      Alert.alert('Success', 'Code was resent to your email');
    } catch (e) {
      Alert.alert('Oops', e.message);
    }
  };



  return (
      <View style={styles.container}>
        <Text style={styles.title}>Confirm your email</Text>

        {/*
        <CustomInput
          name="username"
          control={control}
          placeholder="Username"
          rules={{
            required: 'Username code is required',
          }}
        />
        */}

        
        <BubbleTextInput
          name="code"
          control={control}
          placeholder="Enter your confirmation code"
          rules={{
            required: 'Confirmation code is required',
          }}
          vstyle={{borderWidth: 1,borderColor: '#BFBFBF', color:'#363636', paddingTop: 10, paddingBottom: 10}}
        />

        <Bubble_Button 
          text={loading ? 'Loading...' : "CONFIRM"}
          onPress={handleSubmit(onConfirmPressed)} 
          bgColor="#F8BE13"
          />

        <Button_Link
          text="Resend code"
          onPress={onResendPress}
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

export default ConfirmEmailScreen;