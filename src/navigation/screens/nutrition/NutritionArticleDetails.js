import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, ScrollView } from 'react-native';
import { TextInput,Pressable, FlatList, useWindowDimensions } from 'react-native';
import Constants from 'expo-constants'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useRoute} from '@react-navigation/native';
import {useForm} from 'react-hook-form';


//import Header from '../../../ui/components/headers/header'

import { Amplify, Auth, DataStore, Hub } from 'aws-amplify';
import { Articles } from '../../../models';

//Themes
import ThemeContext from '../../../components/ThemeContext'
import {colors} from '../../../../assets/styles/themes'


export default function NutritionArticlesDetails( {navigation} ) {
    const route = useRoute();
    const {control, handleSubmit, formState: {errors}} = useForm();
    const [articles, setArticles] = useState();
    const [singlearticle, setSingleArticle] = useState();

    //Search Filtering
    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);
    const [showsearch, setShowSearch] = useState(false);

    const [currarticleid, setCurrArticleId] = useState(route?.params?.value);

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

      if (currarticleid === 'all') {
        setShowSearch(true);
      }

      const articlessub = DataStore.observeQuery(Articles).subscribe(() => fetchArticles());


      return () => {
        articlessub.unsubscribe();
      };


    }, [currarticleid]);



    async function fetchArticles () {

        const results = (await DataStore.query(Articles)).filter(
          pe => pe.id === currarticleid
        )
      

        let datadisplayed = results.map((item, index) => {

          return (
                <ArticleContentContainer key={item.id} title={item.title} body={item.desc} />
            );
        })

        setArticles(datadisplayed)

    }
    

     /*
      Search
    */
      useEffect(() => {

        const subs = DataStore.observeQuery(Articles).subscribe((snapshot) => {
          //isSynced can be used to show a loading spinner when the list is being loaded. 
          const { items, isSynced } = snapshot;
  
          //console.log(items)
  
          //setWorkouts(items)
  
          setFilteredDataSource(items);
          setMasterDataSource(items);
          
        });
  
  
        return () => {
          subs.unsubscribe();
        };
  
      }, []);

    const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
        // Inserted text is not blank
        // Filter the masterDataSource and update FilteredDataSource
        const newData = masterDataSource.filter(function (item) {

        // Applying filter for the inserted text in search bar
        const itemData = item.title
            ? item.title.toUpperCase()
            : ''.toUpperCase();

        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
        });

        setFilteredDataSource(newData);
        setSearch(text);

    } else {

        // Inserted text is blank
        // Update FilteredDataSource with masterDataSource
        setFilteredDataSource(masterDataSource);
        setSearch(text);

    }
    };

    const ItemView = ({ item }) => {

    const articleid = item.id
    const title = item.title

    const goToArticlePress = () => {

      setCurrArticleId(articleid)
      setShowSearch(false)
        
    }


      return (
        <Pressable style={{borderBottomWidth: 1, borderBottomColor: '#E6E6E6', padding: 5, paddingVertical: 10, flex: 1}} onPress={goToArticlePress}>
          <Text style={{fontSize: 15, fontWeight: '500', color: activeColors.primary_text, marginBottom: 5}}>{title}</Text>
          <Text style={{fontSize: 12, fontWeight: '300' , color: activeColors.primary_text}}>{item.desc.slice(0, 200)}...</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontSize: 12, fontWeight: '500' , color: activeColors.accent_text, marginTop: 10}}>Click to Read More</Text>
            <Text style={{fontSize: 10, fontWeight: '400' , color: activeColors.accent_text, marginTop: 15}}>{item.author} - {item.date}</Text>
          </View>
        </Pressable>
      
        
      )
    };

    const ItemSeparatorView = () => {
    return (
        // Flat List Item Separator
        <View
        style={{
            height: 0.5,
            width: '100%',
            backgroundColor: '#C8C8C8',
        }}
        />
    );
    };


    const onGoToArticles = (navitem) => {
     
      setCurrArticleId(navitem)
      setShowSearch(false)

      //console.log(nutritionNav)
      //console.log(navitem)
    }
    

    const ArticleTitleContainer = (props) => {

      const articleid = props.id
      const title = props.title

      //console.log(title)
      //const [navItem, setNavItem] = useState('');
  
      return (
        <Pressable style={{borderBottomWidth: 1, borderBottomColor: '#E6E6E6', padding: 5, paddingVertical: 10, flex: 1}} onPress={() => onGoToArticles(articleid)}>
          <Text style={{fontSize: 15, fontWeight: '500', color: '#363636', marginBottom: 5}}>{title}</Text>
          <Text style={{fontSize: 12, fontWeight: '300' , color: '#363636'}}>{props.body.slice(0, 200)}...</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontSize: 12, fontWeight: '500' , color: '#E1AB09', marginTop: 10}}>Click to Read More</Text>
            <Text style={{fontSize: 10, fontWeight: '400' , color: '#E1AB09', marginTop: 15}}>{props.author} - {props.date}</Text>
          </View>
        </Pressable>
      
        
      )
    }


    const ArticleContentContainer = (props) => {

      return (
        <View style={{padding: 10, paddingTop: 25}}>
          <View style={{marginBottom: 10}}>
            <Text style={{fontSize: 20, lineHeight: 30, fontWeight: '500', textAlign: 'left', marginBottom: 10, color: activeColors.primary_text}}>{props.title}</Text>
          </View>
          <View>
            <Text style={{fontWeight: '300', fontSize: 15, lineHeight: 25, textAlign: 'left',  color: activeColors.primary_text}}>{props.body}</Text>
          </View>
        </View>
      )

    }


    /*
        Header and Button Functions
    */

    const goBackPress = async () => {
        navigation.navigate('NutritionScreen')
        //console.log('Go to Profile Screen')
    }

    const onSearchPress = async () => {
        //console.log('Search button pressed')
        setShowSearch(true)
    };

    const onCancelPress = async () => {
        //console.log('Cancel button pressed')
        //console.log(articles)
        
        if (articles.length === 0 ) {
          navigation.navigate('NutritionScreen')
        }
        
        setShowSearch(false)
        
    };

    const onFilterPress = async () => {
        //console.log('Filter button pressed')  
        setModalVisible(!modalVisible)
    };

    function Header() {        
    
        return (
    
            showsearch ? (
                    <></>
                ) : (
                    <View style={[styles.header, {backgroundColor: activeColors.primary_bg}]}>
                    <Pressable onPress={goBackPress}>
                        <Ionicons name='chevron-back-outline' style={{fontSize: 30, color: activeColors.primary_text}}/>
                    </Pressable>
                    <View>
                        <Text style={[styles.header_text, {color: activeColors.primary_text}]}>Articles</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                          <Pressable style={{padding: 5}} onPress={onSearchPress}>
                              { darkMode ? <Image style={styles.header_icons} source={require('../../../../assets/images/Search-White.png')} /> : <Image style={styles.header_icons} source={require('../../../../assets/images/Search-Black.png')} />}
                          </Pressable>
                    </View>
                    </View>
                )
            
            )
    }

    // Paragraph formatting
    const { width } = useWindowDimensions();

    

    return(
      
        <View style={[styles.container, {backgroundColor: activeColors.primary_bg}]}>

            <Header /> 

            {showsearch ? (
                <>
                    <View style={[styles.header, {backgroundColor: activeColors.primary_bg}]}>
                        <TextInput
                          style={[styles.searchBar, { backgroundColor: activeColors.inverted_bg_alt}]}
                          onChangeText={(text) => searchFilterFunction(text)}
                          value={search}
                          underlineColorAndroid="transparent"
                          placeholder="Search Here"
                        />
                        <Pressable onPress={onCancelPress} style={{marginRight: 5}}>
                          <Text style={{fontSize: 14, color: activeColors.primary_text}}>Cancel</Text>
                        </Pressable>
                    </View>
                    <SafeAreaView style={{marginBottom: 50, padding: 5}}>
                        <FlatList
                          data={filteredDataSource}
                          keyExtractor={(item, index) => index.toString()}
                          ItemSeparatorComponent={ItemSeparatorView}
                          renderItem={ItemView}
                        />
                    </SafeAreaView>
                </>
            ) : (
              <ScrollView style={{marginBottom: 50}}>
                {/*{datadisplayed}*/}
                {articles}
              </ScrollView>
            )}
            
        </View>
      
    );
}

const statusBarHeight = Constants.statusBarHeight

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    flexDirection: 'column',
    marginTop: statusBarHeight,
    backgroundColor: '#EFEFEF',
    //alignItems: 'center'
  },
  //header
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: 'white',
    borderBottomColor: '#c9c9c9', 
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
  header_icons: {
    height: 27,
    width: 27,
    //marginLeft: 10
  },
  header_icons_filter: {
    height: 23,
    width: 23,
    //marginLeft:20
  },
  searchBar: {
    flex: 1,
    height: 30,
    marginLeft: 0,
    marginRight: 10,
    borderRadius: 0,
    backgroundColor: '#E7E7E7',
    paddingLeft: 10
  },
  searchFilterResultsContainer: {

  },
  //Search Results
  resultsItemContainer: {
    padding: 10,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E6E6E6'
  },
  //Modal
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: 'column',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalHeader: {
    width: '95%',
    height: 40,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopEndRadius: 5,
    borderTopStartRadius: 5
  },
  modalBody: {
    width: '95%',
    height: 350,
    paddingTop: 20,
    backgroundColor: '#E3E3E3',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  modalFooter: {
    width: '95%',
    height: 60,
    backgroundColor: '#E3E3E3',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomEndRadius: 5,
    borderBottomStartRadius: 5
  },
  
  
});
