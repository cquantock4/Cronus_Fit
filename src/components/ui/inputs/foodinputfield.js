import React, {useState, useContext} from 'react';
import { KeyboardAvoidingView, StyleSheet, View, TextInput, Text} from "react-native";
import { Bubble_Button } from '../buttons'

//Themes
import ThemeContext from '../../ThemeContext'
import {colors} from '../../../../assets/styles/themes'

export default FoodInputField = (props) => {
    const [fooddesc, setFoodDesc] = useState(null);
    const [protein, setProtein] = useState(null);
    const [carbs, setCarbs] = useState(null);
    const [fat, setFat] = useState(null);
    const [fiber, setFiber] = useState(null);
    const [calories, setCalories] = useState(null);

    //Theme
    const theme = useContext(ThemeContext)
    const darkMode = theme.state.darkMode;

    let activeColors = ''

    if (darkMode) {
        activeColors = colors['dark'];
    } else {
        activeColors = colors['light'];
    }

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
                <Text style={{fontSize: 15, fontWeight: '300', marginRight: 10, color: activeColors.secondary_text}}>Food Description</Text>
            </View>
            
            <View style={{flexDirection: 'row', alignItems:'center', height: 50}}>
                <Text style={{fontSize: 15, fontWeight: '300', marginRight: 10, color: activeColors.secondary_text}}>Protein</Text>
            </View>

            <View style={{flexDirection: 'row', alignItems:'center', height: 50}}>
                <Text style={{fontSize: 15, fontWeight: '300', marginRight: 10, color: activeColors.secondary_text}}>Carbs</Text>
            </View>

            <View style={{flexDirection: 'row', alignItems:'center', height: 50}}>
                <Text style={{fontSize: 15, fontWeight: '300', marginRight: 10, color: activeColors.secondary_text}}>Fat</Text>
            </View>

            <View style={{flexDirection: 'row', alignItems:'center', height: 50}}>
                <Text style={{fontSize: 15, fontWeight: '300', marginRight: 10, color: activeColors.secondary_text}}>Fiber</Text>
            </View>

            <View style={{flexDirection: 'row', alignItems:'center', height: 50}}>
                <Text style={{fontSize: 15, fontWeight: '300', marginRight: 10, color: activeColors.secondary_text}}>Calories</Text>
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

const styles = StyleSheet.create({
    container: {
        borderColor: '#fff',
        backgroundColor: '#3E3364',
        borderWidth: 1,
        marginHorizontal: 20,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        //position: 'fixed',
        bottom: 20,
    },
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
});