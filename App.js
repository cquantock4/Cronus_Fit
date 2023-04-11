import 'expo-dev-client';

import 'core-js/full/symbol/async-iterator';
import '@azure/core-asynciterator-polyfill'; 

import React, { useContext } from 'react';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

//Themes
import { ThemeProvider } from "./src/components/ThemeContext";

//Main Navigation Controller
import Navigation from "./src/navigation"



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


  return (
      <ThemeProvider>
          <Navigation />
      </ThemeProvider>
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
