import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Controller } from 'react-hook-form';


export const BubbleTextInput = ({control, name, placeholder, secureTextEntry, multiline, vstyle, maxLength, keyboardType}) => {
              
    return(
        <View 
          //style={styles.inputView}
          style={[
            styles.inputView,
            vstyle ? vstyle : {}
          ]}> 
          <Controller 
            control={control}
            name={name}
            
            render={({ field: {value, onChange, onBlur}}) => (
                <TextInput
                    value = {value}
                    placeholder={placeholder}
                    placeholderTextColor="#BCBCBC"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    keyboardType={keyboardType}
                    //style=style ? {styles.inputbox}
                    maxLength={maxLength}                
                    secureTextEntry={secureTextEntry}
                    style={{textAlign:'center'}}
                />
            )}
          />
        </View>
    )
}

export const BubbleMultiLine = ({control, name, placeholder, vstyle}) => {
              
  return(
      <View
          style={[
            styles.inputView,
            vstyle ? vstyle : {}
          ]}>  
        <Controller 
          control={control}
          name={name}
          render={({ field: {value, onChange, onBlur}}) => (
              <TextInput
                  value = {value}
                  placeholder={placeholder}
                  placeholderTextColor="#BCBCBC"
                  onChangeText={onChange}
                  onBlue={onBlur}
                  multiline={true}
                  numberOfLines={2}
                  maxLength={200}
                  style={{textAlignVertical: 'top', alignContent: 'center', textAlign: 'left'}}
              />
          )}
        />
      </View>
  )
}

export const ProfileInput = ({ value, placeholder, onChangeText}) => {

    return(
        <View style={styles.inputProfile}>  
                <TextInput
                    value = {value}
                    placeholder={placeholder}
                    placeholderTextColor="#003f5c"
                    onChangeText={onChangeText}
                    //onBlue={onBlur}
                    style={styles.inputboxProfile}
                />
        </View>
    )
}


export const WorkoutResultInput = ({control, name, placeholder, secureTextEntry, vstyle, maxLength, keyboardType}) => {
              
  return(
      <View 
        //style={styles.inputView}
        style={[
          styles.inputView,
          vstyle ? vstyle : {}
        ]}> 

        <Controller 
          control={control}
          name={name}
          
          render={({ field: {value, onChange, onBlur}}) => (
              <TextInput
                  value = {value}
                  placeholder={placeholder}
                  placeholderTextColor="#BCBCBC"
                  onChangeText={onChange}
                  onBlue={onBlur}
                  keyboardType={keyboardType}
                  //style=style ? {styles.inputbox}
                  maxLength={maxLength}                
                  secureTextEntry={secureTextEntry}
                  style={{textAlign:'center'}}
              />
          )}
        />
      </View>
  )
}

/*
Food Input Fields
*/

export const FoodInputField = (props) => {
    const [fooddesc, setFoodDesc] = useState(null);
    const [protein, setProtein] = useState(null);
    const [carbs, setCarbs] = useState(null);
    const [fat, setFat] = useState(null);
    const [fiber, setFiber] = useState(null);
    const [calories, setCalories] = useState(null);

    const handleaddFood = (fooddesc, protein, carbs, fat, fiber, calories, category) => {

        props.addFood(fooddesc, protein, carbs, fat, fiber, calories, props.category);

        setFoodDesc(null);
        setProtein(null);
        setCarbs(null);
        setFat(null);
        setFiber(null);
        setCalories(null);
    }

    return (

    <>
    <KeyboardAvoidingView 
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={{flexDirection: 'row', padding: 0, justifyContent: 'space-between', borderRadius: 5, marginBottom: 10 }}
    >
        <View style={{flexDirection: 'column'}}>
            <View style={{flexDirection: 'row', alignItems:'center', height: 50}}>
                <Text style={{fontSize: 15, fontWeight: '300', marginRight: 10}}>Food Description</Text>
            </View>
            
            <View style={{flexDirection: 'row', alignItems:'center', height: 50}}>
                <Text style={{fontSize: 15, fontWeight: '300', marginRight: 10}}>Protein</Text>
            </View>

            <View style={{flexDirection: 'row', alignItems:'center', height: 50}}>
                <Text style={{fontSize: 15, fontWeight: '300', marginRight: 10}}>Carbs</Text>
            </View>

            <View style={{flexDirection: 'row', alignItems:'center', height: 50}}>
                <Text style={{fontSize: 15, fontWeight: '300', marginRight: 10}}>Fat</Text>
            </View>

            <View style={{flexDirection: 'row', alignItems:'center', height: 50}}>
                <Text style={{fontSize: 15, fontWeight: '300', marginRight: 10}}>Fiber</Text>
            </View>

            <View style={{flexDirection: 'row', alignItems:'center', height: 50}}>
                <Text style={{fontSize: 15, fontWeight: '300', marginRight: 10}}>Calories</Text>
            </View>

        </View>
        <View style={{flexDirection: 'column'}}>
            <View style={{height: 50, justifyContent: 'center'}}>
                <TextInput value={fooddesc} onChangeText={text => setFoodDesc(text)} placeholder={'eg. Chicken'} placeholderTextColor={'#000'} style={{width: 150, borderRadius: 5, padding: 5, backgroundColor: '#dbdbdb'}}/>
            </View>
            <View style={{height: 50, justifyContent: 'center'}}>
                <TextInput value={protein} onChangeText={text => setProtein(text.toString())} placeholder={'eg. 30g'} placeholderTextColor={'#000'} style={{width: 150, borderRadius: 5, padding: 5, backgroundColor: '#dbdbdb'}}/>
            </View>
            <View style={{height: 50, justifyContent: 'center'}}>
                <TextInput value={carbs} onChangeText={text => setCarbs(text)} placeholder={'eg. 30g'} placeholderTextColor={'#000'} style={{width: 150, borderRadius: 5, padding: 5, backgroundColor: '#dbdbdb'}}/>
            </View>
            <View style={{height: 50, justifyContent: 'center'}}>
                <TextInput value={fat} onChangeText={text => setFat(text)} placeholder={'eg. 30g'} placeholderTextColor={'#000'} style={{width: 150, borderRadius: 5, padding: 5, backgroundColor: '#dbdbdb'}}/>
            </View>
            <View style={{height: 50, justifyContent: 'center'}}>
                <TextInput value={fiber} onChangeText={text => setFiber(text)} placeholder={'eg. 30g'} placeholderTextColor={'#000'} style={{width: 150, borderRadius: 5, padding: 5, backgroundColor: '#dbdbdb'}}/>
            </View>
            <View style={{height: 50, justifyContent: 'center'}}>
                <TextInput value={calories} onChangeText={text => setCalories(text)} placeholder={'eg. 30g'} placeholderTextColor={'#000'} style={{width: 150, borderRadius: 5, padding: 5, backgroundColor: '#dbdbdb'}}/>
            </View>
        </View>
        {/* 
        <TouchableOpacity onPress={() => handleaddFood(task)} style={{justifyContent: 'flex-end'}}>
          <View style={styles.button}>
             <Text>Add</Text>
          </View>
        </TouchableOpacity>
        */}
      </KeyboardAvoidingView>
      <View style={{justifyContent: 'center', alignItems: 'center', width: '100%'}}>
            <Bubble_Button 
            text='Add'
            onPress={() => handleaddFood(fooddesc, protein, carbs, fat, fiber, calories)}
            bgColor='#F8BE13'
            fgColor='#363636'
            cstyle={{marginLeft: 0, width: '100%'}}
        />
    </View>
    </>
    );
}

export const FoodItem = (props) => {

  const [indexval, setIndexVal] = useState(props.index)

  return (
      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}>
          <View style={{flexDirection: 'column', width: '70%'}}>
              <View style={{flexDirection: 'row'}}>
                  <Text style={{fontSize: 15}}>{props.item.desc}</Text>
                  <Text style={{fontSize: 5, color: 'white'}}>{props.index}</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                  <View style={{flexDirection: 'column'}}>
                      <Text style={{fontSize: 12}}>{props.item.protein}g protein</Text>
                      <Text style={{fontSize: 12}}>{props.item.carbs}g carbs</Text>
                  </View>
                  <View style={{flexDirection: 'column', marginLeft: 20}}>
                      <Text style={{fontSize: 12}}>{props.item.fat}g fat</Text>
                      <Text style={{fontSize: 12}}>{props.item.fiber}g fiber</Text>
                  </View>
              </View>
          </View>
          <View>
              <Text style={{fontSize: 14}}>{props.item.calories} cals</Text>
          </View>
          <TouchableOpacity onPress={() => props.deleteTask()}>
              <MaterialIcons style={styles.delete} name="delete" size={20} color='#fff' />
          </TouchableOpacity>
      </View>
  );
}

const input_box_width= '100%';

const styles = StyleSheet.create({
    inputView: {
      backgroundColor: "#fff",
      borderRadius: 5,
      width: '90%',
      paddingLeft: 5,
      paddingTop: 2,
      //height: 45,
      marginBottom: 20,
      //alignItems: "center"
    },
    inputbox: {
      height: 50,
      flex: 1,
      width: input_box_width,
      padding: 10,
      marginLeft: 0,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: 'gray',
      
    },
    inputProfile: {
      backgroundColor: "#fff",
      borderRadius: 5,
      width: '100%',
      marginBottom: 20,
      alignItems: "center",
    },
    inputboxProfile: {
      flex: 1,
      width: '100%',
      padding: 10,
      margin: 20,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: 'gray',
    },
    /* food items */
    inputField: {
      color: '#fff',
      height: 50,
      flex: 1,
    },
    button: {
        height: 30,
        width: 60,
        borderRadius: 5,
        padding: 5,
        backgroundColor: '#F8BE13',
        alignItems: 'center',
        justifyContent: 'center'
    },

    index: {
      color: '#fff',
      fontSize: 20,
    },
    taskContainer: {
        backgroundColor: '#3E3364',
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        minHeight: 50,
    },
    task: {
        color: '#fff',
        width: '90%',
        fontSize: 16,
    },
    delete: {
        marginLeft: 10,
        color: 'black'
    },
  });
  
  
  export default BubbleTextInput;