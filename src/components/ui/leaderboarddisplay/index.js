import React, {useContext, useState} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Pressable } from 'react-native';
import { IconButton } from "@react-native-material/core";
import Ionicons from 'react-native-vector-icons/Ionicons';
//Themes
import ThemeContext from '../../ThemeContext';
import { colors } from '../../../../assets/styles/themes';





const LeaderBoardUserRow = (props) => {

     //Theme
     const theme = useContext(ThemeContext)
     const darkMode = theme.state.darkMode;
 
     let activeColors = ''
 
     if (darkMode) {
         activeColors = colors['dark'];
     } else {
         activeColors = colors['light'];
     }


     const [expand, setExpand] = useState(false);
     const groups = {};

     // Group the results by grouptitle
     props.resultsitem.results.forEach(result => {
      if (!groups[result.grouptitle]) {
        groups[result.grouptitle] = [];
      }
      groups[result.grouptitle].push(result);
    });

    const ResultComponent = ({ result }) => {
      const { desc, value, resultcategory } = result;
      let formatted_sets, formatted_reps = ''


      if (resultcategory === 'SETSREPS') {
        if (value.includes('-')) {
          const [sets, reps] = value.split('-');
          formatted_sets = sets
          formatted_reps = reps
       } 
      }

      
      let curr_units = ''

      if (resultcategory === 'TIME') {

        curr_units = <Text style={{color: activeColors.primary_text}}>{value}</Text>


      } else if (resultcategory === 'SETSREPS') {

        curr_units = <View style={{ alignItems: 'flex-end' }}>
                        <Text style={{ color: activeColors.primary_text }}>
                          {formatted_sets} sets +
                        </Text>
                        <Text style={{ color: activeColors.primary_text }}>
                          {formatted_reps} reps
                        </Text>
                      </View>

      } else if (resultcategory === 'WEIGHT') {

        curr_units = <Text style={{ color: activeColors.primary_text }}>
                        {value} lbs
                      </Text>
                      }
      

      return (
        <View style={styles.expanded_resultContainer}>
          <View style={{ flex: 1 }}>
            <Text style={{ color: activeColors.primary_text }}>{desc}</Text>
          </View>
          <View style={{ flexShrink: 1, marginLeft: 10 }}>{curr_units}</View>
        </View>
      );
    };

     const toggleExpand = () => {
      console.log(props.preview)
       if (!props.preview) {
        console.log('expanding')
         setExpand(!expand);
       }
     };
  
    
    return(
      <>
      <TouchableOpacity onPress={toggleExpand}>
        <View style={[styles.container_userRow, { borderBottomColor: expand ? 'rgba(0, 0, 0, 0)' : activeColors.primary_text  }]}>
        
          <View style={{ width: '20%' }}>
            <View style={styles.rowNumber}>
              {props.userid === props.curr_userid ? (
                <Text style={{ fontSize: 25, fontWeight: '600', color: activeColors.primary_text }}>Me</Text>
              ) : (
                <>
                  <Text style={{ fontSize: 30, fontWeight: '600', color: activeColors.primary_text }}>{props.number}</Text>
                  <Text style={{ fontSize: 10, fontWeight: '600', color: activeColors.primary_text }}>{props.ordinal}</Text>
                </>
              )}
            </View>
          </View>
          <View style={styles.rowMiddleSection}>
            <Text style={{ fontSize: 14, color: 'black', fontWeight: '500', color: activeColors.primary_text }}>
              {props.name}
            </Text>
            {/*<Text style={{fontSize: 11, color: activeColors.accent_text}}>View Results</Text>*/}
          </View>
          <View style={styles.rowCounts}>
            <View style={[styles.rowCountsContainer, { backgroundColor: activeColors.inverted_bg }]}>
              <Text style={{ fontSize: 10, color: activeColors.inverted_text, fontWeight: '400' }}>{props.score}</Text>
            </View>
          </View>
        

        
        </View>
      </TouchableOpacity>

      {expand && (
          <View style={styles.expanded_container}>
            {Object.entries(groups).map(([groupTitle, results]) => (
              <View key={groupTitle}>
                <Text style={[styles.expanded_group, {borderBottomColor: activeColors.primary_text}]}>{results[0].group}: {groupTitle}</Text>
                {results.map((result, index) => (
                  <ResultComponent key={index} result={result} />
                ))}
              </View>
            ))}
          </View>
        )}
      </>
    );
  
  }

const LeaderBoardDisplay = ({userid, workoutinfo, results, preview = false, onPress }) => {

    //Theme
    const theme = useContext(ThemeContext)
    const darkMode = theme.state.darkMode;

    let activeColors = ''

    if (darkMode) {
        activeColors = colors['dark'];
    } else {
        activeColors = colors['light'];
    }


    /*
    const onRowPress = () => {
      //console.log("Let's go here: " + key)
      navigation.navigate('LeaderboardDetails', {value: key})
    }
    
    //console.log('here we are now: ' + JSON.stringify(workoutresults))
 */

    let datadisplayed = []
    
    
    
    if (preview) {
        const previewLimit = 3;
        const previewResults = results.slice(0, previewLimit);

        datadisplayed = previewResults.map((category, index) => {

        

            return (
                <LeaderBoardUserRow 
                  name={results[category].name} 
                  userid={category}
                  key={category} 
                  score={results[category].score}
                  number={results[category].number}
                  ordinal={results[category].ordinal}
                  curr_item={category}
                  curr_userid={userid}
                  resultsitem={results[category]}
                  preview={preview}
                />
            );
        })

            if (results.length > previewLimit) {
                datadisplayed.push(
                <View key="more-results" style={{padding: 10, paddingTop: 0, alignItems: 'center'}}>
                    <Text style={{ color: activeColors.primary_text, fontSize: 18 }}>...</Text>
                </View>
                );
            }
        } else {

            datadisplayed = results.map((category, index) => {
    
                return (
                    <LeaderBoardUserRow 
                      name={results[category].name} 
                      userid={category}
                      key={category} 
                      score={results[category].score}
                      number={results[category].number}
                      ordinal={results[category].ordinal}
                      curr_item={category}
                      curr_userid={userid}
                      resultsitem={results[category]}
                      preview={preview}
                    />
                );
            })
        
    }  

    return(

            <View style={styles.container_preview}>
              { preview ? ( 
                <View style={styles.container_header}>
                    <View style={{flex: 1}}>
                        <Text style={{fontSize: 20, fontWeight: '600', color: activeColors.secondary_text}}>{workoutinfo.title}</Text>
                        <Text style={{fontSize: 14, fontWeight: '400', color: activeColors.secondary_text}}>{workoutinfo.date}</Text>
                    </View>
                    <View>
                        <Pressable onPress={onPress} style={{flex: 1, paddingleft: 10,  justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{color: activeColors.accent_text}}>View Details</Text>
                        </Pressable>
                    </View>
                </View>
                ) : ( 
                  <></>
                )}

                { results ? (
                    <View style={styles.container_userRows}>
                        {datadisplayed}
                    </View>
                 ) : (
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{color: 'white'}}>No results have been recorded for this workout</Text>
                    </View>
                )}
            
          </View>
       
    )
  
    return(
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

        { workoutresults.length > 0 ? (
          <ScrollView
                style={{marginBottom: 47}}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
              >
            <View style={[styles.container_preview, {backgroundColor: activeColors.secondary_bg}]}>
              <View style={styles.container_header}>
                <View style={{flex: 1}}>
                  <Text style={{fontSize: 20, fontWeight: '600', color: activeColors.secondary_text}}>{props.title}</Text>
                  <Text style={{fontSize: 14, fontWeight: '400', color: activeColors.secondary_text}}>{props.workout_date}</Text>
                </View>
                <View>
                  <Pressable onPress={onRowPress} style={{flex: 1, paddingleft: 10,  justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: activeColors.accent_text}}>View Details</Text>
                  </Pressable>
                </View>
              </View>
              
              
              <View style={styles.container_userRows}>
                {datadisplayed}
              </View>
              
            </View>

          </ScrollView>
        ) : (

          <View>
            <Text>No Results posted yet</Text>
          </View>

        )}
        
        
      </View>
    );
  
  }


  const styles = StyleSheet.create({
     //Container Preview
   container_preview: {
    //backgroundColor: 'blue',
    margin: 5,
    
    //borderWidth: 1
  },
  container_header: {
    //backgroundColor: 'white',
    borderBottomWidth: 1,
    padding: 15,
    flexDirection: 'row'
    //paddingLeft: 10
  },
  container_footer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15
  },
  container_userRows: {

  },
  container_userRow: {
    //backgroundColor: 'white',
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    padding:15
    //justifyContent: 'space-between',
  },
  rowNumber: { 
    flexDirection: 'row', 
    alignSelf: 'flex-start', 
    alignSelf:'center'
  },
  rowMiddleSection: {
    width: '40%', 
    justifyContent: 'center'
  },
  rowCounts: {
    width: '40%', 
    justifyContent: 'center'
  },
  rowCountsContainer: {
    //backgroundColor: '#363636', 
    width: '80%', 
    alignSelf: 'center', 
    alignItems: 'center', 
    padding: 5, 
    borderRadius: 3
  },

  expanded_container: {
    flex: 1,
    padding: 10,
    paddingTop: 0
  },
  expanded_name: {
    fontWeight: 'bold',
    fontSize: 16
  },
  expanded_score: {
    fontSize: 14
  },
  expanded_group: {
    marginTop: 5,
    marginBottom: 5,
    fontWeight: 'bold',
    fontSize: 14,
    borderBottomWidth: 0.5,
  },
  expanded_resultContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 7
  }

  })


  
  export default LeaderBoardDisplay