import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';


//Themes
import ThemeContext from '../../ThemeContext'
import {colors} from '../../../../assets/styles/themes'


export default FoodItem = (props) => {

    const [indexval, setIndexVal] = useState(props.index)


     //Theme
    const theme = useContext(ThemeContext)
    const darkMode = theme.state.darkMode;

    let activeColors = ''

    if (darkMode) {
        activeColors = colors['dark'];
    } else {
        activeColors = colors['light'];
    }

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, borderBottomColor:  activeColors.just_gray, borderBottomWidth: 0.5, paddingBottom: 3 }}>
            <View style={{ flexDirection: 'column', width: '70%' }}>
                <View style={{ flexDirection: 'row', marginBottom: 3 }}>
                    <Text style={{ fontSize: 15, color: activeColors.secondary_text, fontWeight: '600' }}>{props.item.quantity.toString()} - </Text>
                    <Text style={{ fontSize: 15, color: activeColors.secondary_text, fontWeight: '600' }}>{props.item.desc}</Text>
                </View>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' , marginBottom: 3 }}>
                    <Text style={{ fontSize: 12, color: activeColors.secondary_text, fontStyle: 'italic' }}>{props.item.servingsize}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                <View style={{ flexDirection: 'column' }}>
                    <Text style={{ fontSize: 12, color: activeColors.secondary_text }}>{props.item.protein}g protein</Text>
                    <Text style={{ fontSize: 12, color: activeColors.secondary_text }}>{props.item.carbs}g carbs</Text>
                </View>
                <View style={{ flexDirection: 'column', marginLeft: 20 }}>
                    <Text style={{ fontSize: 12, color: activeColors.secondary_text }}>{props.item.fat}g fat</Text>
                    <Text style={{ fontSize: 12, color: activeColors.secondary_text }}>{props.item.fiber}g fiber</Text>
                </View>
                </View>
            </View>
            <View>
                <Text style={{ fontSize: 14, color: activeColors.secondary_text }}>{props.item.calories} cals</Text>
            </View>
            <TouchableOpacity onPress={() => props.deleteTask()}>
                <MaterialIcons style={[styles.delete, { color: activeColors.secondary_text }]} name="delete" size={20} />
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginHorizontal: 20,
    },
    indexContainer: {
        backgroundColor: '#3E3364',
        borderRadius: 12,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
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