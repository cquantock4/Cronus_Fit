import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Alert } from 'react-native';


import {useForm} from 'react-hook-form';
//import { Bubble_Button, Button_Link } from '../../src/components/ui/buttons'
//import { BubbleTextInput } from '../../src/components/ui/inputs'

//import { Amplify, Auth, DataStore } from 'aws-amplify';
//import { onScreen } from '../../src/components/constants'



const LoginScreen = ( {navigation} ) => {

  const [loading, setLoading] = useState(false);
  //Handle Submit helps validate the fields
  const {control, handleSubmit, formState: {errors}} = useForm();

  
  return (
    
      <View style={styles.container}>
      
        <View>   
          <Image style={styles.image} source={require('../../../../assets/images/cronusfit_base.png')} />
        </View>

      {/*}
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

       */}
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


