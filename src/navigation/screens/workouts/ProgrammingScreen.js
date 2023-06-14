import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Image, Switch, TextInput, Pressable, Linking } from 'react-native';
import Constants from 'expo-constants'
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Storage, Auth, DataStore, Hub } from 'aws-amplify';
import { Programs } from '../../../models';

import {useRoute} from '@react-navigation/native';

//Themes
import ThemeContext from '../../../components/ThemeContext'
import {colors} from '../../../../assets/styles/themes'


export default function ProgrammingScreen( {navigation} ) {
  const route = useRoute();

  const [showProgramView, setShowProgramView] = useState(false);
  const [downloadTrigger, setDownloadTrigger] = useState(false);
  const [cardTitle, setCardTitle] = useState('');
  const [downloadurl, setDownloadUrl] = useState('');
  const [cardID, setCardID] = useState('');
  const [cardDesc, setCardDesc] = useState('');

  //Search Filtering
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [showSearch, setShowSearch] = useState(true);
  const [filterexpand, setFilterExpand] = useState(false);

  //Toggles
  //Toggle
  const [isenabledfree, setIsEnabledFree] = useState(false);
  const [isenabledmyprograms, setIsEnabledMyPrograms] = useState(false);
  //const toggleSwitchFree = () => setIsEnabledFree(previousState => !previousState);
  const toggleSwitchPrograms = () => setIsEnabledMyPrograms(previousState => !previousState);

  const toggleSwitchFree = async () => {

    searchFilterFunction('', !isenabledfree)
    setIsEnabledFree(previousState => !previousState);

  };

 const [programs, setPrograms] = useState(undefined);

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
      
    //console.log(workoutcategory)

    const this_program = await DataStore.query(Programs)

    console.log(this_program)

    setPrograms(this_program)

    //Gather Storage Paths
    //const storagePaths = this_program.map((item) => item.downloadurl);
    //console.log(storagePaths)
    //listPDFFiles('programs', storagePaths);

    setFilteredDataSource(this_program);
    setMasterDataSource(this_program);


    

  }

  const searchFilterFunction = (text, free) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {

        // Applying filter for the inserted text in search bar
        const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();

        const textData = text.toUpperCase();

        return (itemData.indexOf(textData) > -1);
      });

      setFilteredDataSource(newData);
      setSearch(text);

    } else {

      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);

    }

    if (free) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {

        const freeData = item.free ? true : false;

        return freeData;
      });

      setFilteredDataSource(newData);

    } else {

      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);

    }
  };

  
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

    //console.log(curr_free)
  
    return(
      
      <Pressable style={styles.programCard} onPress={() => onProgramCardPress(curr_cardid, curr_cardtitle, curr_carddesc, curr_url)}>
          <Text style={{color: 'white', marginTop: 10}}>{curr_cardtitle}</Text> 
          <Image style={styles.cardLogo} source={require('../../../../assets/images/Cronus_Fit_Clean_Logo.png')} />

          <View style={{alignItems: 'flex-end', width: '100%', padding: 7, paddingRight: 10, borderBottomEndRadius: 5, borderBottomLeftRadius: 5}}>
              { curr_free ? (
                <Text style={{color: 'white', fontSize: 10, fontWeight: '500'}}>
                  FREE
                </Text>
              ) : (
                <Text style={{color: 'white', fontSize: 10, fontWeight: '500'}}></Text>
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

    /*
        Header and Button Functions
    */

    const goBackPress = async () => {
        navigation.navigate('FitnessScreen')
        //console.log('Go to Profile Screen')
    }

    const onSearchPress = async () => {
        //console.log('Search button pressed')
        setShowSearch(false)
    };

    const onCancelPress = async () => {
        //console.log('Cancel button pressed')
        setShowSearch(true)
    };


    const clearFilters = () => {

      //Clear Search
      searchFilterFunction('', false)

      //Set Toggles back to false
      setIsEnabledFree(false);
      setIsEnabledMyPrograms(false);

      //Hide filter window
      setFilterExpand(!filterexpand)
  
    };

  function Header() {        
  
    return (
          <View>
            <View style={[styles.header, {backgroundColor: activeColors.primary_bg}]}>
                <Pressable onPress={goBackPress}>
                    <Ionicons name='chevron-back-outline' style={{fontSize: 30, color: activeColors.primary_text}}/>
                </Pressable>
                <View>
                    <Text style={[styles.header_text, {color: activeColors.primary_text}]}>Programs</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Pressable style={{padding: 5}} onPress={onSearchPress}>
                        { darkMode ? <Image style={styles.header_icons} source={require('../../../../assets/images/Search-White.png')} /> : <Image style={styles.header_icons} source={require('../../../../assets/images/Search-Black.png')} />}
                    </Pressable>
                    <Pressable style={{padding: 5}} onPress={() => setFilterExpand(!filterexpand)}>
                        { darkMode ? <Image style={styles.header_icons_filter} source={require('../../../../assets/images/Filter-icon-white.png')}/> : <Image style={styles.header_icons_filter} source={require('../../../../assets/images/Filter-icon-black.png')}/>}
                    </Pressable>
                    </View>
            </View>

            { filterexpand ? (
              <View style={[styles.filter_expanded, {backgroundColor: activeColors.secondary_bg}]}>
                <View style={styles.filter_expanded_row}>
                  <Text style={{color: activeColors.primary_text}}>Free</Text>
                    <Switch
                      //363636
                        trackColor={{ false: "#767577", true: "#363636" }}
                        thumbColor={isenabledfree ? "#F8BE13" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitchFree}
                        value={isenabledfree}
                        style={{marginTop: -5}}
                      />
                </View>
                <View style={styles.filter_expanded_row}>
                  <Text style={{color: activeColors.primary_text}}>My Programs</Text>
                  <Switch
                      //363636
                        trackColor={{ false: "#767577", true: "#363636" }}
                        thumbColor={isenabledmyprograms ? "#F8BE13" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitchPrograms}
                        value={isenabledmyprograms}
                        style={{marginTop: -5}}
                      />
                </View>
                <Pressable onPress={clearFilters}>
                  <Text style={{color: activeColors.primary_text}}>Clear</Text>
                </Pressable>
              </View>
                
            ) : (
              <></>
            )}
          </View>


        
      )
    }


    

    
    return(
      <>
      {showProgramView ? (
        <View style={[styles.container, Platform.OS === 'ios' && styles.marginTop, {backgroundColor: activeColors.primary_bg}]}>
          <DownloadScreenDisplay />
        </View>
      ) : (
        <View style={[styles.container, Platform.OS === 'ios' && styles.marginTop, {backgroundColor: activeColors.primary_bg}]}>
            { showSearch ? (
              <Header />
            ) : (
              <View>
                <View style={[styles.header, {backgroundColor: activeColors.primary_bg, color: activeColors.primary_text}]}>
                      <TextInput
                        style={[styles.searchBar, {color: activeColors.primary_text}]}
                        onChangeText={(text) => searchFilterFunction(text, false)}
                        value={search}
                        underlineColorAndroid="transparent"
                        placeholder="Search here"
                        placeholderTextColor={activeColors.primary_text}
                      />
                      <Pressable onPress={onCancelPress} style={{marginRight: 5}}>
                        <Text style={{fontSize: 14, color: activeColors.primary_text}}>Cancel</Text>
                      </Pressable>
                </View>

              </View>
            )}
            
  
              <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-evenly', flexWrap: 'wrap'}}>
                    { filteredDataSource ? (
                        filteredDataSource.map((item, index) => {
                          return (
                            <ProgramDisplayCard title={item.title} id={item.id} key={item.id} desc={item.desc} free={item.free} url={item.downloadurl}/>
                          );
                        })
                      ) : (
                        <></>
                      )
                    } 
              </View> 
              
        </View>
      )}
      </>
      
    );
}

const statusBarHeight = Constants.statusBarHeight

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    flexDirection: 'column',
    //marginTop: statusBarHeight,
    //backgroundColor: 'white',
    //alignItems: 'center',
    //backgroundColor: 'blue'
    //paddingTop: 40
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
  width: '70%',
  marginVertical: 10
 },


  programCard: {
    width: 150, 
    height: 200, 
    backgroundColor: '#363636', 
    margin: 10, 
    alignItems: 'center', 
    justifyContent: 'center',
    borderRadius: 10,
    justifyContent: 'space-between'
  },
  cardLogo: {
    height: 125,
    width: 75,
    marginBottom: 5
  }
  
});
