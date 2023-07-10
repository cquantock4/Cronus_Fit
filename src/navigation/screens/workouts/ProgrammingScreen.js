import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Pressable, Linking } from 'react-native';
import Constants from 'expo-constants'
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Storage, DataStore } from 'aws-amplify';
import { Programs } from '../../../models';

import Header from '../../../components/ui/inputs/header';
import { SafeAreaView } from 'react-native-safe-area-context';
import {Badge, Switch } from "@react-native-material/core";

//Themes
import ThemeContext from '../../../components/ThemeContext'
import {colors} from '../../../../assets/styles/themes'


export default function ProgrammingScreen( {navigation} ) {

  const [showProgramView, setShowProgramView] = useState(false);
  const [downloadTrigger, setDownloadTrigger] = useState(false);
  const [cardTitle, setCardTitle] = useState('');
  const [downloadurl, setDownloadUrl] = useState('');
  const [cardID, setCardID] = useState('');
  const [cardDesc, setCardDesc] = useState('');
  const [programs, setPrograms] = useState(undefined);

  const [showsearch, setShowSearch] = useState(false);
  const [searchtext, setSearchText] = useState('');

  //Toggle
  const [isenabledfree, setIsEnabledFree] = useState(false);
  const [isenabledmyprograms, setIsEnabledMyPrograms] = useState(false);

  const toggleSwitchPrograms = () => setIsEnabledMyPrograms(previousState => !previousState);

  const toggleSwitchFree = async () => {
    setIsEnabledFree(previousState => !previousState);
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

 

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


    const workoutsub = DataStore.observeQuery(Programs).subscribe(() => getPrograms());


    return () => {
      workoutsub.unsubscribe();
    };


  }, []);

  async function listPDFFiles(folderPath, storagePaths) {

    try {
      const fileList = await Storage.list(folderPath, { level: 'public', pageSize: 10 });

      console.log(fileList)
      const pdfFiles = fileList.results.filter((file) => storagePaths.includes(file.key));

      //setPDFFiles(pdfFiles);
      console.log('PDF files:', pdfFiles);
    } catch (error) {
      console.error('Error listing PDF files:', error);
    }

  }
  
  async function getPrograms(){
    

    const this_program = await DataStore.query(Programs)

    setPrograms(this_program)

  }

  const onProgramCardPress = (id, cardtitle, desc, url) => {
    setShowProgramView(true)

    //Setting current card details
    setCardTitle(cardtitle)
    setCardID(id)
    setCardDesc(desc)
    setDownloadUrl(url ? url : '')

    //console.log(cardtitle)
  };


  const ProgramDisplayCard = (props) => {

    const curr_cardid = props.id;
    const curr_cardtitle = props.title;
    const curr_carddesc = props.desc;
    const curr_free = props.free;
    const curr_url = props.url;
    const curr_price = props.price;

    //console.log(curr_free)
  
    return(
      
      <Pressable style={[styles.programCard, {backgroundColor: activeColors.primary_bg, borderWidth: 2, borderColor: activeColors.secondary_bg}]} onPress={() => onProgramCardPress(curr_cardid, curr_cardtitle, curr_carddesc, curr_url)}>
          <View style={{backgroundColor: '#303030', alignItems: 'center', borderTopLeftRadius: 5, borderTopRightRadius: 5, padding: 5}}>
            <Text style={{color: activeColors.secondary_text, fontWeight: '500'}}>{curr_cardtitle}</Text> 
          </View>
          <View style={{padding: 5}}>
            <Text style={{color: activeColors.primary_text, lineHeight: 20}}>{truncateText(curr_carddesc, 75)}</Text>
          </View>
          
          <View style={{alignItems: 'flex-end', width: '100%', padding: 7, paddingRight: 10, borderBottomEndRadius: 5, borderBottomLeftRadius: 5}}>
              { curr_free ? (
                <Text style={{fontSize: 12}}>
                  <Badge label="FREE" color='green' labelStyle={{fontWeight: '500'}} />
                </Text>
              ) : (
                <Text style={{color: 'white', fontSize: 15, fontWeight: '500'}}>${curr_price}</Text>
              )}
              
          </View>
          
      </Pressable>
    )
  }

  const DownloadScreenDisplay = () => {

    const workoutDesc = 'This is a 25 week, 7 days a week, 45 minutes a day program with the “professional” in mind. For those who don’t have 2-3 hours a day to train, this program is for you. Each training day is meant to be completed within a 45 minute time block (not including warm up/cool down). It is a self-regulating program where you can load lifts based on how you feel and your goals. \n\n The primary focus of this program is to give you a succinct, well-rounded program that addresses all aspects of fitness to include cyclical endurance work, hypertrophy, strength development, high intensity conditioning, gymnastics, etc. This is a great base building program and is scalable to any individual’s needs. '


    const gobackPress = () => {
      setShowProgramView(false)
    }

    const onDownloadPress = async () => {
        console.log('Download Button pressed: ' + downloadurl)

        if (downloadurl !== '') {

          try {
            const url = await Storage.get(downloadurl);
            Linking.openURL(url)
              .catch((error) => {
                console.log('Error opening PDF: ', error);
                // Handle error if the PDF cannot be opened
              });
          } catch (error) {
            console.log('Error getting file URL: ', error);
            // Handle error if the file URL cannot be retrieved
          }
        }

    }

    return(
      <View>
        <View style={[styles.header, {backgroundColor: activeColors.primary_bg}]}>
          <Pressable onPress={gobackPress}>
                <Ionicons name='chevron-back-outline' style={{fontSize: 25, color: activeColors.primary_text}}/>
          </Pressable>
        </View>
        <View style={{padding: 20, alignItems: 'center'}}>
          <View style={{height: 300, marginBottom: 50, alignItems: 'center'}}>
            <Text style={{fontSize: 20, fontWeight: '500', marginBottom: 25, color: activeColors.primary_text}}>

              {cardTitle}

            </Text>
            <Text style={{textAlign: 'center', fontWeight: '400', color: activeColors.primary_text}}>

              {cardDesc}

            </Text>
          </View>
          <Pressable style={{padding: 15, backgroundColor: '#F8BE13', borderRadius: 5}} onPress={onDownloadPress}>
            <Text style={{color: '#363636', fontWeight: '500'}}>Purchase Workout</Text>
          </Pressable>
        </View>
        
        {downloadTrigger ? (
          <>
            {/*
              <WebView
              source={{ uri: 'http://www.africau.edu/images/default/sample.pdf' }}
              style={{ flex: 1 }}
              originWhitelist={["*"]}
              useWebKit
              />
              <WebView
              bounces={true}
              scrollEnabled={true} 
              source={{ uri: 'http://www.africau.edu/images/default/sample.pdf' }} />
            
            */}
          </>
        ) : (
          <></>
        )}
        
      </View>
    )
  }


    const handleSearch = (text) => {
      setSearchText(text);
      setShowSearch(true);
    };
    
    const handleCancelSearch = () => {
      setSearchText('');
      setShowSearch(false);
    };

    // Apply the "Free" filter
    const applyFreeFilter = (data) => {
      if (isenabledfree) {
        return data.filter((item) => item.free);
      }
      return data;
    };

    // Filter the list based on the search text and the "Free" toggle
    const filteredList = showsearch && programs
      ? applyFreeFilter(
          programs.filter(
            (item) =>
              item.title.toLowerCase().includes(searchtext.toLowerCase()) ||
              item.desc.toLowerCase().includes(searchtext.toLowerCase())
          )
        )
      : applyFreeFilter(programs);

    return (
      <SafeAreaView style={[styles.container, {backgroundColor: activeColors.primary_bg}]}>
        <Header title="Programs" searchable
        onSearch={handleSearch} 
        searchMode={showsearch}
        onCancelSearch={handleCancelSearch} />
        {showProgramView ? (
          <View style={[styles.container, Platform.OS === 'ios' && styles.marginTop, {backgroundColor: activeColors.primary_bg}]}>
            <DownloadScreenDisplay />
          </View>
        ) : (
          <>
        <View style={{padding: 5, flexDirection:'row', justifyContent: 'space-evenly'}}>
          <View style={styles.filter_expanded_row}>
            <View style={{justifyContent: 'center'}}>
              <Text style={{color: activeColors.primary_text}}>Free</Text>
            </View>
            <View style={{justifyContent: 'center'}}>
              <Switch
                //363636
                  trackColor={{ false: "#767577", true: "#363636" }}
                  thumbColor={isenabledfree ? "#F8BE13" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitchFree}
                  value={isenabledfree}
                />
            </View>
          </View>
          <View style={styles.filter_expanded_row}>
            <View style={{justifyContent: 'center'}}>
              <Text style={{color: activeColors.primary_text}}>My Programs</Text>
            </View>
            <View style={{justifyContent: 'center'}}>
              <Switch
                //363636
                  trackColor={{ false: "#767577", true: "#363636" }}
                  thumbColor={isenabledmyprograms ? "#F8BE13" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitchPrograms}
                  value={isenabledmyprograms}
                />
              </View>
          </View>
        </View>
        <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-evenly', flexWrap: 'wrap'}}>
            { filteredList ? (
                filteredList.map((item, index) => {
                  return (
                    <ProgramDisplayCard title={item.title} id={item.id} key={item.id} desc={item.desc} free={item.free} url={item.downloadurl} price={item.price}/>
                  );
                })
              ) : (
                <></>
              )
            } 
        </View> 
        </>
      )}
      </SafeAreaView>
    )

}

const statusBarHeight = Constants.statusBarHeight

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
  },  
  marginTop: {
    marginTop: statusBarHeight,
  },
  //header
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingTop: 15,
    paddingBottom: 15,
    //borderBottomColor: '#c9c9c9', 
    borderBottomWidth: 1
  },
  header_icon_container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10
    //marginRight: 10
  },
  header_text: {
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 10,
    color:'#363636',
    //backgroundColor: 'blue'
  },
  header_icon_container: {
    flexDirection: 'row',
    marginTop: 12
    //backgroundColor: 'blue',
  },
  header_icons: {
    height: 27,
    width: 27,
    marginBottom: 0,
    //backgroundColor: 'green',
    marginTop: 1,
    marginRight: 10
  },
  header_icons_filter: {
    height: 23,
    width: 23,
    marginTop: 3
  },

  //Filter Bar
  filter_expanded: {
    //position: 'absolute',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    paddingTop: 15,
    paddingBottom: 15,
    //backgroundColor: 'white',
    borderBottomColor: '#c9c9c9', 
    borderBottomWidth: 1
  },

 filter_expanded_row: {
  flexDirection: 'row',
  justifyContent: 'space-between',
 },


  programCard: {
    width: 150, 
    height: 175,
    margin: 10, 
    justifyContent: 'center',
    borderRadius: 7,
    justifyContent: 'space-between'
  },
  
});
