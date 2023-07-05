import 'expo-dev-client';

import 'core-js/full/symbol/async-iterator';
import '@azure/core-asynciterator-polyfill'; 

import React, { useContext } from 'react';
import Constants from 'expo-constants'
import { StripeProvider } from '@stripe/stripe-react-native';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

import { SafeAreaProvider } from 'react-native-safe-area-context';

//Themes
import { ThemeProvider } from "./src/components/ThemeContext"

//Main Navigation Controller
import Navigation from "./src/navigation"
import {Provider} from "@react-native-material/core";


//Amplify imports
import { ExpoSQLiteAdapter } from '@aws-amplify/datastore-storage-adapter/ExpoSQLiteAdapter';
import { Amplify, DataStore, Auth } from 'aws-amplify';
import awsExports from './src/aws-exports.js';



Amplify.configure({
  ...awsExports,
  Analytics: {
   disabled: true,
  },
 });


export default function App() {

  const stripePublishableKey = Constants.expoConfig.extra.stripePublishableKey;


  return (
    <SafeAreaProvider>
      <StripeProvider
        publishableKey={stripePublishableKey}>
        <Provider>
          <ThemeProvider>
              <Navigation />
          </ThemeProvider>
        </Provider>
      </StripeProvider>
    </SafeAreaProvider>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
