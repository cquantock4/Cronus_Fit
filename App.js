import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

//Themes
import { ThemeProvider } from "./src/components/ThemeContext";

//Main Navigation Controller
import Navigation from "./src/navigation"


//Amplify imports
import { Amplify } from 'aws-amplify';
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
      <StatusBar style="auto" />
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
