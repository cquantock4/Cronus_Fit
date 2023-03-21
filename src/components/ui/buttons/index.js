import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';



export const Bubble_Button = ({onPress, text, bgColor, fgColor, cstyle, tstyle}) => {
    return (
        <Pressable
        onPress={onPress}
        style={[
            styles.container_bubblebutton,
            bgColor ? {backgroundColor: bgColor} : {},
            cstyle ? cstyle : {}
        ]}>
            <Text
                style={[
                styles.text_bubblebutton,
                fgColor ? {color: fgColor} : {},
                tstyle ? tstyle : {}
                ]}>
                {text}
            </Text>
        </Pressable>
    );
};

export const Bubble_Button_Small = ({onPress, text, bgColor, fgColor, cstyle}) => {
    return (
        <Pressable
        onPress={onPress}
        style={[
            styles.container_bubblebuttonsmall,
            bgColor ? {backgroundColor: bgColor} : {},
            cstyle ? cstyle : {}
        ]}>
            <Text
                style={[
                    fgColor ? {color: fgColor} : {},
                ]}>
                {text}
            </Text>
        </Pressable>
    );
};

export const Button_Link = ({onPress, text, bgColor, fgColor}) => {
    return (
        <Pressable
        onPress={onPress}
        style={[
            styles.container_buttonlink,
            bgColor ? {backgroundColor: bgColor} : {},
        ]}>
        <Text
            style={[
            styles.text_buttonlink,
            fgColor ? {color: fgColor} : {},
            ]}>
            {text}
        </Text>
        </Pressable>
    );
};


/*
    Older button templates
*/
export const Workout_Button = (props) => {
    
    return (
        <Pressable style={styles.workoutButtonRow_2} onPress={() => {
            console.log(props.id)
          }}>
            <View style={styles.sectionRow}>
                <Text style={{fontSize: 13, fontWeight: 'bold', margin:5}}>{props.text}</Text>
            </View>
            <View style={styles.sectionRowArrow}>
                <Ionicons name="chevron-forward-outline" size={25} style={{textAlign:'right'}}></Ionicons>
            </View>
        </Pressable>
    );
  };

const HorizontalScrollItem = (props) => {
    
    return (
        <Pressable  onPress={() => {
            console.log('pressed horizontal Scroll button')
        }}>
            <View style={styles.horiztonalrowitem}>
                <Text style={styles.font_3}>{props.name}</Text>
            </View>
        </Pressable>
    );
    
};
    
export const Workout_Button_2 = (props) => {
    
    return (
        
            <View style={styles.workoutButtonRow_3}>
                <View style={styles.sectionRow}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <HorizontalScrollItem name="Today"></HorizontalScrollItem>
                        <HorizontalScrollItem name="7/16/2022"></HorizontalScrollItem>
                        <HorizontalScrollItem name="7/15/2022"></HorizontalScrollItem>
                        <HorizontalScrollItem name="7/14/2022"></HorizontalScrollItem>
                        <HorizontalScrollItem name="7/13/2022"></HorizontalScrollItem>
                    </ScrollView>
                </View>
                <View style={styles.sectionRow_2}>
                    <View style={styles.button_container_row}>
                        <View style={styles.itemBottomLeft}>
                            <Text style={styles.font}>{props.text}</Text>
                        </View>
                        <View style={styles.itemBottomRight}>
                            <Pressable  onPress={() => {
                                console.log('Pressed View More')
                            }}>
                                <Text style={styles.viewMore}>View More</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        
    );
  };

export const Workout_Button_3 = (props) => {
    
    return (
        
            <View style={styles.workoutButtonRow_3}>
                <View style={styles.sectionRow_2}>
                    <View style={styles.button_container_row}>
                        <View style={styles.itemBottomLeft}>
                            <Text style={styles.font}>{props.text}</Text>
                        </View>
                        <View style={styles.itemBottomRight}>
                            <Pressable  onPress={() => {
                                console.log('Pressed View More')
                            }}>
                                <Text style={styles.viewMore}>View More</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
                <View style={styles.sectionRow}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <HorizontalScrollItem name="Today"></HorizontalScrollItem>
                        <HorizontalScrollItem name="7/16/2022"></HorizontalScrollItem>
                        <HorizontalScrollItem name="7/15/2022"></HorizontalScrollItem>
                        <HorizontalScrollItem name="7/14/2022"></HorizontalScrollItem>
                        <HorizontalScrollItem name="7/13/2022"></HorizontalScrollItem>
                    </ScrollView>
                </View>
            </View>
        
    );
  };


export default Workout_Button


const styles = StyleSheet.create({
container_bubblebutton: {
    width: '90%',
    padding: 15,
    marginVertical: 0,
    alignItems: 'center',
    borderRadius: 2,
    backgroundColor: '#FFE60E'
    },
text_bubblebutton: {
    fontWeight: '600',
    color: 'black',
    
    },
container_bubblebuttonsmall: {
    width: '50%',
    marginVertical: 0,
    alignItems: 'center',
    borderRadius: 0,
    backgroundColor: '#FFE60E',
    borderWidth: .5,
    borderColor: '#B4B4B4',
    paddingTop: 5,
    paddingBottom: 5
    },
text_bubblebuttonsmall: {
    color: 'black',
    fontWeight: '600',
    fontSize: 13
    },
container_buttonlink: {
    width: '90%',
    padding: 15,
    marginVertical: 0,
    alignItems: 'center',
    borderRadius: 5,
    },
text_buttonlink: {
    fontWeight: '400',
    color: 'gray',
    },
viewMore: {
    fontSize: 10, 
    fontWeight: 'bold', 
    margin:5,
    textAlign: 'right'
},
font: {
    fontSize: 18, 
    fontWeight: 'bold', 
    margin:5
},
font_3: {
    fontSize: 12, 
    fontWeight: 'bold'
},
workoutsContainer: {
    flex: 1,
    paddingTop: 5,
    paddingLeft: 5,
    paddingRight: 5
},
workoutButtonRow_2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 4,
    padding: 30,
    borderRadius: 5,
    backgroundColor: '#ffffff',
    elevation: 2
},
workoutButtonRow_3: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: 5,
    borderRadius: 5,
    backgroundColor: '#ffffff',
    elevation: 3
},
button_container_row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5
},
sectionRow: {
    flex: 3
},
sectionRowArrow: {
    flex: 1,
    justifyContent: "center"
},
itemBottomRight: {
    flex: 1,
    justifyContent: 'flex-end',
},
itemBottomLeft: {
    flex: 1,
    justifyContent: 'center',
},
sectionRow_2: {
    flex: 3
},
horiztonalrowitem: {
    height: 50,
    width: 100,
    margin:5, 
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    borderColor: '#F4F4F4',
    borderWidth: 1,
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center',
}
})